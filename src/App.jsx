import Booking from './pages/Booking'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Assessment from './pages/Assessment'
import Results from './pages/Results'
import CareerDetails from './pages/CareerDetails'
import Compare from './pages/Compare'
import Roadmap from './pages/Roadmap'
import Dashboard from './pages/Dashboard'
import Counsellor from './pages/Counsellor'
import Login from './pages/Login'
import RequireAuth from './RequireAuth'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
<Route path="/assessment" element={<RequireAuth><Assessment /></RequireAuth>} />
<Route path="/results" element={<RequireAuth><Results /></RequireAuth>} />
        <Route path="/career-details" element={<CareerDetails />} />
        <Route path="/compare" element={<Compare />} />
 <Route path="/roadmap" element={<RequireAuth><Roadmap /></RequireAuth>} />
<Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
<Route path="/counsellor" element={<RequireAuth><Counsellor /></RequireAuth>} />
<Route path="/book" element={<RequireAuth><Booking /></RequireAuth>} />
      </Route>
    </Routes>
  )
}