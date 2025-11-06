import Layout from './components/Layout'
import { Router } from './components/router'
import TicketForm from './components/TicketForm'
import TicketView from './components/TicketView'
import Dashboard from './components/Dashboard'

export default function App() {
  return (
    <Layout>
      <Router routes={[
        { path: '/dashboard', element: <Dashboard/> },
        { path: '/ticket', element: <TicketView/> },
        { path: '/', element: <TicketForm/> },
      ]} />
    </Layout>
  )
}
