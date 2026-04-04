import { useState } from 'react';
import type { Category } from '../../types/category';
import Input from '../common/Input';
import Button from '../common/Button';
import CategoryBadge from '../category/CategoryBadge';
import { getCategoryColor } from '../../utils/categoryColor';

export interface RecipeFormValues {
  recipeName: string;
  recipeUrl: string;
  imagePath: string;
  note: string;
  categoryIds: number[];
}

interface RecipeFormProps {
  initialValues?: Partial<RecipeFormValues>;
  categories: Category[];
  onSubmit: (values: RecipeFormValues) => Promise<void>;
  submitLabel?: string;
}

const defaultValues: RecipeFormValues = {
  recipeName: '',
  recipeUrl: '',
  imagePath: '',
  note: '',
  categoryIds: [],
};

type Step = 'form' | 'confirm';

const RecipeForm = ({
  initialValues,
  categories,
  onSubmit,
  submitLabel = '登録する',
}: RecipeFormProps) => {
  const [values, setValues] = useState<RecipeFormValues>({
    ...defaultValues,
    ...initialValues,
  });
  const [step, setStep] = useState<Step>('form');
  const [errors, setErrors] = useState<Partial<RecipeFormValues>>({});
  const [submitting, setSubmitting] = useState(false);

  const set = (key: keyof RecipeFormValues, value: string | number[]) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const toggleCategory = (id: number) => {
    set(
      'categoryIds',
      values.categoryIds.includes(id)
        ? values.categoryIds.filter((c) => c !== id)
        : [...values.categoryIds, id]
    );
  };

  const validate = (): boolean => {
    const newErrors: Partial<RecipeFormValues> = {};
    if (!values.recipeName.trim()) newErrors.recipeName = 'レシピ名は必須です';
    if (!values.recipeUrl.trim()) newErrors.recipeUrl = 'レシピURLは必須です';
    if (values.categoryIds.length === 0)
      newErrors.categoryIds = ['カテゴリを1つ以上選択してください'] as unknown as number[];
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) setStep('confirm');
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setSubmitting(false);
    }
  };

  const selectedCategories = categories.filter((c) => values.categoryIds.includes(c.categoryId));

  if (step === 'confirm') {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-lg mx-auto">
        <h2 className="text-lg font-semibold text-gray-800 mb-5">入力内容の確認</h2>
        <dl className="flex flex-col gap-4 text-sm">
          <div>
            <dt className="text-gray-500 mb-1">ジャンル</dt>
            <dd className="flex flex-wrap gap-1">
              {selectedCategories.map((c) => <CategoryBadge key={c.categoryId} category={c} />)}
            </dd>
          </div>
          <div>
            <dt className="text-gray-500 mb-1">レシピ名 <span className="text-red-400">*</span></dt>
            <dd className="text-gray-800 font-medium">{values.recipeName}</dd>
          </div>
          <div>
            <dt className="text-gray-500 mb-1">レシピURL <span className="text-red-400">*</span></dt>
            <dd className="text-orange-400 break-all">{values.recipeUrl}</dd>
          </div>
          {values.imagePath && (
            <div>
              <dt className="text-gray-500 mb-1">画像URL</dt>
              <dd className="text-gray-800 break-all">{values.imagePath}</dd>
            </div>
          )}
          {values.note && (
            <div>
              <dt className="text-gray-500 mb-1">備考</dt>
              <dd className="text-gray-800 whitespace-pre-wrap">{values.note}</dd>
            </div>
          )}
        </dl>

        <div className="flex gap-3 mt-6">
          <Button variant="secondary" className="flex-1" onClick={() => setStep('form')}>
            修正する
          </Button>
          <Button className="flex-1" onClick={handleSubmit} disabled={submitting}>
            {submitting ? '送信中...' : submitLabel}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-lg mx-auto">
      <div className="flex flex-col gap-5">
        {/* カテゴリ選択 */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            ジャンル <span className="text-red-400">*</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isSelected = values.categoryIds.includes(cat.categoryId);
              const { bg, text } = getCategoryColor(cat.categoryId);
              return (
                <button
                  key={cat.categoryId}
                  type="button"
                  onClick={() => toggleCategory(cat.categoryId)}
                  className={`px-3 py-1 rounded-full text-sm font-medium border transition-all cursor-pointer
                    ${isSelected ? `${bg} ${text} border-transparent` : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                >
                  {cat.categoryName}
                </button>
              );
            })}
          </div>
          {errors.categoryIds && (
            <p className="text-xs text-red-500 mt-1">{String(errors.categoryIds)}</p>
          )}
        </div>

        <Input
          id="recipeName"
          label="レシピ名"
          value={values.recipeName}
          onChange={(e) => set('recipeName', e.target.value)}
          placeholder="例: 鶏の唐揚げ"
          error={errors.recipeName}
          required
        />

        <Input
          id="recipeUrl"
          label="レシピURL"
          type="url"
          value={values.recipeUrl}
          onChange={(e) => set('recipeUrl', e.target.value)}
          placeholder="https://..."
          error={errors.recipeUrl}
          required
        />

        <Input
          id="imagePath"
          label="料理写真URL（任意）"
          type="url"
          value={values.imagePath}
          onChange={(e) => set('imagePath', e.target.value)}
          placeholder="https://..."
        />

        <div className="flex flex-col gap-1">
          <label htmlFor="note" className="text-sm font-medium text-gray-700">
            備考（任意）
          </label>
          <textarea
            id="note"
            value={values.note}
            onChange={(e) => set('note', e.target.value)}
            rows={3}
            placeholder="アレンジや気づいたことなど..."
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition-colors focus:border-orange-400 focus:ring-2 focus:ring-orange-100 resize-none"
          />
        </div>

        <Button size="lg" className="w-full" onClick={handleNext}>
          確認画面へ
        </Button>
      </div>
    </div>
  );
};

export default RecipeForm;
