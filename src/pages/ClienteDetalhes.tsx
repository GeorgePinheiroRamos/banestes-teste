import { useParams } from "react-router-dom";
import { Cliente, Conta, Agencia } from "../types";
import { useClientesData } from "../hooks/useClienteData";

export default function ClienteDetalhes() {
  const { id } = useParams();
  const { clientes, contas, agencias } = useClientesData();

  console.log(id)

  const cliente = clientes.find((c: Cliente) => String(c.id) === id);

  if (!cliente) return <p>Cliente não encontrado.</p>;

  const contasCliente = contas.filter(
    (conta: Conta) => conta.cpfCnpjCliente === cliente.cpfCnpj
  );

  const agencia = agencias.find(
    (a: Agencia) => a.codigo === cliente.codigoAgencia
  );

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">{cliente.nome}</h1>
      <p>CPF/CNPJ: {cliente.cpfCnpj}</p>
      <p>Email: {cliente.email}</p>
      <p>Renda Anual: R$ {cliente.rendaAnual?.toLocaleString("pt-BR")}</p>
      <p>Patrimônio: R$ {cliente.patrimonio?.toLocaleString("pt-BR")}</p>

      <h2 className="text-xl font-semibold mt-6">Contas</h2>
      {contasCliente.map((conta) => (
        <div key={conta.id} className="p-2 border rounded">
          <p>Tipo: {conta.tipo}</p>
          <p>Saldo: R$ {conta.saldo.toFixed(2)}</p>
          <p>Crédito Disponível: R$ {conta.creditoDisponivel.toFixed(2)}</p>
        </div>
      ))}

      {agencia && (
        <>
          <h2 className="text-xl font-semibold mt-6">Agência</h2>
          <p>Nome: {agencia.nome}</p>
          <p>Endereço: {agencia.endereco}</p>
        </>
      )}
    </div>
  );
}
