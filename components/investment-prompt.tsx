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
import { Loader2 } from "lucide-react";

import InvestmentGains from "./investment-gains";

export default function InvestmentPrompt() {
  const [loading, setLoading] = useState(false);
  const [showHello, setShowHello] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setShowHello(true);
      setLoading(false);
    }, 800); // pequeno delay para simular carregamento
  };

  if (showHello) {
    return <InvestmentGains />;
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl mx-auto">
      {/* Card da imagem */}
      <Card className="flex-1 overflow-hidden">
        <img
          src="/financeiro.avif"
          alt="Investimento"
          className="w-full h-full object-cover"
        />
      </Card>

      {/* Card do conteúdo */}
      <Card className="flex-1">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Pronto para Investir?</CardTitle>
          <CardDescription>
            Olá! Sou um analista financeiro registado pela CMC e ofereço aqui
            uma chance exclusiva para investires com acesso privilegiado.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-2">
          <p>
            Algumas acções vão disparar nas próximas semanas e só os grandes
            investidores têm essa informação!
          </p>
          <p>
            Com um depósito de AKZ50.000, poderás ganhar um retorno de mais de
            AKZ250.000!
          </p>
          <p>Clique no botão abaixo se estiveres interessado!</p>
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button className="w-full" onClick={handleClick} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Carregando...
              </>
            ) : (
              "Prosseguir para Investir"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
