'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/app/components/ui/card'

interface QuotientCardProps {
  title: string
  description: string
  icon: React.ReactNode
  index: number
}

export function QuotientCard({ title, description, icon, index }: QuotientCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="group relative overflow-hidden bg-white/70 backdrop-blur-sm hover:shadow-lg transition-all duration-300 ">
        <CardContent className="p-6">
          <div className="mb-4 flex justify-center">
            <div className="p-3 rounded-2xl bg-amber-50 text-amber-600 group-hover:scale-110 transition-transform duration-300">
              {icon}
            </div>
          </div>
          <h3 className="text-lg font-semibold text-center mb-2 bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
            {title}
          </h3>
          <p className="text-stone-600 text-center text-sm">
            {description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

