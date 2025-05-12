'use client'

import React from 'react'
import { Lightbulb, Brush, Code, BarChart } from 'lucide-react'
import { motion } from 'framer-motion'

const steps = [
  {
    icon: <Lightbulb className="md:w-8 md:h-8 h-4 w-4 text-primary" />,
    title: 'Create Your Project',
    description:
      'Start by creating a new project and defining your goal — whether it’s feedback, reviews, or lead capture.',
  },
  {
    icon: <Brush className="md:w-8 md:h-8 h-4 w-4  text-primary" />,
    title: 'Customize the Widget',
    description:
      'Design your widget with live preview. Customize text, colors, layout, animations, and more — no code needed.',
  },
  {
    icon: <Code className="md:w-8 md:h-8 h-4 w-4  text-primary" />,
    title: 'Embed on Your Website',
    description:
      'Copy your auto-generated embed code and paste it into your site. Works with all platforms and CMSs.',
  },
  {
    icon: <BarChart className="md:w-8 md:h-8 h-4 w-4  text-primary" />,
    title: 'Analyze Responses',
    description:
      'Track real-time insights, export data, and improve user engagement with detailed analytics.',
  },
]

const HowItWorks = () => {
  return (
    <div className="px-4 text-start space-y-12">
      <div className="space-y-2">
        <h2 className="md:text-4xl text-3xl font-bold tracking-tight">How It Works</h2>
        <p className="text-muted-foreground md:text-base text-xs">
          Set up your interactive popup in just a few steps — simple, fast, and effective.
        </p>
      </div>

      <div className="space-y-6">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-start gap-4 text-left"
          >
            <div className="flex-shrink-0 bg-secondary md:p-3 p-2 md:rounded-xl rounded-md shadow-sm">
              {step.icon}
            </div>
            <div>
              <h3 className="md:text-xl text-lg font-semibold">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default HowItWorks
