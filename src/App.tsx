import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import PracticeTest from './pages/PracticeTest'
import StudyGuides from './pages/StudyGuides'
import Progress from './pages/Progress'
import QuestionBank from './pages/QuestionBank'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/practice" element={<PracticeTest />} />
          <Route path="/questions" element={<QuestionBank />} />
          <Route path="/study" element={<StudyGuides />} />
          <Route path="/progress" element={<Progress />} />
        </Routes>
      </main>
    </div>
  )
}

export default App