import { Star, Trophy, Flame, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";

interface Game {
  id: string;
  name: string;
  icon: string;
  description: string;
  personalBest?: number;
}

export default function MenteAtiva() {
  const userStats = {
    points: 1250,
    level: 5,
    streak: 7,
  };

  const games: Game[] = [
    {
      id: "1",
      name: "Jogo da Memória",
      icon: "🎴",
      description: "Encontre os pares de cartas",
      personalBest: 45,
    },
    {
      id: "2",
      name: "Caminho Lógico",
      icon: "🧩",
      description: "Complete o caminho com lógica",
      personalBest: 82,
    },
    {
      id: "3",
      name: "Quebra-Cabeça",
      icon: "🧩",
      description: "Monte a imagem completa",
      personalBest: 120,
    },
    {
      id: "4",
      name: "Palavras Cruzadas",
      icon: "📝",
      description: "Complete as palavras",
      personalBest: 67,
    },
    {
      id: "5",
      name: "Sequência Numérica",
      icon: "🔢",
      description: "Encontre o padrão dos números",
    },
    {
      id: "6",
      name: "Diferenças",
      icon: "🔍",
      description: "Encontre as diferenças nas imagens",
    },
  ];

  const todayChallenge = {
    game: "Jogo da Memória",
    description: "Encontre 5 pares em menos de 1 minuto!",
    reward: "+50 pontos",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header userName="Maria" />

      <main className="px-6 py-4 max-w-md mx-auto pb-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">Mente Ativa 🧠</h1>
          <p className="text-sm text-muted-foreground">
            Desafios diários para fortalecer sua memória e raciocínio
          </p>
        </div>

        {/* Progress Card */}
        <Card className="mb-6 shadow-[var(--shadow-card)] bg-gradient-to-r from-accent/10 to-accent/5 border-accent/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-14 w-14 rounded-full bg-accent/20 flex items-center justify-center">
                  <Trophy className="h-7 w-7 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Seus Pontos</p>
                  <p className="text-2xl font-bold">{userStats.points}</p>
                  <p className="text-xs text-muted-foreground">Nível {userStats.level}</p>
                </div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Flame className="h-5 w-5 text-warning" />
                  <span className="text-2xl font-bold">{userStats.streak}</span>
                </div>
                <p className="text-xs text-muted-foreground">dias seguidos</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < userStats.level
                      ? "text-warning fill-warning"
                      : "text-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Today's Challenge */}
        <Card className="mb-6 shadow-[var(--shadow-card)] border-primary/30 bg-gradient-to-r from-primary/10 to-primary/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl">🎯</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold">Desafio de Hoje</h3>
                  <Badge variant="secondary" className="bg-primary/20 text-primary border-0">
                    {todayChallenge.reward}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {todayChallenge.game}: {todayChallenge.description}
                </p>
                <Button variant="gradient" size="sm">
                  <Play className="h-4 w-4 mr-1" />
                  Aceitar Desafio
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Games Grid */}
        <div>
          <h2 className="text-lg font-semibold mb-4 px-1">Escolha seu jogo</h2>
          <div className="grid grid-cols-2 gap-3">
            {games.map((game) => (
              <Card
                key={game.id}
                className="shadow-sm hover:shadow-md transition-all cursor-pointer border-border/50 group"
              >
                <CardHeader className="pb-3">
                  <div className="text-5xl mb-2 text-center group-hover:scale-110 transition-transform">
                    {game.icon}
                  </div>
                  <CardTitle className="text-sm text-center leading-tight">
                    {game.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs text-muted-foreground text-center mb-3">
                    {game.description}
                  </p>
                  {game.personalBest && (
                    <div className="text-center">
                      <Badge variant="outline" className="text-xs">
                        🏆 Melhor: {game.personalBest}
                      </Badge>
                    </div>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-3"
                  >
                    <Play className="h-3 w-3 mr-1" />
                    Jogar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
