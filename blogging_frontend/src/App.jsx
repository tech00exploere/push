import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="min-h-[80vh]">
        <AppRoutes />
      </main>
      <Footer />
    </BrowserRouter>
  );
}
