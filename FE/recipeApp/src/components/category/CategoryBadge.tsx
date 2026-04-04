import { getCategoryColor } from '../../utils/categoryColor';
import type { Category } from '../../types/category';

interface CategoryBadgeProps {
  category: Category;
}

const CategoryBadge = ({ category }: CategoryBadgeProps) => {
  const { bg, text } = getCategoryColor(category.categoryId);
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${bg} ${text}`}>
      {category.categoryName}
    </span>
  );
};

export default CategoryBadge;
