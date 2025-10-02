import { useState } from "react";
import { Pill, Clock, Plus, Calendar as CalendarIcon, ArrowLeft, Trash2, FileText, Play, TrendingUp, Award, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  instructions: string;
  times: string[];
  enabled: boolean;
  doctor: string;
  prescriptionDate: string;
}

export default function Tratamentos() {
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: "1",
      name: "Losartana",
      dosage: "50mg",
      instructions: "1 comprimido após o café da manhã",
      times: ["08:00", "20:00"],
      enabled: true,
      doctor: "Dr(a). Michel Santos",
      prescriptionDate: "15/01/2025",
    },
    {
      id: "2",
      name: "Metformina",
      dosage: "850mg",
      instructions: "1 comprimido antes do almoço",
      times: ["12:00"],
      enabled: true,
      doctor: "Dr(a). Michel Santos",
      prescriptionDate: "15/01/2025",
    },
    {
      id: "3",
      name: "Sinvastatina",
      dosage: "20mg",
      instructions: "1 comprimido antes de dormir",
      times: ["22:00"],
      enabled: false,
      doctor: "Dr(a). Michel Santos",
      prescriptionDate: "15/01/2025",
    },
  ]);

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editedTimes, setEditedTimes] = useState<string[]>([]);
  const [editedEnabled, setEditedEnabled] = useState(false);
  const [newTime, setNewTime] = useState("");
  const [hasChanges, setHasChanges] = useState(false);

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

  const handleOpenDialog = (med: Medication) => {
    setSelectedMedication(med);
    setEditedTimes([...med.times]);
    setEditedEnabled(med.enabled);
    setHasChanges(false);
    setDialogOpen(true);
  };

  const handleAddTime = () => {
    if (newTime && !editedTimes.includes(newTime)) {
      setEditedTimes([...editedTimes, newTime]);
      setNewTime("");
      setHasChanges(true);
    }
  };

  const handleRemoveTime = (time: string) => {
    setEditedTimes(editedTimes.filter(t => t !== time));
    setHasChanges(true);
  };

  const handleToggleEnabled = (checked: boolean) => {
    setEditedEnabled(checked);
    setHasChanges(true);
  };

  const handleSaveChanges = () => {
    if (selectedMedication) {
      setMedications(medications.map(med => 
        med.id === selectedMedication.id 
          ? { ...med, times: editedTimes, enabled: editedEnabled }
          : med
      ));
      setDialogOpen(false);
    }
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
              <Card 
                key={med.id} 
                className="shadow-[var(--shadow-card)] border-border/50 cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => handleOpenDialog(med)}
              >
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
                    <Switch 
                      checked={med.enabled} 
                      onClick={(e) => e.stopPropagation()}
                    />
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
            {/* Estatísticas de Adesão */}
            <div className="grid grid-cols-3 gap-3">
              <Card className="shadow-[var(--shadow-card)] border-primary/20">
                <CardContent className="p-4 text-center">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-2xl font-bold text-primary">87%</p>
                  <p className="text-xs text-muted-foreground">Taxa de Adesão</p>
                </CardContent>
              </Card>

              <Card className="shadow-[var(--shadow-card)] border-warning/20">
                <CardContent className="p-4 text-center">
                  <div className="h-10 w-10 rounded-full bg-warning/10 flex items-center justify-center mx-auto mb-2">
                    <Award className="h-5 w-5 text-warning" />
                  </div>
                  <p className="text-2xl font-bold text-warning">7</p>
                  <p className="text-xs text-muted-foreground">Dias Seguidos</p>
                </CardContent>
              </Card>

              <Card className="shadow-[var(--shadow-card)] border-success/20">
                <CardContent className="p-4 text-center">
                  <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-2">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  </div>
                  <p className="text-2xl font-bold text-success">156</p>
                  <p className="text-xs text-muted-foreground">Doses Tomadas</p>
                </CardContent>
              </Card>
            </div>

            {/* Calendário de Adesão */}
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

            {/* Atividades Recentes */}
            <Card className="shadow-[var(--shadow-card)]">
              <CardHeader>
                <CardTitle className="text-lg">Atividades Recentes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-success/5 border border-success/20">
                  <div className="h-8 w-8 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">Losartana 50mg</p>
                    <p className="text-xs text-muted-foreground">Tomado às 08:00 - Hoje</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-success/5 border border-success/20">
                  <div className="h-8 w-8 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">Metformina 850mg</p>
                    <p className="text-xs text-muted-foreground">Tomado às 12:00 - Hoje</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-warning/5 border border-warning/20">
                  <div className="h-8 w-8 rounded-full bg-warning/10 flex items-center justify-center shrink-0">
                    <AlertCircle className="h-4 w-4 text-warning" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">Losartana 50mg</p>
                    <p className="text-xs text-muted-foreground">Atrasado - 20:00 esperado</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                  <div className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                    <XCircle className="h-4 w-4 text-destructive" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">Sinvastatina 20mg</p>
                    <p className="text-xs text-muted-foreground">Não tomado - Ontem às 22:00</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl flex items-center gap-2">
                <Pill className="h-5 w-5 text-primary" />
                {selectedMedication?.name} {selectedMedication?.dosage}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Informações da Prescrição */}
              <div className="space-y-3">
                <h3 className="font-semibold text-base">Informações da Prescrição</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <Label className="text-muted-foreground">Instruções</Label>
                    <p className="mt-1">{selectedMedication?.instructions}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Médico Prescritor</Label>
                    <p className="mt-1">{selectedMedication?.doctor}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Data da Prescrição</Label>
                    <p className="mt-1">{selectedMedication?.prescriptionDate}</p>
                  </div>
                  <Button variant="outline" size="sm" className="mt-2 w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    Ver Receita Original
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Gerenciar Lembretes */}
              <div className="space-y-4">
                <h3 className="font-semibold text-base">Meus Lembretes</h3>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="enable-reminders">Ativar Lembretes para este Medicamento</Label>
                  <Switch
                    id="enable-reminders"
                    checked={editedEnabled}
                    onCheckedChange={handleToggleEnabled}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Horários</Label>
                  <div className="space-y-2">
                    {editedTimes.map((time, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary" />
                          <span className="font-medium">{time}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveTime(time)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Input
                    type="time"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    placeholder="Selecione um horário"
                  />
                  <Button onClick={handleAddTime} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Saiba Mais */}
              <div className="space-y-3">
                <h3 className="font-semibold text-base">Saiba Mais</h3>
                <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Play className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Assista a um vídeo sobre a {selectedMedication?.name}</p>
                      <p className="text-xs text-muted-foreground">Aprenda mais sobre este medicamento</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <DialogFooter>
              <Button 
                onClick={handleSaveChanges} 
                disabled={!hasChanges}
                className="w-full"
              >
                Salvar Alterações
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
