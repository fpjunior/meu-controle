import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const modules = [
    { name: 'RMs', description: 'Requisições de Mudança', path: '/rms', icon: '??' },
    { name: 'Equipes', description: 'Gerenciar equipes e membros', path: '/teams', icon: '??' },
    { name: 'Branches', description: 'Controle de branches', path: '/branches', icon: '??' },
    { name: 'Mensagens Teams', description: 'Mensagens importantes', path: '/messages', icon: '??' },
    { name: 'Acessos', description: 'Informações de acesso', path: '/access', icon: '??' },
    { name: 'Dailys', description: 'Reuniões e agendas', path: '/dailys', icon: '??' },
    { name: 'Links', description: 'Links importantes', path: '/links', icon: '??' },
  ];

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <Link
            key={module.path}
            to={module.path}
            className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition"
          >
            <div className="text-4xl mb-4">{module.icon}</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{module.name}</h2>
            <p className="text-gray-600">{module.description}</p>
          </Link>
        ))}
      </div>
    </Layout>
  );
}
