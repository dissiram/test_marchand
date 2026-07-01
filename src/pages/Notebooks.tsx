import { useState } from 'react';
import {
  Search, BookOpen, RefreshCw, Ticket, History, X, AlertTriangle,
  Calendar, User, ArrowRight, Eye
} from 'lucide-react';
import { mockNotebooks } from '../data/mock';

const statusColors: Record<string, string> = {
  actif: 'bg-green-100 text-green-700',
  épuisé: 'bg-red-100 text-red-700',
};

export default function Notebooks() {
  const [notebooks, setNotebooks] = useState(mockNotebooks);
  const [search, setSearch] = useState('');
  const [selectedNotebook, setSelectedNotebook] = useState<typeof mockNotebooks[0] | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showRefillModal, setShowRefillModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const filtered = notebooks.filter((n) =>
    n.employee.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des carnets</h1>
          <p className="text-sm text-gray-500 mt-1">{notebooks.length} carnets actifs</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un employé..."
            className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 outline-none text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((n) => (
          <div
            key={n.id}
            className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand-100 flex items-center justify-center text-brand-900 font-semibold">
                  {n.employee.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">{n.employee}</p>
                  <p className="text-xs text-gray-500">Créé le {n.createdAt}</p>
                </div>
              </div>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[n.status]}`}>
                {n.status}
              </span>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Tickets restants</span>
                <span className={`text-sm font-bold ${n.ticketsLeft === 0 ? 'text-red-500' : 'text-gray-900'}`}>
                  {n.ticketsLeft} / {n.total}
                </span>
              </div>
              <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${n.ticketsLeft === 0 ? 'bg-red-500' : n.ticketsLeft < 5 ? 'bg-amber-500' : 'bg-brand-900'}`}
                  style={{ width: `${(n.ticketsLeft / n.total) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => { setSelectedNotebook(n); setShowDetailModal(true); }}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-medium text-brand-900 hover:bg-brand-50 rounded-lg transition-colors"
              >
                <Eye className="w-4 h-4" />
                Détails
              </button>
              <button
                onClick={() => { setSelectedNotebook(n); setShowHistoryModal(true); }}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <History className="w-4 h-4" />
                Historique
              </button>
              <button
                onClick={() => { setSelectedNotebook(n); setShowRefillModal(true); }}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-medium text-white bg-brand-900 hover:bg-brand-700 rounded-lg transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Recharger
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>Aucun carnet trouvé</p>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedNotebook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Détail du carnet</h2>
              <button onClick={() => setShowDetailModal(false)} className="p-1 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5 text-gray-500" /></button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-brand-100 flex items-center justify-center text-brand-900 font-bold text-xl">
                  {selectedNotebook.employee.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{selectedNotebook.employee}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${statusColors[selectedNotebook.status]}`}>
                    {selectedNotebook.status}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-xs">Date de création</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{selectedNotebook.createdAt}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <RefreshCw className="w-4 h-4" />
                    <span className="text-xs">Rechargements</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{selectedNotebook.refills} fois</p>
                </div>
              </div>
              <div className="bg-brand-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Tickets restants</span>
                  <span className={`text-lg font-bold ${selectedNotebook.ticketsLeft === 0 ? 'text-red-500' : 'text-gray-900'}`}>
                    {selectedNotebook.ticketsLeft} / {selectedNotebook.total}
                  </span>
                </div>
                <div className="w-full h-3 bg-white rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${selectedNotebook.ticketsLeft === 0 ? 'bg-red-500' : 'bg-brand-900'}`}
                    style={{ width: `${(selectedNotebook.ticketsLeft / selectedNotebook.total) * 100}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setShowDetailModal(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">Fermer</button>
              <button onClick={() => { setShowDetailModal(false); setShowRefillModal(true); }} className="px-4 py-2 text-sm font-medium text-white bg-brand-900 hover:bg-brand-700 rounded-lg transition-colors">Recharger</button>
            </div>
          </div>
        </div>
      )}

      {/* History Modal */}
      {showHistoryModal && selectedNotebook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Historique du carnet</h2>
              <button onClick={() => setShowHistoryModal(false)} className="p-1 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5 text-gray-500" /></button>
            </div>
            <div className="px-6 py-5 space-y-3 max-h-96 overflow-y-auto">
              <div className="flex items-start gap-3 py-3 px-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0">
                  <RefreshCw className="w-4 h-4 text-brand-900" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Rechargement de 20 tickets</p>
                  <p className="text-xs text-gray-500">Effectué par Super Admin</p>
                  <p className="text-xs text-gray-400 mt-1">{selectedNotebook.createdAt}</p>
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full">+20</span>
              </div>
              <div className="flex items-start gap-3 py-3 px-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Ticket className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Tickets consommés</p>
                  <p className="text-xs text-gray-500">{selectedNotebook.total - selectedNotebook.ticketsLeft} tickets utilisés</p>
                  <p className="text-xs text-gray-400 mt-1">Depuis la création du carnet</p>
                </div>
                <span className="text-xs font-medium text-red-600 bg-red-100 px-2 py-0.5 rounded-full">-{selectedNotebook.total - selectedNotebook.ticketsLeft}</span>
              </div>
              <div className="flex items-start gap-3 py-3 px-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-4 h-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Création du carnet</p>
                  <p className="text-xs text-gray-500">Carnet initial de {selectedNotebook.total} tickets</p>
                  <p className="text-xs text-gray-400 mt-1">{selectedNotebook.createdAt}</p>
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full">+{selectedNotebook.total}</span>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
              <button onClick={() => setShowHistoryModal(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">Fermer</button>
            </div>
          </div>
        </div>
      )}

      {/* Refill Modal */}
      {showRefillModal && selectedNotebook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Recharger le carnet</h2>
              <button onClick={() => setShowRefillModal(false)} className="p-1 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5 text-gray-500" /></button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Employé</p>
                <p className="font-semibold text-gray-900">{selectedNotebook.employee}</p>
                <p className="text-sm text-gray-600 mt-2">Tickets actuels</p>
                <p className="font-bold text-gray-900">{selectedNotebook.ticketsLeft} / {selectedNotebook.total}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Nombre de tickets à ajouter</label>
                <input type="number" defaultValue={20} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 outline-none text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Motif (optionnel)</label>
                <textarea className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 outline-none text-sm resize-none h-20" placeholder="Ex: Rechargement mensuel..." />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setShowRefillModal(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">Annuler</button>
              <button onClick={() => setShowRefillModal(false)} className="px-4 py-2 text-sm font-medium text-white bg-brand-900 hover:bg-brand-700 rounded-lg transition-colors">Confirmer le rechargement</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
