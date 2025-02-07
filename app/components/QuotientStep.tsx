import { useState } from 'react'
import { Button } from '@/app/components/ui/button'
import { Label } from '@/app/components/ui/label'
import { Slider } from '@/app/components/ui/slider'

interface QuotientStepProps {
  ageGroup: {
    min: number
    max: number
    name: string
  }
  quotient: {
    name: string
    external: string[]
    internal: string[]
  }
  type: 'external' | 'internal'
  onSubmit: (ageGroup: string, quotient: string, type: 'external' | 'internal', answers: { [key: string]: number }) => void
}

export function QuotientStep({ ageGroup, quotient, type, onSubmit }: QuotientStepProps) {
  const questions = type === 'external' ? quotient.external : quotient.internal
  const [answers, setAnswers] = useState<{ [key: string]: number }>(
    Object.fromEntries(questions.map(q => [q, 5]))
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(ageGroup.name, quotient.name, type, answers)
  }

  const handleSliderChange = (question: string, value: number[]) => {
    setAnswers(prev => ({ ...prev, [question]: value[0] }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-medium text-amber-800 text-center">
        {ageGroup.name} Stage ({ageGroup.min}-{ageGroup.max})
      </h2>
      <h3 className="text-lg font-medium text-amber-700">
        {quotient.name} - {type === 'external' ? 'External' : 'Internal'} Conditions
      </h3>
      
      {questions.map((question, index) => (
        <div key={index} className="space-y-4">
          <Label className="text-sm font-medium text-stone-700">
            {question}
          </Label>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-stone-600">1</span>
            <Slider
              defaultValue={[5]}
              max={10}
              min={1}
              step={1}
              onValueChange={(value) => handleSliderChange(question, value)}
              className="flex-grow"
            />
            <span className="text-sm text-stone-600">10</span>
          </div>
          <p className="text-center text-sm text-stone-600">
            Current value: {answers[question]}
          </p>
        </div>
      ))}

      <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white">
        Continue
      </Button>
    </form>
  )
}

