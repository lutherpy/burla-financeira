import InvestmentPrompt from "@/components/investment-prompt";
import SuccessMessage from "@/components/success-message";

import Image from "next/image";

export default function AlertaPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950 p-4">
      <SuccessMessage />
    </div>
  );
}
