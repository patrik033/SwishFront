import { BrowserRouter, Routes, Route } from "react-router-dom"

import MainComponent from "./Components/MainComponent"
import ProductDetails from "./Components/ProductPages/ProductDetails"
import Navbar from "./Components/NavAndFooter/Navbar"

import "./index.css"
import Footer from "./Components/NavAndFooter/Footer"
import Login from "./Components/Auth/Login"
import LogOut from "./Components/Auth/LogOut"
import Register from "./Components/Auth/Register"
import RegisterConfirmation from "./Components/Auth/RegisterConfirmation"
import ResendEmailActivationLink from "./Components/Auth/ResendEmailActivationLink"
import { UserProvider } from "./Components/Auth/User/UserContext"

function App() {

  return (

    <UserProvider>
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
    </UserProvider >




  )
}

export default App
