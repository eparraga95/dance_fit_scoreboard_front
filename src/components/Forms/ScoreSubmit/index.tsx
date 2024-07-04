import React, { FunctionComponent, useContext, useState } from "react";
import { IEvent, IMusic } from "../../../types/entity-types";
import {
  ContentWrapper,
  DeleteWarning,
  FormWrapper,
  ScoreDGPReview,
  ScoreDGPreviewWrapper,
} from "../../../styles/global";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IScoreCreate, IScoreFormCreate } from "../../../types/form-types";
import { MdOutlineNumbers } from "react-icons/md";
import Input from "../../Input";
import {
  BsCapslock,
  BsEmojiDizzy,
  BsEmojiFrown,
  BsEmojiNeutral,
  BsEmojiSmile,
  BsEmojiSunglasses,
} from "react-icons/bs";
import Select from "../../Select";
import Button from "../../Button";
import { useScore } from "../../../providers/Scores";
import Cropper, { Area, Point } from "react-easy-crop";
import { readFile } from "../../../utils/readFile";
import {
  CropperFullWrapper,
  CropperWrapper,
  SliderWrapper,
} from "../../../pages/Dashboard_Profile/styles";
import { Slider, Typography } from "@material-ui/core";
import { getCroppedImg } from "../../../utils/canvasUtils";
import { ThemeContext } from "styled-components";
import { BallTriangle } from "react-loader-spinner";
import { FaArrowUpRightFromSquare, FaCameraRetro } from "react-icons/fa6";
import { ImCross } from "react-icons/im";

interface ScoreCreateFormProps {
  music: IMusic;
  event: IEvent | undefined;
}

