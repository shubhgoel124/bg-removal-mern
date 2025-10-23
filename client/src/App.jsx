import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Result from './pages/Result';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BuyCredit from './pages/BuyCredit';
import Verify from './pages/Verify';

const App = () => {
  return (
    <div className='min-h-screen bg-slate-50'>
      <ToastContainer position='bottom-right' />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/result' element={<Result />} />
        <Route path='/buy' element={<BuyCredit />} />
        <Route path='/verify' element={<Verify />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App