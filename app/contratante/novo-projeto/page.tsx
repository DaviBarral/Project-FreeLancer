'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { ArrowLeft } from 'lucide-react';

export default function NovoProject() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    value: '',
    isNegotiable: false
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/auth');
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    if (parsedUser.type !== 'contratante') {
      router.push('/freelancer/dashboard');
      return;
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProject = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      value: formData.isNegotiable ? null : parseFloat(formData.value),
      isNegotiable: formData.isNegotiable,
      status: 'aguardando',
      createdAt: new Date().toISOString(),
      proposals: []
    };

    const existingProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    const updatedProjects = [...existingProjects, newProject];
    localStorage.setItem('projects', JSON.stringify(updatedProjects));

    router.push('/contratante/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Voltar
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Criar Novo Projeto</h1>
          <p className="text-gray-600 mt-1">Descreva seu projeto para atrair os melhores freelancers</p>
        </div>

        {/* Form */}
        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título do Projeto *
              </label>
              <input
                type="text"
                required
                className="input-field"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ex: Desenvolvimento de site institucional"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição do Projeto *
              </label>
              <textarea
                required
                rows={6}
                className="input-field resize-none"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descreva detalhadamente o que precisa ser feito, tecnologias necessárias, prazo esperado, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Orçamento
              </label>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="negotiable"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={formData.isNegotiable}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      isNegotiable: e.target.checked,
                      value: e.target.checked ? '' : formData.value
                    })}
                  />
                  <label htmlFor="negotiable" className="ml-2 text-sm text-gray-700">
                    Valor a negociar
                  </label>
                </div>

                {!formData.isNegotiable && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Valor fixo (R$) *
                    </label>
                    <input
                      type="number"
                      required={!formData.isNegotiable}
                      min="0"
                      step="0.01"
                      className="input-field"
                      value={formData.value}
                      onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                      placeholder="0.00"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex space-x-4 pt-6">
              <button
                type="button"
                onClick={() => router.back()}
                className="btn-secondary flex-1"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn-primary flex-1"
              >
                Criar Projeto
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}