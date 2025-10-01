import { useState } from "react";
import { Pill, Clock, Plus, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import Header from "@/components/Header";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  instructions: string;
  times: string[];
  enabled: boolean;
}

export default function Tratamentos() {
  const [medications] = useState<Medication[]>([
    {
      id: "1",
      name: "Losartana",
      dosage: "50mg",
      instructions: "1 comprimido após o café da manhã",
      times: ["08:00", "20:00"],
      enabled: true,
    },
    {
      id: "2",
      name: "Metformina",
      dosage: "850mg",
      instructions: "1 comprimido antes do almoço",
      times: ["12:00"],
      enabled: true,
    },
    {
      id: "3",
      name: "Sinvastatina",
      dosage: "20mg",
      instructions: "1 comprimido antes de dormir",
      times: ["22:00"],
      enabled: false,
    },
  ]);

  const [date, setDate] = useState<Date | undefined>(new Date());

  // Simulação de dias com diferentes status de adesão
  const adherenceDays = {
    complete: [1, 2, 5, 6, 7, 9, 12, 13, 14, 16],
    partial: [3, 8, 10, 15],
    missed: [4, 11],
  };

  const getDayColor = (day: Date) => {
    const dayOfMonth = day.getDate();
    if (adherenceDays.complete.includes(dayOfMonth)) return "bg-success/20 text-success hover:bg-success/30";
    if (adherenceDays.partial.includes(dayOfMonth)) return "bg-warning/20 text-warning hover:bg-warning/30";
    if (adherenceDays.missed.includes(dayOfMonth)) return "bg-destructive/20 text-destructive hover:bg-destructive/30";
    return "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header userName="Maria" />

      <main className="px-6 py-4 max-w-md mx-auto pb-6">
        <h1 className="text-2xl font-bold mb-6">Meus Tratamentos</h1>

        <Tabs defaultValue="atuais" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="atuais">Tratamentos Atuais</TabsTrigger>
            <TabsTrigger value="historico">Histórico de Uso</TabsTrigger>
          </TabsList>

          <TabsContent value="atuais" className="space-y-4">
            {medications.map((med) => (
              <Card key={med.id} className="shadow-[var(--shadow-card)] border-border/50">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                        <Pill className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{med.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{med.dosage}</p>
                      </div>
                    </div>
                    <Switch checked={med.enabled} />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    {med.instructions}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {med.times.map((time, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-muted text-sm"
                      >
                        <Clock className="h-3 w-3" />
                        {time}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button 
              variant="outline" 
              size="lg" 
              className="w-full border-dashed border-2 hover:border-primary hover:bg-primary/5"
            >
              <Plus className="h-5 w-5 mr-2" />
              Adicionar medicamento
            </Button>
          </TabsContent>

          <TabsContent value="historico" className="space-y-4">
            <Card className="shadow-[var(--shadow-card)]">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                  Calendário de Adesão
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border w-full"
                  modifiers={{
                    complete: (day) => adherenceDays.complete.includes(day.getDate()),
                    partial: (day) => adherenceDays.partial.includes(day.getDate()),
                    missed: (day) => adherenceDays.missed.includes(day.getDate()),
                  }}
                  modifiersClassNames={{
                    complete: getDayColor(new Date(2024, 0, 1)),
                    partial: getDayColor(new Date(2024, 0, 3)),
                    missed: getDayColor(new Date(2024, 0, 4)),
                  }}
                />
                
                <div className="mt-6 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-4 w-4 rounded bg-success/40" />
                    <span>Todos os medicamentos tomados</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-4 w-4 rounded bg-warning/40" />
                    <span>Parcialmente tomados</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-4 w-4 rounded bg-destructive/40" />
                    <span>Nenhum medicamento tomado</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
