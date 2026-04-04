import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getRecipeDetail, updateRecipe } from '../api/recipeApi';
import RecipeForm, { type RecipeFormValues } from '../components/recipe/RecipeForm';
import useCategories from '../hooks/useCategories';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import type { RecipeDetail } from '../types/recipe';

const RecipeEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { categories, loading: catLoading, error: catError } = useCategories();
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    getRecipeDetail(Number(id))
      .then(setRecipe)
      .catch(() => setError('レシピの取得に失敗しました'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (values: RecipeFormValues) => {
    await updateRecipe(Number(id), {
      ...values,
      recipeCount: recipe?.recipeCount ?? 0,
      categoryIds: values.categoryIds,
    });
    navigate(`/recipes/${id}`);
  };

  if (loading || catLoading) return <LoadingSpinner />;
  if (error || catError) return <ErrorMessage message={error || catError || ''} />;
  if (!recipe) return null;

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-800 mb-5">レシピを編集する</h1>
      <RecipeForm
        initialValues={{
          recipeName: recipe.recipeName,
          recipeUrl: recipe.recipeUrl ?? '',
          imagePath: recipe.imagePath ?? '',
          note: recipe.note ?? '',
          categoryIds: recipe.categories.map((c) => c.categoryId),
        }}
        categories={categories}
        onSubmit={handleSubmit}
        submitLabel="更新する"
      />
    </div>
  );
};

export default RecipeEditPage;
