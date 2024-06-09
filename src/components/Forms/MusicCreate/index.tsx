import { FunctionComponent } from "react";
import {
  ContentWrapper,
  FormWrapper,
  GlobalContainer,
} from "../../../styles/global";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IMusicCreate } from "../../../types/form-types";
import Select from "../../Select";
import Input from "../../Input";
import { TbFileMusic } from "react-icons/tb";
import { MdOutlineNumbers } from "react-icons/md";
import { useMusics } from "../../../providers/Musics";
import Button from "../../Button";

interface MusicCreateFormProps {}

const MusicCreateForm: FunctionComponent<MusicCreateFormProps> = () => {
  const { createMusic } = useMusics();

  const musicCreateSchema = yup.object().shape({
    name: yup.string().required(),
    level: yup.number().required(),
    mode: yup.string().required(),
  });

  const {
    register: registerCreateMusic,
    handleSubmit: handleSubmitCreateMusic,
    formState: { errors: createMusicErrors },
  } = useForm({
    resolver: yupResolver(musicCreateSchema),
  });

  const modeOptions = [
    { label: "Single", value: "single" },
    { label: "Double", value: "double" },
  ];

  const onCreateMusicFormSubmit = (formData: IMusicCreate) => {
    createMusic(formData);
  };

  return (
    <GlobalContainer>
      <ContentWrapper>
        <FormWrapper
          onSubmit={handleSubmitCreateMusic(onCreateMusicFormSubmit)}
        >
          <Input
            label="Nome"
            icon={TbFileMusic}
            name="name"
            register={registerCreateMusic}
            error={createMusicErrors.name?.message}
          />

          <Input
            label="Nível"
            icon={MdOutlineNumbers}
            name="level"
            register={registerCreateMusic}
            error={createMusicErrors.level?.message}
          />

          <Select
            label="Modo"
            placeholder="Selecionar"
            options={modeOptions}
            name="mode"
            register={registerCreateMusic}
            error={createMusicErrors.mode?.message}
          />

          <Button vanilla={false} type="submit">
            Criar
          </Button>
        </FormWrapper>
      </ContentWrapper>
    </GlobalContainer>
  );
};

export default MusicCreateForm;
