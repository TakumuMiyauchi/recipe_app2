import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getRecipeDetail, updateRecipe, deleteRecipe } from '../api/recipeApi';
import type { RecipeDetail } from '../types/recipe';
import RecipeThumbnail from '../components/recipe/RecipeThumbnail';
import CategoryBadge from '../components/category/CategoryBadge';
import ShareModal from '../components/recipe/ShareModal';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { useAuth } from '../context/AuthContext';

const RecipeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [shareOpen, setShareOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [counting, setCounting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!id) return;
    getRecipeDetail(Number(id))
      .then(setRecipe)
      .catch(() => setError('レシピの取得に失敗しました'))
      .finally(() => setLoading(false));
  }, [id]);

  const isOwner = !!(user && recipe && user.userId === recipe.userId);

  const handleCount = async (delta: 1 | -1) => {
    if (!recipe) return;
    const next = recipe.recipeCount + delta;
    if (next < 0) return;
    setCounting(true);
    try {
      await updateRecipe(recipe.recipeId, {
        recipeName: recipe.recipeName,
        recipeUrl: recipe.recipeUrl ?? '',
        imagePath: recipe.imagePath ?? '',
        recipeCount: next,
        note: recipe.note ?? '',
        categoryIds: recipe.categories.map((c) => c.categoryId),
      });
      setRecipe({ ...recipe, recipeCount: next });
    } finally {
      setCounting(false);
    }
  };

  const handleDelete = async () => {
    if (!recipe) return;
    setDeleting(true);
    try {
      await deleteRecipe(recipe.recipeId);
      navigate('/');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!recipe) return null;

  const registeredAt = new Date(recipe.registeredAt).toLocaleDateString('ja-JP');

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <RecipeThumbnail imagePath={recipe.imagePath} categories={recipe.categories} size="lg" />

        <div className="p-5">
          {/* カテゴリバッジ */}
          <div className="flex flex-wrap gap-1 mb-3">
            {recipe.categories.map((cat) => (
              <CategoryBadge key={cat.categoryId} category={cat} />
            ))}
          </div>

          {/* レシピ名 */}
          <h1 className="text-xl font-bold text-gray-800 mb-4">{recipe.recipeName}</h1>

          {/* 情報行 */}
          <div className="flex flex-col gap-2 text-sm text-gray-500 mb-4">
            <div className="flex justify-between">
              <span>登録日</span>
              <span className="text-gray-700">{registeredAt}</span>
            </div>
            {recipe.recipeUrl && (
              <div className="flex justify-between items-center gap-2">
                <span>レシピURL</span>
                <a
                  href={recipe.recipeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-400 hover:underline text-right break-all max-w-xs"
                >
                  開く →
                </a>
              </div>
            )}
          </div>

          {/* 作った回数 */}
          <div className="flex items-center justify-between bg-orange-50 rounded-xl px-4 py-3 mb-4">
            <div>
              <p className="text-xs text-orange-400 font-medium">作った回数</p>
              <p className="text-2xl font-bold text-orange-500">
                {recipe.recipeCount}<span className="text-sm font-normal ml-1">回</span>
              </p>
            </div>
            {isOwner && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCount(-1)}
                  disabled={counting || recipe.recipeCount === 0}
                  className="w-8 h-8 rounded-full bg-orange-100 text-orange-500 hover:bg-orange-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center text-lg font-bold"
                  title="カウントダウン"
                >
                  −
                </button>
                <Button onClick={() => handleCount(1)} disabled={counting} size="sm">
                  {counting ? '更新中...' : '🍳 作った！'}
                </Button>
              </div>
            )}
          </div>

          {/* 備考 */}
          {recipe.note && (
            <div className="bg-gray-50 rounded-xl px-4 py-3 mb-4">
              <p className="text-xs text-gray-400 font-medium mb-1">備考</p>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{recipe.note}</p>
            </div>
          )}

          {/* アクションボタン */}
          <div className="flex gap-2 pt-2 border-t border-gray-100">
            <Button variant="ghost" size="sm" onClick={() => setShareOpen(true)}>
              🔗 共有
            </Button>
            {isOwner ? (
              <Link to={`/recipes/${recipe.recipeId}/edit`} className="flex-1">
                <Button variant="secondary" size="sm" className="w-full">
                  ✏️ 編集
                </Button>
              </Link>
            ) : (
              <Button variant="secondary" size="sm" className="flex-1" disabled title="他のユーザーのレシピは編集できません">
                ✏️ 編集
              </Button>
            )}
            <Button
              variant="danger"
              size="sm"
              onClick={() => setDeleteOpen(true)}
              disabled={!isOwner}
              title={!isOwner ? '他のユーザーのレシピは削除できません' : undefined}
            >
              削除
            </Button>
          </div>

          {!isOwner && (
            <p className="text-xs text-gray-400 text-center mt-2">
              編集・削除は作成者のみ可能です
            </p>
          )}
        </div>
      </div>

      {/* 共有モーダル */}
      {shareOpen && (
        <ShareModal isOpen={shareOpen} onClose={() => setShareOpen(false)} recipe={recipe} />
      )}

      {/* 削除確認モーダル */}
      <Modal isOpen={deleteOpen} onClose={() => setDeleteOpen(false)} title="レシピを削除">
        <p className="text-sm text-gray-600 mb-5">
          「{recipe.recipeName}」を削除しますか？この操作は元に戻せません。
        </p>
        <div className="flex gap-3">
          <Button variant="secondary" className="flex-1" onClick={() => setDeleteOpen(false)}>
            キャンセル
          </Button>
          <Button variant="danger" className="flex-1" onClick={handleDelete} disabled={deleting}>
            {deleting ? '削除中...' : '削除する'}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default RecipeDetailPage;
