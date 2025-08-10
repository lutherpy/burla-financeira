"use client";

import { useState, useMemo } from "react";
import useSWR from "swr";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Loading from "@/components/loading/loading";
import { X } from "lucide-react";

interface DataTableServerProps<TData, TValue> {
  endpoint: string;
  columns: ColumnDef<TData, TValue>[];
  titleColumn: string;
  titleLabel: string;
  filterField?: keyof TData; // campo que será usado para filtro dinâmico
  filterLabel?: string; // rótulo exibido no filtro
}

export function DataTableServer<TData extends Record<string, any>, TValue>({
  endpoint,
  columns,
  titleColumn,
  titleLabel,
  filterField,
  filterLabel,
}: DataTableServerProps<TData, TValue>) {
  const [inputSearch, setInputSearch] = useState("");
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [orderBy, setOrderBy] = useState("createdAt");
  const [orderDir, setOrderDir] = useState<"asc" | "desc">("desc");

  const { data, error, isLoading } = useSWR(
    `${endpoint}?page=${page}&limit=${limit}&search=${encodeURIComponent(
      search
    )}&orderBy=${orderBy}&orderDir=${orderDir}`,
    async (url: string) => {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Erro ao buscar dados");
      return res.json();
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 50000,
      refreshInterval: 50000,
      focusThrottleInterval: 10000,
    }
  );

  // Lista única do campo dinâmico
  const filterOptions = useMemo(() => {
    if (!data?.data || !filterField) return [];
    const list = Array.from(
      new Set(data.data.map((item: TData) => item[filterField]).filter(Boolean))
    ) as string[];
    return list.sort();
  }, [data, filterField]);

  // Filtragem no front
  const filteredData = useMemo(() => {
    if (!filterField || selectedFilter === "all") return data?.data || [];
    return (data?.data || []).filter(
      (item: TData) => item[filterField] === selectedFilter
    );
  }, [data, filterField, selectedFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const totalPages = Math.ceil((data?.total || 0) / limit);

  const handleSubmitSearch = () => {
    setSearch(inputSearch);
    setPage(1);
  };

  const handleClearSearch = () => {
    setInputSearch("");
    setSearch("");
    setPage(1);
  };

  const getOrderLabel = (value: string) => {
    if (value === titleColumn) return titleLabel;
    if (value === "createdAt") return "Data de Criação";
    if (value === "updatedAt") return "Última Atualização";
    return value;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <p className="p-6 text-red-600">
        Erro ao carregar dados: {error.message}
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filtros */}
      <div className="flex items-end gap-3 mt-4 flex-nowrap overflow-x-auto">
        {/* Campo de busca */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmitSearch();
          }}
          className="relative w-48"
        >
          <Input
            type="text"
            placeholder="🔍 Nome..."
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
            className="pr-8 h-9 text-sm"
          />
          {inputSearch && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
            >
              <X size={14} />
            </button>
          )}
        </form>

        {/* Filtro dinâmico */}
        {filterField && (
          <div className="w-40">
            <label className="text-xs font-medium block mb-1">
              {filterLabel || String(filterField)}
            </label>
            <Select
              value={selectedFilter}
              onValueChange={(value) => setSelectedFilter(value)}
            >
              <SelectTrigger className="w-full h-9 text-sm">
                <SelectValue placeholder="Todas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {filterOptions.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Ordenar por */}
        <div className="w-40">
          <label className="text-xs font-medium block mb-1">Ordenar por</label>
          <Select value={orderBy} onValueChange={setOrderBy}>
            <SelectTrigger className="w-full h-9 text-sm">
              <SelectValue>{getOrderLabel(orderBy)}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={titleColumn}>{titleLabel}</SelectItem>
              <SelectItem value="createdAt">Data de Criação</SelectItem>
              <SelectItem value="updatedAt">Última Atualização</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Ordem */}
        <div className="w-28">
          <label className="text-xs font-medium block mb-1">Ordem</label>
          <Select
            value={orderDir}
            onValueChange={(value) => setOrderDir(value as "asc" | "desc")}
          >
            <SelectTrigger className="w-full h-9 text-sm">
              <SelectValue>{orderDir === "asc" ? "Asc" : "Desc"}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Asc</SelectItem>
              <SelectItem value="desc">Desc</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Itens por página */}
        <div className="w-28">
          <label className="text-xs font-medium block mb-1">Itens</label>
          <Select
            value={String(limit)}
            onValueChange={(value) => {
              setLimit(Number(value));
              setPage(1);
            }}
          >
            <SelectTrigger className="w-full h-9 text-sm">
              <SelectValue>{limit}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Botão pesquisar */}
        <div className="flex items-end">
          <Button size="sm" onClick={handleSubmitSearch}>
            Pesquisar
          </Button>
        </div>
      </div>

      {/* Tabela */}
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const accessor = header.column.id as string | undefined;
                  const isSorted = accessor === orderBy;
                  const isAsc = isSorted && orderDir === "asc";

                  return (
                    <TableHead
                      key={header.id}
                      onClick={() => {
                        if (!accessor) return;
                        if (orderBy === accessor) {
                          setOrderDir(orderDir === "asc" ? "desc" : "asc");
                        } else {
                          setOrderBy(accessor);
                          setOrderDir("asc");
                        }
                      }}
                      className={`cursor-pointer select-none ${
                        isSorted ? "text-primary" : ""
                      }`}
                    >
                      <div className="flex items-center gap-1">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {isSorted && (isAsc ? " ▲" : " ▼")}
                      </div>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center h-24"
                >
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Paginação */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
        >
          Anterior
        </Button>
        <span>
          Página {page} de {totalPages} de {data?.total || 0} registos
        </span>
        <Button
          variant="outline"
          size="sm"
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
        >
          Próxima
        </Button>
      </div>
    </div>
  );
}
