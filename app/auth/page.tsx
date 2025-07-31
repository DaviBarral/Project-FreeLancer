'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Briefcase, Eye, EyeOff } from 'lucide-react';

export default function Auth() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<'freelancer' | 'contratante'>('freelancer');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const type = searchParams.get('type') as 'freelancer' | 'contratante';
    if (type) {
      setUserType(type);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }

    // Simular autenticação
    const userData = {
      id: '1',
      name: formData.name || 'Usuário',
      email: formData.email,
      type: userType
    };

    localStorage.setItem('user', JSON.stringify(userData));
    
    if (userType === 'freelancer') {
      router.push('/freelancer/dashboard');
    } else {
      router.push('/contratante/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Briefcase className="h-10 w-10 text-blue-600" />
            <span className="ml-2 text-2xl font-bold text-gray-900">FreelanceHub</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {isLogin ? 'Entre na sua conta' : 'Crie sua conta'}
          </h2>
          <p className="text-gray-600 mt-2">
            Como {userType === 'freelancer' ? 'Freelancer' : 'Contratante'}
          </p>
        </div>

        {/* Form */}
        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome completo
                </label>
                <input
                  type="text"
                  required
                  className="input-field"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Seu nome completo"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-mail
              </label>
              <input
                type="email"
                required
                className="input-field"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="input-field pr-10"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar senha
                </label>
                <input
                  type="password"
                  required
                  className="input-field"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                />
              </div>
            )}

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de usuário
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className={`p-3 text-sm font-medium rounded-lg border-2 transition-colors ${
                      userType === 'freelancer'
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-200 text-gray-700 hover:border-blue-300'
                    }`}
                    onClick={() => setUserType('freelancer')}
                  >
                    Freelancer
                  </button>
                  <button
                    type="button"
                    className={`p-3 text-sm font-medium rounded-lg border-2 transition-colors ${
                      userType === 'contratante'
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-200 text-gray-700 hover:border-blue-300'
                    }`}
                    onClick={() => setUserType('contratante')}
                  >
                    Contratante
                  </button>
                </div>
              </div>
            )}

            <button type="submit" className="btn-primary w-full">
              {isLogin ? 'Entrar' : 'Criar conta'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              className="text-blue-600 hover:text-blue-700 text-sm"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin 
                ? 'Não tem uma conta? Cadastre-se' 
                : 'Já tem uma conta? Entre aqui'
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}