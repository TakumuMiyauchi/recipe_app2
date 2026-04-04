import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* ロゴ */}
        <Link to="/" className="text-lg font-bold text-orange-400 tracking-tight">
          🍳 RecipeApp
        </Link>

        {/* PC ナビ */}
        <div className="hidden sm:flex items-center gap-3">
          <span className="text-sm text-gray-500">{user?.email}</span>
          <Link to="/recipes/new">
            <Button size="sm">+ レシピ登録</Button>
          </Link>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            ログアウト
          </Button>
        </div>

        {/* モバイル ハンバーガー */}
        <button
          className="sm:hidden p-2 text-gray-500 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="block w-5 h-0.5 bg-current mb-1" />
          <span className="block w-5 h-0.5 bg-current mb-1" />
          <span className="block w-5 h-0.5 bg-current" />
        </button>
      </div>

      {/* モバイルメニュー */}
      {menuOpen && (
        <div className="sm:hidden border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-2">
          <span className="text-xs text-gray-500">{user?.email}</span>
          <Link to="/recipes/new" onClick={() => setMenuOpen(false)}>
            <Button size="sm" className="w-full">+ レシピ登録</Button>
          </Link>
          <Button variant="ghost" size="sm" className="w-full" onClick={handleLogout}>
            ログアウト
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
