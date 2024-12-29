import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/layout/navbar";
import Container from "./components/layout/container";
import Footer from "./components/layout/footer";

import Home from "./pages/home";
import Clientes from "./pages/clientes";
import Quartos from "./pages/quartos";
import Object from "./pages/object";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Container customClass="min-height">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/quartos" element={<Quartos />} />
            <Route path="/clientes/:id" element={<Object type='cliente'/>} />
            <Route path="/quartos/:id" element={<Object type='quarto'/>} />
            <Route path="/reservas/:id" element={<Object type='reserva'/>} />
            <Route path="/dependentes/:id" element={<Object type='dependente'/>} />
          </Routes>
        </Container>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
