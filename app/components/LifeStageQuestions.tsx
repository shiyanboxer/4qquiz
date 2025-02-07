import { useState, useEffect } from 'react'
import { Button } from '@/app/components/ui/button'
import { Label } from '@/app/components/ui/label'
import { Slider } from '@/app/components/ui/slider'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { cn } from "@/lib/utils"

interface LifeStageQuestionsProps {
  ageGroup: {
    min: number
    max: number
    name: string
  }
  quotients: {
    name: string
    external: string[]
    internal: string[]
  }[]
  onSubmit: (
    lifeStage: string,
    answers: {
      [key: string]: {
        external: { [key: string]: number }
        internal: { [key: string]: number }
      }
    }
  ) => void
  onPrevious: () => void
  isFirstStage: boolean
  isLastStage: boolean
  initialAnswers?: {
    [key: string]: {
      external: { [key: string]: number }
      internal: { [key: string]: number }
    }
  }
}

export function LifeStageQuestions({ ageGroup, quotients, onSubmit, onPrevious, isFirstStage, isLastStage, initialAnswers }: LifeStageQuestionsProps) {
  const getDefaultAnswers = () => quotients.reduce((acc, quotient) => {
    acc[quotient.name] = {
      external: Object.fromEntries(quotient.external.map(q => [q, 4])),
      internal: Object.fromEntries(quotient.internal.map(q => [q, 4]))
    }
    return acc
  }, {} as {
    [key: string]: {
      external: { [key: string]: number }
      internal: { [key: string]: number }
    }
  })

  const [answers, setAnswers] = useState(getDefaultAnswers())

  useEffect(() => {
    setAnswers(initialAnswers || getDefaultAnswers())
    // Scroll to top when ageGroup changes
    window.scrollTo(0, 0)
  }, [ageGroup.name])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(ageGroup.name, answers)
  }

  const handleSliderChange = (quotient: string, type: 'external' | 'internal', question: string, value: number[]) => {
    setAnswers(prev => ({
      ...prev,
      [quotient]: {
        ...prev[quotient],
        [type]: {
          ...prev[quotient][type],
          [question]: value[0]
        }
      }
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-medium text-amber-800 text-center">
        {ageGroup.name} Stage ({ageGroup.min}-{ageGroup.max})
      </h2>

      {quotients.map((quotient, qIndex) => (
        <Card key={qIndex} className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl font-medium text-amber-700">{quotient.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h4 className="font-medium text-stone-700">Internal Conditions</h4>
              {quotient.internal.map((question, index) => (
                <div key={index} className="space-y-2">
                  <Label className="text-sm font-medium text-stone-600">
                    {question}
                  </Label>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-stone-600">1</span>
                    <Slider
                      value={[answers[quotient.name].internal[question]]}
                      max={7}
                      min={1}
                      step={1}
                      onValueChange={(value) => handleSliderChange(quotient.name, 'internal', question, value)}
                      className={cn(
                        "w-full",
                        "[&_[role=slider]]:bg-black",
                        "[&_[role=slider]]:border-black"
                      )}
                    />
                    <span className="text-sm text-stone-600">7</span>
                  </div>
                  <p className="text-center text-xs text-stone-500 mt-1">
                    1 = Very Low, 4 = Average, 7 = Excellent
                  </p>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-stone-700">External Conditions</h4>
              {quotient.external.map((question, index) => (
                <div key={index} className="space-y-2">
                  <Label className="text-sm font-medium text-stone-600">
                    {question}
                  </Label>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-stone-600">1</span>
                    <Slider
                      value={[answers[quotient.name].external[question]]}
                      max={7}
                      min={1}
                      step={1}
                      onValueChange={(value) => handleSliderChange(quotient.name, 'external', question, value)}
                      className={cn(
                        "w-full",
                        "[&_[role=slider]]:bg-black",
                        "[&_[role=slider]]:border-black"
                      )}
                    />
                    <span className="text-sm text-stone-600">7</span>
                  </div>
                  <p className="text-center text-xs text-stone-500 mt-1">
                    1 = Very Low, 4 = Average, 7 = Excellent
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="flex justify-between mt-6">
        <Button
          type="button"
          onClick={onPrevious}
          className="bg-amber-600 hover:bg-amber-700 text-white"
          disabled={isFirstStage}
        >
          Previous
        </Button>
        <Button
          type="submit"
          className="bg-amber-600 hover:bg-amber-700 text-white"
        >
          {isLastStage ? 'Finish' : 'Next'}
        </Button>
      </div>
    </form>
  )
}

