import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from './components/PageTransition';
import PrivateRoute from './components/PrivateRoute';
import MobileMenu from './components/MobileMenu';
import './styles/global.css';

// Import all pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import TransactionDetails from './pages/TransactionDetails';
import WireTransfer from './pages/WireTransfer';
import LocalTransfer from './pages/LocalTransfer';
import InternalTransfer from './pages/InternalTransfer';
import BuyCrypto from './pages/BuyCrypto';
import PayBills from './pages/PayBills';
import AddBeneficiary from './pages/AddBeneficiary';
import CardDeposit from './pages/CardDeposit';
import SavingsStatement from './pages/SavingsStatement';
import CheckingStatement from './pages/CheckingStatement';
import FirstAlert from './pages/FirstAlert';
import FirstLoans from './pages/FirstLoans';
import FirstInvestments from './pages/FirstInvestments';
import FirstSupport from './pages/FirstSupport';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import UserManagement from './pages/admin/UserManagement';
import SecuritySettings from './pages/admin/SecuritySettings';
import AuditLogs from './pages/admin/AuditLogs';
import Profile from './pages/Profile';
import PersonalInfo from './pages/PersonalInfo';
import Notifications from './pages/Notifications';
import Support from './pages/Support';
import UserGuides from './pages/UserGuides';
import VideoTutorials from './pages/VideoTutorials';

// SEO Meta Data for different routes
const routeMetaData = {
  '/': {
    title: 'Login | FundMeBank',
    description: 'Secure login to your FundMeBank account',
    keywords: 'login, banking, secure, account',
  },
  '/signup': {
    title: 'Sign Up | FundMeBank',
    description: 'Create a new FundMeBank account',
    keywords: 'signup, register, banking, account',
  },
  '/dashboard': {
    title: 'Dashboard | FundMeBank',
    description: 'Manage your finances with FundMeBank dashboard',
    keywords: 'dashboard, banking, finance, account',
  },
  '/transactions': {
    title: 'Transactions | FundMeBank',
    description: 'View and manage your transaction history',
    keywords: 'transactions, history, banking, finance',
  },
  '/admin': {
    title: 'Admin Dashboard | FundMeBank',
    description: 'Administrative tools for FundMeBank',
    keywords: 'admin, management, banking, finance',
  },
  '/support': {
    title: 'Support | FundMeBank',
    description: 'Get help and support for your FundMeBank account',
    keywords: 'support, help, banking, customer service',
  },
  '/wire-transfer': {
    title: 'Wire Transfer | FundMeBank',
    description: 'Send money securely with wire transfer',
    keywords: 'wire transfer, send money, banking, finance',
  },
};

function AppContent() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const metaData = routeMetaData[location.pathname] || {
    title: 'FundMeBank',
    description: 'Secure and modern banking platform',
    keywords: 'banking, finance, secure, modern',
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <Helmet>
        <title>{metaData.title}</title>
        <meta name="description" content={metaData.description} />
        <meta name="keywords" content={metaData.keywords} />
        <meta property="og:title" content={metaData.title} />
        <meta property="og:description" content={metaData.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaData.title} />
        <meta name="twitter:description" content={metaData.description} />
        <link rel="canonical" href={window.location.href} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <PageTransition>
            <Routes location={location} key={location.pathname}>
              {/* Public Routes */}
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/signup" element={<Signup />} />

              {/* Protected User Routes */}
              <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
              <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
              <Route path="/personal-info" element={<PrivateRoute element={<PersonalInfo />} />} />
              <Route path="/notifications" element={<PrivateRoute element={<Notifications />} />} />
              <Route path="/support" element={<PrivateRoute element={<Support />} />} />
              <Route path="/transactions" element={<PrivateRoute element={<Transactions />} />} />
              <Route path="/transactions/:id" element={<PrivateRoute element={<TransactionDetails />} />} />
              <Route path="/wire-transfer" element={<PrivateRoute element={<WireTransfer />} />} />
              <Route path="/local-transfer" element={<PrivateRoute element={<LocalTransfer />} />} />
              <Route path="/internal-transfer" element={<PrivateRoute element={<InternalTransfer />} />} />
              <Route path="/buy-crypto" element={<PrivateRoute element={<BuyCrypto />} />} />
              <Route path="/pay-bills" element={<PrivateRoute element={<PayBills />} />} />
              <Route path="/add-beneficiary" element={<PrivateRoute element={<AddBeneficiary />} />} />
              <Route path="/card-deposit" element={<PrivateRoute element={<CardDeposit />} />} />
              <Route path="/savings-statement" element={<PrivateRoute element={<SavingsStatement />} />} />
              <Route path="/checking-statement" element={<PrivateRoute element={<CheckingStatement />} />} />
              <Route path="/first-alert" element={<PrivateRoute element={<FirstAlert />} />} />
              <Route path="/first-loans" element={<PrivateRoute element={<FirstLoans />} />} />
              <Route path="/first-investments" element={<PrivateRoute element={<FirstInvestments />} />} />
              <Route path="/first-support" element={<PrivateRoute element={<FirstSupport />} />} />
              <Route path="/help/guides" element={<PrivateRoute element={<UserGuides />} />} />
              <Route path="/help/tutorials" element={<PrivateRoute element={<VideoTutorials />} />} />

              {/* Protected Admin Routes */}
              <Route path="/admin" element={<PrivateRoute element={<AdminDashboard />} requireAdmin={true} />} />
              <Route path="/admin/users" element={<PrivateRoute element={<UserManagement />} requireAdmin={true} />} />
              <Route path="/admin/security" element={<PrivateRoute element={<SecuritySettings />} requireAdmin={true} />} />
              <Route path="/admin/audit" element={<PrivateRoute element={<AuditLogs />} requireAdmin={true} />} />
            </Routes>
          </PageTransition>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <AppContent />
      </Router>
    </HelmetProvider>
  );
}

export default App; 