import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Send, Paperclip } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "patient" | "doctor";
  timestamp: string;
}

// Dados de exemplo
const mockConversations = {
  "1": {
    doctorName: "Dr. Carlos Silva",
    doctorPhoto: undefined,
    messages: [
      {
        id: "1",
        text: "Olá! Como você está se sentindo hoje?",
        sender: "doctor" as const,
        timestamp: "14:20",
      },
      {
        id: "2",
        text: "Estou melhor, obrigado! A dor diminuiu bastante.",
        sender: "patient" as const,
        timestamp: "14:22",
      },
      {
        id: "3",
        text: "Ótimo! Continue tomando a medicação como prescrito.",
        sender: "doctor" as const,
        timestamp: "14:25",
      },
      {
        id: "4",
        text: "Ok, combinado. Fico no aguardo...",
        sender: "patient" as const,
        timestamp: "Ontem",
      },
    ],
  },
  "2": {
    doctorName: "Dra. Maria Santos",
    doctorPhoto: undefined,
    messages: [
      {
        id: "1",
        text: "Bom dia! Lembre-se de tomar o medicamento.",
        sender: "doctor" as const,
        timestamp: "08:00",
      },
      {
        id: "2",
        text: "Não esqueça de tomar o medicamento às 8h",
        sender: "doctor" as const,
        timestamp: "14:30",
      },
    ],
  },
  "3": {
    doctorName: "Clínica São Lucas",
    doctorPhoto: undefined,
    messages: [
      {
        id: "1",
        text: "Sua consulta está confirmada para amanhã",
        sender: "doctor" as const,
        timestamp: "Ter",
      },
    ],
  },
};

export default function ConversationDetail() {
  const { conversationId } = useParams<{ conversationId: string }>();
  const navigate = useNavigate();
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const conversation = conversationId ? mockConversations[conversationId as keyof typeof mockConversations] : null;

  useEffect(() => {
    if (conversation) {
      setMessages(conversation.messages);
    }
  }, [conversation]);

  useEffect(() => {
    // Auto-scroll to bottom when messages change
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  if (!conversation) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Conversa não encontrada</p>
      </div>
    );
  }

  const handleSendMessage = () => {
    if (messageText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: messageText,
        sender: "patient",
        timestamp: new Date().toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMessage]);
      setMessageText("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/mensagens")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Avatar className="h-10 w-10">
            <AvatarImage src={conversation.doctorPhoto} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {getInitials(conversation.doctorName)}
            </AvatarFallback>
          </Avatar>
          <h1 className="text-lg font-semibold text-foreground">
            {conversation.doctorName}
          </h1>
        </div>
      </header>

      {/* Messages Area */}
      <ScrollArea className="flex-1 h-[calc(100vh-8rem)]" ref={scrollAreaRef}>
        <div className="container mx-auto px-4 py-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "patient" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                  message.sender === "patient"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <span
                  className={`text-xs mt-1 block ${
                    message.sender === "patient"
                      ? "text-primary-foreground/70"
                      : "text-muted-foreground"
                  }`}
                >
                  {message.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="sticky bottom-0 bg-card border-t border-border">
        <div className="container mx-auto px-4 py-3 flex items-end gap-2">
          <Button variant="ghost" size="icon" className="shrink-0">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Textarea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Digite sua mensagem..."
            className="min-h-[44px] max-h-[120px] resize-none"
            rows={1}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!messageText.trim()}
            size="icon"
            className="shrink-0"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
