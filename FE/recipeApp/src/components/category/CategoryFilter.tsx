import { getCategoryColor } from '../../utils/categoryColor';
import type { Category } from '../../types/category';

interface CategoryFilterProps {
  categories: Category[];
  selected: number[];
  onChange: (ids: number[]) => void;
}

const CategoryFilter = ({ categories, selected, onChange }: CategoryFilterProps) => {
  const toggle = (id: number) => {
    onChange(
      selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id]
    );
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange([])}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors cursor-pointer
          ${selected.length === 0
            ? 'bg-gray-800 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
      >
        すべて
      </button>
      {categories.map((cat) => {
        const { bg, text } = getCategoryColor(cat);
        const isActive = selected.includes(cat.categoryId);
        return (
          <button
            key={cat.categoryId}
            onClick={() => toggle(cat.categoryId)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all cursor-pointer
              ${isActive ? `${bg} ${text}` : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {cat.categoryName}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
