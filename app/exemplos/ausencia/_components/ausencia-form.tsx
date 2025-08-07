"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function Component() {
  const [motivo, setMotivo] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para processar o formulário
    console.log("Formulário enviado");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = [".jpg", ".jpeg", ".pdf", ".docx"];
      const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();

      if (allowedTypes.includes(fileExtension)) {
        setSelectedFile(file);
      } else {
        alert(
          "Formato de arquivo não permitido. Use apenas .jpg, .pdf ou .docx"
        );
        e.target.value = "";
      }
    }
  };

  return (
    <div className=" flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Comunicação de Ausência
          </CardTitle>
          <CardDescription className="text-center">
            Preencha os dados abaixo para comunicar sua ausência
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="data-inicio">Data de Início</Label>
                <Input id="data-inicio" type="date" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="data-fim">Data de Fim</Label>
                <Input id="data-fim" type="date" required />
              </div>
            </div>

            <div className="space-y-2 w-100">
              <Label htmlFor="motivo">Motivo</Label>
              <Select value={motivo} onValueChange={setMotivo} required>
                <SelectTrigger id="motivo">
                  <SelectValue placeholder="Selecione o motivo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ausencia">Ausência</SelectItem>
                  <SelectItem value="atraso">Atraso</SelectItem>
                  <SelectItem value="ferias">Férias</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Campo condicional para Férias */}
            {motivo === "ferias" && (
              <div className="space-y-2">
                <Label htmlFor="ano-ferias">Ano de Referência</Label>
                <Input
                  id="ano-ferias"
                  type="number"
                  placeholder="Ex: 2024"
                  min="2020"
                  max="2030"
                  required
                />
              </div>
            )}

            {/* Campos condicionais para Ausência e Atraso */}
            {(motivo === "ausencia" || motivo === "atraso") && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hora-inicio">Hora de Início</Label>
                  <Input id="hora-inicio" type="time" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hora-fim">Hora de Fim</Label>
                  <Input id="hora-fim" type="time" required />
                </div>
              </div>
            )}

            {/* Campo de Upload de Documentos */}
            <div className="space-y-2">
              <Label htmlFor="documento">Upload de Documento</Label>
              <div className="space-y-2">
                <Input
                  id="documento"
                  type="file"
                  accept=".jpg,.jpeg,.pdf,.docx"
                  onChange={handleFileChange}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold "
                />
                <p className="text-sm ">
                  Formatos permitidos: .jpg, .pdf, .docx (máx. 10MB)
                </p>
                {selectedFile && (
                  <p className="text-sm text-green-600">
                    Arquivo selecionado: {selectedFile.name}
                  </p>
                )}
              </div>
            </div>

            {/* Campo de Observações */}
            <div className="space-y-2">
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea
                id="observacoes"
                placeholder="Digite aqui informações adicionais sobre a ausência..."
                className="min-h-[100px] resize-none"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1 bg-transparent"
              >
                Cancelar
              </Button>
              <Button type="submit" className="flex-1">
                Enviar Comunicação
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
