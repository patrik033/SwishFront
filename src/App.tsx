import { BrowserRouter, Routes, Route } from "react-router-dom"

import MainComponent from "./Components/MainComponent"
import ProductDetails from "./Components/ProductPages/ProductDetails"
import Navbar from "./Components/NavAndFooter/Navbar"

import "./index.css"
import Footer from "./Components/NavAndFooter/Footer"
import Login from "./Components/AuthNavigation/Login"
import LogOut from "./Components/AuthNavigation/LogOut"
import Register from "./Components/AuthNavigation/Register"
import RegisterConfirmation from "./Components/AuthNavigation/RegisterConfirmation"
import ResendEmailActivationLink from "./Components/AuthNavigation/ResendEmailActivationLink"

function App() {

  return (
    <div className="flex flex-col min-h-screen">

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainComponent />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/register" element={<Register />} />
          <Route path="/registerconfirmation" element={<RegisterConfirmation />} />
          <Route path="/resendEmailLink" element={<ResendEmailActivationLink />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>




  )
}

export default App
