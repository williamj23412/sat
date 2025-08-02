import { useState } from 'react'
import { BookOpen, Calculator, PenTool, Brain, ChevronDown, ChevronRight } from 'lucide-react'

const StudyGuides = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId)
  }

  const studyGuides = [
    {
      id: 'math',
      title: 'Math Section',
      icon: Calculator,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      description: 'Master algebra, geometry, statistics, and advanced math concepts',
      topics: [
        {
          title: 'Algebra and Functions',
          content: [
            'Linear equations and inequalities',
            'Systems of equations',
            'Quadratic functions and equations',
            'Exponential and logarithmic functions',
            'Polynomial operations'
          ]
        },
        {
          title: 'Geometry and Trigonometry',
          content: [
            'Area and volume formulas',
            'Circle properties and equations',
            'Coordinate geometry',
            'Similar triangles and proportions',
            'Basic trigonometric ratios'
          ]
        },
        {
          title: 'Statistics and Probability',
          content: [
            'Measures of central tendency',
            'Data interpretation and analysis',
            'Probability calculations',
            'Normal distributions',
            'Correlation and causation'
          ]
        }
      ],
      tips: [
        'Memorize key formulas before test day',
        'Practice mental math to save time',
        'Draw diagrams for geometry problems',
        'Check your work by plugging answers back in'
      ]
    },
    {
      id: 'reading',
      title: 'Reading Section',
      icon: Brain,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      description: 'Develop critical reading and comprehension skills',
      topics: [
        {
          title: 'Reading Comprehension',
          content: [
            'Main idea and supporting details',
            'Author\'s purpose and tone',
            'Inference and implicit meaning',
            'Cause and effect relationships',
            'Compare and contrast analysis'
          ]
        },
        {
          title: 'Vocabulary in Context',
          content: [
            'Context clues and word meanings',
            'Figurative language and metaphors',
            'Technical and academic vocabulary',
            'Multiple meaning words',
            'Word root analysis'
          ]
        },
        {
          title: 'Text Analysis',
          content: [
            'Literary devices and techniques',
            'Argument structure and evidence',
            'Point of view and perspective',
            'Text organization patterns',
            'Synthesis of multiple sources'
          ]
        }
      ],
      tips: [
        'Read the questions before the passage',
        'Eliminate obviously wrong answers first',
        'Look for evidence in the text to support your choice',
        'Don\'t overthink - go with your first instinct'
      ]
    },
    {
      id: 'writing',
      title: 'Writing and Language',
      icon: PenTool,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      description: 'Perfect grammar, usage, and effective expression',
      topics: [
        {
          title: 'Grammar and Usage',
          content: [
            'Subject-verb agreement',
            'Pronoun clarity and agreement',
            'Verb tense consistency',
            'Parallel structure',
            'Modifier placement'
          ]
        },
        {
          title: 'Punctuation and Style',
          content: [
            'Comma usage rules',
            'Semicolons and colons',
            'Apostrophes and possession',
            'Sentence boundaries',
            'Transitions and flow'
          ]
        },
        {
          title: 'Effective Expression',
          content: [
            'Conciseness and clarity',
            'Word choice and tone',
            'Logical organization',
            'Supporting evidence',
            'Conclusion effectiveness'
          ]
        }
      ],
      tips: [
        'Read sentences aloud mentally',
        'Trust your ear for what sounds right',
        'When in doubt, choose the simplest option',
        'Check for common grammar mistakes'
      ]
    }
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Study Guides</h1>
        <p className="text-lg text-gray-600">
          Comprehensive preparation materials for all SAT sections
        </p>
      </div>

      {/* Study Guide Sections */}
      <div className="space-y-6">
        {studyGuides.map((guide) => (
          <div key={guide.id} className={`card ${guide.bgColor} ${guide.borderColor}`}>
            <button
              onClick={() => toggleSection(guide.id)}
              className="w-full flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-4">
                <guide.icon className={`h-8 w-8 ${guide.color}`} />
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{guide.title}</h2>
                  <p className="text-gray-600">{guide.description}</p>
                </div>
              </div>
              {expandedSection === guide.id ? (
                <ChevronDown className="h-6 w-6 text-gray-600" />
              ) : (
                <ChevronRight className="h-6 w-6 text-gray-600" />
              )}
            </button>

            {expandedSection === guide.id && (
              <div className="mt-6 space-y-6">
                {/* Topics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {guide.topics.map((topic, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-3">{topic.title}</h3>
                      <ul className="space-y-1">
                        {topic.content.map((item, itemIndex) => (
                          <li key={itemIndex} className="text-sm text-gray-700 flex items-start">
                            <span className="mr-2">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Tips */}
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    💡 Test-Taking Tips
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {guide.tips.map((tip, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start">
                        <span className="mr-2">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* General Test Tips */}
      <div className="card bg-gradient-to-r from-primary-50 to-blue-50 border-primary-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary-600" />
          General SAT Strategies
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Before the Test</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Get plenty of sleep the night before</li>
              <li>• Eat a healthy breakfast</li>
              <li>• Arrive early to the test center</li>
              <li>• Bring required materials and ID</li>
              <li>• Review key formulas one last time</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">During the Test</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Manage your time carefully</li>
              <li>• Answer easy questions first</li>
              <li>• Use process of elimination</li>
              <li>• Don't leave any blanks (no penalty for guessing)</li>
              <li>• Stay calm and focused</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 p-4 bg-white rounded-lg border border-primary-200">
          <h3 className="font-semibold text-gray-900 mb-2">Score Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="font-bold text-blue-600">Math</div>
              <div className="text-gray-600">200-800 points</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-green-600">Reading & Writing</div>
              <div className="text-gray-600">200-800 points</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-gray-900">Total</div>
              <div className="text-gray-600">400-1600 points</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudyGuides