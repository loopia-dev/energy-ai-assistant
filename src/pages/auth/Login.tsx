import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { switchRole } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      // Default to master for demo
      switchRole('master');
      navigate('/master');
    }, 1000);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Branding */}
      <div className="hidden w-1/2 bg-energy-dark lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="flex items-center gap-3">
          <Zap className="h-10 w-10 text-primary" />
          <span className="text-2xl font-semibold text-white">EnergyAI</span>
        </div>
        <div>
          <h1 className="text-4xl font-bold leading-tight text-white">
            Assistente de IA
            <br />
            para o setor energético
          </h1>
          <p className="mt-4 text-lg text-white/70">
            Respostas instantâneas para questões técnicas, comerciais e operacionais
            do mercado de energia em Portugal.
          </p>
        </div>
        <p className="text-sm text-white/50">
          © 2024 EnergyAI. Todos os direitos reservados.
        </p>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <div className="flex items-center gap-2">
              <Zap className="h-8 w-8 text-primary" />
              <span className="text-xl font-semibold">EnergyAI</span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground">
              Bem-vindo de volta
            </h2>
            <p className="mt-2 text-muted-foreground">
              Introduza as suas credenciais para aceder à plataforma.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.pt"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/auth/recuperar-password"
                  className="text-sm text-primary hover:underline"
                >
                  Esqueceu a password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'A entrar...' : 'Entrar'}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Primeiro acesso?{' '}
            <Link to="/auth/primeiro-acesso" className="text-primary hover:underline">
              Defina a sua password
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
