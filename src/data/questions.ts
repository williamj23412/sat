export interface Question {
  id: string
  section: 'math' | 'reading' | 'writing'
  difficulty: 'easy' | 'medium' | 'hard'
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  topic: string
}

export const questions: Question[] = [
  // Math Questions
  {
    id: 'math_1',
    section: 'math',
    difficulty: 'easy',
    topic: 'Algebra',
    question: 'If 3x + 7 = 22, what is the value of x?',
    options: ['3', '5', '7', '15'],
    correctAnswer: 1,
    explanation: 'Subtract 7 from both sides: 3x = 15. Then divide by 3: x = 5.'
  },
  {
    id: 'math_2',
    section: 'math',
    difficulty: 'medium',
    topic: 'Geometry',
    question: 'A circle has a radius of 6 units. What is its area?',
    options: ['12π', '36π', '6π', '18π'],
    correctAnswer: 1,
    explanation: 'Area of a circle = πr². With r = 6, area = π(6)² = 36π.'
  },
  {
    id: 'math_3',
    section: 'math',
    difficulty: 'hard',
    topic: 'Functions',
    question: 'If f(x) = x² - 4x + 3, what is the minimum value of f(x)?',
    options: ['-1', '0', '1', '3'],
    correctAnswer: 0,
    explanation: 'Complete the square: f(x) = (x-2)² - 1. The minimum value is -1 when x = 2.'
  },
  {
    id: 'math_4',
    section: 'math',
    difficulty: 'medium',
    topic: 'Statistics',
    question: 'The mean of 5 numbers is 12. If four of the numbers are 8, 10, 14, and 16, what is the fifth number?',
    options: ['10', '12', '14', '16'],
    correctAnswer: 1,
    explanation: 'Total sum = 5 × 12 = 60. Sum of four numbers = 8 + 10 + 14 + 16 = 48. Fifth number = 60 - 48 = 12.'
  },

  // Reading Questions
  {
    id: 'reading_1',
    section: 'reading',
    difficulty: 'easy',
    topic: 'Main Idea',
    question: 'Based on the passage, the author\'s primary purpose is to:',
    options: [
      'Describe a scientific discovery',
      'Argue for environmental protection',
      'Explain a historical event',
      'Compare different viewpoints'
    ],
    correctAnswer: 1,
    explanation: 'The passage consistently advocates for protecting the environment through various examples and evidence.'
  },
  {
    id: 'reading_2',
    section: 'reading',
    difficulty: 'medium',
    topic: 'Inference',
    question: 'Which of the following can be inferred from the passage?',
    options: [
      'Technology always improves quality of life',
      'Change is often met with resistance',
      'Education is the key to success',
      'Economic growth is most important'
    ],
    correctAnswer: 1,
    explanation: 'Throughout the passage, examples show how new ideas and innovations faced initial skepticism and opposition.'
  },
  {
    id: 'reading_3',
    section: 'reading',
    difficulty: 'hard',
    topic: 'Rhetoric',
    question: 'The author uses the metaphor in line 15 primarily to:',
    options: [
      'Create vivid imagery',
      'Emphasize the complexity of the issue',
      'Appeal to the reader\'s emotions',
      'Provide a concrete example'
    ],
    correctAnswer: 2,
    explanation: 'The metaphor is strategically placed to evoke an emotional response and make the argument more compelling.'
  },

  // Writing Questions
  {
    id: 'writing_1',
    section: 'writing',
    difficulty: 'easy',
    topic: 'Grammar',
    question: 'Choose the best revision for the underlined portion: "The students, who studied hard, they passed the exam."',
    options: [
      'students, who studied hard, they',
      'students who studied hard',
      'students, who studied hard,',
      'students; who studied hard, they'
    ],
    correctAnswer: 1,
    explanation: 'The original sentence has a pronoun redundancy. "The students who studied hard passed the exam" is correct.'
  },
  {
    id: 'writing_2',
    section: 'writing',
    difficulty: 'medium',
    topic: 'Punctuation',
    question: 'Which sentence uses punctuation correctly?',
    options: [
      'The conference; which was held in Boston, attracted many attendees.',
      'The conference, which was held in Boston, attracted many attendees.',
      'The conference which was held in Boston; attracted many attendees.',
      'The conference: which was held in Boston attracted many attendees.'
    ],
    correctAnswer: 1,
    explanation: 'Non-restrictive clauses (additional information) should be set off by commas, not semicolons or colons.'
  },
  {
    id: 'writing_3',
    section: 'writing',
    difficulty: 'hard',
    topic: 'Style',
    question: 'Which revision best improves the sentence: "The movie was really good and I liked it a lot."',
    options: [
      'The movie was excellent and I enjoyed it immensely.',
      'The film\'s compelling narrative and outstanding performances captivated me.',
      'The movie was very good and I really enjoyed watching it.',
      'I thought the movie was good and liked it.'
    ],
    correctAnswer: 1,
    explanation: 'This revision uses more sophisticated vocabulary and specific details rather than vague qualifiers.'
  },
  {
    id: 'writing_4',
    section: 'writing',
    difficulty: 'medium',
    topic: 'Organization',
    question: 'To improve the flow of the paragraph, sentence 3 should be:',
    options: [
      'Moved to the beginning',
      'Moved to the end',
      'Combined with sentence 2',
      'Deleted entirely'
    ],
    correctAnswer: 0,
    explanation: 'Sentence 3 introduces the main topic and should come first to establish context for the supporting details.'
  }
]

export const getQuestionsBySection = (section: string) => {
  return questions.filter(q => q.section === section)
}

export const getQuestionsByDifficulty = (difficulty: string) => {
  return questions.filter(q => q.difficulty === difficulty)
}

export const getRandomQuestions = (count: number, section?: string) => {
  let pool = section ? getQuestionsBySection(section) : questions
  const shuffled = [...pool].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}