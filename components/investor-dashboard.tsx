import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, UserX, ShieldOff } from "lucide-react";

// Dados fictícios
const summary = {
  totalVictims: 238,
  totalLoss: 15473250.0,
  recentCases: 12,
};

const victimProfiles = [
  {
    id: 1,
    name: "João M.",
    age: 52,
    city: "Luanda",
    type: "Falso Investimento",
    loss: 250000.0,
  },
  {
    id: 2,
    name: "Maria A.",
    age: 38,
    city: "Benguela",
    type: "Criptomoeda Fraudulenta",
    loss: 785000.0,
  },
  {
    id: 3,
    name: "Carlos T.",
    age: 47,
    city: "Huíla",
    type: "Golpe via WhatsApp",
    loss: 18250.0,
  },
  {
    id: 4,
    name: "Ana P.",
    age: 29,
    city: "Lubango",
    type: "Falso Empréstimo",
    loss: 97000.0,
  },
];

const recentActions = [
  {
    id: 1,
    type: "Alerta",
    description: "Golpe com promessas de lucro rápido via Instagram",
    date: "2025-08-05",
  },
  {
    id: 2,
    type: "Bloqueio",
    description: "Encerramento de página falsa no Facebook",
    date: "2025-08-04",
  },
  {
    id: 3,
    type: "Denúncia",
    description: "Relato de burla com uso do nome de instituição bancária",
    date: "2025-08-03",
  },
];

export default function ScamVictimDashboard() {
  return (
    <div className="w-full max-w-6xl mx-auto grid gap-6 p-4 md:p-6">
      <h1 className="text-3xl font-bold mb-4">
        Dashboard de Burlas Financeiras
      </h1>

      {/* Resumo Geral */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Vítimas Identificadas
            </CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.totalVictims}</div>
            <p className="text-xs text-muted-foreground">
              Desde Janeiro de 2025
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Prejuízo Total Estimado
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {summary.totalLoss.toLocaleString("pt-BR", {
                style: "currency",
                currency: "AOA",
              })}
            </div>
            <p className="text-xs text-muted-foreground">
              Valores estimados pelas denúncias
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Casos Recentes
            </CardTitle>
            <ShieldOff className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.recentCases}</div>
            <p className="text-xs text-muted-foreground">Nos últimos 7 dias</p>
          </CardContent>
        </Card>
      </div>

      {/* Perfil das Vítimas */}
      <Card>
        <CardHeader>
          <CardTitle>Casos Reportados</CardTitle>
          <CardDescription>
            Perfil de vítimas e perdas financeiras.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Idade</TableHead>
                <TableHead>Cidade</TableHead>
                <TableHead>Tipo de Burla</TableHead>
                <TableHead className="text-right">Perda Estimada</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {victimProfiles.map((v) => (
                <TableRow key={v.id}>
                  <TableCell>{v.name}</TableCell>
                  <TableCell>{v.age}</TableCell>
                  <TableCell>{v.city}</TableCell>
                  <TableCell>
                    <Badge variant="destructive">{v.type}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {v.loss.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "AOA",
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Ações Recentes */}
      {/* <Card>
        <CardHeader>
          <CardTitle>Ações Recentes de Prevenção</CardTitle>
          <CardDescription>
            Medidas tomadas para combater golpes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead className="text-right">Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentActions.map((action) => (
                <TableRow key={action.id}>
                  <TableCell>
                    <Badge
                      variant={
                        action.type === "Bloqueio"
                          ? "default"
                          : action.type === "Denúncia"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {action.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{action.description}</TableCell>
                  <TableCell className="text-right">{action.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card> */}
    </div>
  );
}
