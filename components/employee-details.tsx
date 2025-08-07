"use client";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Download,
  Eye,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Building,
  User,
  GraduationCap,
  Heart,
  FileCheck,
  ArrowLeft,
} from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: string;
  category: string;
  uploadDate: string;
  size: string;
  url: string;
}

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Contrato de Trabalho",
    type: "PDF",
    category: "Contratual",
    uploadDate: "2024-01-15",
    size: "2.3 MB",
    url: "/placeholder.svg?height=800&width=600",
  },
  {
    id: "2",
    name: "RG - Documento de Identidade",
    type: "PDF",
    category: "Pessoal",
    uploadDate: "2024-01-10",
    size: "1.2 MB",
    url: "/placeholder.svg?height=800&width=600",
  },
  {
    id: "3",
    name: "CPF",
    type: "PDF",
    category: "Pessoal",
    uploadDate: "2024-01-10",
    size: "0.8 MB",
    url: "/placeholder.svg?height=800&width=600",
  },
  {
    id: "4",
    name: "Diploma de Graduação",
    type: "PDF",
    category: "Acadêmico",
    uploadDate: "2024-01-12",
    size: "3.1 MB",
    url: "/placeholder.svg?height=800&width=600",
  },
  {
    id: "5",
    name: "Certificado de Curso Técnico",
    type: "PDF",
    category: "Acadêmico",
    uploadDate: "2024-01-12",
    size: "1.8 MB",
    url: "/placeholder.svg?height=800&width=600",
  },
  {
    id: "6",
    name: "Exame Admissional",
    type: "PDF",
    category: "Médico",
    uploadDate: "2024-01-08",
    size: "2.5 MB",
    url: "/placeholder.svg?height=800&width=600",
  },
  {
    id: "7",
    name: "Comprovante de Residência",
    type: "PDF",
    category: "Pessoal",
    uploadDate: "2024-01-10",
    size: "1.1 MB",
    url: "/placeholder.svg?height=800&width=600",
  },
  {
    id: "8",
    name: "Termo de Confidencialidade",
    type: "PDF",
    category: "Contratual",
    uploadDate: "2024-01-15",
    size: "0.9 MB",
    url: "/placeholder.svg?height=800&width=600",
  },
];

const employee = {
  id: "20189",
  name: "Pedro Samuel",
  position: "Desenvolvedor Full Stack",
  department: "GTIS",
  email: "pedro.samuel@cmc.ao",
  phone: "(244) 000-9999",
  birthDate: "1990-05-15",
  address: "Rua das Flores, 123 - São Paulo, Luanda",
  admissionDate: "2024-01-15",
  status: "Ativo",
  avatar: "/placeholder.svg?height=100&width=100",
};

