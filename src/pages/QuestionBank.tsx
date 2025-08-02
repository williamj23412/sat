import { useState } from 'react'
import { questions, getQuestionsBySection, getQuestionsByDifficulty, Question } from '../data/questions'
import { Brain, Calculator, PenTool, Filter } from 'lucide-react'

const QuestionBank = () => {
  const [selectedSection, setSelectedSection] = useState<string>('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [userAnswer, setUserAnswer] = useState<number>(-1)
  const [showAnswer, setShowAnswer] = useState(false)

  const sections = [
    { id: 'all', name: 'All Sections', icon: Brain, color: 'text-gray-600' },
    { id: 'math', name: 'Math', icon: Calculator, color: 'text-blue-600' },
    { id: 'reading', name: 'Reading', icon: Brain, color: 'text-green-600' },
    { id: 'writing', name: 'Writing', icon: PenTool, color: 'text-purple-600' }
  ]

  const difficulties = [
    { id: 'all', name: 'All Difficulties' },
    { id: 'easy', name: 'Easy' },
    { id: 'medium', name: 'Medium' },
    { id: 'hard', name: 'Hard' }
  ]

  const getFilteredQuestions = () => {
    let filtered = questions

    if (selectedSection !== 'all') {
      filtered = getQuestionsBySection(selectedSection)
    }

    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(q => q.difficulty === selectedDifficulty)
    }

    return filtered
  }

  const filteredQuestions = getFilteredQuestions()

  const getRandomQuestion = () => {
    const available = filteredQuestions
    if (available.length === 0) return null
    
    const randomIndex = Math.floor(Math.random() * available.length)
    const question = available[randomIndex]
    setCurrentQuestion(question)
    setUserAnswer(-1)
    setShowAnswer(false)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setUserAnswer(answerIndex)
  }

  const handleShowAnswer = () => {
    setShowAnswer(true)
  }

  const handleNextQuestion = () => {
    getRandomQuestion()
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'hard': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Question Bank</h1>
        <p className="text-lg text-gray-600">Practice specific topics and difficulties</p>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold">Filters</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Section Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Section</label>
            <div className="grid grid-cols-2 gap-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setSelectedSection(section.id)}
                  className={`flex items-center gap-2 p-3 rounded-lg border transition-colors ${
                    selectedSection === section.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <section.icon className={`h-4 w-4 ${section.color}`} />
                  <span className="text-sm font-medium">{section.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
            <div className="grid grid-cols-2 gap-2">
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty.id}
                  onClick={() => setSelectedDifficulty(difficulty.id)}
                  className={`p-3 rounded-lg border transition-colors ${
                    selectedDifficulty === difficulty.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <span className="text-sm font-medium">{difficulty.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {filteredQuestions.length} question{filteredQuestions.length !== 1 ? 's' : ''} available
          </p>
          <button
            onClick={getRandomQuestion}
            disabled={filteredQuestions.length === 0}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Get Random Question
          </button>
        </div>
      </div>

      {/* Current Question */}
      {currentQuestion && (
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              currentQuestion.section === 'math' ? 'bg-blue-100 text-blue-800' :
              currentQuestion.section === 'reading' ? 'bg-green-100 text-green-800' :
              'bg-purple-100 text-purple-800'
            }`}>
              {currentQuestion.section.charAt(0).toUpperCase() + currentQuestion.section.slice(1)} - {currentQuestion.topic}
            </span>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentQuestion.difficulty)}`}>
              {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
            </span>
          </div>

          <h3 className="text-lg font-medium mb-6">{currentQuestion.question}</h3>

          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showAnswer}
                className={`w-full text-left p-4 rounded-lg border transition-colors ${
                  showAnswer
                    ? index === currentQuestion.correctAnswer
                      ? 'border-green-500 bg-green-50'
                      : userAnswer === index
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-300'
                    : userAnswer === index
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-300 hover:border-gray-400'
                } ${showAnswer ? 'cursor-not-allowed' : ''}`}
              >
                <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                {option}
                {showAnswer && index === currentQuestion.correctAnswer && (
                  <span className="ml-2 text-green-600 font-medium">✓ Correct</span>
                )}
                {showAnswer && userAnswer === index && index !== currentQuestion.correctAnswer && (
                  <span className="ml-2 text-red-600 font-medium">✗ Your answer</span>
                )}
              </button>
            ))}
          </div>

          {showAnswer && (
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Explanation:</h4>
              <p className="text-gray-700">{currentQuestion.explanation}</p>
            </div>
          )}

          <div className="flex gap-3">
            {!showAnswer ? (
              <button
                onClick={handleShowAnswer}
                disabled={userAnswer === -1}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Show Answer
              </button>
            ) : (
              <button onClick={handleNextQuestion} className="btn-primary">
                Next Question
              </button>
            )}
          </div>
        </div>
      )}

      {/* Question Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <Calculator className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">
            {questions.filter(q => q.section === 'math').length}
          </div>
          <div className="text-gray-600">Math Questions</div>
        </div>

        <div className="card text-center">
          <Brain className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">
            {questions.filter(q => q.section === 'reading').length}
          </div>
          <div className="text-gray-600">Reading Questions</div>
        </div>

        <div className="card text-center">
          <PenTool className="h-8 w-8 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">
            {questions.filter(q => q.section === 'writing').length}
          </div>
          <div className="text-gray-600">Writing Questions</div>
        </div>
      </div>
    </div>
  )
}

export default QuestionBank