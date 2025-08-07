// /app/investir/page.tsx
"use client";

import BankDetailsForm from "@/components/bank-details-form"; // ajuste o caminho se necessário

export default function InvestirPage() {
  const handleBankSubmit = (data: {
    name: string;
    bank: string;
    accountNumber: string;
    province: string;
    age: number;
    amount: number;
  }) => {
    console.log("Dados bancários recebidos:", data);
    // Aqui você pode enviar os dados para uma API ou salvar no banco
  };

  return (
    <main className="flex justify-center items-center min-h-screen p-4 bg-gray-100">
      <BankDetailsForm onSubmit={handleBankSubmit} />
    </main>
  );
}
