"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { AlertTriangle, UserX, ShieldOff } from "lucide-react";
import { DataTableServer } from "@/components/data-table-server";
import { columns } from "@/components/tables/investment/columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

  const now_vitims = new Date();
  const fiveDaysAgo = new Date(now_vitims.getTime() - 5 * 24 * 60 * 60 * 1000);

  const totalVictims = investments.filter((i) => {
    const createdAt = new Date(i.createdAt);
    return createdAt >= fiveDaysAgo;
  }).length;

  const totalLoss = investments.reduce((sum, i) => sum + Number(i.amount), 0);

  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const recentCases = investments.filter((i) => {
    const createdAt = new Date(i.createdAt);
    return createdAt >= oneDayAgo;
  }).length;

  return (
    <div className="w-full max-w-6xl mx-auto grid gap-6 p-4 md:p-6">
      {/* Título + Botão */}
      <div className="flex flex-col gap-2 mb-4">
        <h1 className="text-2xl md:text-3xl font-bold">
          Dashboard de Burlas Financeiras
        </h1>
        <Link href="/investir">
          <Button className="w-full sm:w-50" variant="default">
            Simular
          </Button>
        </Link>
      </div>

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
            <p className="text-xs text-muted-foreground">Nos últimos 5 dias</p>
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
              Valor total dos investimentos
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
            <p className="text-xs text-muted-foreground">Nas últimas 24h</p>
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
