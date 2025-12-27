import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import EvaluationPage from './pages/EvaluationPage'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/evaluate" element={<EvaluationPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
