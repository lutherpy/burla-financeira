import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface InvestmentPromptProps {
  onProceed: () => void;
}

export default function InvestmentPrompt({ onProceed }: InvestmentPromptProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Pronto para Investir?</CardTitle>
        <CardDescription>
          Descubra novas oportunidades e faça seu dinheiro trabalhar para você.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-muted-foreground">
          Ao prosseguir, você será guiado para fornecer os detalhes necessários para iniciar seus investimentos.
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={onProceed} className="w-full">
          Prosseguir para Investir
        </Button>
      </CardFooter>
    </Card>
  );
}
