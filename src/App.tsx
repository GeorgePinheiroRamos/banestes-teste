
import { useClientesData } from "./hooks/useClienteData";
import { Cliente } from "./types";

function App() {
  const { clientes, loading } = useClientesData();

  if (loading) return <p className="text-center mt-10">Carregando dados...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Clientes</h1>
      <ul className="space-y-2">
        {clientes.slice(0, 10).map((cliente: Cliente) => (
          <li key={cliente.id} className="border p-2 rounded">
            <strong>{cliente.nome}</strong> — {cliente.cpfCnpj}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
