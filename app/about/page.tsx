import { QuotientCard } from "../components/QuotientCard"
import { Brain, Heart, Dumbbell, NotebookIcon as Lotus } from "lucide-react"
import { Card, CardContent } from "@/app/components/ui/card"

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          About{" "}
          <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
            4Q Self-Reflection
          </span>
        </h1>
        <p className="text-lg text-stone-600 max-w-2xl mx-auto">
          Explore the four dimensions of your being through our Buddhist-inspired assessment
        </p>
      </div>

      <section className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <QuotientCard
            index={0}
            title="Physical Quotient (PQ)"
            description="Your physical well-being, appearance, and sensory experiences shape your interaction with the world."
            icon={<Dumbbell className="w-8 h-8" />}
          />
          <QuotientCard
            index={1}
            title="Intellectual Quotient (IQ)"
            description="Your cognitive abilities, learning capacity, and intellectual pursuits define your mental capabilities."
            icon={<Brain className="w-8 h-8" />}
          />
          <QuotientCard
            index={2}
            title="Emotional Quotient (EQ)"
            description="Your emotional intelligence and interpersonal skills influence your relationships and social interactions."
            icon={<Heart className="w-8 h-8" />}
          />
          <QuotientCard
            index={3}
            title="Spiritual Quotient (SQ)"
            description="Your understanding of ethics, compassion, and connection to higher principles guides your path."
            icon={<Lotus className="w-8 h-8" />}
          />
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-white/70 backdrop-blur-sm">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
              How to Use the Quiz
            </h2>
            <ol className="space-y-3 text-stone-600">
              <li className="flex items-start">
                <span className="font-medium text-amber-600 mr-2">1.</span>
                Enter your basic information to begin
              </li>
              <li className="flex items-start">
                <span className="font-medium text-amber-600 mr-2">2.</span>
                Answer questions for each quotient across life stages
              </li>
              <li className="flex items-start">
                <span className="font-medium text-amber-600 mr-2">3.</span>
                Reflect on both internal and external factors
              </li>
              <li className="flex items-start">
                <span className="font-medium text-amber-600 mr-2">4.</span>
                Rate each factor from 1 (lowest) to 7 (highest)
              </li>
              <li className="flex items-start">
                <span className="font-medium text-amber-600 mr-2">5.</span>
                Progress through your applicable life stages
              </li>
            </ol>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
              Understanding Your Results
            </h2>
            <ul className="space-y-3 text-stone-600">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Review scores across different life stages
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Analyze your progress through the line graph
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Identify patterns and areas for growth
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Use detailed responses for deeper reflection
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Remember this is a tool for self-discovery
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

