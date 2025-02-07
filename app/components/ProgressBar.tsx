'use client'

import { motion } from 'framer-motion'
import { Progress } from '@/app/components/ui/progress'

interface ProgressBarProps {
  progress: number
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full space-y-2">
      <Progress 
        value={progress} 
        className="h-2 bg-stone-100 [&>[role=progressbar]]:bg-gradient-to-r [&>[role=progressbar]]:from-amber-500 [&>[role=progressbar]]:to-amber-600 [&>[role=progressbar]]:transition-all [&>[role=progressbar]]:duration-500"
      />
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-right text-sm text-stone-500"
      >
        {Math.round(progress)}% Complete
      </motion.p>
    </div>
  )
}

