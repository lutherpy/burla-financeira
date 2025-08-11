"use client";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { Check, Loader2 } from "lucide-react";
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

import { provincias } from "@/data/provincias";
import { profissoes } from "@/data/profissoes";
import { SuccessModal } from "./sucess-modal";
import { IconMoneybagPlus } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const bankDetailsSchema = z.object({
  name: z.string().min(2, "Informe o seu nome completo"),
  bank: z.string().min(2, "Informe o nome do banco"),
  accountNumber: z.string().min(2, "Informe o número da conta"),
  province: z.string().min(2),
  age: z.coerce.number().min(18, "Deve ter pelo menos 18 anos"),
  amount: z.coerce.number().min(1, "Informe um valor válido"),
  profissao: z.string().min(2, "Informe a sua profissão"),
});

type BankDetailsFormData = z.infer<typeof bankDetailsSchema>;

export default function BankDetailsWizard() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfissaoOpen, setIsProfissaoOpen] = useState(false);
  const [isOutra, setIsOutra] = useState(false); // ✅ controle da opção "Outra"

  const form = useForm<BankDetailsFormData>({
    resolver: zodResolver(bankDetailsSchema),
    defaultValues: {
      name: "",
      bank: "",
      accountNumber: "",
      province: "",
      age: 18,
      amount: 0,
      profissao: "",
    },
  });

  const handleNextStep = async () => {
    let isValid = false;
    if (currentStep === 0) {
      isValid = await form.trigger(["name", "age", "profissao", "province"]);
    } else if (currentStep === 1) {
      isValid = await form.trigger(["bank", "accountNumber", "amount"]);
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Erro ao salvar no servidor");
      }

      form.reset();
      setIsOutra(false);
      toast.success("Dados enviados com sucesso!");
      setIsModalOpen(true);
    } catch (err) {
      console.error(err);
      toast.error("Erro ao enviar os dados bancários");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Configuração de Perfil</CardTitle>
        <CardDescription>
          Por favor, insira os seus dados para configurar o seu perfil de
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
                  {/* Nome */}
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
                  {/* Idade */}
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
                  {/* Província */}
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
                              <SelectValue placeholder="Seleccione a sua província" />
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
                  {/* Profissão */}
                  <FormField
                    control={form.control}
                    name="profissao"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profissão</FormLabel>
                        <FormControl>
                          <Popover
                            open={isProfissaoOpen}
                            onOpenChange={setIsProfissaoOpen}
                          >
                            <PopoverTrigger asChild>
                              <button
                                type="button"
                                role="combobox"
                                aria-expanded={isProfissaoOpen}
                                aria-controls="profissoes-list"
                                className="w-full justify-between border rounded-md px-3 py-2 text-sm"
                              >
                                {field.value ||
                                  (isOutra
                                    ? "Outra"
                                    : "Seleccione a sua profissão")}
                              </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                              <Command>
                                <CommandInput placeholder="Pesquisar profissão..." />
                                <CommandList id="profissoes-list">
                                  <CommandEmpty>
                                    Nenhum resultado encontrado.
                                  </CommandEmpty>
                                  <CommandGroup>
                                    {profissoes.map((profissao) => (
                                      <CommandItem
                                        key={profissao}
                                        onSelect={() => {
                                          setIsOutra(false);
                                          field.onChange(profissao);
                                          setIsProfissaoOpen(false);
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            "h-4 w-4",
                                            field.value === profissao
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                        {profissao}
                                      </CommandItem>
                                    ))}
                                    {/* Opção "Outra" */}
                                    <CommandItem
                                      key="Outra"
                                      onSelect={() => {
                                        setIsOutra(true);
                                        field.onChange(""); // deixa em branco para digitar
                                        setIsProfissaoOpen(false);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "h-4 w-4",
                                          isOutra ? "opacity-100" : "opacity-0"
                                        )}
                                      />
                                      Outra
                                    </CommandItem>
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage />

                        {isOutra && (
                          <div className="mt-2">
                            <Input
                              placeholder="Digite a sua profissão"
                              value={field.value}
                              onChange={(e) => field.onChange(e.target.value)}
                            />
                          </div>
                        )}
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
              {/* Aba Investimento */}
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
                          <Input placeholder="Ex: 9387387210001" {...field} />
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
                </div>
              </TabsContent>
              {/* Botões */}
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
          Os seus dados estão seguros e serão utilizados apenas para fins de
          investimento.
        </p>
      </CardFooter>
    </Card>
  );
}
