import InvestmentPrompt from "@/components/investment-prompt";

export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950 p-4">
      <InvestmentPrompt />
    </div>
  );
}
