import { useState } from "react";
import { useClientesData } from "../hooks/useClienteData";
import { ClienteCard } from "../components/ClienteCard";

const ITENS_POR_PAGINA = 5;

export function ClienteList() {
  const { clientes, agencias, loading } = useClientesData();
  const [busca, setBusca] = useState("");
  const [agenciaFiltro, setAgenciaFiltro] = useState("");
  const [pagina, setPagina] = useState(1);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600 border-opacity-70" />
      </div>
    );

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
    <div className="space-y-6 px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Buscar por nome ou CPF/CNPJ"
          className="border rounded px-3 py-2 w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={busca}
          onChange={(e) => {
            setBusca(e.target.value);
            setPagina(1);
          }}
        />

        <select
          className="border rounded px-3 py-2 w-full sm:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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

      {clientesPaginados.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          Nenhum cliente encontrado com os filtros aplicados.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {clientesPaginados.map((cliente) => (
              <ClienteCard key={cliente.id} cliente={cliente} />
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                className={`px-4 py-2 rounded text-sm sm:text-base transition font-medium ${
                  n === pagina
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => setPagina(n)}
              >
                {n}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
