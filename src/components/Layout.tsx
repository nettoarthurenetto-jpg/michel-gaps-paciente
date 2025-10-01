import { ReactNode } from "react";
import { useLocation, Link } from "react-router-dom";
import { Home, Pill, FileText, Gift, Brain } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { icon: Home, label: "Início", path: "/" },
  { icon: Pill, label: "Tratamentos", path: "/tratamentos" },
  { icon: FileText, label: "Documentos", path: "/documentos" },
  { icon: Gift, label: "Benefícios", path: "/beneficios" },
  { icon: Brain, label: "Mente Ativa", path: "/mente-ativa" },
];

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background pb-20">
      {children}
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-50">
        <div className="flex justify-around items-center h-16 max-w-md mx-auto px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-all ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "scale-110" : ""}`} />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
