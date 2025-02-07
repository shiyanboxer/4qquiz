'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center px-4 -mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight flex flex-col">
          <span>Discover Your</span>
          <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">Inner Balance</span>
        </h1>
        <p className="mt-6 text-xl text-stone-600 max-w-xl mx-auto flex flex-col">
          Take 10 minutes to explore your Physical, Intellectual, Emotional, and Spiritual quotients across different life stages.
        </p>
        <div className="mt-10">
          <Link
            href="/quiz"
            className="inline-flex items-center px-8 py-3 rounded-full text-white bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 font-medium text-lg transition-all hover:shadow-lg"
          >
            Start Quiz
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-stone-100 to-transparent -z-10"
      />

    </div>
  )
}
