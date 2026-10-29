import { createContext } from 'react'

export const STAGES = [
  'Learn Programming',
  'Master DSA',
  'Build Projects',
  'Prepare for Interviews',
  'Apply for Jobs',
]

export const ProgressContext = createContext(null)