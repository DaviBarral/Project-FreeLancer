'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Plus, Briefcase, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  value: number | null;
  isNegotiable: boolean;
  status: 'aguardando' | 'em_andamento' | 'concluido';
  createdAt: string;
  proposals: Proposal[];
}

interface Proposal {
  id: string;
  freelancerId: string;
  freelancerName: string;
  value: number;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export default function ContratanteDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('meus-projetos');
  const [projects, setProjects] = useState<Project[]>([]);
  const [user, setUser] = useState(null);

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
    
    setUser(parsedUser);
    loadProjects();
  }, [router]);

  const loadProjects = () => {
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
  };

  const handleAcceptProposal = (projectId: string, proposalId: string) => {
    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        const updatedProposals = project.proposals.map(proposal => ({
          ...proposal,
          status: proposal.id === proposalId ? 'accepted' as const : 'rejected' as const
        }));
        
        return {
          ...project,
          status: 'em_andamento' as const,
          proposals: updatedProposals
        };
      }
      return project;
    });
    
    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  };

  const handleRejectProposal = (projectId: string, proposalId: string) => {
    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        const updatedProposals = project.proposals.map(proposal => 
          proposal.id === proposalId 
            ? { ...proposal, status: 'rejected' as const }
            : proposal
        );
        
        return {
          ...project,
          proposals: updatedProposals
        };
      }
      return project;
    });
    
    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'aguardando':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'em_andamento':
        return <AlertCircle className="h-5 w-5 text-blue-500" />;
      case 'concluido':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'aguardando':
        return 'Aguardando Propostas';
      case 'em_andamento':
        return 'Em Andamento';
      case 'concluido':
        return 'Concluído';
      default:
        return 'Status Desconhecido';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aguardando':
        return 'bg-yellow-100 text-yellow-800';
      case 'em_andamento':
        return 'bg-blue-100 text-blue-800';
      case 'concluido':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard do Contratante</h1>
            <p className="text-gray-600 mt-1">Gerencie seus projetos e propostas</p>
          </div>
          <button
            onClick={() => router.push('/contratante/novo-projeto')}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Novo Projeto</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'meus-projetos'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('meus-projetos')}
            >
              Meus Projetos
            </button>
          </nav>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6">
          {projects.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum projeto encontrado
              </h3>
              <p className="text-gray-600 mb-4">
                Comece criando seu primeiro projeto
              </p>
              <button
                onClick={() => router.push('/contratante/novo-projeto')}
                className="btn-primary"
              >
                Criar Projeto
              </button>
            </div>
          ) : (
            projects.map(project => (
              <div key={project.id} className="card p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-3">{project.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>
                        Valor: {project.isNegotiable ? 'A negociar' : `R$ ${project.value?.toLocaleString()}`}
                      </span>
                      <span>•</span>
                      <span>Criado em: {new Date(project.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    {getStatusIcon(project.status)}
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                      {getStatusText(project.status)}
                    </span>
                  </div>
                </div>

                {/* Proposals */}
                {project.proposals.length > 0 && (
                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-900 mb-3">
                      Propostas ({project.proposals.length})
                    </h4>
                    <div className="space-y-3">
                      {project.proposals.map(proposal => (
                        <div key={proposal.id} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-medium text-gray-900">{proposal.freelancerName}</p>
                              <p className="text-sm text-gray-600">{proposal.message}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-semibold text-gray-900">
                                R$ {proposal.value.toLocaleString()}
                              </p>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                proposal.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                proposal.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {proposal.status === 'accepted' ? 'Aceita' :
                                 proposal.status === 'rejected' ? 'Rejeitada' :
                                 'Pendente'}
                              </span>
                            </div>
                          </div>
                          {proposal.status === 'pending' && (
                            <div className="flex space-x-2 mt-3">
                              <button
                                onClick={() => handleAcceptProposal(project.id, proposal.id)}
                                className="btn-primary text-sm"
                              >
                                Aceitar
                              </button>
                              <button
                                onClick={() => handleRejectProposal(project.id, proposal.id)}
                                className="btn-secondary text-sm"
                              >
                                Recusar
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}