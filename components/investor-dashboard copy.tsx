import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, Wallet } from 'lucide-react';

// Dados de exemplo para o dashboard
const portfolioSummary = {
  totalValue: 150000.75,
  dailyChange: 1250.20,
  dailyChangePercent: 0.84,
};

const investments = [
  { id: 1, name: "Ações XYZ", type: "Ações", quantity: 100, purchasePrice: 50.00, currentPrice: 55.25, value: 5525.00, change: 10.50 },
  { id: 2, name: "Fundo Imobiliário ABC", type: "FII", quantity: 50, purchasePrice: 100.00, currentPrice: 102.50, value: 5125.00, change: 2.50 },
  { id: 3, name: "Tesouro Selic 2025", type: "Renda Fixa", quantity: 1, purchasePrice: 10000.00, currentPrice: 10150.00, value: 10150.00, change: 1.50 },
  { id: 4, name: "CDB Banco Digital", type: "Renda Fixa", quantity: 1, purchasePrice: 20000.00, currentPrice: 20080.00, value: 20080.00, change: 0.40 },
];

const recentTransactions = [
  { id: 1, type: "Compra", asset: "Ações XYZ", amount: 5000.00, date: "2024-07-28" },
  { id: 2, type: "Venda", asset: "Fundo Imobiliário ABC", amount: 2000.00, date: "2024-07-25" },
  { id: 3, type: "Depósito", asset: "Conta Corrente", amount: 10000.00, date: "2024-07-20" },
];

export default function InvestorDashboard() {
  return (
    <div className="w-full max-w-6xl mx-auto grid gap-6 p-4 md:p-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard do Investidor</h1>

      {/* Resumo do Portfólio */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Total do Portfólio</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {portfolioSummary.totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </div>
            <p className="text-xs text-muted-foreground">
              +20.1% desde o mês passado
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Variação Diária</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${portfolioSummary.dailyChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {portfolioSummary.dailyChange.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </div>
            <p className={`text-xs ${portfolioSummary.dailyChangePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {portfolioSummary.dailyChangePercent.toFixed(2)}%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rendimentos</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {/* Mock value for earnings */}
              {1500.00.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </div>
            <p className="text-xs text-muted-foreground">
              +5.2% desde o último rendimento
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Meus Investimentos */}
      <Card>
        <CardHeader>
          <CardTitle>Meus Investimentos</CardTitle>
          <CardDescription>Visão geral dos seus ativos atuais.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ativo</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Preço Médio</TableHead>
                <TableHead>Preço Atual</TableHead>
                <TableHead>Valor Total</TableHead>
                <TableHead className="text-right">Variação (%)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {investments.map((investment) => (
                <TableRow key={investment.id}>
                  <TableCell className="font-medium">{investment.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{investment.type}</Badge>
                  </TableCell>
                  <TableCell>{investment.quantity}</TableCell>
                  <TableCell>{investment.purchasePrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
                  <TableCell>{investment.currentPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
                  <TableCell>{investment.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
                  <TableCell className={`text-right ${investment.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {investment.change.toFixed(2)}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Transações Recentes */}
      <Card>
        <CardHeader>
          <CardTitle>Transações Recentes</CardTitle>
          <CardDescription>Suas últimas atividades de investimento.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo</TableHead>
                <TableHead>Ativo</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead className="text-right">Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <Badge variant={transaction.type === "Compra" ? "default" : transaction.type === "Venda" ? "destructive" : "secondary"}>
                      {transaction.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{transaction.asset}</TableCell>
                  <TableCell>{transaction.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
                  <TableCell className="text-right">{transaction.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
