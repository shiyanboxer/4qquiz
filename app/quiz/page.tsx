'use client'

import { useState } from 'react'
import { BasicInfo } from '../components/BasicInfo'
import { LifeStageQuestions } from '../components/LifeStageQuestions'
import { Dashboard } from '../components/Dashboard'
import { ProgressBar } from '../components/ProgressBar'
import { Card } from '@/app/components/ui/card'

interface FormData {
  name: string
  age: number
  lifeStageAnswers: {
    [key: string]: {
      [key: string]: {
        external: { [key: string]: number }
        internal: { [key: string]: number }
      }
    }
  }
}

const ageGroups = [
  { min: 0, max: 7, name: "Birth" },
  { min: 7, max: 13, name: "Family" },
  { min: 13, max: 21, name: "Teenage Stage" },
  { min: 21, max: 30, name: "Early Adulthood" },
  { min: 30, max: 45, name: "Adulthood" },
  { min: 45, max: 60, name: "Mid-Life" },
  { min: 60, max: 100, name: "Senior Stage" }
]

const quotients = [
  {
    name: "Physical Quotient PQ",
    internal: [
      "How would you rate your outer appearance and facial features during this stage of your life?",
      "How would you rate the capability of your 5 sense organs (eyes, ears, nose, tongue, and skin) during this stage of your life?",
      "How would you rate your physical stamina and agility during this stage of your life?"
    ],
    external: [
      "How politically and economically stable was your country of birth or residence during this stage of your life?",
      "How would you rate your family environment during this stage of your life? (This includes your financial situation, your relationship with your parents and siblings, and education from parents)",
      "How would you rate the available medical or your family medical plan during this stage of your life? (This would include external medical facilities, doctors, nurses, etc.)"
    ]
  },
  {
    name: "Intellectual Quotient IQ",
    internal: [
      "How would you rate the quality of your daily life activities, memory, comprehension, language learning ability, and ability to express yourself during this period of your life?",
      "How would you rate your learning ability in science, math, literature, etc. during this period of your life?",
      "How talented were you in the arts during this stage of your life? (art, drawing, dancing, singing, etc.)"
    ],
    external: [
      "How good of an influence did people who were close to you have on your values during this stage of your life? (Including grandparents, parents, siblings, nannies, friends, and schoolmates)",
      "How good of an influence did your teachers and mentors have on your values during this stage of your life? (kindergarten, elementary school, high school, university, post-graduate schools)",
      "How good of an influence did the media that you consumed have on your values during this stage of your life? (books, TV, movies, social media, internet)"
    ]
  },
  {
    name: "Emotional Quotient EQ",
    internal: [
      "How would you rate your politeness and communication skills during this stage of your life?",
      "How would you rate your emotion management skills during this stage of your life? (Regular emotion management, emotion management due to illnesses)",
      "How would you rate your relationship problem solving ability during this stage of your life? (This would include relationships with parents, siblings, friends, and work environment)"
    ],
    external: [
      "How politically and culturally restricted was your emotional support during this stage of your life?",
      "How would you rate your family values and the economic impact upon your emotional stability during this stage of your life?",
      "How would you rate your family support and economic resource effect upon your emotional stability during this stage of your life?"
    ]
  },
  {
    name: "Spiritual Quotient SQ",
    internal: [
      "How would you rate your ethical conduct (morality) and ability to discern between right and wrong during this stage of your life?",
      "How would you rate your dharma (law) comprehension towards impurity and purity during this stage of your life?",
      "How would you rate your character and positive attitude during this stage of your life?",
      "How would you rate your understanding of impermanence, non-self, and nirvana (liberation) during this stage of your life?"
    ],
    external: [
      "How would you rate your encounter with good influences during this stage of your life? (This will come from parents, teachers, practitioners, and monasteries)"
    ]
  }
]

function getAgeGroup(age: number) {
  return ageGroups.find(group => age >= group.min && age < group.max) || ageGroups[ageGroups.length - 1]
}

function getAgeSpecificSteps(age: number) {
  const currentGroupIndex = ageGroups.findIndex(group => age >= group.min && age < group.max)
  return ageGroups.slice(0, currentGroupIndex + 1)
}

export default function Quiz() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({ 
    name: '', 
    age: 0, 
    lifeStageAnswers: {}
  })
  const [ageSpecificSteps, setAgeSpecificSteps] = useState<{ min: number; max: number; name: string }[]>([])

  const handleBasicInfoSubmit = (name: string, age: number) => {
    setFormData({ ...formData, name, age })
    setAgeSpecificSteps(getAgeSpecificSteps(age))
    setStep(1)
  }

  const handleLifeStageSubmit = (
    lifeStage: string,
    answers: {
      [key: string]: {
        external: { [key: string]: number }
        internal: { [key: string]: number }
      }
    }
  ) => {
    setFormData(prevData => ({
      ...prevData,
      lifeStageAnswers: {
        ...prevData.lifeStageAnswers,
        [lifeStage]: answers
      }
    }))
    setStep(step + 1)
  }

  const handlePrevious = () => {
    setStep(prevStep => Math.max(1, prevStep - 1))
  }

  const handleRestart = () => {
    setStep(0)
    setFormData({ 
      name: '', 
      age: 0, 
      lifeStageAnswers: {}
    })
    setAgeSpecificSteps([])
    window.scrollTo(0, 0)
  }

  const totalSteps = ageSpecificSteps.length + 2 // Basic info + life stages + dashboard
  const progress = step === 0 ? 0 : ((step) / (totalSteps - 1)) * 100

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-stone-50 py-8 px-4">
      <div className="w-full max-w-4xl mx-auto">
        <Card className="backdrop-blur-sm bg-white/80 shadow-lg border-0">
          <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold text-center">
              <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
                4Q Self-Reflection Quiz
              </span>
            </h1>
            <ProgressBar progress={progress} />
            {step === 0 && <BasicInfo onSubmit={handleBasicInfoSubmit} />}
            {step > 0 && step <= ageSpecificSteps.length && (
              <LifeStageQuestions
                ageGroup={ageSpecificSteps[step - 1]}
                quotients={quotients}
                onSubmit={handleLifeStageSubmit}
                onPrevious={handlePrevious}
                isFirstStage={step === 1}
                isLastStage={step === ageSpecificSteps.length}
                initialAnswers={formData.lifeStageAnswers[ageSpecificSteps[step - 1].name]}
              />
            )}
            {step > ageSpecificSteps.length && (
              <Dashboard 
                formData={formData} 
                ageSpecificSteps={ageSpecificSteps}
                quotients={quotients}
                onRestart={handleRestart}
              />
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}

