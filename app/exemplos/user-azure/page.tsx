"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type UserData = {
  nome: string;
  email: string;
  userPrincipalName: string;
  primeiroNome: string;
  ultimoNome: string;
  cargo: string;
  departamento: string;
  telefone: string;
  lider: string;
  emailLider: string;
  extensionAttribute13: string;
  foto?: string;
};

export default function UserPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchUserData = async () => {
    if (!email) return;
    setLoading(true);
    setError(null);
    setUserData(null);

    try {
      const res = await fetch(
        `/api/user-azure-data?email=${encodeURIComponent(email)}`
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro desconhecido.");
      } else {
        setUserData(data);
      }
    } catch {
      setError("Erro ao buscar dados.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUserData();
  };

  return (
    <main className="max-w-xl  p-6">
      <h1 className="text-2xl font-bold mb-4">Pesquisar Utilizador no Azure</h1>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-6">
        <Input
          type="email"
          placeholder="Digite o e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded p-2 flex-1"
        />
        <Button
          type="submit"
          disabled={loading || !email}
          className="px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "A pesquisar..." : "Pesquisar"}
        </Button>
      </form>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {userData && (
        <div className="border p-4 rounded shadow">
          {userData.foto && (
            <img
              src={userData.foto}
              alt="Foto do colaborador"
              className="w-40 h-40 rounded-full mb-4 object-cover border"
            />
          )}
          <p>
            <strong>Nome:</strong> {userData.nome}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>UPN:</strong> {userData.userPrincipalName}
          </p>
          <p>
            <strong>Primeiro Nome:</strong> {userData.primeiroNome}
          </p>
          <p>
            <strong>Último Nome:</strong> {userData.ultimoNome}
          </p>
          <p>
            <strong>Cargo:</strong> {userData.cargo}
          </p>
          <p>
            <strong>Departamento:</strong> {userData.departamento}
          </p>
          <p>
            <strong>Telefone:</strong> {userData.telefone}
          </p>
          <p>
            <strong>Líder:</strong> {userData.lider}
          </p>
          <p>
            <strong>Email do Líder:</strong> {userData.emailLider}
          </p>
          <p>
            <strong>Ext. Attr. 13:</strong> {userData.extensionAttribute13}
          </p>
        </div>
      )}
    </main>
  );
}
