Documento de Requisitos - Plataforma de Freelancer

Introdução

Fui contratado para desenvolver uma plataforma web de intermediação de serviços freelancers, que tem como objetivo conectar contratantes e freelancers em um ambiente digital intuitivo, funcional e visualmente atrativo. A plataforma permitirá o cadastro, criação, negociação e conclusão de projetos, com funcionalidades específicas para cada tipo de usuário.

O projeto será desenvolvido utilizando Next.js como framework principal, com JavaScript ou TypeScript como linguagem base. O backend e autenticação de usuários serão implementados utilizando Firebase ou Supabase, conforme decisão final do cliente. A identidade visual da aplicação seguirá uma paleta com tons de azul, preto e branco.

---
Requisitos Funcionais

Cadastro e Autenticação
O sistema deve permitir o cadastro e login tanto de freelancers quanto de contratantes.

Cada tipo de usuário deve ter sua interface específica após o login.

Perfil do Usuário
Perfis distintos para freelancers e contratantes.

Contratantes podem visualizar perfis de freelancers.

Freelancers não precisam visualizar perfis de contratantes.

Criação de Projetos (Contratante)
Após login, o contratante pode criar um projeto, fornecendo:

Título

Descrição

Valor fixo ou opção "a negociar"

O contratante pode visualizar propostas recebidas, e aceitá-las ou recusá-las.

Os projetos devem ser listados por status: em andamento, concluídos, aguardando propostas, etc.

Propostas (Freelancer)
Freelancers podem visualizar projetos abertos.

Se o valor estiver como "a negociar", podem enviar sua própria proposta de valor.

Após ter uma proposta aceita, o projeto aparece na aba "Meus Projetos" do freelancer.

Gestão de Projetos
Ambos os usuários (freelancer e contratante) devem ter uma aba chamada "Meus Projetos" contendo:

Projetos aceitos

Projetos em andamento

Projetos concluídos

Freelancers terão um botão "Concluir Projeto" que, ao ser acionado:

Atualiza o status do projeto para concluído

Reflete essa mudança na interface do contratante automaticamente

---
Requisitos Não Funcionais (Não é obrigatório, mas se tiver, ganha pontos extras)

Design responsivo, adaptado para desktop e dispositivos móveis utilizando tailwind.

Paleta de cores obrigatória: azul, preto e branco.

Interface clara e organizada, separando funcionalidades por tipo de usuário.

Código-fonte modular e escalável, com boas práticas de versionamento.

---
Tecnologias Obrigatórias

Frontend: Next.js (React)

Linguagem: JavaScript

Backend/Autenticação/Banco: Firebase ou Supabase
