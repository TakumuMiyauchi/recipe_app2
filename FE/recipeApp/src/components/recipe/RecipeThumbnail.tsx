import type { Category } from '../../types/category';

interface RecipeThumbnailProps {
  imagePath: string | null;
  categories: Category[];
  size?: 'sm' | 'md' | 'lg';
}

const sizeClass = {
  sm: 'h-32',
  md: 'h-44',
  lg: 'h-56',
};

const RecipeThumbnail = ({ imagePath, categories, size = 'md' }: RecipeThumbnailProps) => {
  // レシピ画像があればそちらを表示
  const src = imagePath || categories[0]?.thumbnailPath || null;

  if (src) {
    return (
      <div className={`w-full ${sizeClass[size]} overflow-hidden rounded-t-xl`}>
        <img src={src} alt="レシピ画像" className="w-full h-full object-cover" />
      </div>
    );
  }

  // どちらもない場合はグレーの無地フォールバック
  return (
    <div className={`w-full ${sizeClass[size]} rounded-t-xl bg-gray-200 flex items-center justify-center`}>
      <span className="text-gray-400 text-sm">No Image</span>
    </div>
  );
};

export default RecipeThumbnail;
