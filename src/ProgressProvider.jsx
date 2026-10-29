import { useState, useEffect } from 'react'
import { ProgressContext, STAGES } from './progressContext'
import { useAuth } from './useAuth'
import { userKey } from './userKey'

function load() {
  try {
    const n = Number(localStorage.getItem(userKey('careerpath-completed')))
    return Number.isInteger(n) && n >= 0 && n <= STAGES.length ? n : 0
  } catch {
    return 0
  }
}

function ProgressInner({ children }) {
  // completed = how many stages are done (stages are completed in order)
  const [completed, setCompleted] = useState(load)

  useEffect(() => {
    try {
      localStorage.setItem(userKey('careerpath-completed'), String(completed))
    } catch {
      /* ignore */
    }
  }, [completed])

  const total = STAGES.length
  const value = {
    completed,
    total,
    percent: Math.round((completed / total) * 100),
    stageLabel:
      completed >= total
        ? 'All 5 stages complete'
        : `Stage ${completed + 1} of ${total} · ${STAGES[completed]}`,
    completeNext: () => setCompleted((c) => Math.min(c + 1, total)),
    reset: () => setCompleted(0),
  }

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

// Starts fresh whenever a different person logs in or out
export default function ProgressProvider({ children }) {
  const { user } = useAuth()
  return <ProgressInner key={user ? user.email : 'guest'}>{children}</ProgressInner>
}