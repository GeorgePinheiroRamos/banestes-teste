import { useState } from "react";
import { useClientesData } from "../hooks/useClienteData";
import { ClienteCard } from "../components/ClienteCard";

const ITENS_POR_PAGINA = 5;

export function ClienteList() {
  const { clientes, agencias, loading } = useClientesData();
  const [busca, setBusca] = useState("");
  const [agenciaFiltro, setAgenciaFiltro] = useState("");
  const [pagina, setPagina] = useState(1);

  if (loading) return <p>Carregando...</p>;

  const clientesFiltrados = clientes.filter((c) => {
    const buscaLower = busca.toLowerCase();
    const nomeMatch = c.nome.toLowerCase().includes(buscaLower);
    const cpfMatch = (c.cpfCnpj ?? "").toString().includes(busca);
    const agenciaMatch = agenciaFiltro
      ? c.codigoAgencia === +agenciaFiltro
      : true;

    return (nomeMatch || cpfMatch) && agenciaMatch;
  });

  const totalPaginas = Math.ceil(clientesFiltrados.length / ITENS_POR_PAGINA);
  const clientesPaginados = clientesFiltrados.slice(
    (pagina - 1) * ITENS_POR_PAGINA,
    pagina * ITENS_POR_PAGINA
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Buscar por nome ou CPF/CNPJ"
          className="border rounded px-3 py-2 w-full sm:w-1/2"
          value={busca}
          onChange={(e) => {
            setBusca(e.target.value);
            setPagina(1);
          }}
        />

        <select
          className="border rounded px-3 py-2 w-full sm:w-1/4"
          value={agenciaFiltro}
          onChange={(e) => {
            setAgenciaFiltro(e.target.value);
            setPagina(1);
          }}
        >
          <option value="">Todas as agências</option>
          {agencias.map((a) => (
            <option key={a.id} value={a.codigo}>
              {a.nome}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {clientesPaginados.map((cliente) => (
          <ClienteCard key={cliente.id} cliente={cliente} />
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            className={`px-3 py-1 rounded ${
              n === pagina ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setPagina(n)}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}
