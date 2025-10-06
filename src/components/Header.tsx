import { useState } from "react";
import { User, Bell, LogOut, UserCircle, Camera, ChevronRight, Shield, CreditCard, BellRing, Palette, HelpCircle, FileText, Lock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface HeaderProps {
  userName?: string;
  userAvatar?: string;
  hasNotifications?: boolean;
}

export default function Header({ 
  userName = "Maria", 
  userAvatar,
  hasNotifications = true 
}: HeaderProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [fullProfileOpen, setFullProfileOpen] = useState(false);

  const handleLogout = () => {
    // Implementar lógica de logout aqui
    console.log("Logout");
    setProfileOpen(false);
  };

  const handleProfile = () => {
    setProfileOpen(false);
    setFullProfileOpen(true);
  };

  const handleEditAvatar = () => {
    console.log("Editar avatar");
  };

  const menuItems = [
    {
      section: "Minha Conta",
      items: [
        { icon: UserCircle, label: "Dados Pessoais", action: () => console.log("Dados Pessoais") },
        { icon: CreditCard, label: "Informações de Convênio", action: () => console.log("Convênio") },
        { icon: Shield, label: "Segurança", action: () => console.log("Segurança") },
      ]
    },
    {
      section: "Configurações do App",
      items: [
        { icon: BellRing, label: "Notificações", action: () => console.log("Notificações") },
        { icon: Palette, label: "Aparência", action: () => console.log("Aparência") },
      ]
    },
    {
      section: "Ajuda e Informações",
      items: [
        { icon: HelpCircle, label: "Ajuda e Feedback", action: () => console.log("Ajuda") },
        { icon: FileText, label: "Termos de Serviço", action: () => console.log("Termos") },
        { icon: Lock, label: "Política de Privacidade", action: () => console.log("Privacidade") },
      ]
    }
  ];

  return (
    <header className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent py-6 px-6">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Olá, {userName}! 👋
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Como você está hoje?
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="relative p-2 hover:bg-muted rounded-full transition-colors">
            <Bell className="h-5 w-5 text-foreground" />
            {hasNotifications && (
              <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-destructive text-[10px]">
                3
              </Badge>
            )}
          </button>
          
          <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
            <DialogTrigger asChild>
              <button className="rounded-full">
                <Avatar className="h-10 w-10 border-2 border-primary/20 cursor-pointer hover:border-primary/40 transition-colors">
                  <AvatarImage src={userAvatar} alt={userName} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {userName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Minha Conta</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-3 py-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-3 h-12"
                  onClick={handleProfile}
                >
                  <UserCircle className="h-5 w-5" />
                  Meu Perfil
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-3 h-12 text-destructive hover:text-destructive"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                  Sair do App
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={fullProfileOpen} onOpenChange={setFullProfileOpen}>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Meu Perfil</DialogTitle>
              </DialogHeader>
              
              {/* Header do Perfil */}
              <div className="flex flex-col items-center gap-4 py-6">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-4 border-primary/20">
                    <AvatarImage src={userAvatar} alt={userName} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                      {userName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <button
                    onClick={handleEditAvatar}
                    className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 hover:bg-primary/90 transition-colors shadow-md"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold">{userName} Silva</h3>
                  <p className="text-sm text-muted-foreground">maria.silva@email.com</p>
                </div>
              </div>

              <Separator />

              {/* Seções do Menu */}
              <div className="space-y-6 py-4">
                {menuItems.map((section, idx) => (
                  <div key={idx} className="space-y-2">
                    <h4 className="text-sm font-semibold text-muted-foreground px-2">
                      {section.section}
                    </h4>
                    <div className="space-y-1">
                      {section.items.map((item, itemIdx) => (
                        <button
                          key={itemIdx}
                          onClick={item.action}
                          className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <item.icon className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
                            <span className="text-sm font-medium">{item.label}</span>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Botão Sair */}
              <div className="py-4">
                <Button
                  variant="destructive"
                  className="w-full h-12 gap-2"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                  Sair do Aplicativo
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
