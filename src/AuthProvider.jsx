import { useState } from 'react'
import { AuthContext } from './authContext'

const USERS_KEY = 'careerpath-users'
const SESSION_KEY = 'careerpath-session'

function readUsers() {
  try {
    const users = JSON.parse(localStorage.getItem(USERS_KEY))
    return Array.isArray(users) ? users : []
  } catch {
    return []
  }
}

function readSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY))
  } catch {
    return null
  }
}

function getInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(readSession) // { name, email } or null

  function startSession(account) {
        const session = {
      name: account.name,
      email: account.email,
      college: account.college || '',
      course: account.course || '',
    }
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    } catch {
      /* ignore */
    }
    setUser(session)
  }

    function signup(name, email, password, college, course) {
    const cleanEmail = email.trim().toLowerCase()
    const users = readUsers()
    if (users.some((u) => u.email === cleanEmail)) {
      return { ok: false, error: 'An account with this email already exists. Please log in.' }
    }
       const account = {
      name: name.trim(),
      email: cleanEmail,
      password,
      college: college.trim(),
      course: course.trim(),
    }
    try {
      localStorage.setItem(USERS_KEY, JSON.stringify([...users, account]))
    } catch {
      return { ok: false, error: 'Could not save your account in this browser.' }
    }
    startSession(account)
    return { ok: true }
  }

  function login(email, password) {
    const cleanEmail = email.trim().toLowerCase()
    const account = readUsers().find((u) => u.email === cleanEmail && u.password === password)
    if (!account) return { ok: false, error: 'Incorrect email or password.' }
    startSession(account)
    return { ok: true }
  }

  function logout() {
    try {
      localStorage.removeItem(SESSION_KEY)
    } catch {
      /* ignore */
    }
    setUser(null)
  }

  const value = {
    user,
    firstName: user ? user.name.trim().split(/\s+/)[0] : '',
    initials: user ? getInitials(user.name) : '',
    signup,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}