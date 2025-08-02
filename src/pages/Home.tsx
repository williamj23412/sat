import { Link } from 'react-router-dom'
import { BookOpen, Brain, FileText, BarChart3, Clock, Trophy } from 'lucide-react'

const Home = () => {
  const features = [
    {
      icon: FileText,
      title: 'Practice Tests',
      description: 'Take full-length SAT practice tests with real timing',
      link: '/practice',
      color: 'text-blue-600'
    },
    {
      icon: Brain,
      title: 'Question Bank',
      description: 'Practice specific topics with our extensive question library',
      link: '/questions',
      color: 'text-purple-600'
    },
    {
      icon: BookOpen,
      title: 'Study Guides',
      description: 'Comprehensive guides for Math, Reading, and Writing',
      link: '/study',
      color: 'text-green-600'
    },
    {
      icon: BarChart3,
      title: 'Progress Tracking',
      description: 'Monitor your improvement with detailed analytics',
      link: '/progress',
      color: 'text-orange-600'
    }
  ]

  const stats = [
    { label: 'Practice Questions', value: '2,500+', icon: Brain },
    { label: 'Study Hours', value: '50+', icon: Clock },
    { label: 'Success Rate', value: '94%', icon: Trophy }
  ]

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold text-gray-900">
          Ace Your <span className="text-primary-600">SAT</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Comprehensive SAT preparation with practice tests, study guides, and progress tracking. 
          Everything you need to achieve your target score.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/practice" className="btn-primary">
            Start Practice Test
          </Link>
          <Link to="/study" className="btn-secondary">
            Browse Study Guides
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="card text-center">
            <stat.icon className="h-8 w-8 text-primary-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <Link
            key={index}
            to={feature.link}
            className="card hover:shadow-lg transition-shadow duration-200 group"
          >
            <feature.icon className={`h-12 w-12 ${feature.color} mb-4 group-hover:scale-110 transition-transform`} />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </Link>
        ))}
      </div>

      {/* Quick Tips */}
      <div className="card bg-primary-50 border-primary-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Study Tips</h3>
        <ul className="space-y-2 text-gray-700">
          <li>• Take practice tests regularly to build stamina and familiarity</li>
          <li>• Focus on your weakest areas first for maximum improvement</li>
          <li>• Review explanations for both correct and incorrect answers</li>
          <li>• Set a consistent study schedule and stick to it</li>
        </ul>
      </div>
    </div>
  )
}

export default Home