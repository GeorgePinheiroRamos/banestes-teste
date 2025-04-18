import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClienteList } from "./pages/ClienteList";
import ClienteDetalhes from "./pages/ClienteDetalhes";



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ClienteList />} />
        <Route path="/clientes/:id" element={<ClienteDetalhes />} />
      </Routes>
    </BrowserRouter>
  );
}
