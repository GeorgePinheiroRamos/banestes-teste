import { Cliente } from "../types";
import { Link } from "react-router-dom";

interface Props {
  cliente: Cliente;
}

export function ClienteCard({ cliente }: Props) {
  return (
    <Link to={`/clientes/${cliente.id}`}>
      <div className="border p-4 rounded shadow-sm hover:shadow-md transition hover:bg-gray-100 cursor-pointer">
        <h2 className="text-lg font-semibold">{cliente.nome}</h2>
        <p className="text-sm text-gray-600">CPF/CNPJ: {cliente.cpfCnpj}</p>
        <p className="text-sm">Email: {cliente.email}</p>
        <p className="text-sm">Endereço: {cliente.endereco}</p>
      </div>
    </Link>
  );
}
