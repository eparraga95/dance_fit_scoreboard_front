import { FunctionComponent, useContext } from "react";
import { GlobalContainer } from "../../styles/global";
import {
  ProfilePicture,
  ProfilePictureForm,
  ProfileWrapper,
  UploadBtnWrapper,
} from "./styles";
import { usePlayer } from "../../providers/Players";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import UpdateButton from "../../components/Button_Update";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaFileAlt } from "react-icons/fa";
import { IProfilePicFormData } from "../../types/form-types";
import { profilePictureResolver } from "../../resolvers";
import { BallTriangle } from "react-loader-spinner";
import { ThemeContext } from "styled-components";
import useModal from "../../providers/Modal";

interface DashboardProfileProps {}

const DashboardProfile: FunctionComponent<DashboardProfileProps> = () => {
  const { playerData, uploadProfilePicture, isUploading } = usePlayer();

  const {
    isOpen: isOpenPicUpdate,
    openModal: openPicUpdateModal,
    closeModal: closePicUpdateModal,
  } = useModal();

  const theme = useContext(ThemeContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProfilePicFormData>({
    resolver: profilePictureResolver,
  });

  const onProfilePictureSubmit: SubmitHandler<IProfilePicFormData> = async (
    data: IProfilePicFormData,
  ) => {
    const formData = new FormData();
    formData.append("file", data.file[0]);
    uploadProfilePicture(formData);
  };

  return (
    <GlobalContainer>
      <ProfileWrapper>
        <ProfilePicture
          src={
            playerData?.profilePicture
              ? playerData?.profilePicture
              : `/img/default_player.png`
          }
        />

        <UpdateButton onClick={openPicUpdateModal}>Alterar Avatar</UpdateButton>
        <Modal isOpen={isOpenPicUpdate} onClose={closePicUpdateModal}>
          <GlobalContainer>
            <p>
              Os arquivos de imagem devem ter até 8Mb de tamanho e ser .jpeg ou
              .png
            </p>
            <ProfilePictureForm
              id="profile_pic_form"
              onSubmit={handleSubmit(onProfilePictureSubmit)}
            >
              <Input
                name="file"
                icon={FaFileAlt}
                type="file"
                register={register}
                error={errors.file?.message}
              />
            </ProfilePictureForm>

            <UploadBtnWrapper>
              <UpdateButton
                vanilla={false}
                type="submit"
                form="profile_pic_form"
              >
                Enviar
              </UpdateButton>
              <BallTriangle
                height={36}
                width={36}
                radius={5}
                color={theme?.colors.primary}
                ariaLabel="ball-triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={isUploading}
              />
            </UploadBtnWrapper>
          </GlobalContainer>
        </Modal>
      </ProfileWrapper>
    </GlobalContainer>
  );
};

export default DashboardProfile;
