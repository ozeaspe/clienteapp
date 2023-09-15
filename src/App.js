import { BrowserRouter } from "react-router-dom";
import RoutesApp from "./routes";

//Importo o AuthProvider para que o código possa ser reutilizado
import AuthProvider from "./contexts/auth";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      <RoutesApp/>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
