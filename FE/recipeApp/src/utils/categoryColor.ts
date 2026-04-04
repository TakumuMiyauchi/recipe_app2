const COLOR_PALETTE = [
  { bg: 'bg-orange-400', text: 'text-white' },
  { bg: 'bg-green-500', text: 'text-white' },
  { bg: 'bg-blue-500', text: 'text-white' },
  { bg: 'bg-purple-500', text: 'text-white' },
  { bg: 'bg-red-400', text: 'text-white' },
  { bg: 'bg-yellow-400', text: 'text-gray-800' },
  { bg: 'bg-pink-400', text: 'text-white' },
  { bg: 'bg-teal-500', text: 'text-white' },
  { bg: 'bg-indigo-500', text: 'text-white' },
  { bg: 'bg-lime-500', text: 'text-white' },
];

// categoryId に基づいて一貫したカラーを返す（先頭カテゴリを使用）
export const getCategoryColor = (categoryId: number) => {
  const index = categoryId % COLOR_PALETTE.length;
  return COLOR_PALETTE[index];
};
