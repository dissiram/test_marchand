import { useState } from 'react';
import {
  CreditCard, Calendar, DollarSign, ArrowRight, CheckCircle, Download, Search, X,
  FileText, ChevronDown
} from 'lucide-react';
import { mockMerchants, mockRefunds } from '../data/mock';

export default function Refunds() {
  const [merchants] = useState(mockMerchants);
  const [refunds, setRefunds] = useState(mockRefunds);
  const [search, setSearch] = useState('');
  const [selectedMerchant, setSelectedMerchant] = useState<typeof mockMerchants[0] | null>(null);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [periodStart, setPeriodStart] = useState('2025-06-01');
  const [periodEnd, setPeriodEnd] = useState('2025-06-15');
  const [showExportMenu, setShowExportMenu] = useState(false);

  const activeMerchants = merchants.filter(m => m.status === 'actif');

  const filteredMerchants = activeMerchants.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalDue = filteredMerchants.reduce((sum, m) => sum + m.balance, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Remboursements</h1>
          <p className="text-sm text-gray-500 mt-1">Gestion des remboursements aux marchands</p>
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

      {/* Period selector */}
      <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Période de début</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="date"
                value={periodStart}
                onChange={(e) => setPeriodStart(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 outline-none text-sm"
              />
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Période de fin</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="date"
                value={periodEnd}
                onChange={(e) => setPeriodEnd(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 outline-none text-sm"
              />
            </div>
          </div>
          <button
            onClick={() => {}}
            className="px-4 py-2.5 bg-brand-900 text-white rounded-lg text-sm font-medium hover:bg-brand-700 transition-colors"
          >
            Calculer le montant dû
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-brand-900" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Montant total dû</p>
              <p className="text-xl font-bold text-gray-900">{totalDue.toLocaleString()} FCFA</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Remboursements effectués</p>
              <p className="text-xl font-bold text-gray-900">{refunds.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Montant total remboursé</p>
              <p className="text-xl font-bold text-gray-900">{refunds.reduce((s, r) => s + r.amount, 0).toLocaleString()} FCFA</p>
            </div>
          </div>
        </div>
      </div>

      {/* Merchants to refund */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Marchands à rembourser</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher..."
              className="pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 outline-none"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-6 py-3 font-medium text-gray-600">Marchand</th>
                <th className="text-right px-6 py-3 font-medium text-gray-600">Solde dû</th>
                <th className="text-right px-6 py-3 font-medium text-gray-600">Dernier remb.</th>
                <th className="text-center px-6 py-3 font-medium text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredMerchants.map((m) => (
                <tr key={m.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-brand-100 flex items-center justify-center text-brand-900 font-semibold text-sm">
                        {m.name.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-900">{m.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-right font-semibold text-gray-900">
                    {m.balance.toLocaleString()} FCFA
                  </td>
                  <td className="px-6 py-3 text-right text-sm text-gray-500">
                    {m.lastRefund || '—'}
                  </td>
                  <td className="px-6 py-3 text-center">
                    <button
                      onClick={() => { setSelectedMerchant(m); setShowRefundModal(true); }}
                      className="px-3 py-1.5 text-sm font-medium text-white bg-brand-900 hover:bg-brand-700 rounded-lg transition-colors"
                    >
                      Rembourser
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Refund history */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Historique des remboursements</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-6 py-3 font-medium text-gray-600">Marchand</th>
                <th className="text-right px-6 py-3 font-medium text-gray-600">Montant</th>
                <th className="text-left px-6 py-3 font-medium text-gray-600">Date</th>
                <th className="text-left px-6 py-3 font-medium text-gray-600">Mode</th>
                <th className="text-left px-6 py-3 font-medium text-gray-600">Référence</th>
                <th className="text-center px-6 py-3 font-medium text-gray-600">Statut</th>
              </tr>
            </thead>
            <tbody>
              {refunds.map((r) => (
                <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-3 font-medium text-gray-900">{r.merchant}</td>
                  <td className="px-6 py-3 text-right font-semibold text-gray-900">{r.amount.toLocaleString()} FCFA</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{r.date}</td>
                  <td className="px-6 py-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      {r.method}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-600 font-mono">{r.reference}</td>
                  <td className="px-6 py-3 text-center">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Refund Modal */}
      {showRefundModal && selectedMerchant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Lancer un remboursement</h2>
              <button onClick={() => setShowRefundModal(false)} className="p-1 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5 text-gray-500" /></button>
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
              <button onClick={() => setShowRefundModal(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">Annuler</button>
              <button onClick={() => setShowRefundModal(false)} className="px-4 py-2 text-sm font-medium text-white bg-brand-900 hover:bg-brand-700 rounded-lg transition-colors">Valider le paiement</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
