import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";

function App() {

  <>
  <Toaster position="top-right" />

  <AppRoutes />
</>

  return <AppRoutes />;

  
}

export default App;