import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Merchants from './pages/Merchants';
import Employees from './pages/Employees';
import Notebooks from './pages/Notebooks';
import Refunds from './pages/Refunds';
import Settings from './pages/Settings';
import Logs from './pages/Logs';
import Notifications from './pages/Notifications';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="merchants" element={<Merchants />} />
          <Route path="employees" element={<Employees />} />
          <Route path="notebooks" element={<Notebooks />} />
          <Route path="refunds" element={<Refunds />} />
          <Route path="settings" element={<Settings />} />
          <Route path="logs" element={<Logs />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
