import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Workspace from "./pages/Workspace";
import ShopkeeperLogin from "./pages/ShopkeeperLogin";
import ShopkeeperDashboard from "./pages/ShopkeeperDashboard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workspace" element={<Workspace />} />
          <Route path="/shopkeeper-login" element={<ShopkeeperLogin />} />
          <Route path="/shopkeeper-dashboard" element={<ShopkeeperDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
