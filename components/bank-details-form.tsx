"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Ghost } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

interface BankDetailsFormProps {
  onSubmit: (data: {
    bankName: string;
    accountNumber: string;
    routingNumber: string;
  }) => void;
}

export default function BankDetailsForm({ onSubmit }: BankDetailsFormProps) {
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [paymentReference, setPaymentReference] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ bankName, accountNumber, routingNumber });
  };

  const generatePaymentReference = () => {
    // Simula a geração de uma referência de pagamento (em um cenário real, isso viria de um backend)
    const ref = `REF-${Math.random()
      .toString(36)
      .substring(2, 10)
      .toUpperCase()}-${Date.now().toString().slice(-4)}`;
    setPaymentReference(ref);
    toast({
      title: "Referência Gerada!",
      description: "A referência de pagamento foi gerada com sucesso.",
    });
  };

  const copyToClipboard = () => {
    if (paymentReference) {
      navigator.clipboard.writeText(paymentReference);
      toast({
        title: "Copiado!",
        description:
          "A referência de pagamento foi copiada para a área de transferência.",
      });
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Dados Bancários</CardTitle>
        <CardDescription>
          Por favor, insira seus dados bancários para configurar seu perfil de
          investimento.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="bank-name">Nome do Banco</Label>
            <Input
              id="bank-name"
              placeholder="Ex: BAI"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="account-number">Número da Conta</Label>
            <Input
              id="account-number"
              placeholder="Ex: 12345-6"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="payment-reference">Referência de Pagamento</Label>
            <div className="flex gap-2">
              <Input
                id="payment-reference"
                value={paymentReference || "Clique em Gerar Referência"}
                readOnly
                className="flex-1"
              />
              <Button
                type="button"
                onClick={generatePaymentReference}
                disabled={!!paymentReference}
              >
                Gerar Referência
              </Button>
            </div>
            {paymentReference && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <span>
                  Sua referência:{" "}
                  <span className="font-semibold text-foreground">
                    {paymentReference}
                  </span>
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={copyToClipboard}
                  className="h-7 w-7"
                  aria-label="Copiar referência"
                >
                  {/* ✅ Alterado aqui para garantir 1 só filho */}
                  <span>
                    <Copy className="h-4 w-4" />
                  </span>
                </Button>
              </div>
            )}
          </div>
          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700"
          >
            Salvar Dados Bancários e Prosseguir
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Seus dados estão seguros e serão usados apenas para fins de
          investimento.
        </p>
      </CardFooter>
      <Toaster />
    </Card>
  );
}
