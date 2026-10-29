import { useContext } from 'react'
import { ProgressContext } from './progressContext'

export function useProgress() {
  return useContext(ProgressContext)
}