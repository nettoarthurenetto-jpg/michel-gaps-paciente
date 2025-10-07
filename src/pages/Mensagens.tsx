import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle } from "lucide-react";

interface Conversation {
  id: string;
  doctorName: string;
  doctorPhoto?: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  unreadCount?: number;
}

// Dados de exemplo
const mockConversations: Conversation[] = [
  {
    id: "1",
    doctorName: "Dr. Carlos Silva",
    lastMessage: "Ok, combinado. Fico no aguardo...",
    timestamp: "Ontem",
    unread: true,
    unreadCount: 2,
  },
  {
    id: "2",
    doctorName: "Dra. Maria Santos",
    lastMessage: "Não esqueça de tomar o medicamento às 8h",
    timestamp: "14:30",
    unread: false,
  },
  {
    id: "3",
    doctorName: "Clínica São Lucas",
    lastMessage: "Sua consulta está confirmada para amanhã",
    timestamp: "Ter",
    unread: true,
    unreadCount: 1,
  },
];

export default function Mensagens() {
  const [conversations] = useState<Conversation[]>(mockConversations);
  const navigate = useNavigate();

  const handleConversationClick = (conversationId: string) => {
    navigate(`/mensagens/${conversationId}`);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-foreground">Mensagens</h1>
        </div>
      </header>

      {/* Lista de Conversas */}
      <ScrollArea className="h-[calc(100vh-8rem)]">
        {conversations.length === 0 ? (
          // Estado Vazio
          <div className="flex flex-col items-center justify-center h-full py-12 px-4 text-center">
            <MessageCircle className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-lg">
              Suas conversas com seus médicos aparecerão aqui.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => handleConversationClick(conversation.id)}
                className="w-full p-4 hover:bg-accent transition-colors flex items-start gap-3 text-left"
              >
                {/* Foto do Médico */}
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={conversation.doctorPhoto} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getInitials(conversation.doctorName)}
                    </AvatarFallback>
                  </Avatar>
                  {conversation.unread && (
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full border-2 border-background" />
                  )}
                </div>

                {/* Conteúdo da Conversa */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-foreground truncate">
                      {conversation.doctorName}
                    </h3>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {conversation.timestamp}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <p
                      className={`text-sm truncate ${
                        conversation.unread
                          ? "text-foreground font-medium"
                          : "text-muted-foreground"
                      }`}
                    >
                      {conversation.lastMessage}
                    </p>
                    {conversation.unread && conversation.unreadCount && (
                      <Badge
                        variant="destructive"
                        className="h-5 min-w-5 px-1.5 text-xs rounded-full"
                      >
                        {conversation.unreadCount}
                      </Badge>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
