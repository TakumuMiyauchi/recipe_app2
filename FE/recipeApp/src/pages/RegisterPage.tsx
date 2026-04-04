import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register as registerApi } from '../api/authApi';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import ErrorMessage from '../components/common/ErrorMessage';

const RegisterPage = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await registerApi(userName, email, password);
      navigate('/login');
    } catch {
      setError('登録に失敗しました。メールアドレスが既に使用されている可能性があります。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-1">🍳 RecipeApp</h1>
        <p className="text-sm text-center text-gray-400 mb-6">新規ユーザー登録</p>

        {error && <div className="mb-4"><ErrorMessage message={error} /></div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            id="userName"
            label="ユーザー名"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="ユーザー名"
            required
          />
          <Input
            id="email"
            label="メールアドレス"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            required
          />
          <Input
            id="password"
            label="パスワード"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="パスワード"
            required
          />
          <Button type="submit" size="lg" disabled={loading} className="w-full mt-2">
            {loading ? '登録中...' : '登録'}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          アカウントをお持ちの方は{' '}
          <Link to="/login" className="text-orange-400 hover:underline font-medium">
            ログイン
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
