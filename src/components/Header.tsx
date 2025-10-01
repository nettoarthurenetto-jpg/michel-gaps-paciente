import { User, Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

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
          
          <Avatar className="h-10 w-10 border-2 border-primary/20">
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {userName.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
