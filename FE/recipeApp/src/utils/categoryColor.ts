const CATEGORY_COLOR_MAP: Record<string, { bg: string; text: string }> = {
  '野菜':       { bg: 'bg-green-500',  text: 'text-white' },
  'お肉':       { bg: 'bg-red-500',    text: 'text-white' },
  '魚介':       { bg: 'bg-blue-500',   text: 'text-white' },
  '玉子':       { bg: 'bg-yellow-400', text: 'text-gray-800' },
  'サラダ':     { bg: 'bg-lime-400',   text: 'text-gray-800' },
  'スープ':     { bg: 'bg-teal-500',   text: 'text-white' },
  'ごはんもの': { bg: 'bg-gray-500',   text: 'text-white' },
  '麺類':       { bg: 'bg-amber-800',  text: 'text-white' },
  'お菓子':     { bg: 'bg-purple-500', text: 'text-white' },
  '中華':       { bg: 'bg-red-700',    text: 'text-white' },
};

const FALLBACK_PALETTE = [
  { bg: 'bg-orange-400', text: 'text-white' },
  { bg: 'bg-green-500',  text: 'text-white' },
  { bg: 'bg-blue-500',   text: 'text-white' },
  { bg: 'bg-purple-500', text: 'text-white' },
  { bg: 'bg-red-400',    text: 'text-white' },
  { bg: 'bg-yellow-400', text: 'text-gray-800' },
  { bg: 'bg-pink-400',   text: 'text-white' },
  { bg: 'bg-teal-500',   text: 'text-white' },
  { bg: 'bg-indigo-500', text: 'text-white' },
  { bg: 'bg-lime-500',   text: 'text-white' },
];

export const getCategoryColor = (category: { categoryId: number; categoryName: string }) => {
  if (CATEGORY_COLOR_MAP[category.categoryName]) {
    return CATEGORY_COLOR_MAP[category.categoryName];
  }
  return FALLBACK_PALETTE[category.categoryId % FALLBACK_PALETTE.length];
};
