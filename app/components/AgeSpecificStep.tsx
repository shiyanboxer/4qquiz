import { useState } from 'react'
import { Button } from '@/app/components/ui/button'
import { Label } from '@/app/components/ui/label'
import { Slider } from '@/app/components/ui/slider'

interface AgeSpecificStepProps {
  ageGroup: {
    min: number
    max: number
    name: string
  }
  onSubmit: (groupName: string, appearance: number, sensitivity: number) => void
}

export function AgeSpecificStep({ ageGroup, onSubmit }: AgeSpecificStepProps) {
  const [appearance, setAppearance] = useState(5)
  const [sensitivity, setSensitivity] = useState(5)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(ageGroup.name, appearance, sensitivity)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-medium text-amber-800 text-center">{ageGroup.name} Stage ({ageGroup.min}-{ageGroup.max})</h2>
      
      <div className="space-y-4">
        <Label htmlFor="appearance" className="text-sm font-medium text-stone-700">
          Outer appearance, facial features, height, etc. (1-10)
        </Label>
        <Slider
          id="appearance"
          min={1}
          max={10}
          step={1}
          value={[appearance]}
          onValueChange={(value) => setAppearance(value[0])}
          className="w-full"
        />
        <p className="text-center text-sm text-stone-600">{appearance}</p>
      </div>

      <div className="space-y-4">
        <Label htmlFor="sensitivity" className="text-sm font-medium text-stone-700">
          Sensitivity of the 5 organs: eyes, ears, nose, tongue, body (skin) (1-10)
        </Label>
        <Slider
          id="sensitivity"
          min={1}
          max={10}
          step={1}
          value={[sensitivity]}
          onValueChange={(value) => setSensitivity(value[0])}
          className="w-full"
        />
        <p className="text-center text-sm text-stone-600">{sensitivity}</p>
      </div>

      <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white">
        Continue
      </Button>
    </form>
  )
}

