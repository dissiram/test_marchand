import { useState } from 'react';
import {
  Search, Plus, Filter, MoreVertical, Briefcase, Mail, Phone, MapPin,
  FileText, DollarSign, ArrowLeftRight, Eye, Edit3, Ban, CheckCircle,
  X, AlertTriangle
} from 'lucide-react';
import { mockMerchants } from '../data/mock';

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

export default function Merchants() {
  const [merchants, setMerchants] = useState(mockMerchants);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('tous');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedMerchant, setSelectedMerchant] = useState<typeof mockMerchants[0] | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [showSuspendConfirm, setShowSuspendConfirm] = useState(false);
  const [merchantToSuspend, setMerchantToSuspend] = useState<string | null>(null);

  const filtered = merchants.filter((m) => {
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'tous' || m.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const toggleStatus = (id: string) => {
    setMerchants((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, status: m.status === 'actif' ? 'suspendu' : 'actif' }
          : m
      )
    );
  };

  const handleSuspend = (id: string) => {
    setMerchantToSuspend(id);
    setShowSuspendConfirm(true);
  };

  const confirmSuspend = () => {
    if (merchantToSuspend) {
      toggleStatus(merchantToSuspend);
      setShowSuspendConfirm(false);
      setMerchantToSuspend(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des marchands</h1>
          <p className="text-sm text-gray-500 mt-1">{merchants.length} marchands enregistrés</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-brand-900 text-white rounded-lg text-sm font-medium hover:bg-brand-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Inviter un marchand
        </button>
      </div>

      {/* Filters */}
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
            <option value="en attente">En attente</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-6 py-4 font-medium text-gray-600">Marchand</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600">Contact</th>
                <th className="text-left px-6 py-4 font-medium text-gray-600">Statut</th>
                <th className="text-right px-6 py-4 font-medium text-gray-600">Solde</th>
                <th className="text-center px-6 py-4 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-brand-100 flex items-center justify-center text-brand-900 font-semibold">
                        {m.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{m.name}</p>
                        <p className="text-xs text-gray-500">SIRET: {m.siret}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <Mail className="w-3.5 h-3.5" />
                        <span className="text-xs">{m.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <Phone className="w-3.5 h-3.5" />
                        <span className="text-xs">{m.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[m.status]}`}>
                      {statusLabels[m.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-gray-900">
                    {m.balance.toLocaleString()} FCFA
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => { setSelectedMerchant(m); setShowDetailModal(true); }}
                        className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-brand-900 transition-colors"
                        title="Voir le détail"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => { setSelectedMerchant(m); setShowEditModal(true); }}
                        className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-brand-900 transition-colors"
                        title="Modifier"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => { setSelectedMerchant(m); setShowRefundModal(true); }}
                        className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-brand-900 transition-colors"
                        title="Rembourser"
                      >
                        <ArrowLeftRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleSuspend(m.id)}
                        className={`p-1.5 hover:bg-gray-100 rounded-lg transition-colors ${m.status === 'actif' ? 'text-gray-500 hover:text-red-600' : 'text-gray-500 hover:text-green-600'}`}
                        title={m.status === 'actif' ? 'Suspendre' : 'Réactiver'}
                      >
                        {m.status === 'actif' ? <Ban className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
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
            <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Aucun marchand trouvé</p>
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Inviter un marchand</h2>
              <button onClick={() => setShowCreateModal(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Nom de l'entreprise</label>
                <input className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 outline-none text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <input type="email" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 outline-none text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Téléphone</label>
                <input className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 outline-none text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Adresse</label>
                <input className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 outline-none text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">SIRET</label>
                <input className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 outline-none text-sm" />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setShowCreateModal(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                Annuler
              </button>
              <button onClick={() => setShowCreateModal(false)} className="px-4 py-2 text-sm font-medium text-white bg-brand-900 hover:bg-brand-700 rounded-lg transition-colors">
                Envoyer l'invitation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedMerchant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Détail du marchand</h2>
              <button onClick={() => setShowDetailModal(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-brand-100 flex items-center justify-center text-brand-900 font-bold text-xl">
                  {selectedMerchant.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{selectedMerchant.name}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${statusColors[selectedMerchant.status]}`}>
                    {statusLabels[selectedMerchant.status]}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Mail className="w-4 h-4" />
                    <span className="text-xs">Email</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{selectedMerchant.email}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Phone className="w-4 h-4" />
                    <span className="text-xs">Téléphone</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{selectedMerchant.phone}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-xs">Adresse</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{selectedMerchant.address}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <FileText className="w-4 h-4" />
                    <span className="text-xs">SIRET</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{selectedMerchant.siret}</p>
                </div>
              </div>
              <div className="bg-brand-50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-brand-900 mb-2">
                  <DollarSign className="w-5 h-5" />
                  <span className="font-semibold">Détail financier</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Solde actuel</span>
                  <span className="text-lg font-bold text-gray-900">{selectedMerchant.balance.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-600">Dernier remboursement</span>
                  <span className="text-sm font-medium text-gray-900">{selectedMerchant.lastRefund || 'Aucun'}</span>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setShowDetailModal(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                Fermer
              </button>
              <button onClick={() => { setShowDetailModal(false); setShowRefundModal(true); }} className="px-4 py-2 text-sm font-medium text-white bg-brand-900 hover:bg-brand-700 rounded-lg transition-colors">
                Lancer un remboursement
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedMerchant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Modifier le marchand</h2>
              <button onClick={() => setShowEditModal(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Nom</label>
                <input defaultValue={selectedMerchant.name} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 outline-none text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <input type="email" defaultValue={selectedMerchant.email} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 outline-none text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Téléphone</label>
                <input defaultValue={selectedMerchant.phone} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 outline-none text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Adresse</label>
                <input defaultValue={selectedMerchant.address} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 outline-none text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">SIRET</label>
                <input defaultValue={selectedMerchant.siret} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 outline-none text-sm" />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setShowEditModal(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                Annuler
              </button>
              <button onClick={() => setShowEditModal(false)} className="px-4 py-2 text-sm font-medium text-white bg-brand-900 hover:bg-brand-700 rounded-lg transition-colors">
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Refund Modal */}
      {showRefundModal && selectedMerchant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Remboursement</h2>
              <button onClick={() => setShowRefundModal(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="bg-brand-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">Marchand</p>
                <p className="font-semibold text-gray-900">{selectedMerchant.name}</p>
                <p className="text-sm text-gray-600 mt-2">Solde à rembourser</p>
                <p className="text-lg font-bold text-gray-900">{selectedMerchant.balance.toLocaleString()} FCFA</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Montant</label>
                <input type="number" defaultValue={selectedMerchant.balance} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 outline-none text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Mode de remboursement</label>
                <select className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 outline-none text-sm bg-white">
                  <option>Virement</option>
                  <option>Espèces</option>
                  <option>Chèque</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Référence de paiement</label>
                <input placeholder="Ex: VIR-2025-XXXX" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 outline-none text-sm" />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setShowRefundModal(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                Annuler
              </button>
              <button onClick={() => setShowRefundModal(false)} className="px-4 py-2 text-sm font-medium text-white bg-brand-900 hover:bg-brand-700 rounded-lg transition-colors">
                Valider le remboursement
              </button>
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
              <p className="text-sm text-gray-500">Êtes-vous sûr de vouloir changer le statut de ce marchand ?</p>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setShowSuspendConfirm(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                Annuler
              </button>
              <button onClick={confirmSuspend} className="px-4 py-2 text-sm font-medium text-white bg-brand-900 hover:bg-brand-700 rounded-lg transition-colors">
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
