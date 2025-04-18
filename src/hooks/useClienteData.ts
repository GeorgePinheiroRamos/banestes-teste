import { useEffect, useState } from "react";
import { fetchCSV } from "../services/fetchData";
import { Cliente, Conta, Agencia } from "../types";

export function useClientesData() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [contas, setContas] = useState<Conta[]>([]);
  const [agencias, setAgencias] = useState<Agencia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [clientesData, contasData, agenciasData] = await Promise.all([
        fetchCSV<Cliente>("clientes"),
        fetchCSV<Conta>("contas"),
        fetchCSV<Agencia>("agencias"),
      ]);

      setClientes(clientesData);
      setContas(contasData);
      setAgencias(agenciasData);
      setLoading(false);
    }

    loadData();
  }, []);

  return { clientes, contas, agencias, loading };
}
