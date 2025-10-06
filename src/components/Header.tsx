import { useState } from "react";
import { User, Bell, LogOut, UserCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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

  const handleLogout = () => {
    // Implementar lógica de logout aqui
    console.log("Logout");
    setProfileOpen(false);
  };

  const handleProfile = () => {
    // Navegar para perfil
    console.log("Ir para perfil");
    setProfileOpen(false);
  };

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
        </div>
      </div>
    </header>
  );
}
