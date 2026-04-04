import { useState, useEffect, useMemo } from 'react';
import { getRecipes } from '../api/recipeApi';
import type { RecipeListItem, PageResponse } from '../types/recipe';
import RecipeCard from '../components/recipe/RecipeCard';
import CategoryFilter from '../components/category/CategoryFilter';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import useCategories from '../hooks/useCategories';
import Button from '../components/common/Button';

type SortKey = 'registeredAt' | 'recipeCount';

const RecipeListPage = () => {
  const [pageData, setPageData] = useState<PageResponse<RecipeListItem> | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('registeredAt');
  const [sortAsc, setSortAsc] = useState(false);

  const { categories } = useCategories();

  useEffect(() => {
    setLoading(true);
    getRecipes(currentPage, 10)
      .then(setPageData)
      .catch(() => setError('レシピの取得に失敗しました'))
      .finally(() => setLoading(false));
  }, [currentPage]);

  const allRecipes = pageData?.content ?? [];

  // ユーザー一覧（ソート用）
  const userNames = useMemo(
    () => [...new Set(allRecipes.map((r) => r.userName))].sort(),
    [allRecipes]
  );

  // フィルター + ソート（クライアントサイド）
  const filtered = useMemo(() => {
    let list = allRecipes;
    if (selectedCategories.length > 0) {
      list = list.filter((r) =>
        r.categories.some((c) => selectedCategories.includes(c.categoryId))
      );
    }
    if (selectedUser) {
      list = list.filter((r) => r.userName === selectedUser);
    }
    return [...list].sort((a, b) => {
      const valA = sortKey === 'registeredAt' ? new Date(a.registeredAt).getTime() : a.recipeCount;
      const valB = sortKey === 'registeredAt' ? new Date(b.registeredAt).getTime() : b.recipeCount;
      return sortAsc ? valA - valB : valB - valA;
    });
  }, [allRecipes, selectedCategories, selectedUser, sortKey, sortAsc]);

  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      {/* フィルター・ソートエリア */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-5 flex flex-col gap-3">
        {/* カテゴリフィルター */}
        <CategoryFilter
          categories={categories}
          selected={selectedCategories}
          onChange={setSelectedCategories}
        />

        {/* ソート・ユーザーフィルター */}
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-gray-500">並び替え:</span>
          <button
            onClick={() => {
              if (sortKey === 'registeredAt') setSortAsc(!sortAsc);
              else { setSortKey('registeredAt'); setSortAsc(false); }
            }}
            className={`px-3 py-1 rounded-full border transition-colors cursor-pointer
              ${sortKey === 'registeredAt' ? 'border-orange-400 text-orange-500 bg-orange-50' : 'border-gray-200 text-gray-500'}`}
          >
            登録日 {sortKey === 'registeredAt' ? (sortAsc ? '↑' : '↓') : ''}
          </button>
          <button
            onClick={() => {
              if (sortKey === 'recipeCount') setSortAsc(!sortAsc);
              else { setSortKey('recipeCount'); setSortAsc(false); }
            }}
            className={`px-3 py-1 rounded-full border transition-colors cursor-pointer
              ${sortKey === 'recipeCount' ? 'border-orange-400 text-orange-500 bg-orange-50' : 'border-gray-200 text-gray-500'}`}
          >
            作った回数 {sortKey === 'recipeCount' ? (sortAsc ? '↑' : '↓') : ''}
          </button>

          {userNames.length > 1 && (
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="ml-auto px-3 py-1 rounded-full border border-gray-200 text-gray-500 text-sm outline-none focus:border-orange-400"
            >
              <option value="">全ユーザー</option>
              {userNames.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* レシピ一覧 */}
      {loading ? (
        <LoadingSpinner />
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">🍽️</p>
          <p>レシピが見つかりません</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((recipe) => (
            <RecipeCard key={recipe.recipeId} recipe={recipe} />
          ))}
        </div>
      )}

      {/* ページネーション */}
      {pageData && pageData.totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <Button
            variant="secondary"
            size="sm"
            disabled={currentPage === 0}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            ← 前へ
          </Button>
          <span className="text-sm text-gray-500">
            {currentPage + 1} / {pageData.totalPages}
          </span>
          <Button
            variant="secondary"
            size="sm"
            disabled={currentPage >= pageData.totalPages - 1}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            次へ →
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecipeListPage;
