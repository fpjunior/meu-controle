import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import axios from '../services/api';

interface TeamMember {
  id: string;
  name: string;
  role?: string;
}

export default function Teams() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [form, setForm] = useState({ name: '', role: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, []);

  async function fetchMembers() {
    try {
      const res = await axios.get('team-member');
      setMembers(res.data);
    } catch {
      setMembers([]);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('team-member', form);
      setForm({ name: '', role: '' });
      fetchMembers();
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Equipes</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Cadastrar Funcionário</h2>
        <form onSubmit={handleSubmit} className="flex gap-4 items-end">
          <div>
            <label className="block text-sm">Nome</label>
            <input
              type="text"
              className="border rounded px-2 py-1"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="block text-sm">Função</label>
            <input
              type="text"
              className="border rounded px-2 py-1"
              value={form.role}
              onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
            disabled={loading}
          >Cadastrar</button>
        </form>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Funcionários Cadastrados</h2>
        <ul className="space-y-2">
          {members.map(m => (
            <li key={m.id} className="border rounded px-3 py-2 flex justify-between items-center">
              <span>
                <span className="font-medium">{m.name}</span>
                {m.role && <span className="text-gray-500 ml-2">({m.role})</span>}
              </span>
            </li>
          ))}
          {members.length === 0 && <li className="text-gray-500">Nenhum funcionário cadastrado.</li>}
        </ul>
      </div>
    </Layout>
  );
}
