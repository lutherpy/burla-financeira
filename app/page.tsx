"use client";

import { useState } from "react";
import InvestmentPrompt from "@/components/investment-prompt";
import BankDetailsForm from "@/components/bank-details-form";
import SuccessMessage from "@/components/success-message";

export default function HomePage() {
  const [step, setStep] = useState(0); // 0: prompt, 1: form, 2: success

  const handleProceed = () => {
    setStep(1);
  };

  const handleSubmitBankDetails = (data: {
    bankName: string;
    accountNumber: string;
    routingNumber: string;
  }) => {
    console.log("Dados bancários submetidos:", data);
    // Aqui você faria a lógica para enviar os dados para o backend
    setStep(2);
  };

  // A função handleGoBackToStart agora pode ser usada para voltar ao início
  // ou você pode adicionar uma opção para ir para o dashboard na mensagem de sucesso.
  const handleGoBackToStart = () => {
    setStep(0);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950 p-4">
      {step === 0 && <InvestmentPrompt onProceed={handleProceed} />}
      {step === 1 && <BankDetailsForm onSubmit={handleSubmitBankDetails} />}
      {step === 2 && <SuccessMessage onGoBack={handleGoBackToStart} />}
    </div>
  );
}
