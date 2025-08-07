import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface FinancePromptProps {
  onProceed: () => void;
}

export default function FinancePrompt({ onProceed }: FinancePromptProps) {
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
          <CardTitle className="text-2xl">Ola</CardTitle>
          <CardDescription>
            Olá! Sou analista da BODIVA e ofereço aqui uma chance exclusiva para
            investires com acesso privilegiado.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-2">
          <p className="">
            Algumas acções vão disparar nas próximas semanas e só os grandes
            investidores têm essa informação!
          </p>
          <p className="">
            Com um depósito de AKZ50.000, tu entras na nossa sala privada de
            investimentos e recebes as recomendações em primeira mão. Aproveite
            antes que feche! Clique no botão abaixo se estiveres interessado!
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={onProceed} className="w-full">
            Prosseguir para Investir
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
