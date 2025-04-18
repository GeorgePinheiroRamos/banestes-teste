import { useParams } from "react-router-dom";
import { Conta } from "../types";
import { useClientesData } from "../hooks/useClienteData";

export default function ClienteDetalhes() {
  const { id } = useParams();
  const { clientes, contas, agencias } = useClientesData();

  const cliente = clientes.find((c) => String(c.id) === id);

  if (!cliente) {
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-gray-500">Cliente não encontrado.</p>
      </div>
    );
  }

  const contasCliente = contas.filter(
    (conta: Conta) => conta.cpfCnpjCliente === cliente.cpfCnpj
  );

  const agencia = agencias.find((a) => a.codigo === cliente.codigoAgencia);

  return (
    <main className="p-6 space-y-6 max-w-4xl mx-auto">
      <section className="border-b pb-4" aria-label="Informações do cliente">
        <h1 className="text-3xl font-bold mb-2">{cliente.nome}</h1>
        <div className="text-gray-700 space-y-1">
          <p>
            <strong>CPF/CNPJ:</strong> {cliente.cpfCnpj}
          </p>
          <p>
            <strong>Email:</strong> {cliente.email}
          </p>
          <p>
            <strong>Renda Anual:</strong> R${" "}
            {cliente.rendaAnual.toLocaleString("pt-BR")}
          </p>
          <p>
            <strong>Patrimônio:</strong> R${" "}
            {cliente.patrimonio.toLocaleString("pt-BR")}
          </p>
        </div>
      </section>

      <section className="space-y-2" aria-label="Contas do cliente">
        <h2 className="text-2xl font-semibold">Contas</h2>
        {contasCliente.length > 0 ? (
          contasCliente.map((conta) => (
            <div key={conta.id} className="p-4 border rounded-md shadow-sm">
              <p>
                <strong>Tipo:</strong> {conta.tipo}
              </p>
              <p>
                <strong>Saldo:</strong> R$ {conta.saldo.toFixed(2)}
              </p>
              <p>
                <strong>Crédito Disponível:</strong> R${" "}
                {conta.creditoDisponivel.toFixed(2)}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Nenhuma conta vinculada.</p>
        )}
      </section>

      {agencia && (
        <section className="space-y-1" aria-label="Informações da agência">
          <h2 className="text-2xl font-semibold">Agência</h2>
          <p>
            <strong>Nome:</strong> {agencia.nome}
          </p>
          <p>
            <strong>Endereço:</strong> {agencia.endereco}
          </p>
        </section>
      )}
    </main>
  );
}
