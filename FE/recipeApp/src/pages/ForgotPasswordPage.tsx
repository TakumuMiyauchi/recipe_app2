import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { resetPassword } from '../api/authApi';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import ErrorMessage from '../components/common/ErrorMessage';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('新しいパスワードが一致しません');
      return;
    }

    if (newPassword.length < 8) {
      setError('パスワードは8文字以上で入力してください');
      return;
    }

    setLoading(true);
    try {
      await resetPassword(email, newPassword);
      navigate('/login');
    } catch {
      setError('パスワードの変更に失敗しました。メールアドレスをご確認ください。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-1">🍳 RecipeApp</h1>
        <p className="text-sm text-center text-gray-400 mb-6">パスワード変更</p>

        {error && <div className="mb-4"><ErrorMessage message={error} /></div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            id="newPassword"
            label="新しいパスワード"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="8文字以上"
            required
          />
          <Input
            id="confirmPassword"
            label="新しいパスワード（確認）"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="もう一度入力してください"
            required
          />
          <Button type="submit" size="lg" disabled={loading} className="w-full mt-2">
            {loading ? '変更中...' : 'パスワードを変更する'}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          <Link to="/login" className="text-orange-400 hover:underline font-medium">
            ログインに戻る
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
