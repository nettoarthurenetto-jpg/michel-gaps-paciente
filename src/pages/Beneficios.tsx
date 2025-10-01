import { useState } from "react";
import { Search, MapPin, Tag, QrCode, Phone, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";

interface Partner {
  id: string;
  name: string;
  category: string;
  discount: string;
  distance: string;
  logo: string;
}

export default function Beneficios() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { id: "farmacia", label: "Farmácias", icon: "💊" },
    { id: "laboratorio", label: "Laboratórios", icon: "🔬" },
    { id: "nutricao", label: "Nutrição", icon: "🥗" },
    { id: "fitness", label: "Fitness", icon: "🏃" },
    { id: "consultas", label: "Consultas", icon: "👨‍⚕️" },
  ];

  const partners: Partner[] = [
    {
      id: "1",
      name: "Farmácia Saúde Total",
      category: "farmacia",
      discount: "15% em medicamentos",
      distance: "2,5 km",
      logo: "💊",
    },
    {
      id: "2",
      name: "Laboratório Exame Fácil",
      category: "laboratorio",
      discount: "20% em todos os exames",
      distance: "1,8 km",
      logo: "🔬",
    },
    {
      id: "3",
      name: "Nutri Vida",
      category: "nutricao",
      discount: "10% em consultas",
      distance: "3,2 km",
      logo: "🥗",
    },
    {
      id: "4",
      name: "Academia Viva Bem",
      category: "fitness",
      discount: "25% na mensalidade",
      distance: "1,2 km",
      logo: "🏃",
    },
    {
      id: "5",
      name: "Clínica Santa Clara",
      category: "consultas",
      discount: "15% em consultas especializadas",
      distance: "4,5 km",
      logo: "👨‍⚕️",
    },
  ];

  const filteredPartners = partners.filter((partner) => {
    const matchesSearch = partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         partner.discount.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || partner.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header userName="Maria" />

      <main className="px-6 py-4 max-w-md mx-auto pb-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">Clube de Benefícios GAPS</h1>
          <p className="text-sm text-muted-foreground">Economize no cuidado com a sua saúde</p>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por parceiro ou serviço..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
              className="whitespace-nowrap"
            >
              <span className="mr-1">{cat.icon}</span>
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Partners List */}
        <div className="space-y-3">
          {filteredPartners.map((partner) => (
            <Card 
              key={partner.id}
              className="shadow-sm hover:shadow-md transition-all cursor-pointer border-border/50"
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center text-3xl shrink-0">
                    {partner.logo}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-1 line-clamp-1">
                      {partner.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-0">
                        <Tag className="h-3 w-3 mr-1" />
                        {partner.discount}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{partner.distance}</span>
                    </div>
                  </div>

                  <Button variant="outline" size="sm">
                    Ver detalhes
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Example Benefit Detail Card */}
        {filteredPartners.length > 0 && (
          <Card className="mt-6 shadow-[var(--shadow-card)] border-primary/20">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center text-4xl">
                  💊
                </div>
                <div className="flex-1">
                  <CardTitle className="mb-1">Farmácia Saúde Total</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    15% de desconto em todos os medicamentos genéricos
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-muted/50 text-center">
                <p className="text-xs text-muted-foreground mb-2">QR Code do Benefício</p>
                <div className="h-32 w-32 mx-auto bg-background rounded-lg flex items-center justify-center">
                  <QrCode className="h-20 w-20 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Apresente no caixa para usar o desconto
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Como usar:</h4>
                <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                  <li>Apresente o QR Code acima no caixa</li>
                  <li>Aguarde a validação do desconto</li>
                  <li>Aproveite sua economia!</li>
                </ol>
              </div>

              <div className="space-y-2 pt-4 border-t">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>Rua das Flores, 123 - Centro</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>(11) 3456-7890</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span>www.farmaciasaudetotal.com.br</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
