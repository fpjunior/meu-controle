import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';
import { RM } from '../types';

export default function RMs() {
  const [rms, setRms] = useState<RM[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    ibNumber: '',
    description: '',
    observations: '',
    implementationDate: '',
    branchName: '',
    status: 'pending' as const,
  });

  useEffect(() => {
    loadRMs();
  }, []);

  const loadRMs = async () => {
    try {
      const response = await api.get('/rms');
      setRms(response.data);
    } catch (error) {
      console.error('Erro ao carregar RMs:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/rms', formData);
      setFormData({ ibNumber: '', description: '', observations: '', implementationDate: '', branchName: '', status: 'pending' });
      setIsCreating(false);
      loadRMs();
    } catch (error: any) {
      alert(error.response?.data?.error || 'Erro ao criar RM');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Deseja realmente deletar esta RM?')) {
      try {
        await api.delete(`/rms/${id}`);
        loadRMs();
      } catch (error) {
        alert('Erro ao deletar RM');
      }
    }
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Requisições de Mudança (RMs)</h1>
        <button
          onClick={() => setIsCreating(!isCreating)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isCreating ? 'Cancelar' : 'Nova RM'}
        </button>
      </div>

      {isCreating && (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg mb-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">IB Number *</label>
              <input
                type="text"
                value={formData.ibNumber}
                onChange={(e) => setFormData({ ...formData, ibNumber: e.target.value })}
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Branch Name</label>
              <input
                type="text"
                value={formData.branchName}
                onChange={(e) => setFormData({ ...formData, branchName: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Descrição *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={3}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Observações</label>
            <textarea
              value={formData.observations}
              onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Data de Implantação</label>
              <input
                type="date"
                value={formData.implementationDate}
                onChange={(e) => setFormData({ ...formData, implementationDate: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="pending">Pendente</option>
                <option value="in-progress">Em Andamento</option>
                <option value="completed">Concluída</option>
              </select>
            </div>
          </div>
          <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
            Criar RM
          </button>
        </form>
      )}

      <div className="space-y-4">
        {rms.map((rm) => (
          <div key={rm.id} className="border rounded-lg p-4 bg-white shadow-sm">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <span className="font-bold text-lg">IB: {rm.ibNumber}</span>
                  <span className={`px-2 py-1 rounded text-sm ${
                    rm.status === 'completed' ? 'bg-green-100 text-green-800' :
                    rm.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {rm.status === 'completed' ? 'Concluída' : rm.status === 'in-progress' ? 'Em Andamento' : 'Pendente'}
                  </span>
                  {rm.branchName && <span className="text-sm text-gray-600">Branch: {rm.branchName}</span>}
                </div>
                <p className="text-gray-700 mb-2">{rm.description}</p>
                {rm.observations && <p className="text-sm text-gray-600 mb-2">Obs: {rm.observations}</p>}
                {rm.implementationDate && (
                  <p className="text-sm text-gray-500">
                    Implantação: {new Date(rm.implementationDate).toLocaleDateString('pt-BR')}
                  </p>
                )}
              </div>
              <button
                onClick={() => handleDelete(rm.id)}
                className="text-red-600 hover:text-red-800 ml-4"
              >
                Deletar
              </button>
            </div>
          </div>
        ))}
        {rms.length === 0 && !isCreating && (
          <p className="text-center text-gray-500 py-8">Nenhuma RM cadastrada</p>
        )}
      </div>
    </Layout>
  );
}
