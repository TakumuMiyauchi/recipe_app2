import { Link } from 'react-router-dom';
import type { RecipeListItem } from '../../types/recipe';
import RecipeThumbnail from './RecipeThumbnail';
import CategoryBadge from '../category/CategoryBadge';

interface RecipeCardProps {
  recipe: RecipeListItem;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const registeredAt = new Date(recipe.registeredAt).toLocaleDateString('ja-JP');

  return (
    <Link
      to={`/recipes/${recipe.recipeId}`}
      className="block bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
    >
      <RecipeThumbnail imagePath={recipe.imagePath} categories={recipe.categories} size="md" />
      <div className="p-3">
        <p className="font-semibold text-gray-800 text-sm line-clamp-2 mb-2">{recipe.recipeName}</p>
        <div className="flex flex-wrap gap-1 mb-2">
          {recipe.categories.map((cat) => (
            <CategoryBadge key={cat.categoryId} category={cat} />
          ))}
        </div>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>{recipe.userName}</span>
          <span>🍳 {recipe.recipeCount}回</span>
        </div>
        <p className="text-xs text-gray-400 mt-1">{registeredAt}</p>
      </div>
    </Link>
  );
};

export default RecipeCard;
