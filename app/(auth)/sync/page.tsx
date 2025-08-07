"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Loading from "@/components/loading/loading";

export default function SyncRedirectPage() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session?.user?.email) return;

    let isSynced = false;

    async function syncAndRedirect() {
      if (isSynced) return;
      isSynced = true;

      try {
        await fetch("/api/sync-data-fields", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: session?.user.email }),
        });

        console.log("Campos extras sincronizados com sucesso.");
      } catch (error) {
        console.error("Erro ao sincronizar campos extras:", error);
      }

      router.push("/dashboard");
    }

    syncAndRedirect();
  }, [session?.user?.email, router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-sm text-muted-foreground">A preparar o ambiente...</p>
      <div>
        <Loading />
      </div>
    </div>
  );
}
