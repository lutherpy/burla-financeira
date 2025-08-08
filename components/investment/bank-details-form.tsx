"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { provincias } from "@/data/provincias"; // ajuste o caminho conforme necessário

import { provincia } from "@/db/schema";
import { SuccessModal } from "./sucess-modal";
import { IconMoneybagPlus } from "@tabler/icons-react";

const bankDetailsSchema = z.object({
  name: z.string().min(2, "Informe o seu nome completo"),
  bank: z.string().min(2, "Informe o nome do banco"),
  accountNumber: z.string().min(2, "Informe o número da conta"),
  province: z.string().min(2, "Informe a província"),
  age: z.coerce.number().min(18, "Você deve ter pelo menos 18 anos"),
  amount: z.coerce.number().min(1, "Informe um valor válido"),
});

type BankDetailsFormData = z.infer<typeof bankDetailsSchema>;
export type Provincia = typeof provincia.$inferSelect;

export default function BankDetailsWizard() {
  const [isLoading, setIsLoading] = useState(false);

  //const [paymentReference, setPaymentReference] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0); // 0 for Personal, 1 for Investment

  const [isModalOpen, setIsModalOpen] = useState(false);

  const form = useForm<BankDetailsFormData>({
    resolver: zodResolver(bankDetailsSchema),
    defaultValues: {
      name: "",
      bank: "",
      accountNumber: "",
      province: "",
      age: 18,
      amount: 0,
    },
  });

  const handleNextStep = async () => {
    let isValid = false;
    if (currentStep === 0) {
      isValid = await form.trigger(["name", "age", "province"]);
    } else if (currentStep === 1) {
      isValid = await form.trigger(["bank", "accountNumber", "amount"]); // <-- aqui
    }

    if (isValid) {
      if (currentStep < 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        await handleFormSubmit(form.getValues());
      }
    } else {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleFormSubmit = async (values: BankDetailsFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/investment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Erro ao salvar no servidor");
      }
      form.reset();
      toast.success("Dados enviados com sucesso!");

      setIsModalOpen(true); // ⬅️ abre o modal
    } catch (err) {
      console.error(err);
      toast.error("Erro ao enviar os dados bancários");
    } finally {
      setIsLoading(false);
    }
  };

  // const generatePaymentReference = () => {
  //   const ref = `REF-${Math.random()
  //     .toString(36)
  //     .substring(2, 10)
  //     .toUpperCase()}-${Date.now().toString().slice(-4)}`;
  //   setPaymentReference(ref);
  //   toast.success("Referência gerada com sucesso");
  // };

  // const copyToClipboard = () => {
  //   if (paymentReference) {
  //     navigator.clipboard.writeText(paymentReference);
  //     toast.success("Referência copiada para a área de transferência");
  //   }
  // };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Configuração de Perfil</CardTitle>
        <CardDescription>
          Por favor, insira seus dados para configurar seu perfil de
          investimento.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Tabs
          value={currentStep === 0 ? "personal" : "investment"}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="personal" onClick={() => setCurrentStep(0)}>
              Dados Pessoais
            </TabsTrigger>
            <TabsTrigger value="investment" onClick={() => setCurrentStep(1)}>
              Investir
            </TabsTrigger>
          </TabsList>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleFormSubmit)}
              className="grid gap-4 mt-4"
            >
              <TabsContent value="personal">
                <div className="grid gap-4">
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
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Idade</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Ex: 30"
                            {...field}
                          />
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
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecione uma província" />
                            </SelectTrigger>
                            <SelectContent>
                              {provincias.map((provincia) => (
                                <SelectItem key={provincia} value={provincia}>
                                  {provincia}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
              <TabsContent value="investment">
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="bank"
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
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantia para Investimento (AOA)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Ex: 50000"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormItem>
                    <FormLabel>Referência de Pagamento</FormLabel>
                    {/* <div className="flex gap-2">
                      <Input
                        readOnly
                        value={paymentReference || "Clique em Gerar Referência"}
                        className="flex-1"
                      />
                      <Button
                        className="bg-green-600 hover:bg-green-700"
                        type="button"
                        onClick={generatePaymentReference}
                        disabled={!!paymentReference}
                      >
                        Gerar Referência
                      </Button>
                    </div> */}
                    {/* {paymentReference && (
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
                    )} */}
                  </FormItem>
                </div>
              </TabsContent>

              <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6">
                {currentStep > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePreviousStep}
                    className="w-full md:w-auto"
                  >
                    Voltar
                  </Button>
                )}

                <Button
                  type="button"
                  onClick={handleNextStep}
                  disabled={isLoading}
                  className="w-full md:w-auto"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : currentStep === 0 ? (
                    "Próximo"
                  ) : (
                    <>
                      <IconMoneybagPlus className="w-100 h-4 w-4 mr-2" />
                      Clique para Investir
                    </>
                  )}
                </Button>
              </div>
            </form>
            <SuccessModal
              open={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          </Form>
        </Tabs>
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
