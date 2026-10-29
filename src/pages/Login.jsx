import { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../useAuth'
import compassIcon from '../assets/compass.svg'
import './Login.css'

export default function Login() {
  const { user, login, signup } = useAuth()
  const location = useLocation()
  const from = location.state?.from

  const [mode, setMode] = useState('login') // 'login' or 'signup'
   const [form, setForm] = useState({ name: '', email: '', password: '', college: '', course: '' })
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')

  // Once logged in, go back to where the person was heading
  if (user) {
    return <Navigate to={from || (mode === 'signup' ? '/assessment' : '/dashboard')} replace />
  }

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
    setErrors((e) => ({ ...e, [field]: undefined }))
    setFormError('')
  }

  function switchMode(next) {
    setMode(next)
    setErrors({})
    setFormError('')
  }

  function validate() {
    const e = {}
    if (mode === 'signup' && !form.name.trim()) e.name = 'Please enter your name.'
    if (mode === 'signup' && !form.college.trim()) e.college = 'Please enter your college or university.'
    if (mode === 'signup' && !form.course.trim()) e.course = 'Please enter your year and course.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Please enter a valid email address.'
    if (form.password.length < 6) e.password = 'Password must be at least 6 characters.'
    return e
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length > 0) return

    const result =
      mode === 'login'
        ? login(form.email, form.password)
        : signup(form.name, form.email, form.password, form.college, form.course)
    if (!result.ok) setFormError(result.error)
  }

  const isSignup = mode === 'signup'

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <img src={compassIcon} alt="" />
        </div>
        <h1>{isSignup ? 'Create your account' : 'Welcome back'}</h1>
        <p className="auth-sub">
          {isSignup
            ? 'Sign up to take the assessment, build your roadmap and talk to a counsellor.'
            : 'Log in to continue your career journey.'}
        </p>

        <form onSubmit={handleSubmit} noValidate className="auth-form">
          {isSignup && (
            <label className="auth-field">
              <span>Full name</span>
              <input
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                className={errors.name ? 'has-error' : ''}
              />
              {errors.name && <em>{errors.name}</em>}
            </label>
          )}

          <label className="auth-field">
            <span>Email address</span>
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              className={errors.email ? 'has-error' : ''}
            />
            {errors.email && <em>{errors.email}</em>}
          </label>

          <label className="auth-field">
            <span>Password</span>
            <input
              type="password"
              placeholder="At least 6 characters"
              value={form.password}
              onChange={(e) => update('password', e.target.value)}
              className={errors.password ? 'has-error' : ''}
            />
            {errors.password && <em>{errors.password}</em>}
          </label>

                    {isSignup && (
            <>
              <label className="auth-field">
                <span>College / University</span>
                <input
                  type="text"
                  placeholder="e.g. IGDTUW"
                  value={form.college}
                  onChange={(e) => update('college', e.target.value)}
                  className={errors.college ? 'has-error' : ''}
                />
                {errors.college && <em>{errors.college}</em>}
              </label>

              <label className="auth-field">
                <span>Year &amp; course</span>
                <input
                  type="text"
                  placeholder="e.g. 2nd Year, B.Tech CSE"
                  value={form.course}
                  onChange={(e) => update('course', e.target.value)}
                  className={errors.course ? 'has-error' : ''}
                />
                {errors.course && <em>{errors.course}</em>}
              </label>
            </>
          )}

          {formError && <div className="auth-error">{formError}</div>}

          <button type="submit" className="btn btn-primary btn-lg auth-submit">
            {isSignup ? 'Create Account' : 'Log In'}
          </button>
        </form>

        <p className="auth-switch">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button type="button" onClick={() => switchMode(isSignup ? 'login' : 'signup')}>
            {isSignup ? 'Log in' : 'Sign up'}
          </button>
        </p>

        <p className="auth-note">
          Prototype only: accounts are stored in this browser and are not secure. Please don't use a real password.
        </p>
      </div>
    </div>
  )
}