import { useState } from 'react'
import { Button } from '@/app/components/ui/button'
import { Label } from '@/app/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group'

interface QuestionStepProps {
  question: {
    text: string
    options: string[]
  }
  onSubmit: (answer: string) => void
}

export function QuestionStep({ question, onSubmit }: QuestionStepProps) {
  const [selectedOption, setSelectedOption] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedOption) {
      onSubmit(selectedOption)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-medium text-amber-800 text-center">{question.text}</h2>
      <RadioGroup onValueChange={setSelectedOption} className="space-y-3">
        {question.options.map((option, index) => (
          <div key={index} className="flex items-center space-x-3 bg-stone-100 p-3 rounded-md transition-colors hover:bg-stone-200">
            <RadioGroupItem value={option} id={`option-${index}`} className="border-amber-600 text-amber-600" />
            <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">{option}</Label>
          </div>
        ))}
      </RadioGroup>
      <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white" disabled={!selectedOption}>
        Continue
      </Button>
    </form>
  )
}

