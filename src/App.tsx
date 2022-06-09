import { BrowserRouter } from "react-router-dom";
import { ClientsProvider } from "./context/ClientsContext";
import { Routes } from "./routes";

function App() {
  return (
    <BrowserRouter>
      <ClientsProvider>
        <Routes />
      </ClientsProvider>
    </BrowserRouter>
  );
}

export default App;
