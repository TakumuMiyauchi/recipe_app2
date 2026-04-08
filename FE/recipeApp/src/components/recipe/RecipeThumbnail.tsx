interface RecipeThumbnailProps {
  imagePath: string | null;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClass = {
  sm: 'h-32',
  md: 'h-44',
  lg: 'h-56',
};

// /uploads/ から始まるパスはバックエンドから配信するためAPIベースURLを付与する
const resolveImageUrl = (path: string): string => {
  if (path.startsWith('/uploads/')) {
    return `${import.meta.env.VITE_API_BASE_URL}${path}`;
  }
  return path;
};

const RecipeThumbnail = ({ imagePath, size = 'md' }: RecipeThumbnailProps) => {
  const src = imagePath ? resolveImageUrl(imagePath) : null;

  if (src) {
    return (
      <div className={`w-full ${sizeClass[size]} overflow-hidden rounded-t-xl`}>
        <img src={src} alt="レシピ画像" className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div className={`w-full ${sizeClass[size]} rounded-t-xl bg-gray-200 flex items-center justify-center`}>
      <span className="text-gray-400 text-sm">No Image</span>
    </div>
  );
};

export default RecipeThumbnail;
