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
import QuickExportButton from "@/components/data-exporter-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Investment = {
  id: string;
  name: string;
  age: number;
  province: string;
  amount: number;
  bank: string;
  accountNumber: string;
  createdAt: string;
  profissao?: string;
};

export default function InvestorDashboard() {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [profissoes, setProfissoes] = useState<string[]>([]);
  const [selectedProfissao, setSelectedProfissao] = useState<string>("");

  // Buscar investimentos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/investment");
        const data = await res.json();
        setInvestments(data.data || []);
      } catch (error) {
        console.error("Erro ao buscar investimentos:", error);
      }
    };
    fetchData();
  }, []);

  // Buscar profissões
  useEffect(() => {
    const fetchProfissoes = async () => {
      try {
        const res = await fetch("/api/profissao");
        const data = await res.json();
        setProfissoes(data.data || []);
      } catch (error) {
        console.error("Erro ao buscar profissões:", error);
      }
    };
    fetchProfissoes();
  }, []);

  // Filtrar investimentos pela profissão selecionada
  const filteredInvestments = selectedProfissao
    ? investments.filter((i) => i.profissao === selectedProfissao)
    : investments;

  const now = new Date();
  const fiveDaysAgo = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000);
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const totalVictims = filteredInvestments.filter((i) => {
    const createdAt = new Date(i.createdAt);
    return createdAt >= fiveDaysAgo;
  }).length;

  const totalLoss = filteredInvestments.reduce(
    (sum, i) => sum + Number(i.amount),
    0
  );

  const recentCases = filteredInvestments.filter((i) => {
    const createdAt = new Date(i.createdAt);
    return createdAt >= oneDayAgo;
  }).length;

  return (
    <div className="w-full max-w-6xl mx-auto grid gap-6 p-4 sm:p-6">
      {/* Título + Botão */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center sm:text-left">
          Dashboard de Burlas Financeiras
        </h1>
        <Link href="/investir" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto" variant="default">
            Simular
          </Button>
        </Link>
      </div>

      {/* Resumo Geral */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm sm:text-base font-medium">
              Total de Vítimas Identificadas
            </CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold">{totalVictims}</div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Nos últimos 5 dias
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm sm:text-base font-medium">
              Prejuízo Total Estimado
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold text-red-600">
              {totalLoss.toLocaleString("pt-BR", {
                style: "currency",
                currency: "AOA",
              })}
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Valor total dos investimentos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm sm:text-base font-medium">
              Casos Recentes
            </CardTitle>
            <ShieldOff className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold">{recentCases}</div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Nas últimas 24h
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabela / Lista responsiva */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">
            Casos Reportados
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Perfil de vítimas e perdas financeiras com base nos dados reais.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Mobile → lista de cards */}
          <div className="block sm:hidden space-y-3">
            {filteredInvestments.map((i) => (
              <div
                key={i.id}
                className="p-3 rounded-lg border bg-muted/30 flex flex-col gap-1"
              >
                <p className="font-semibold">
                  {i.name} — {i.age} anos
                </p>
                <p className="text-sm text-muted-foreground">{i.province}</p>
                <p className="text-sm">{i.profissao}</p>
                <p className="text-sm font-bold text-red-600">
                  {i.amount.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "AOA",
                  })}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(i.createdAt).toLocaleDateString("pt-BR")}
                </p>
              </div>
            ))}
          </div>

          {/* Botões de exportação */}
          <div className="flex gap-2 my-3">
            <QuickExportButton
              config={{
                apiUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/investment`,
                filename: "vitimas_financeiras",
                title: "Vítimas Financeiras",
                columns: [
                  { key: "name", label: "Nome" },
                  { key: "province", label: "Província" },
                  { key: "profissao", label: "Profissão" },
                  { key: "createdAt", label: "Criado em" },
                ],
              }}
              format="excel"
              label="Exportar Excel"
            />

            <QuickExportButton
              config={{
                apiUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/investment`,
                filename: "vitimas_financeiras",
                title: "Vítimas Financeiras",
                columns: [
                  { key: "name", label: "Nome" },
                  { key: "province", label: "Província" },
                  { key: "profissao", label: "Profissão" },
                  { key: "createdAt", label: "Criado em" },
                ],
              }}
              format="pdf"
              label="Exportar PDF"
            />
          </div>

          {/* Tablet/Desktop → tabela */}
          <div className="hidden sm:block overflow-x-auto">
            <DataTableServer
              endpoint="/api/investment"
              columns={columns}
              titleColumn="name"
              titleLabel="Nome"
              filterField="profissao" // campo no banco
              filterLabel="Profissão" // rótulo no front
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
