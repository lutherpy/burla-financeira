import { AlertCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SuccessMessage() {
  return (
    <Card className="w-full max-w-md text-center">
      <CardHeader className="flex flex-col items-center gap-4">
        <AlertCircle className="h-16 w-16 text-yellow-500" />
        <CardTitle className="text-3xl font-bold">ALERTA!</CardTitle>
        <CardDescription>
          ESTE CENÁRIO É UMA SIMULAÇÃO DE GOLPE.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="">
          Nunca confie em promessas de lucros fáceis, garantidos ou rápidos.
          Golpistas utilizam mensagens convincentes e o nome de investimentos
          legítimos para enganar as pessoas.
        </p>
        <ul className=" list-disc pl-5 mt-2 space-y-1 text-sm">
          <li>Desconfie de retornos muito altos e promessas sem risco.</li>
          <li>Não envie dinheiro a desconhecidos ou contactos suspeitos.</li>
          <li>
            Verifique se a pessoa ou entidade estão, de facto, autorizadas pela
            Comissão do Mercado de Capitais (CMC).
          </li>
          <li>
            Em caso de dúvida, utilize os canais oficiais ou consulte o site:{" "}
            <a href="https://www.cmc.ao" className="underline text-primary">
              www.cmc.ao
            </a>
            .
          </li>
        </ul>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 justify-center">
        {" "}
        {/* Use flex-col e gap-2 para os botões */}
      </CardFooter>
    </Card>
  );
}
