// /app/investir/page.tsx
"use client";

import BankDetailsForm from "@/components/investment/bank-details-form"; // ajuste o caminho se necessário

export default function InvestirPage() {
  return (
    <main className="flex justify-center items-center min-h-screen p-4 bg-gray-100">
      <BankDetailsForm />
    </main>
  );
}
