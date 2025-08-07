"use client";

import { useEffect, useState } from "react";
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
import { DataTableServer } from "@/components/data-table-server";
import { columns } from "@/components/tables/investment/columns";

type Investment = {
  id: string;
  name: string;
  age: number;
  province: string;
  amount: number;
  bank: string;
  accountNumber: string;
  createdAt: string;
};

export default function InvestorDashboard() {
  const [investments, setInvestments] = useState<Investment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/investment");
        const data = await res.json();
        console.log("Dados recebidos da API:", data); // <- Aqui o console.log
        setInvestments(data.data || []);
      } catch (error) {
        console.error("Erro ao buscar investimentos:", error);
      }
    };

    fetchData();
  }, []);

  const totalVictims = investments.length;
  const totalLoss = investments.reduce((sum, i) => sum + Number(i.amount), 0);
  const recentCases = investments.slice(-5).length;

  return (
    <div className="w-full max-w-6xl mx-auto grid gap-6 p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">
        Dashboard de Burlas Financeiras
      </h1>

      {/* Resumo Geral */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Vítimas Identificadas
            </CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalVictims}</div>
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
              {totalLoss.toLocaleString("pt-BR", {
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
            <div className="text-2xl font-bold">{recentCases}</div>
            <p className="text-xs text-muted-foreground">
              Nos últimos registos
            </p>
          </CardContent>
        </Card>
      </div>

      {/* ✅ Tabela de Casos com dados reais da API */}
      <Card>
        <CardHeader>
          <CardTitle>Casos Reportados</CardTitle>
          <CardDescription>
            Perfil de vítimas e perdas financeiras com base nos dados reais.
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <DataTableServer
            endpoint="/api/investment"
            columns={columns}
            titleColumn="name"
            titleLabel="Nome"
          />
        </CardContent>
      </Card>
    </div>
  );
}
