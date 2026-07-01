import { useState } from 'react';
import { Ticket, Clock, Users, BookOpen, Mail, AlertTriangle, Save, X } from 'lucide-react';
import { config } from '../data/mock';

export default function Settings() {
  const [settings, setSettings] = useState(config);
  const [showSaved, setShowSaved] = useState(false);

  const handleSave = () => {
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 3000);
  };

  const updateSetting = (key: keyof typeof settings, value: number | boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Configuration générale</h1>
          <p className="text-sm text-gray-500 mt-1">Paramètres du système de tickets</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2.5 bg-brand-900 text-white rounded-lg text-sm font-medium hover:bg-brand-700 transition-colors"
        >
          <Save className="w-4 h-4" />
          Enregistrer
        </button>
      </div>

      {showSaved && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3 text-green-700">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
            <Save className="w-4 h-4" />
          </div>
          <div>
            <p className="font-medium">Configuration enregistrée</p>
            <p className="text-sm">Les paramètres ont été mis à jour avec succès.</p>
          </div>
          <button onClick={() => setShowSaved(false)} className="ml-auto p-1 hover:bg-green-100 rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ticket price */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center">
              <Ticket className="w-5 h-5 text-brand-900" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Prix du ticket</h2>
              <p className="text-sm text-gray-500">Prix unitaire d'un ticket</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <input
                type="number"
                value={settings.ticketPrice}
                onChange={(e) => updateSetting('ticketPrice', parseInt(e.target.value))}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 outline-none text-sm"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">FCFA</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">Prix actuel appliqué à tous les nouveaux tickets</p>
        </div>

        {/* Manual code validity */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center">
              <Clock className="w-5 h-5 text-brand-900" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Validité code manuel</h2>
              <p className="text-sm text-gray-500">Durée de validité d'un code manuel</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <input
                type="number"
                value={settings.manualCodeValidity}
                onChange={(e) => updateSetting('manualCodeValidity', parseInt(e.target.value))}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 outline-none text-sm"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">minutes</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">Après ce délai, le code ne sera plus valide</p>
        </div>

        {/* Auto registration */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center">
              <Users className="w-5 h-5 text-brand-900" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Auto-inscription</h2>
              <p className="text-sm text-gray-500">Permettre l'auto-inscription des employés</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => updateSetting('autoRegistration', !settings.autoRegistration)}
              className={`relative w-14 h-7 rounded-full transition-colors ${settings.autoRegistration ? 'bg-brand-900' : 'bg-gray-200'}`}
            >
              <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform ${settings.autoRegistration ? 'translate-x-7' : 'translate-x-0.5'}`} />
            </button>
            <span className="text-sm font-medium text-gray-700">
              {settings.autoRegistration ? 'Activée' : 'Désactivée'}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-2">Les employés peuvent s'inscrire sans invitation</p>
        </div>

        {/* Default notebook size */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-brand-900" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Taille du carnet</h2>
              <p className="text-sm text-gray-500">Nombre de tickets par carnet par défaut</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <input
                type="number"
                value={settings.defaultNotebookSize}
                onChange={(e) => updateSetting('defaultNotebookSize', parseInt(e.target.value))}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 outline-none text-sm"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">tickets</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">Taille appliquée aux nouveaux carnets créés</p>
        </div>

        {/* Invitation expiry */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center">
              <Mail className="w-5 h-5 text-brand-900" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Expiration des invitations</h2>
              <p className="text-sm text-gray-500">Durée de validité des liens d'invitation</p>
            </div>
          </div>
          <div className="flex items-center gap-4 max-w-md">
            <div className="relative flex-1">
              <input
                type="number"
                value={settings.invitationExpiry}
                onChange={(e) => updateSetting('invitationExpiry', parseInt(e.target.value))}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-brand-900 focus:ring-2 focus:ring-brand-900/10 outline-none text-sm"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">heures</span>
            </div>
          </div>
          <div className="mt-4 bg-amber-50 rounded-lg p-4 border border-amber-100">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-700">Information importante</p>
                <p className="text-sm text-amber-600 mt-1">
                  Les invitations expirées devront être renouvelées manuellement. Les employés et marchands dont l'invitation a expiré ne pourront pas activer leur compte.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
