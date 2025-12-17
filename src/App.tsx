import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Auth pages
import Login from "./pages/auth/Login";
import PasswordRecovery from "./pages/auth/PasswordRecovery";
import FirstAccess from "./pages/auth/FirstAccess";

// Master pages
import MasterDashboard from "./pages/master/MasterDashboard";
import TenantsManagement from "./pages/master/TenantsManagement";
import GlobalTraining from "./pages/master/GlobalTraining";
import GlobalMetrics from "./pages/master/GlobalMetrics";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import OpenAIIntegration from "./pages/admin/OpenAIIntegration";
import UsersManagement from "./pages/admin/UsersManagement";
import TenantTraining from "./pages/admin/TenantTraining";
import TenantMetrics from "./pages/admin/TenantMetrics";

// Agent pages
import AgentChat from "./pages/agent/AgentChat";
import AgentHelp from "./pages/agent/AgentHelp";

// Shared pages
import Billing from "./pages/Billing";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Auth Routes */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/recuperar-password" element={<PasswordRecovery />} />
            <Route path="/auth/primeiro-acesso" element={<FirstAccess />} />

            {/* Master Routes */}
            <Route path="/master" element={<MasterDashboard />} />
            <Route path="/master/tenants" element={<TenantsManagement />} />
            <Route path="/master/training" element={<GlobalTraining />} />
            <Route path="/master/metrics" element={<GlobalMetrics />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/openai" element={<OpenAIIntegration />} />
            <Route path="/admin/users" element={<UsersManagement />} />
            <Route path="/admin/training" element={<TenantTraining />} />
            <Route path="/admin/metrics" element={<TenantMetrics />} />

            {/* Agent Routes */}
            <Route path="/agent" element={<AgentChat />} />
            <Route path="/agent/help" element={<AgentHelp />} />

            {/* Shared Routes */}
            <Route path="/billing" element={<Billing />} />

            {/* Redirects */}
            <Route path="/" element={<Navigate to="/master" replace />} />
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
