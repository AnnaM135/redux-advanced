import {Routes, Route} from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { FavoritesPage } from "./pages/FavoritesPage";
import { HomePage } from "./pages/HomePage";

function App() {
  return (
    <div>
      <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
    </div>
  )
}

export default App;
