"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

type Note = {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export default function NoteDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchNote() {
      try {
        const res = await fetch(`/api/note/${id}`);
        if (!res.ok) throw new Error("Erro ao buscar nota");
        const data = await res.json();
        setNote(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Erro desconhecido");
        }
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchNote();
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  if (error || !note) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Erro</AlertTitle>
        <AlertDescription>{error || "Nota não encontrada"}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-4">
      <Button
        variant="outline"
        onClick={() => router.back()}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>{note.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            <strong>Conteúdo:</strong> {note.content}
          </p>
          <p>
            <strong>Usuário:</strong> {note.userId}
          </p>
          <p>
            <strong>Criado em:</strong> {formatDate(note.createdAt)}
          </p>
          <p>
            <strong>Atualizado em:</strong> {formatDate(note.updatedAt)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
