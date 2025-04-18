import { ClienteList } from "./components/ClienteList";

function App() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Clientes</h1>
      <ClienteList />
    </div>
  );
}

export default App;
