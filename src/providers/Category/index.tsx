import { createContext, useState, useContext } from "react";
import api from "../../services/api";
import * as React from "react";
import { toast } from "react-toastify";
import { usePlayer } from "../Players";
import { ICategory } from "../../types/entity-types";
import { ICategoryCreate, ICategoryUpdate } from "../../types/form-types";

export interface ICategoryContext {
  categoryData: ICategory | undefined;
  getCategoryData: (category_id: number) => void;
  createCategory: (formData: ICategoryCreate, event_id: number) => void;
  updateCategory: (formData: ICategoryUpdate, category: ICategory) => void;
  deleteCategory: (category_id: number) => void;
  joinCategory: (category_id: number) => void;
  leaveCategory: (category_id: number) => void;
  adminAddPlayer: (category_id: number, player_id: number) => void;
  adminRemovePlayer: (category_id: number, player_id: number) => void;
}

const CategoryContext = createContext<ICategoryContext>({} as ICategoryContext);

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { accToken, hasValidSession, hasAdminRights } = usePlayer();

  const [categoryData, setCategoryData] = useState<ICategory>();

  const getCategoryData = async (category_id: number) => {
    hasValidSession();

    try {
      const res = await api.get(`/categories/${category_id}`, {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      });
      setCategoryData(res.data);
    } catch (err: any) {
      console.log(err);
    }
  };

  const createCategory = async (
    formData: ICategoryCreate,
    event_id: number
  ) => {
    hasAdminRights();

    try {
      const res = await api.post(
        "/categories",
        {
          ...formData,
          event_id: event_id,
        },
        {
          headers: {
            Authorization: `Bearer ${accToken}`,
          },
        }
      );
      console.log(res);

      if (res.status === 201) {
        toast.success("Categoria criada com sucesso");
      }
    } catch (err: any) {
      console.log(err);
      toast.error("Algo deu errado");
    }
  };

  const joinCategory = async (category_id: number) => {
    hasValidSession();

    try {
      const res = await api.patch(`/categories/${category_id}/join`, null, {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      });
      console.log(res.data.response);
      if (res.status === 200) {
        toast.success("Adicionado na categoria com sucesso!");
      }
    } catch (err: any) {
      console.log(err);
      if (
        err.response.data.message === "Player already assigned to this Category"
      ) {
        toast.error("Jogador já cadastrado na categoria");
      } else {
        toast.error("Algo deu errado");
      }
    }
  };

  const leaveCategory = async (category_id: number) => {
    hasValidSession();

    try {
      const res = await api.patch(`/categories/${category_id}/leave`, null, {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      });

      if (res.status === 200) {
        toast.success("Você saiu da categoria com sucesso");
      }
    } catch (err: any) {
      if (
        err.response.data.message === "Player is not assigned to this Category"
      ) {
        toast.error("Você não está cadastrado nesta categoria");
      } else {
        toast.error("Algo deu errado");
      }
    }
  };

  const adminAddPlayer = async (category_id: number, player_id: number) => {
    try {
      hasAdminRights();

      const res = await api.patch(
        `/categories/${category_id}/admin/add_player`,
        {
          player_id: player_id,
        },
        {
          headers: {
            Authorization: `Bearer ${accToken}`,
          },
        }
      );

      if (res.status === 200) {
        toast.success("Jogador adicionado a categoria com sucesso");
      }
    } catch (err: any) {
      if (
        err.response.data.message === "Player already assigned to this category"
      ) {
        toast.error("Jogador já faz parte desta categoria");
      } else {
        toast.error("Algo deu errado");
      }
    }
  };

  const adminRemovePlayer = async (category_id: number, player_id: number) => {
    try {
      hasAdminRights();

      const res = await api.patch(
        `/categories/${category_id}/admin/remove_player`,
        {
          player_id: player_id,
        },
        {
          headers: {
            Authorization: `Bearer ${accToken}`,
          },
        }
      );

      if (res.status === 200) {
        toast.success("Jogador removido da categoria com sucesso");
      }
    } catch (err: any) {
      if (
        err.response.data.message === "Player not assigned to this category"
      ) {
        toast.error("Jogador não faz parte desta categoria");
      }
    }
  };

  const updateCategory = async (
    formData: ICategoryUpdate,
    category: ICategory
  ) => {
    hasAdminRights();

    const { category_id } = category;

    try {
      const res = await api.patch(`/categories/${category_id}`, formData, {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      });
      if (res.status === 200) {
        toast.success("Informações da categoria atualizadas");
      } else {
        toast.error("Algo deu errado");
      }
      console.log(res);
    } catch (err: any) {
      console.log(err);
      if (err.response.data.message === "Internal server error") {
        toast.error("Algo deu errado");
      }
    }
  };

  const deleteCategory = async (category_id: number) => {
    hasAdminRights();

    try {
      const res = await api.delete(`/categories/${category_id}`, {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      });
      console.log(res);
      if (res.status === 200) {
        toast.success("Categoria deletada com sucesso");
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        categoryData,
        getCategoryData,
        createCategory,
        updateCategory,
        deleteCategory,
        joinCategory,
        leaveCategory,
        adminAddPlayer,
        adminRemovePlayer,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);
