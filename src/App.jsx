import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Explorer from './pages/Explorer'
import CalendarPage from './pages/CalendarPage'
import BookingForm from './pages/BookingForm'
import Approvals from './pages/Approvals'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/explore" element={<Explorer />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/book/:resourceId?" element={<BookingForm />} />
          <Route path="/approvals" element={<Approvals />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}