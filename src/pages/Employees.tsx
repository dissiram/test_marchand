import { useState } from 'react';
import {
  Search, Plus, Filter, User, Mail, Phone, Building2, FileText, Eye, Edit3,
  Ban, CheckCircle, X, AlertTriangle, BookOpen, Ticket, RefreshCw
} from 'lucide-react';
import { mockEmployees } from '../data/mock';

const statusColors: Record<string, string> = {
  actif: 'bg-green-100 text-green-700',
  suspendu: 'bg-red-100 text-red-700',
  'en attente': 'bg-amber-100 text-amber-700',
};

const statusLabels: Record<string, string> = {
  actif: 'Actif',
  suspendu: 'Suspendu',
  'en attente': 'En attente',
};

export default function Employees() {
  const [employees, setEmployees] = useState(mockEmployees);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('tous');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<typeof mockEmployees[0] | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showNotebookModal, setShowNotebookModal] = useState(false);
  const [showSuspendConfirm, setShowSuspendConfirm] = useState(false);
  const [employeeToSuspend, setEmployeeToSuspend] = useState<string | null>(null);
  const [showForceRefillModal, setShowForceRefillModal] = useState(false);

  const filtered = employees.filter((e) => {
    const matchSearch =
      e.lastName.toLowerCase().includes(search.toLowerCase()) ||
      e.firstName.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'tous' || e.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const toggleStatus = (id: string) => {
    setEmployees((prev) =>
      prev.map((e) =>
        e.id === id
          ? { ...e, status: e.status === 'actif' ? 'suspendu' : 'actif' }
          : e
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des employés</h1>
          <p className="text-sm text-gray-500 mt-1">{employees.length} employés enregistrés</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-brand-900 text-white rounded-lg text-sm font-medium hover:bg-brand-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Inviter un employé
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher par nom ou email..."
            className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 outline-none text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 outline-none bg-white"
          >
            <option value="tous">Tous les statuts</option>
            <option value="actif">Actif</option>
            <option value="suspendu">Suspendu</option>
            <option value="en attente">En attente de validation</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-6 py-4 font-medium text-gray-600">Employé</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600">Contact</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600">Service</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600">Statut</th>
                <th className="text-center px-6 py-4 font-medium text-gray-600">Carnet</th>
                <th className="text-center px-6 py-4 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => (
                <tr key={e.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-brand-100 flex items-center justify-center text-brand-900 font-semibold">
                        {e.firstName.charAt(0)}{e.lastName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{e.firstName} {e.lastName}</p>
                        <p className="text-xs text-gray-500">{e.contractType}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <Mail className="w-3.5 h-3.5" />
                        <span className="text-xs">{e.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <Phone className="w-3.5 h-3.5" />
                        <span className="text-xs">{e.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <Building2 className="w-4 h-4" />
                      <span className="text-sm">{e.service}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[e.status]}`}>
                      {statusLabels[e.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <BookOpen className="w-4 h-4 text-brand-900" />
                      <span className={`text-sm font-medium ${e.ticketsLeft === 0 ? 'text-red-500' : 'text-gray-900'}`}>
                        {e.ticketsLeft} / 20
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => { setSelectedEmployee(e); setShowDetailModal(true); }}
                        className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-brand-900 transition-colors"
                        title="Voir le carnet"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => { setSelectedEmployee(e); setShowEditModal(true); }}
                        className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-brand-900 transition-colors"
                        title="Modifier"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => { setSelectedEmployee(e); setShowForceRefillModal(true); }}
                        className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-brand-900 transition-colors"
                        title="Recharger le carnet"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => { setEmployeeToSuspend(e.id); setShowSuspendConfirm(true); }}
                        className={`p-1.5 hover:bg-gray-100 rounded-lg transition-colors ${e.status === 'actif' ? 'text-gray-500 hover:text-red-600' : 'text-gray-500 hover:text-green-600'}`}
                        title={e.status === 'actif' ? 'Suspendre' : 'Réactiver'}
                      >
                        {e.status === 'actif' ? <Ban className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <User className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Aucun employé trouvé</p>
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Inviter un employé</h2>
              <button onClick={() => setShowCreateModal(false)} className="p-1 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5 text-gray-500" /></button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Prénom</label>
                  <input className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Nom</label>
                  <input className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 outline-none text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <input type="email" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 outline-none text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Téléphone</label>
                <input className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 outline-none text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Service</label>
                  <select className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 outline-none text-sm bg-white">
                    <option>Commercial</option>
                    <option>Marketing</option>
                    <option>RH</option>
                    <option>IT</option>
                    <option>Finance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Type de contrat</label>
                  <select className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 outline-none text-sm bg-white">
                    <option>CDI</option>
                    <option>CDD</option>
                    <option>Stage</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setShowCreateModal(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">Annuler</button>
              <button onClick={() => setShowCreateModal(false)} className="px-4 py-2 text-sm font-medium text-white bg-brand-900 hover:bg-brand-700 rounded-lg transition-colors">Envoyer l'invitation</button>
            </div>
          </div>
        </div>
      )}

      {/* Detail / Notebook Modal */}
      {showDetailModal && selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Détail du carnet</h2>
              <button onClick={() => setShowDetailModal(false)} className="p-1 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5 text-gray-500" /></button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-brand-100 flex items-center justify-center text-brand-900 font-bold text-xl">
                  {selectedEmployee.firstName.charAt(0)}{selectedEmployee.lastName.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{selectedEmployee.firstName} {selectedEmployee.lastName}</h3>
                  <p className="text-sm text-gray-500">{selectedEmployee.service} — {selectedEmployee.contractType}</p>
                </div>
              </div>
              <div className="bg-brand-50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-brand-900 mb-3">
                  <BookOpen className="w-5 h-5" />
                  <span className="font-semibold">Carnet actuel</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Tickets restants</span>
                  <span className={`text-lg font-bold ${selectedEmployee.ticketsLeft === 0 ? 'text-red-500' : 'text-gray-900'}`}>
                    {selectedEmployee.ticketsLeft} / 20
                  </span>
                </div>
                <div className="w-full h-3 bg-white rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${selectedEmployee.ticketsLeft === 0 ? 'bg-red-500' : 'bg-brand-900'}`}
                    style={{ width: `${(selectedEmployee.ticketsLeft / 20) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Historique des rechargements</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 text-brand-900" />
                      <span className="text-sm text-gray-700">Rechargement automatique</span>
                    </div>
                    <span className="text-sm text-gray-500">{selectedEmployee.lastRefill}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Ticket className="w-4 h-4 text-brand-900" />
                      <span className="text-sm text-gray-700">Création du carnet</span>
                    </div>
                    <span className="text-sm text-gray-500">{selectedEmployee.lastRefill}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setShowDetailModal(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">Fermer</button>
              <button onClick={() => { setShowDetailModal(false); setShowForceRefillModal(true); }} className="px-4 py-2 text-sm font-medium text-white bg-brand-900 hover:bg-brand-700 rounded-lg transition-colors">Forcer un rechargement</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Modifier l'employé</h2>
              <button onClick={() => setShowEditModal(false)} className="p-1 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5 text-gray-500" /></button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Prénom</label>
                  <input defaultValue={selectedEmployee.firstName} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Nom</label>
                  <input defaultValue={selectedEmployee.lastName} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 outline-none text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <input type="email" defaultValue={selectedEmployee.email} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 outline-none text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Téléphone</label>
                <input defaultValue={selectedEmployee.phone} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 outline-none text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Service</label>
                  <select defaultValue={selectedEmployee.service} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 outline-none text-sm bg-white">
                    <option>Commercial</option><option>Marketing</option><option>RH</option><option>IT</option><option>Finance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Type de contrat</label>
                  <select defaultValue={selectedEmployee.contractType} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 outline-none text-sm bg-white">
                    <option>CDI</option><option>CDD</option><option>Stage</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setShowEditModal(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">Annuler</button>
              <button onClick={() => setShowEditModal(false)} className="px-4 py-2 text-sm font-medium text-white bg-brand-900 hover:bg-brand-700 rounded-lg transition-colors">Enregistrer</button>
            </div>
          </div>
        </div>
      )}

      {/* Force Refill Modal */}
      {showForceRefillModal && selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Forcer un rechargement</h2>
              <button onClick={() => setShowForceRefillModal(false)} className="p-1 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5 text-gray-500" /></button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
                <div className="flex items-center gap-2 text-amber-700 mb-1">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-medium">Attention</span>
                </div>
                <p className="text-sm text-amber-700">Cette action crée un nouveau carnet de 20 tickets pour {selectedEmployee.firstName} {selectedEmployee.lastName}.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Nombre de tickets à ajouter</label>
                <input type="number" defaultValue={20} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 outline-none text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Motif (optionnel)</label>
                <textarea className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 outline-none text-sm resize-none h-20" placeholder="Ex: Carnet épuisé, demande employé..." />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setShowForceRefillModal(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">Annuler</button>
              <button onClick={() => setShowForceRefillModal(false)} className="px-4 py-2 text-sm font-medium text-white bg-brand-900 hover:bg-brand-700 rounded-lg transition-colors">Confirmer le rechargement</button>
            </div>
          </div>
        </div>
      )}

      {/* Suspend Confirm */}
      {showSuspendConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="px-6 py-6 text-center">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Confirmer l'action</h2>
              <p className="text-sm text-gray-500">Êtes-vous sûr de vouloir changer le statut de cet employé ?</p>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setShowSuspendConfirm(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">Annuler</button>
              <button onClick={() => { if (employeeToSuspend) { toggleStatus(employeeToSuspend); setShowSuspendConfirm(false); setEmployeeToSuspend(null); } }} className="px-4 py-2 text-sm font-medium text-white bg-brand-900 hover:bg-brand-700 rounded-lg transition-colors">Confirmer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
