import { Container } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Booking from './pages/Booking.jsx'
import NotFound from './pages/NotFound.jsx'

function App() {
  return (
    <>
      <NavBar />
      <Container sx={{ py: 3 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking/:carId" element={<Booking />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
      <Footer />
    </>
  )
}

export default App
