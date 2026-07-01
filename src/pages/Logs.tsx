import { useState } from 'react';
import {
  FileText, Search, Filter, Calendar, Download, User, X, ChevronDown,
  Shield, Briefcase, Users, Zap
} from 'lucide-react';
import { mockLogs } from '../data/mock';

const typeIcons: Record<string, React.ElementType> = {
  admin: Shield,
  marchand: Briefcase,
  employé: Users,
  système: Zap,
};

const typeColors: Record<string, string> = {
  admin: 'bg-blue-100 text-blue-700',
  marchand: 'bg-green-100 text-green-700',
  employé: 'bg-purple-100 text-purple-700',
  système: 'bg-gray-100 text-gray-700',
};

export default function Logs() {
  const [logs] = useState(mockLogs);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('tous');
  const [dateFilter, setDateFilter] = useState('');
  const [showExportMenu, setShowExportMenu] = useState(false);

  const filtered = logs.filter((l) => {
    const matchSearch =
      l.actor.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase()) ||
      l.action.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === 'tous' || l.type === typeFilter;
    const matchDate = !dateFilter || l.date.startsWith(dateFilter);
    return matchSearch && matchType && matchDate;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Logs système</h1>
          <p className="text-sm text-gray-500 mt-1">Historique des actions et événements</p>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowExportMenu(!showExportMenu)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:border-gray-300 transition-colors"
          >
            <Download className="w-4 h-4" />
            Exporter
            <ChevronDown className="w-4 h-4" />
          </button>
          {showExportMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">Exporter CSV</button>
              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">Exporter PDF</button>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher par acteur ou action..."
            className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 outline-none text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 outline-none bg-white"
          >
            <option value="tous">Tous les types</option>
            <option value="admin">Admin</option>
            <option value="marchand">Marchand</option>
            <option value="employé">Employé</option>
            <option value="système">Système</option>
          </select>
        </div>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 outline-none bg-white"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-6 py-4 font-medium text-gray-600">Date</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600">Action</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600">Acteur</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600">Type</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600">Détails</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((l) => {
                const Icon = typeIcons[l.type] || FileText;
                return (
                  <tr key={l.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                      {l.date}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900">{l.action}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-brand-100 flex items-center justify-center text-brand-900 font-semibold text-xs">
                          {l.actor.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{l.actor}</p>
                          <p className="text-xs text-gray-500">{l.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${typeColors[l.type]}`}>
                        <Icon className="w-3 h-3" />
                        {l.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {l.details}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Aucun log trouvé</p>
          </div>
        )}
      </div>
    </div>
  );
}