const ScoreCreateForm: FunctionComponent<ScoreCreateFormProps> = ({
  music,
  event,
}) => {
  const theme = useContext(ThemeContext);

  const { submitScore, isLoadingSubmitScore } = useScore();

  const scoreCreateSchema = yup.object().shape({
    value: yup.number().required(),
    perfect: yup.number().required(),
    great: yup.number().required(),
    good: yup.number().required(),
    bad: yup.number().required(),
    miss: yup.number().required(),
    max_combo: yup.number().required(),
    stage_pass: yup
      .boolean()
      .required()
      .transform((_, originalValue) =>
        originalValue === "true" ? true : false
      ),
    grade: yup.string().required(),
    plate: yup
      .string()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value
      )
      .nullable(),
  });

  const {
    register: registerCreateScore,
    handleSubmit: handleSubmitCreateScore,
    formState: { errors: createScoreErrors },
  } = useForm<IScoreFormCreate>({
    resolver: yupResolver(scoreCreateSchema),
  });

  const stagePassOptions = [
    { label: "Pass", value: "true" },
    { label: "Break", value: "" },
  ];

  const gradeOptions = [
    { label: "SSS+", value: "SSS+" },
    { label: "SSS", value: "SSS" },
    { label: "SS+", value: "SS+" },
    { label: "SS", value: "SS" },
    { label: "S+", value: "S+" },
    { label: "S", value: "S" },
    { label: "AAA+", value: "AAA+" },
    { label: "AAA", value: "AAA" },
    { label: "AA+", value: "AA+" },
    { label: "AA", value: "AA" },
    { label: "A+", value: "A+" },
    { label: "A", value: "A" },
    { label: "B", value: "B" },
    { label: "C", value: "C" },
    { label: "D", value: "D" },
    { label: "F", value: "F" },
  ];

  const platingOptions = [
    { label: "Perfect Game", value: "PG" },
    { label: "Ultimate Game", value: "UG" },
    { label: "Extreme Game", value: "EG" },
    { label: "Superb Game", value: "SG" },
    { label: "Marvelous Game", value: "MG" },
    { label: "Talented Game", value: "TG" },
    { label: "Fair Game", value: "FG" },
    { label: "Rough Game", value: "RG" },
  ];

  // crop component states
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>({} as Area);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const onCropComplete = (_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl: string | null = null;

      try {
        const fileData = await readFile(file);

        if (typeof fileData === "string") {
          imageDataUrl = fileData;
        } else if (fileData instanceof ArrayBuffer) {
          const decoder = new TextDecoder();
          imageDataUrl = decoder.decode(fileData);
        }
      } catch (e) {
        console.warn("Failed to process the image", e);
      }

      setImageSrc(imageDataUrl);
    }
  };

  const onCreateScoreFormSubmit = async (formData: IScoreFormCreate) => {
    try {
      if (imageSrc) {
        const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);

        if (croppedImage !== null) {
          const response = await fetch(croppedImage);
          const blob = await response.blob();

          // Create a file from the blob with the name "score_picture.jpg"
          const file = new File([blob], "score_picture.jpg", {
            type: "image/jpeg",
          });

          // Create a new FormData object
          const multipartForm = new FormData();

          // Append the new file to the FormData object
          multipartForm.append("file", file, "score_picture.jpg");

          const { music_id } = music;

          const realFormData: IScoreCreate = {
            ...formData,
            event_id: Number(event?.event_id),
            music_id: Number(music_id),
          };

          Object.keys(realFormData).forEach((key) => {
            multipartForm.append(key, (realFormData as any)[key]);
          });

          submitScore(multipartForm);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [isPreviewVisible, setPreviewVisible] = useState<boolean>(false);

  const showCroppedImage = async () => {
    try {
      if (imageSrc) {
        const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);

        setCroppedImage(croppedImage);
        setPreviewVisible(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ContentWrapper>
        <FormWrapper
          onSubmit={handleSubmitCreateScore(onCreateScoreFormSubmit)}
        >
          <Input
            name="file"
            icon={FaCameraRetro}
            label="Foto do Score"
            type="file"
            onChange={onFileChange}
          />

          {imageSrc && (
            <CropperFullWrapper>
              <CropperWrapper>
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={5 / 4}
                  cropShape="rect"
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              </CropperWrapper>
              <SliderWrapper>
                <Typography variant="overline" style={{ marginTop: `1rem` }}>
                  Zoom
                </Typography>
                <Slider
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  onChange={(_, zoom) =>
                    setZoom(typeof zoom === "number" ? zoom : zoom[0])
                  }
                />
              </SliderWrapper>
            </CropperFullWrapper>
          )}

          <Button
            type="button"
            onClick={() => showCroppedImage()}
            style={{ margin: `1rem 0` }}
          >
            Mostrar Foto Cortada
          </Button>

          {croppedImage && isPreviewVisible && (
            <ScoreDGPreviewWrapper>
              <Button vanilla={false} onClick={() => setPreviewVisible(false)}>
                <ImCross />
              </Button>
              <ScoreDGPReview src={croppedImage} />
            </ScoreDGPreviewWrapper>
          )}

          <Input
            label="Pontuação"
            icon={MdOutlineNumbers}
            name="value"
            type="number"
            onWheel={(e) => e.currentTarget.blur()}
            register={registerCreateScore}
            error={createScoreErrors.value?.message}
          />

          <Input
            label="Perfects"
            icon={BsEmojiSunglasses}
            name="perfect"
            type="number"
            onWheel={(e) => e.currentTarget.blur()}
            register={registerCreateScore}
            error={createScoreErrors.perfect?.message}
          />

          <Input
            label="Greats"
            icon={BsEmojiSmile}
            name="great"
            type="number"
            onWheel={(e) => e.currentTarget.blur()}
            register={registerCreateScore}
            error={createScoreErrors.great?.message}
          />

          <Input
            label="Goods"
            icon={BsEmojiNeutral}
            name="good"
            type="number"
            onWheel={(e) => e.currentTarget.blur()}
            register={registerCreateScore}
            error={createScoreErrors.good?.message}
          />

          <Input
            label="Bads"
            icon={BsEmojiFrown}
            name="bad"
            type="number"
            onWheel={(e) => e.currentTarget.blur()}
            register={registerCreateScore}
            error={createScoreErrors.bad?.message}
          />

          <Input
            label="Miss"
            icon={BsEmojiDizzy}
            name="miss"
            type="number"
            onWheel={(e) => e.currentTarget.blur()}
            register={registerCreateScore}
            error={createScoreErrors.miss?.message}
          />

          <Input
            label="Max Combo"
            icon={BsCapslock}
            name="max_combo"
            type="number"
            onWheel={(e) => e.currentTarget.blur()}
            register={registerCreateScore}
            error={createScoreErrors.max_combo?.message}
          />

          <Select
            label="Stage Pass"
            placeholder="Selecionar"
            options={stagePassOptions}
            name="stage_pass"
            register={registerCreateScore}
            error={createScoreErrors.stage_pass?.message}
          />

          <Select
            label="Grade"
            placeholder="Selecionar"
            options={gradeOptions}
            name="grade"
            register={registerCreateScore}
            error={createScoreErrors.grade?.message}
          />

          <Select
            label="Plate"
            placeholder="Selecionar"
            options={platingOptions}
            name="plate"
            register={registerCreateScore}
            error={createScoreErrors.plate?.message}
          />

          <Button
            type="button"
            onClick={() => showCroppedImage()}
            style={{ margin: `1rem 0` }}
          >
            Mostrar Foto Cortada
          </Button>

          <DeleteWarning>
            IMPORTANTE!! Antes de fazer o envio, certifique que apareçem
            legíveis na foto:
            <li>NOME DO CARD</li>
            <li>PONTUAÇÃO</li>
            <li>GRADE (SSS+, A+, etc...)</li>
            <li>PLATE (Talented Game, etc..)</li>
          </DeleteWarning>

          <Button
            vanilla={false}
            type="submit"
            style={{ marginTop: `1rem`, marginBottom: `4rem` }}
          >
            Enviar Score <FaArrowUpRightFromSquare />
          </Button>

          <BallTriangle
            height={36}
            width={36}
            radius={5}
            color={theme?.colors.primary}
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={isLoadingSubmitScore}
          />
        </FormWrapper>
      </ContentWrapper>
    </>
  );
};

export default ScoreCreateForm;
