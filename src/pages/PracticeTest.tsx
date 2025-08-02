import { useState, useEffect } from 'react'
import { Clock, CheckCircle, XCircle } from 'lucide-react'
import { getRandomQuestions, Question } from '../data/questions'

const PracticeTest = () => {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [timeLeft, setTimeLeft] = useState(3600) // 60 minutes
  const [isActive, setIsActive] = useState(false)
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    // Initialize with 10 random questions
    const testQuestions = getRandomQuestions(10)
    setQuestions(testQuestions)
    setAnswers(new Array(testQuestions.length).fill(-1))
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isActive && timeLeft > 0 && !showResults) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setShowResults(true)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft, showResults])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answerIndex
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = () => {
    setShowResults(true)
    setIsActive(false)
  }

  const calculateScore = () => {
    let correct = 0
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correct++
      }
    })
    return Math.round((correct / questions.length) * 100)
  }

  const startTest = () => {
    setIsActive(true)
  }

  if (questions.length === 0) {
    return <div className="text-center">Loading...</div>
  }

  if (showResults) {
    const score = calculateScore()
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="card text-center">
          <h2 className="text-3xl font-bold mb-4">Test Complete!</h2>
          <div className="text-6xl font-bold text-primary-600 mb-4">{score}%</div>
          <p className="text-lg text-gray-600 mb-6">
            You answered {questions.filter((_, i) => answers[i] === questions[i].correctAnswer).length} out of {questions.length} questions correctly
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-primary"
          >
            Take Another Test
          </button>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Review Your Answers</h3>
          {questions.map((question, index) => (
            <div key={question.id} className="card">
              <div className="flex items-start gap-3">
                {answers[index] === question.correctAnswer ? (
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <p className="font-medium mb-2">{question.question}</p>
                  <p className="text-sm text-gray-600 mb-2">
                    Your answer: {answers[index] >= 0 ? question.options[answers[index]] : 'No answer'}
                  </p>
                  <p className="text-sm text-green-600 mb-2">
                    Correct answer: {question.options[question.correctAnswer]}
                  </p>
                  <p className="text-sm text-gray-700">{question.explanation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const currentQ = questions[currentQuestion]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">SAT Practice Test</h1>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-gray-600" />
              <span className={`font-mono text-lg ${timeLeft < 300 ? 'text-red-600' : 'text-gray-700'}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
            {!isActive && (
              <button onClick={startTest} className="btn-primary">
                Start Test
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="card">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Progress</span>
          <span className="text-sm text-gray-600">
            {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="card">
        <div className="mb-4">
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
            currentQ.section === 'math' ? 'bg-blue-100 text-blue-800' :
            currentQ.section === 'reading' ? 'bg-green-100 text-green-800' :
            'bg-purple-100 text-purple-800'
          }`}>
            {currentQ.section.charAt(0).toUpperCase() + currentQ.section.slice(1)} - {currentQ.topic}
          </span>
        </div>
        
        <h3 className="text-lg font-medium mb-6">{currentQ.question}</h3>
        
        <div className="space-y-3">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={!isActive}
              className={`w-full text-left p-4 rounded-lg border transition-colors ${
                answers[currentQuestion] === index
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-300 hover:border-gray-400'
              } ${!isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        <div className="flex gap-3">
          {currentQuestion === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={!isActive}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Test
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={currentQuestion === questions.length - 1}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default PracticeTest