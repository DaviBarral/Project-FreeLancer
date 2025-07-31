'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Briefcase, Clock, CheckCircle, AlertCircle, DollarSign, Send } from 'lucide-react';

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

export default function FreelancerDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('projetos-disponiveis');
  const [projects, setProjects] = useState<Project[]>([]);
  const [user, setUser] = useState<any>(null);
  const [showProposalForm, setShowProposalForm] = useState<string | null>(null);
  const [proposalData, setProposalData] = useState({
    value: '',
    message: ''
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/auth');
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    if (parsedUser.type !== 'freelancer') {
      router.push('/contratante/dashboard');
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

  const handleSendProposal = (projectId: string) => {
    if (!user || !proposalData.value || !proposalData.message) return;

    const newProposal = {
      id: Date.now().toString(),
      freelancerId: user.id,
      freelancerName: user.name,
      value: parseFloat(proposalData.value),
      message: proposalData.message,
      status: 'pending' as const
    };

    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          proposals: [...project.proposals, newProposal]
        };
      }
      return project;
    });

    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    
    setShowProposalForm(null);
    setProposalData({ value: '', message: '' });
  };

  const handleCompleteProject = (projectId: string) => {
    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          status: 'concluido' as const
        };
      }
      return project;
    });

    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  };

  const getMyProjects = () => {
    if (!user) return [];
    
    return projects.filter(project => 
      project.proposals.some(proposal => 
        proposal.freelancerId === user.id && proposal.status === 'accepted'
      )
    );
  };

  const getAvailableProjects = () => {
    if (!user) return [];
    
    return projects.filter(project => 
      project.status === 'aguardando' && 
      !project.proposals.some(proposal => proposal.freelancerId === user.id)
    );
  };

  const hasUserProposed = (project: Project) => {
    if (!user) return false;
    return project.proposals.some(proposal => proposal.freelancerId === user.id);
  };

  const getUserProposal = (project: Project) => {
    if (!user) return null;
    return project.proposals.find(proposal => proposal.freelancerId === user.id);
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

  const myProjects = getMyProjects();
  const availableProjects = getAvailableProjects();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard do Freelancer</h1>
          <p className="text-gray-600 mt-1">Encontre projetos incríveis e gerencie seu trabalho</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">{myProjects.length}</h3>
                <p className="text-gray-600">Meus Projetos</p>
              </div>
            </div>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  {myProjects.filter(p => p.status === 'concluido').length}
                </h3>
                <p className="text-gray-600">Concluídos</p>
              </div>
            </div>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">{availableProjects.length}</h3>
                <p className="text-gray-600">Disponíveis</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'projetos-disponiveis'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('projetos-disponiveis')}
            >
              Projetos Disponíveis
            </button>
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

        {/* Content */}
        {activeTab === 'projetos-disponiveis' && (
          <div className="grid gap-6">
            {availableProjects.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhum projeto disponível
                </h3>
                <p className="text-gray-600">
                  Novos projetos aparecerão aqui quando forem criados
                </p>
              </div>
            ) : (
              availableProjects.map(project => (
                <div key={project.id} className="card p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 mb-3">{project.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-4 w-4" />
                          <span>
                            {project.isNegotiable ? 'A negociar' : `R$ ${project.value?.toLocaleString()}`}
                          </span>
                        </div>
                        <span>•</span>
                        <span>Criado em: {new Date(project.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  {hasUserProposed(project) ? (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-blue-900">Proposta Enviada</p>
                          <p className="text-sm text-blue-700">
                            Valor: R$ {getUserProposal(project)?.value.toLocaleString()}
                          </p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          getUserProposal(project)?.status === 'accepted' ? 'bg-green-100 text-green-800' :
                          getUserProposal(project)?.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {getUserProposal(project)?.status === 'accepted' ? 'Aceita' :
                           getUserProposal(project)?.status === 'rejected' ? 'Rejeitada' :
                           'Pendente'}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <>
                      {showProposalForm === project.id ? (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium text-gray-900 mb-3">Enviar Proposta</h4>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Valor (R$)
                              </label>
                              <input
                                type="number"
                                min="0"
                                step="0.01"
                                className="input-field"
                                value={proposalData.value}
                                onChange={(e) => setProposalData({ ...proposalData, value: e.target.value })}
                                placeholder="Seu preço para este projeto"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Mensagem
                              </label>
                              <textarea
                                rows={3}
                                className="input-field resize-none"
                                value={proposalData.message}
                                onChange={(e) => setProposalData({ ...proposalData, message: e.target.value })}
                                placeholder="Explique por que você é o profissional ideal para este projeto"
                              />
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleSendProposal(project.id)}
                                className="btn-primary text-sm flex items-center space-x-1"
                                disabled={!proposalData.value || !proposalData.message}
                              >
                                <Send className="h-4 w-4" />
                                <span>Enviar Proposta</span>
                              </button>
                              <button
                                onClick={() => {
                                  setShowProposalForm(null);
                                  setProposalData({ value: '', message: '' });
                                }}
                                className="btn-secondary text-sm"
                              >
                                Cancelar
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setShowProposalForm(project.id)}
                          className="btn-primary text-sm flex items-center space-x-1"
                        >
                          <Send className="h-4 w-4" />
                          <span>Enviar Proposta</span>
                        </button>
                      )}
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'meus-projetos' && (
          <div className="grid gap-6">
            {myProjects.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhum projeto encontrado
                </h3>
                <p className="text-gray-600">
                  Seus projetos aceitos aparecerão aqui
                </p>
              </div>
            ) : (
              myProjects.map(project => (
                <div key={project.id} className="card p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 mb-3">{project.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-4 w-4" />
                          <span>
                            R$ {getUserProposal(project)?.value.toLocaleString()}
                          </span>
                        </div>
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

                  {project.status === 'em_andamento' && (
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleCompleteProject(project.id)}
                        className="btn-primary text-sm flex items-center space-x-1"
                      >
                        <CheckCircle className="h-4 w-4" />
                        <span>Concluir Projeto</span>
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}