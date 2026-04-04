import { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { formatShareText } from '../../utils/shareFormatter';
import type { RecipeDetail } from '../../types/recipe';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipe: RecipeDetail;
}

const ShareModal = ({ isOpen, onClose, recipe }: ShareModalProps) => {
  const [copied, setCopied] = useState<'url' | 'text' | null>(null);

  const copy = async (type: 'url' | 'text') => {
    const value = type === 'url' ? recipe.recipeUrl ?? '' : formatShareText(recipe);
    await navigator.clipboard.writeText(value);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="レシピを共有">
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-sm text-gray-600 mb-2">レシピのURLをコピー</p>
          <div className="flex gap-2 items-center bg-gray-50 rounded-lg px-3 py-2">
            <span className="flex-1 text-xs text-gray-500 break-all">
              {recipe.recipeUrl || 'URLが登録されていません'}
            </span>
            <Button size="sm" onClick={() => copy('url')} disabled={!recipe.recipeUrl}>
              {copied === 'url' ? 'コピー済み ✓' : 'コピー'}
            </Button>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-600 mb-2">テキストフォーマットでコピー</p>
          <pre className="bg-gray-50 rounded-lg px-3 py-2 text-xs text-gray-600 whitespace-pre-wrap">
            {formatShareText(recipe)}
          </pre>
          <Button size="sm" className="mt-2 w-full" onClick={() => copy('text')}>
            {copied === 'text' ? 'コピー済み ✓' : 'テキストをコピー'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ShareModal;
