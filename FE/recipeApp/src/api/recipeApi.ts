import axiosInstance from './axiosInstance';
import type {
  PageResponse,
  RecipeDetail,
  RecipeEditorRequest,
  RecipeListItem,
  RecipeRegisterRequest,
} from '../types/recipe';
import type { Category } from '../types/category';

export const getRecipes = async (page = 0, size = 10): Promise<PageResponse<RecipeListItem>> => {
  const res = await axiosInstance.get<PageResponse<RecipeListItem>>('/recipes', {
    params: { page, size },
  });
  return res.data;
};

export const getRecipeDetail = async (id: number): Promise<RecipeDetail> => {
  const res = await axiosInstance.get<RecipeDetail>(`/recipes/${id}`);
  return res.data;
};

export const createRecipe = async (data: RecipeRegisterRequest): Promise<void> => {
  await axiosInstance.post('/recipes', data);
};

export const updateRecipe = async (id: number, data: RecipeEditorRequest): Promise<void> => {
  await axiosInstance.put(`/recipes/${id}`, data);
};

export const deleteRecipe = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/recipes/${id}`);
};

export const getCategories = async (): Promise<Category[]> => {
  const res = await axiosInstance.get<Category[]>('/categories');
  return res.data;
};
