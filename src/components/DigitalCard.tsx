import { useState, useEffect } from "react";
import { X, QrCode } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DigitalCardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userName?: string;
  userAvatar?: string;
}

export default function DigitalCard({ 
  open, 
  onOpenChange,
  userName = "Maria Silva",
  userAvatar 
}: DigitalCardProps) {
  const [qrCodeKey, setQrCodeKey] = useState(0);

  // Atualiza o QR Code a cada 30 segundos para segurança
  useEffect(() => {
    if (open) {
      const interval = setInterval(() => {
        setQrCodeKey(prev => prev + 1);
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [open]);

  const memberId = "12345678-9";
  const birthDate = "15/03/1985";
  const memberSince = "Out/2025";
  const insurance = "Unimed Regional";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 gap-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 overflow-hidden">
        {/* Botão Fechar */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 rounded-full z-10"
          onClick={() => onOpenChange(false)}
        >
          <X className="h-5 w-5" />
        </Button>

        <div className="p-8 space-y-6">
          {/* Cabeçalho com Logo */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-primary-light rounded-2xl shadow-lg mb-2">
              <span className="text-3xl font-bold text-primary-foreground">G</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground">GAPS</h2>
            <p className="text-sm text-muted-foreground">Carteirinha Digital</p>
          </div>

          {/* Card da Carteirinha */}
          <div className="bg-card rounded-2xl shadow-xl border border-border overflow-hidden">
            {/* Header do Card */}
            <div className="bg-gradient-to-r from-primary to-primary-light p-6 text-primary-foreground">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20 border-4 border-primary-foreground/20">
                  <AvatarImage src={userAvatar} alt={userName} />
                  <AvatarFallback className="bg-primary-foreground/10 text-primary-foreground text-2xl">
                    {userName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold mb-1">{userName}</h3>
                  <p className="text-sm opacity-90">ID GAPS: {memberId}</p>
                </div>
              </div>
            </div>

            {/* Corpo do Card */}
            <div className="p-6 space-y-6">
              {/* Informações do Paciente */}
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">Data de Nascimento</span>
                  <span className="text-sm font-medium">{birthDate}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">Convênio</span>
                  <span className="text-sm font-medium">{insurance}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-muted-foreground">Membro Desde</span>
                  <span className="text-sm font-medium">{memberSince}</span>
                </div>
              </div>

              {/* QR Code */}
              <div className="flex flex-col items-center gap-3 py-6 bg-muted/30 rounded-xl">
                <div className="relative">
                  <div className="w-40 h-40 bg-background rounded-lg flex items-center justify-center shadow-inner">
                    <QrCode 
                      key={qrCodeKey}
                      className="w-32 h-32 text-foreground" 
                    />
                  </div>
                  {/* Indicador de atualização */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full shadow-md">
                    Código Dinâmico
                  </div>
                </div>
                <p className="text-xs text-muted-foreground text-center max-w-[200px]">
                  Apresente este código na recepção para identificação rápida
                </p>
              </div>

              {/* Rodapé de Segurança */}
              <div className="text-center pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  🔒 Código atualizado automaticamente a cada 30 segundos
                </p>
              </div>
            </div>
          </div>

          {/* Botão Fechar Inferior */}
          <Button 
            variant="outline" 
            className="w-full h-12"
            onClick={() => onOpenChange(false)}
          >
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
