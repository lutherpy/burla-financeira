"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { Copy, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const bankDetailsSchema = z.object({
  name: z.string().min(2, "Informe o seu nome completo"),
  bankName: z.string().min(2, "Informe o nome do banco"),
  accountNumber: z.string().min(2, "Informe o número da conta"),
  province: z.string().min(2, "Informe a província"),
  age: z.coerce.number().min(18, "Você deve ter pelo menos 18 anos"),
  amount: z.coerce.number().min(1, "Informe um valor válido"),
});

type BankDetailsFormData = z.infer<typeof bankDetailsSchema>;

interface BankDetailsFormProps {
  onSubmit: (data: BankDetailsFormData & { routingNumber: string }) => void;
}

export default function BankDetailsForm({ onSubmit }: BankDetailsFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [routingNumber, setRoutingNumber] = useState("");
  const [paymentReference, setPaymentReference] = useState<string | null>(null);

  const form = useForm<BankDetailsFormData>({
    resolver: zodResolver(bankDetailsSchema),
    defaultValues: {
      name: "",
      bankName: "",
      accountNumber: "",
      province: "",
      age: 18,
      amount: 0,
    },
  });

  const handleFormSubmit = async (values: BankDetailsFormData) => {
    setIsLoading(true);
    try {
      onSubmit({ ...values, routingNumber });
      toast.success("Dados bancários enviados com sucesso");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao enviar os dados bancários");
    } finally {
      setIsLoading(false);
    }
  };

  const generatePaymentReference = () => {
    const ref = `REF-${Math.random()
      .toString(36)
      .substring(2, 10)
      .toUpperCase()}-${Date.now().toString().slice(-4)}`;
    setPaymentReference(ref);
    toast.success("Referência gerada com sucesso");
  };

  const copyToClipboard = () => {
    if (paymentReference) {
      navigator.clipboard.writeText(paymentReference);
      toast.success("Referência copiada para a área de transferência");
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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="grid gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: João da Silva" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bankName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Banco</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: BAI" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="accountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número da Conta</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: 12345-6" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Província</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Luanda" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Idade</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Ex: 30" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantia para Investimento (AOA)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Ex: 50000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>Número de Roteamento</FormLabel>
              <FormControl>
                <Input
                  placeholder="Opcional"
                  value={routingNumber}
                  onChange={(e) => setRoutingNumber(e.target.value)}
                />
              </FormControl>
            </FormItem>

            <FormItem>
              <FormLabel>Referência de Pagamento</FormLabel>
              <div className="flex gap-2">
                <Input
                  readOnly
                  value={paymentReference || "Clique em Gerar Referência"}
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
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </FormItem>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Salvar Dados e Prosseguir"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Seus dados estão seguros e serão usados apenas para fins de
          investimento.
        </p>
      </CardFooter>
    </Card>
  );
}
