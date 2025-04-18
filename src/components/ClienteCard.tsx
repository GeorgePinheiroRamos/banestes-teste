import { Link } from "react-router-dom";
import { Cliente } from "../types";

interface Props {
  cliente: Cliente;
}

export function ClienteCard({ cliente }: Props) {
  return (
    <Link
      to={`/clientes/${cliente.id}`}
      className="border p-4 rounded shadow-sm hover:shadow-md hover:border-blue-500 hover:-translate-y-1 transform transition duration-200"
    >
      <h2 className="text-lg font-semibold">{cliente.nome}</h2>
      <p className="text-sm text-gray-600">CPF/CNPJ: {cliente.cpfCnpj}</p>
      <p className="text-sm">Email: {cliente.email}</p>
      <p className="text-sm">Endereço: {cliente.endereco}</p>
    </Link>
  );
}
