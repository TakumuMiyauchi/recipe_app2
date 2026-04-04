import { useState, useEffect } from 'react';
import { getCategories } from '../api/recipeApi';
import type { Category } from '../types/category';

const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => setError('カテゴリの取得に失敗しました'))
      .finally(() => setLoading(false));
  }, []);

  return { categories, loading, error };
};

export default useCategories;