export default function EmployeeDetails() {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleViewDocument = (document: Document) => {
    setSelectedDocument(document);
    setIsDialogOpen(true);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Contratual":
        return <FileCheck className="h-4 w-4" />;
      case "Pessoal":
        return <User className="h-4 w-4" />;
      case "Acadêmico":
        return <GraduationCap className="h-4 w-4" />;
      case "Médico":
        return <Heart className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Contratual":
        return "";
      case "Pessoal":
        return "";
      case "Acadêmico":
        return "";
      case "Médico":
        return "";
      default:
        return "";
    }
  };

  const documentsByCategory = mockDocuments.reduce((acc, doc) => {
    if (!acc[doc.category]) {
      acc[doc.category] = [];
    }
    acc[doc.category].push(doc);
    return acc;
  }, {} as Record<string, Document[]>);

  return (
    <div className="">
      {/* Header */}
      <div className=" border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
              <div>
                <h1 className="text-xl font-semibold ">
                  Detalhes do Colaborador
                </h1>
                <p className="text-sm ">Gestão de Capital Humano</p>
              </div>
            </div>
            <Badge
              variant={employee.status === "Ativo" ? "default" : "secondary"}
            >
              {employee.status}
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informações do Colaborador */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage
                    src={employee.avatar || "/placeholder.svg"}
                    alt={employee.name}
                  />
                  <AvatarFallback className="text-lg">
                    {employee.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{employee.name}</CardTitle>
                <CardDescription>{employee.position}</CardDescription>
                <Badge variant="outline" className="mt-2">
                  ID: {employee.id}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Building className="h-4 w-4 " />
                    <span>{employee.department}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 " />
                    <span>{employee.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 " />
                    <span>{employee.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="h-4 w-4 " />
                    <span>
                      Admissão:{" "}
                      {new Date(employee.admissionDate).toLocaleDateString(
                        "pt-BR"
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="h-4 w-4 " />
                    <span>{employee.address}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-medium text-sm ">Informações Pessoais</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="">Nascimento:</span>
                      <span>
                        {new Date(employee.birthDate).toLocaleDateString(
                          "pt-BR"
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Documentos */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Documentos do Colaborador
                </CardTitle>
                <CardDescription>
                  Total de {mockDocuments.length} documentos organizados por
                  categoria
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="all">Todos</TabsTrigger>
                    <TabsTrigger value="Contratual">Contratual</TabsTrigger>
                    <TabsTrigger value="Pessoal">Pessoal</TabsTrigger>
                    <TabsTrigger value="Acadêmico">Acadêmico</TabsTrigger>
                    <TabsTrigger value="Médico">Médico</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="mt-6">
                    <div className="space-y-6">
                      {Object.entries(documentsByCategory).map(
                        ([category, documents]) => (
                          <div key={category}>
                            <h3 className="font-medium text-sm  mb-3 flex items-center gap-2">
                              {getCategoryIcon(category)}
                              {category}
                              <Badge variant="secondary" className="text-xs">
                                {documents.length}
                              </Badge>
                            </h3>
                            <div className="grid gap-3">
                              {documents.map((document) => (
                                <div
                                  key={document.id}
                                  className="flex items-center justify-between p-4 border rounded-lg  transition-colors"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="p-2 bg-red-100 rounded-lg">
                                      <FileText className="h-4 w-4 " />
                                    </div>
                                    <div>
                                      <p className="font-medium text-sm">
                                        {document.name}
                                      </p>
                                      <div className="flex items-center gap-4 text-xs  mt-1">
                                        <span>{document.size}</span>
                                        <span>•</span>
                                        <span>
                                          {new Date(
                                            document.uploadDate
                                          ).toLocaleDateString("pt-BR")}
                                        </span>
                                        <Badge
                                          variant="secondary"
                                          className={`text-xs ${getCategoryColor(
                                            document.category
                                          )}`}
                                        >
                                          {document.category}
                                        </Badge>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        handleViewDocument(document)
                                      }
                                    >
                                      <Eye className="h-4 w-4 mr-2" />
                                      Visualizar
                                    </Button>
                                    <Button variant="outline" size="sm">
                                      <Download className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </TabsContent>

                  {Object.entries(documentsByCategory).map(
                    ([category, documents]) => (
                      <TabsContent
                        key={category}
                        value={category}
                        className="mt-6"
                      >
                        <div className="grid gap-3">
                          {documents.map((document) => (
                            <div
                              key={document.id}
                              className="flex items-center justify-between p-4 border rounded-lg  transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg">
                                  <FileText className="h-4 w-4 " />
                                </div>
                                <div>
                                  <p className="font-medium text-sm">
                                    {document.name}
                                  </p>
                                  <div className="flex items-center gap-4 text-xs  mt-1">
                                    <span>{document.size}</span>
                                    <span>•</span>
                                    <span>
                                      {new Date(
                                        document.uploadDate
                                      ).toLocaleDateString("pt-BR")}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleViewDocument(document)}
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  Visualizar
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    )
                  )}
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Modal de Visualização do Documento */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {selectedDocument?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-hidden">
            {selectedDocument && (
              <div className="h-[70vh] border rounded-lg overflow-hidden">
                <div className="h-full flex items-center justify-center">
                  <img
                    src={selectedDocument.url || "/placeholder.svg"}
                    alt={selectedDocument.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center pt-4">
            <div className="text-sm ">
              {selectedDocument && (
                <>
                  Tamanho: {selectedDocument.size} • Enviado em:{" "}
                  {new Date(selectedDocument.uploadDate).toLocaleDateString(
                    "pt-BR"
                  )}
                </>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Baixar
              </Button>
              <Button onClick={() => setIsDialogOpen(false)}>Fechar</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
