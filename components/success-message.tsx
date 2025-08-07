import { AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link"; // Importe o componente Link

interface SuccessMessageProps {
  onGoBack: () => void;
}

export default function SuccessMessage({ onGoBack }: SuccessMessageProps) {
  return (
    <Card className="w-full max-w-md text-center">
      <CardHeader className="flex flex-col items-center gap-4">
        <AlertCircle className="h-16 w-16 text-green-500" />
        <CardTitle className="text-3xl font-bold">ALERTA!</CardTitle>
        <CardDescription>
          ESTA MENSAGEM É UMA SIMULAÇÃO DE GOLPE.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Nunca confie em promessas de lucros fáceis, garantidos ou rápidos.
          Golpistas usam mensagens convincentes e o nome de investimentos
          legítimos para enganar as pessoas. Neste caso, ao fornecer os seus
          dados, você teria caído numa burla financeira. Esta foi uma iniciativa
          desenvolvida pela CMC (Comissão do Mercado de Capitais) para alertar
          sobre este tipo de esquemas.
        </p>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 justify-center">
        {" "}
        {/* Use flex-col e gap-2 para os botões */}
      </CardFooter>
    </Card>
  );
}
