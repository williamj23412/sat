import { TrendingUp, Award, Target, Calendar } from 'lucide-react'

const Progress = () => {
  // Mock data for demonstration
  const stats = {
    testsCompleted: 12,
    averageScore: 1420,
    improvementRate: 15,
    studyHours: 42
  }

  const recentTests = [
    { date: '2024-01-20', score: 1450, math: 720, reading: 730 },
    { date: '2024-01-15', score: 1420, math: 700, reading: 720 },
    { date: '2024-01-10', score: 1390, math: 680, reading: 710 },
    { date: '2024-01-05', score: 1360, math: 660, reading: 700 },
    { date: '2023-12-30', score: 1320, math: 640, reading: 680 }
  ]

  const sectionProgress = [
    { section: 'Math', current: 720, target: 750, improvement: 80 },
    { section: 'Reading', current: 730, target: 760, improvement: 50 },
    { section: 'Writing', current: 690, target: 720, improvement: 70 }
  ]

  const strengths = [
    'Algebra and Functions',
    'Reading Comprehension',
    'Grammar and Usage'
  ]

  const weaknesses = [
    'Geometry',
    'Data Analysis',
    'Vocabulary in Context'
  ]

  const getScoreColor = (score: number) => {
    if (score >= 1500) return 'text-green-600'
    if (score >= 1400) return 'text-blue-600'
    if (score >= 1300) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Progress Tracking</h1>
        <p className="text-lg text-gray-600">Monitor your SAT preparation journey</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card text-center">
          <Target className="h-8 w-8 text-primary-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{stats.testsCompleted}</div>
          <div className="text-gray-600">Tests Completed</div>
        </div>
        
        <div className="card text-center">
          <Award className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <div className={`text-2xl font-bold ${getScoreColor(stats.averageScore)}`}>
            {stats.averageScore}
          </div>
          <div className="text-gray-600">Average Score</div>
        </div>
        
        <div className="card text-center">
          <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-green-600">+{stats.improvementRate}%</div>
          <div className="text-gray-600">Improvement</div>
        </div>
        
        <div className="card text-center">
          <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{stats.studyHours}h</div>
          <div className="text-gray-600">Study Time</div>
        </div>
      </div>

      {/* Score History */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Score History</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-4">Date</th>
                <th className="text-left py-2 px-4">Total Score</th>
                <th className="text-left py-2 px-4">Math</th>
                <th className="text-left py-2 px-4">Reading & Writing</th>
                <th className="text-left py-2 px-4">Change</th>
              </tr>
            </thead>
            <tbody>
              {recentTests.map((test, index) => {
                const previousTest = recentTests[index + 1]
                const change = previousTest ? test.score - previousTest.score : 0
                
                return (
                  <tr key={test.date} className="border-b border-gray-100">
                    <td className="py-3 px-4">{test.date}</td>
                    <td className={`py-3 px-4 font-semibold ${getScoreColor(test.score)}`}>
                      {test.score}
                    </td>
                    <td className="py-3 px-4">{test.math}</td>
                    <td className="py-3 px-4">{test.reading}</td>
                    <td className="py-3 px-4">
                      {change > 0 && (
                        <span className="text-green-600 font-medium">+{change}</span>
                      )}
                      {change < 0 && (
                        <span className="text-red-600 font-medium">{change}</span>
                      )}
                      {change === 0 && (
                        <span className="text-gray-500">-</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section Progress */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Section Progress</h2>
        <div className="space-y-4">
          {sectionProgress.map((section) => (
            <div key={section.section}>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{section.section}</span>
                <span className="text-sm text-gray-600">
                  {section.current} / {section.target}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-primary-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${getProgressPercentage(section.current, section.target)}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Target: {section.target} points
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths and Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4 text-green-600">Strengths</h3>
          <ul className="space-y-2">
            {strengths.map((strength, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-4 text-red-600">Areas for Improvement</h3>
          <ul className="space-y-2">
            {weaknesses.map((weakness, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-gray-700">{weakness}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Study Recommendations */}
      <div className="card bg-gradient-to-r from-primary-50 to-blue-50 border-primary-200">
        <h2 className="text-xl font-semibold mb-4">📚 Study Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Focus Areas</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Practice more geometry problems</li>
              <li>• Review data analysis techniques</li>
              <li>• Expand vocabulary with context clues</li>
              <li>• Time management in reading section</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Next Steps</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Take a full practice test this week</li>
              <li>• Complete 20 math questions daily</li>
              <li>• Read one academic article per day</li>
              <li>• Review grammar rules weekly</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Goal Setting */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">🎯 Score Goals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-primary-600">1500+</div>
            <div className="text-gray-600">Target Score</div>
            <div className="text-sm text-gray-500 mt-1">Top 1% percentile</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">750</div>
            <div className="text-gray-600">Math Goal</div>
            <div className="text-sm text-gray-500 mt-1">30 points to go</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">760</div>
            <div className="text-gray-600">Reading Goal</div>
            <div className="text-sm text-gray-500 mt-1">30 points to go</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Progress