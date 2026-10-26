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

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/results" element={<Results />} />
        <Route path="/career-details" element={<CareerDetails />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/counsellor" element={<Counsellor />} />
      </Route>
    </Routes>
  )
}