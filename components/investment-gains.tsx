"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Loader2 } from "lucide-react";

export default function InvestmentGains() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      router.push("/investir");
    }, 800);
  };

  return (
    <div className="w-full max-w-lg md:max-w-2xl mx-auto p-4">
      <Card className="flex flex-col">
        <CardHeader className="text-center">
          <CheckCircle className="mx-auto text-green-500" size={72} />
          <CardTitle className="text-2xl mt-4">Parabéns!</CardTitle>
          <CardDescription>
            A sua decisão mostra coragem e visão.
          </CardDescription>
        </CardHeader>

        <CardContent className="text-center space-y-4">
          <section>
            <p>
              Obrigado pela confiança depositada. Está prestes a entrar numa
              fase exclusiva e promissora.
            </p>
          </section>

          <section>
            <p>
              Nas próximas semanas, investidores com o seu perfil estarão a ver
              retornos de até <strong>300%</strong> em apenas 30 dias.
            </p>
            <p>
              Clique no botão abaixo para configurar o seu perfil e começar a
              receber os seus ganhos.
            </p>
          </section>
        </CardContent>

        <CardFooter className="flex justify-center mt-auto">
          <Button className="w-full" onClick={handleClick} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Carregando...
              </>
            ) : (
              "Configurar Perfil"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
