import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  Ticket,
  Store,
  RotateCcw,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  ChevronDown,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { mockRevenueData, mockTopMerchants, mockTopEmployees } from '../data/mock';

function KPICard({ title, value, icon: Icon, trend, trendUp, subtitle, onClick }: {
  title: string;
  value: string;
  icon: React.ElementType;
  trend: string;
  trendUp: boolean;
  subtitle: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border border-gray-100 p-6 shadow-sm ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-lg bg-brand-50 flex items-center justify-center">
          <Icon className="w-6 h-6 text-brand-900" />
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${trendUp ? 'text-green-600' : 'text-red-500'}`}>
          {trendUp ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
          {trend}
        </div>
      </div>
      <h3 className="text-3xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [period, setPeriod] = useState('30j');
  const [showPeriodMenu, setShowPeriodMenu] = useState(false);

  const totalRevenue = mockRevenueData.reduce((sum, d) => sum + d.ca, 0);
  const totalTickets = mockRevenueData.reduce((sum, d) => sum + d.tickets, 0);
  const activeMerchants = 7;
  const totalRefund = 2450000;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-sm text-gray-500 mt-1">Vue d'ensemble de l'activité</p>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowPeriodMenu(!showPeriodMenu)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-gray-300 transition-colors"
          >
            <Calendar className="w-4 h-4" />
            {period === '30j' ? '30 derniers jours' : period === '7j' ? '7 derniers jours' : 'Aujourd\'hui'}
            <ChevronDown className="w-4 h-4" />
          </button>
          {showPeriodMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
              {['30j', '7j', 'today'].map((p) => (
                <button
                  key={p}
                  onClick={() => { setPeriod(p); setShowPeriodMenu(false); }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                >
                  {p === '30j' ? '30 derniers jours' : p === '7j' ? '7 derniers jours' : 'Aujourd\'hui'}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Chiffre d'affaires"
          value={`${totalRevenue.toLocaleString()} FCFA`}
          icon={TrendingUp}
          trend="+12.5%"
          trendUp={true}
          subtitle="vs période précédente"
        />
        <KPICard
          title="Tickets vendus"
          value={totalTickets.toLocaleString()}
          icon={Ticket}
          trend="+8.3%"
          trendUp={true}
          subtitle="vs période précédente"
        />
        <KPICard
          title="Marchands actifs"
          value={activeMerchants.toString()}
          icon={Store}
          trend="+2"
          trendUp={true}
          subtitle="sur 10 marchands total"
          onClick={() => navigate('/merchants')}
        />
        <KPICard
          title="À rembourser"
          value={`${totalRefund.toLocaleString()} FCFA`}
          icon={RotateCcw}
          trend="-5.2%"
          trendUp={false}
          subtitle="tous marchands confondus"
          onClick={() => navigate('/refunds')}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Évolution du chiffre d'affaires</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockRevenueData}>
                <defs>
                  <linearGradient id="caGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#133215" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#133215" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(v) => new Date(v).getDate().toString()}
                  tick={{ fontSize: 12, fill: '#9ca3af' }}
                  axisLine={{ stroke: '#e5e7eb' }}
                />
                <YAxis
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                  tick={{ fontSize: 12, fill: '#9ca3af' }}
                  axisLine={{ stroke: '#e5e7eb' }}
                />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: '1px solid #e5e7eb', fontSize: 13 }}
                  formatter={(value: number) => [`${value.toLocaleString()} FCFA`, 'CA']}
                  labelFormatter={(label) => new Date(label).toLocaleDateString('fr-FR')}
                />
                <Area
                  type="monotone"
                  dataKey="ca"
                  stroke="#133215"
                  strokeWidth={2}
                  fill="url(#caGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top merchants */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Top 5 marchands</h2>
          <div className="space-y-4">
            {mockTopMerchants.map((m, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-900 font-bold text-sm">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{m.name}</p>
                  <p className="text-xs text-gray-500">{m.tickets} tickets</p>
                </div>
                <p className="text-sm font-semibold text-gray-900">{m.ca.toLocaleString()} F</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate('/merchants')}
            className="w-full mt-4 py-2 text-sm font-medium text-brand-900 hover:bg-brand-50 rounded-lg transition-colors"
          >
            Voir tous les marchands
          </button>
        </div>
      </div>

      {/* Top employees + quick actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Top 5 employés actifs</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockTopEmployees} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 12, fill: '#374151' }} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: '1px solid #e5e7eb', fontSize: 13 }}
                  formatter={(value: number) => [`${value} commandes`, '']}
                />
                <Bar dataKey="orders" fill="#133215" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Accès rapide</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Marchands', path: '/merchants', icon: Store, color: 'bg-brand-50 text-brand-900' },
              { label: 'Employés', path: '/employees', icon: TrendingUp, color: 'bg-brand-50 text-brand-900' },
              { label: 'Carnets', path: '/notebooks', icon: Ticket, color: 'bg-brand-50 text-brand-900' },
              { label: 'Remboursements', path: '/refunds', icon: RotateCcw, color: 'bg-brand-50 text-brand-900' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="flex flex-col items-center gap-3 p-5 rounded-xl border border-gray-100 hover:border-brand-400 hover:shadow-sm transition-all"
                >
                  <div className={`w-12 h-12 rounded-lg ${item.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
