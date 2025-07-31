'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Users, Briefcase, CheckCircle, Star } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [userType, setUserType] = useState<'freelancer' | 'contratante' | null>(null);

  const handleGetStarted = () => {
    if (userType) {
      router.push(`/auth?type=${userType}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Briefcase className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">FreelanceHub</span>
            </div>
            <button
              onClick={() => router.push('/auth')}
              className="btn-outline"
            >
              Entrar
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Conecte-se com os
            <span className="text-blue-600"> Melhores Freelancers</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            A plataforma ideal para contratar talentos ou encontrar projetos incríveis. 
            Simples, seguro e eficiente.
          </p>

          {/* User Type Selection */}
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-10">
            <div
              className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                userType === 'contratante'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => setUserType('contratante')}
            >
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Sou Contratante</h3>
              <p className="text-gray-600">Preciso contratar freelancers para meus projetos</p>
            </div>

            <div
              className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                userType === 'freelancer'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => setUserType('freelancer')}
            >
              <Star className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Sou Freelancer</h3>
              <p className="text-gray-600">Quero encontrar projetos e clientes</p>
            </div>
          </div>

          <button
            onClick={handleGetStarted}
            disabled={!userType}
            className={`btn-primary text-lg py-3 px-8 ${
              !userType ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Começar Agora
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Por que escolher o FreelanceHub?
            </h2>
            <p className="text-xl text-gray-600">
              A plataforma mais completa para freelancers e contratantes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Processo Simplificado</h3>
              <p className="text-gray-600">
                Criação de projetos e envio de propostas de forma rápida e intuitiva
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Comunidade Ativa</h3>
              <p className="text-gray-600">
                Conecte-se com profissionais qualificados e projetos de qualidade
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Gerenciamento Completo</h3>
              <p className="text-gray-600">
                Acompanhe todos os seus projetos em um só lugar
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Briefcase className="h-8 w-8 text-blue-400" />
            <span className="ml-2 text-xl font-bold">FreelanceHub</span>
          </div>
          <p className="text-gray-400">
            Conectando talentos e oportunidades desde 2025
          </p>
        </div>
      </footer>
    </div>
  );
}