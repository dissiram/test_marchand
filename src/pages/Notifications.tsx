import { useState } from 'react';
import {
  Bell, AlertTriangle, Info, CheckCircle, Clock, X, AlertCircle,
  BookOpen, TrendingUp, Shield, Eye, Trash2
} from 'lucide-react';
import { mockNotifications } from '../data/mock';

const typeIcons: Record<string, React.ElementType> = {
  alert: AlertTriangle,
  info: Info,
  warning: AlertCircle,
};

const typeColors: Record<string, string> = {
  alert: 'bg-red-100 text-red-700',
  info: 'bg-blue-100 text-blue-700',
  warning: 'bg-amber-100 text-amber-700',
};

const typeLabels: Record<string, string> = {
  alert: 'Alerte',
  info: 'Information',
  warning: 'Avertissement',
};

export default function Notifications() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState('tous');

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const filtered = notifications.filter((n) => {
    if (filter === 'tous') return true;
    if (filter === 'non-lus') return !n.read;
    return n.type === filter;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-sm text-gray-500 mt-1">
            {unreadCount > 0 ? `${unreadCount} notification${unreadCount > 1 ? 's' : ''} non lue${unreadCount > 1 ? 's' : ''}` : 'Aucune notification non lue'}
          </p>
        </div>
        <button
          onClick={markAllRead}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:border-gray-300 transition-colors"
        >
          <CheckCircle className="w-4 h-4" />
          Tout marquer comme lu
        </button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {[
          { value: 'tous', label: 'Toutes' },
          { value: 'non-lus', label: 'Non lues' },
          { value: 'alert', label: 'Alertes' },
          { value: 'info', label: 'Infos' },
          { value: 'warning', label: 'Avertissements' },
        ].map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f.value
                ? 'bg-brand-900 text-white'
                : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-100">
          {filtered.map((n) => {
            const Icon = typeIcons[n.type] || Bell;
            return (
              <div
                key={n.id}
                className={`flex items-start gap-4 px-6 py-4 hover:bg-gray-50/50 transition-colors ${!n.read ? 'bg-brand-50/40' : ''}`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${typeColors[n.type]}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-gray-900">{n.title}</h3>
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-brand-900" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{n.message}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="w-3.5 h-3.5" />
                    {n.date}
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  {!n.read && (
                    <button
                      onClick={() => markRead(n.id)}
                      className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-brand-900 transition-colors"
                      title="Marquer comme lu"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(n.id)}
                    className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-red-600 transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Aucune notification</p>
          </div>
        )}
      </div>
    </div>
  );
}
