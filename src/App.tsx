import { BrowserRouter, Routes, Route } from "react-router-dom"

import MainComponent from "./Components/MainComponent"
import ProductDetails from "./Components/ProductPages/ProductDetails"
import Navbar from "./Components/NavAndFooter/Navbar"

import "./index.css"
import Footer from "./Components/NavAndFooter/Footer"

function App() {

  return (
    <div className="flex flex-col min-h-screen">

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainComponent />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>




  )
}

export default App
