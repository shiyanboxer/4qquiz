import { useState } from 'react'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'

interface BasicInfoProps {
  onSubmit: (name: string, age: number) => void
}

export function BasicInfo({ onSubmit }: BasicInfoProps) {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name && age) {
      onSubmit(name, parseInt(age, 10))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium text-stone-700">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="bg-stone-100 border-stone-200 focus:ring-amber-500 focus:border-amber-500"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="age" className="text-sm font-medium text-stone-700">Age</Label>
        <Input
          id="age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
          min="1"
          max="100"
          className="bg-stone-100 border-stone-200 focus:ring-amber-500 focus:border-amber-500"
        />
      </div>
      <p className="text-sm text-stone-600">
        Note: Based on your age, you'll be asked additional questions about specific life stages.
      </p>
      <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white">Begin Reflection</Button>
    </form>
  )
}

