import { useState, useEffect } from 'react';
import React from 'react';

// Componente para limitar texto e expandir
type ExpandableTextProps = {
  text: string;
  maxLength: number;
  className?: string;
  prefix?: string;
};

function ExpandableText({ text, maxLength, className, prefix }: ExpandableTextProps) {
  const [expanded, setExpanded] = React.useState(false);
  if (!text) return null;
  const shouldTruncate = text.length > maxLength;
  const displayText = expanded || !shouldTruncate ? text : text.slice(0, maxLength) + '...';
  return (
    <p className={className}>
      {prefix}{displayText}
      {shouldTruncate && (
        <button type="button" className="ml-2 text-blue-500 underline text-xs" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Ver menos' : 'Ver mais'}
        </button>
      )}
    </p>
  );
}
import Layout from '../components/Layout';
import api from '../services/api';
import { RM } from '../types';

type RMType = 'RM' | 'IB';

export default function RMs() {
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState<RMType | ''>('');
  const [rms, setRms] = useState<RM[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formType, setFormType] = useState<RMType>('RM');
  const [formData, setFormData] = useState({
    rmNumber: '',
    description: '',
    observations: '',
    implementationDate: '',
    branchName: '',
    status: 'pending' as const,
    type: 'RM' as RMType,
    createdAt: '',
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
      const payload = { ...formData, type: formType };
      if (isEditing && editingId) {
        await api.put(`/rms/${editingId}`, payload);
      } else {
        await api.post('/rms', payload);
      }
  setFormData({ rmNumber: '', description: '', observations: '', implementationDate: '', branchName: '', status: 'pending', type: 'RM', createdAt: '' });
      setFormType('RM');
      setIsCreating(false);
      setIsEditing(false);
      setEditingId(null);
      loadRMs();
    } catch (error: any) {
      alert(error.response?.data?.error || (isEditing ? 'Erro ao editar RM/IB' : 'Erro ao criar RM/IB'));
    }
  };
  const handleEdit = (rm: RM) => {
    setFormData({
      rmNumber: rm.rmNumber,
      description: rm.description,
      observations: rm.observations || '',
      implementationDate: rm.implementationDate ? rm.implementationDate.slice(0, 10) : '',
      branchName: rm.branchName || '',
      status: rm.status as any,
      type: rm.type,
      createdAt: rm.createdAt ? rm.createdAt.slice(0, 10) : '',
    });
    setFormType(rm.type);
    setIsEditing(true);
    setEditingId(rm.id);
    setIsCreating(true);
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
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">RM / IB</h1>
          <button
            onClick={() => {
              setIsCreating(!isCreating);
              setIsEditing(false);
              setEditingId(null);
              setFormData({ rmNumber: '', description: '', observations: '', implementationDate: '', branchName: '', status: 'pending', type: 'RM', createdAt: '' });
              setFormType('RM');
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {isCreating ? (isEditing ? 'Cancelar Edição' : 'Cancelar') : 'Nova RM/IB'}
          </button>
        </div>
        {!isCreating && (
          <div className="flex gap-4 items-center">
            <select
              value={searchType}
              onChange={e => setSearchType(e.target.value as RMType | '')}
              className="border px-3 py-2 rounded"
            >
              <option value="">Todos</option>
              <option value="RM">RM</option>
              <option value="IB">IB</option>
            </select>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Pesquisar por número, descrição ou branch..."
              className="border px-3 py-2 rounded w-full max-w-lg"
            />
          </div>
        )}
      </div>

      {isCreating && (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg mb-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Tipo *</label>
              <select
                value={formType}
                onChange={e => {
                  setFormType(e.target.value as RMType);
                  setFormData({ ...formData, type: e.target.value as RMType });
                }}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="RM">RM</option>
                <option value="IB">IB</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Número *</label>
              <input
                type="text"
                value={formData.rmNumber}
                onChange={(e) => setFormData({ ...formData, rmNumber: e.target.value })}
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>
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
          <div>
            <label className="block text-sm font-medium mb-1">Data de Criação *</label>
            <input
              type="date"
              value={formData.createdAt}
              onChange={(e) => setFormData({ ...formData, createdAt: e.target.value })}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          {formType === 'RM' && formData.status === 'implanted' && (
            <div>
              <label className="block text-sm font-medium mb-1">Data de Implantação</label>
              <input
                type="date"
                value={formData.implementationDate}
                onChange={(e) => setFormData({ ...formData, implementationDate: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="pending">Pendente</option>
              <option value="preparado">Preparado</option>
              <option value="in-progress">Em Andamento</option>
              <option value="implanted">Implantada</option>
              <option value="closed">Fechada</option>
            </select>
          </div>
          <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
            {isEditing ? 'Salvar Alterações' : `Criar ${formType}`}
          </button>
        </form>
      )}

      <div className="space-y-4">
        {rms
          .filter(rm => {
            const s = search.toLowerCase();
            // Se não há filtro de tipo nem texto, mostra tudo
            if (!search && !searchType) return true;
            // Se filtro de tipo estiver selecionado, filtra por tipo
            const typeMatch = searchType ? rm.type === searchType : true;
            // Se filtro de texto estiver preenchido, filtra por texto
            const textMatch =
              rm.rmNumber.toLowerCase().includes(s) ||
              (rm.description && rm.description.toLowerCase().includes(s)) ||
              (rm.branchName && rm.branchName.toLowerCase().includes(s));
            // Se não há filtro de texto, só filtra por tipo
            if (!search) return typeMatch;
            // Se não há filtro de tipo, só filtra por texto
            if (!searchType) return textMatch;
            // Se ambos, filtra por ambos
            return typeMatch && textMatch;
          })
          .map((rm) => (
          <div key={rm.id} className="border rounded-lg p-4 bg-white shadow-sm">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <span className="font-bold text-lg">{rm.type}: {rm.rmNumber}</span>
                  <span className={`px-2 py-1 rounded text-sm ${
                    rm.status === 'implanted' ? 'bg-green-100 text-green-800' :
                    rm.status === 'preparado' ? 'bg-yellow-100 text-yellow-800' :
                    rm.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                    rm.status === 'closed' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {rm.status === 'implanted' ? 'Implantada' : rm.status === 'preparado' ? 'Preparado' : rm.status === 'in-progress' ? 'Em Andamento' : rm.status === 'closed' ? 'Fechada' : 'Pendente'}
                  </span>
                  {rm.branchName && <span className="text-sm text-gray-600">Branch: {rm.branchName}</span>}
                </div>
                <ExpandableText text={rm.description} maxLength={180} className="text-gray-700 mb-2" />
                {rm.observations && <ExpandableText text={rm.observations} maxLength={120} className="text-sm text-gray-600 mb-2" prefix="Obs: " />}
                {rm.implementationDate && (
                  <p className="text-sm text-gray-500">
                    Implantação: {(() => {
                      const date = new Date(rm.implementationDate);
                      date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
                      return date.toLocaleDateString('pt-BR');
                    })()}
                  </p>
                )}
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleEdit(rm)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(rm.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Deletar
                </button>
              </div>
            </div>
          </div>
        ))}
        {rms.length === 0 && !isCreating && (
          <p className="text-center text-gray-500 py-8">Nenhum RM/IB cadastrado</p>
        )}
      </div>
    </Layout>
  );
}
