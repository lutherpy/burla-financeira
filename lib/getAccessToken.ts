// /lib/getAccessToken.ts

let cachedToken: string | null = null;
let cachedExpiresAt: number | null = null;

export async function getAccessToken(): Promise<string> {
  const now = Date.now();

  if (cachedToken && cachedExpiresAt && now < cachedExpiresAt) {
    console.log("[Microsoft Graph] ✅ Token em cache ainda é válido.");
    return cachedToken;
  }

  console.log(
    "[Microsoft Graph] 🔄 Token expirado ou ausente. Solicitando novo token..."
  );

  const tenantId = process.env.MICROSOFT_TENANT_ID;
  const clientId = process.env.MICROSOFT_CLIENT_ID;
  const clientSecret = process.env.MICROSOFT_CLIENT_SECRET;

  if (!tenantId || !clientId || !clientSecret) {
    throw new Error(
      "Credenciais da Microsoft não estão configuradas corretamente no .env"
    );
  }

  const res = await fetch(
    `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        scope: "https://graph.microsoft.com/.default",
        grant_type: "client_credentials",
      }),
    }
  );

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Erro ao obter token: ${error}`);
  }

  const data = await res.json();

  cachedToken = data.access_token;
  cachedExpiresAt = now + data.expires_in * 1000 - 60_000; // expira 1 min antes por segurança

  console.log(
    `[Microsoft Graph] 🆕 Novo token gerado. Expira em ${data.expires_in} segundos.`
  );

  return cachedToken!;
}
