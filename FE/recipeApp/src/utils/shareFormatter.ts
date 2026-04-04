import type { RecipeDetail } from '../types/recipe';

export const formatShareText = (recipe: RecipeDetail): string => {
  const categories = recipe.categories.map((c) => c.categoryName).join('・');
  const lines = [
    `【レシピ】${recipe.recipeName}`,
    `ジャンル: ${categories || 'なし'}`,
    `URL: ${recipe.recipeUrl || 'なし'}`,
  ];
  if (recipe.note) {
    lines.push(`メモ: ${recipe.note}`);
  }
  return lines.join('\n');
};
