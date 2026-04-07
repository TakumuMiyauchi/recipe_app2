import type { Category } from './category';

export interface RecipeListItem {
  recipeId: number;
  recipeName: string;
  recipeUrl: string;
  imagePath: string | null;
  registeredAt: string;
  recipeCount: number;
  userName: string;
  categories: Category[];
}

export interface RecipeDetail {
  recipeId: number;
  userId: number;
  recipeName: string;
  recipeUrl: string;
  imagePath: string | null;
  registeredAt: string;
  recipeCount: number;
  note: string | null;
  categories: Category[];
}

export interface RecipeRegisterRequest {
  recipeName: string;
  recipeUrl: string;
  imagePath: string;
  recipeCount: number;
  note: string;
  categoryIds: number[];
}

export interface RecipeEditorRequest {
  recipeName: string;
  recipeUrl: string;
  imagePath: string;
  recipeCount: number;
  note: string;
  categoryIds: number[];
}

export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}
