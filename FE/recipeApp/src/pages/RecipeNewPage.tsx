import { useNavigate } from 'react-router-dom';
import { createRecipe, uploadImage } from '../api/recipeApi';
import RecipeForm, { type RecipeFormValues } from '../components/recipe/RecipeForm';
import useCategories from '../hooks/useCategories';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const RecipeNewPage = () => {
  const navigate = useNavigate();
  const { categories, loading, error } = useCategories();

  const handleSubmit = async (values: RecipeFormValues, imageFile?: File) => {
    let imagePath = values.imagePath;
    if (imageFile) {
      imagePath = await uploadImage(imageFile);
    }
    await createRecipe({
      ...values,
      imagePath,
      recipeCount: 0,
      categoryIds: values.categoryIds,
    });
    navigate('/');
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-800 mb-5">レシピを登録する</h1>
      <RecipeForm categories={categories} onSubmit={handleSubmit} submitLabel="登録する" />
    </div>
  );
};

export default RecipeNewPage;
