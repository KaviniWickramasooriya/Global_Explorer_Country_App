import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import AllCountriesHomePage from "../pages/Home/AllCountriesHomePage";
import SearchCountryPage from "../pages/Home/SearchCountryPage";
import CountryDetailsPage from "../pages/Home/CountryDetailsPage";
import FavoritesPage from "../pages/Home/FavoritesPage";


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/allCountries" element={<AllCountriesHomePage />} />
        <Route path="/search" element={<SearchCountryPage/>} />
        <Route path="/country/:code" element={<CountryDetailsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;