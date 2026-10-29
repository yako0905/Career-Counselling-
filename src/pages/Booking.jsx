import { useState } from 'react'
import { Link } from 'react-router-dom'
import checkIcon from '../assets/check-circle.svg'
import clockIcon from '../assets/clock.svg'
import { useAuth } from '../useAuth'
import './Booking.css'

const topics = [
  'Choosing the right career',
  'Skills and learning roadmap',
  'Interview preparation',
  'Understanding my assessment results',
  'Something else',
]

const slots = ['10:00 AM', '11:30 AM', '2:00 PM', '4:30 PM']
const modes = ['Video call', 'Phone call', 'Chat']

const expect = [
  'A 30-minute one-to-one session with a career counsellor',
  'Guidance based on your assessment and roadmap progress',
  'A clear next step you can act on right away',
]

function todayString() {
  const d = new Date()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
}

export default function Booking() {
  const { user } = useAuth()
  const [form, setForm] = useState({
    name: user.name,
   email: user.email,
    topic: topics[0],
    date: '',
    slot: '',
    mode: modes[0],
    notes: '',
  })
  const [errors, setErrors] = useState({})
  const [booked, setBooked] = useState(false)

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
    setErrors((e) => ({ ...e, [field]: undefined }))
  }

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Please enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Please enter a valid email address.'
    if (!form.date) e.date = 'Please choose a date.'
    if (!form.slot) e.slot = 'Please choose a time slot.'
    return e
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length === 0) {
      setBooked(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function prettyDate(value) {
    return new Date(value + 'T00:00:00').toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  if (booked) {
    return (
      <div className="booking-page">
        <div className="bk-confirm">
          <div className="bk-confirm-icon">
            <img src={checkIcon} alt="" />
          </div>
          <h1>Session booked!</h1>
          <p>We've reserved your counselling session. A confirmation has been sent to {form.email}.</p>
          <div className="bk-summary">
            <div><span>Name</span><b>{form.name}</b></div>
            <div><span>Topic</span><b>{form.topic}</b></div>
            <div><span>Date</span><b>{prettyDate(form.date)}</b></div>
            <div><span>Time</span><b>{form.slot}</b></div>
            <div><span>Mode</span><b>{form.mode}</b></div>
          </div>
          <div className="bk-confirm-actions">
            <Link to="/dashboard" className="btn btn-primary btn-md">Go to Dashboard</Link>
            <Link to="/" className="btn btn-outline btn-md">Back to Home</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="booking-page">
      <div className="bk-intro">
        <h1>Book a Counselling Session</h1>
        <p>Pick a time that suits you and talk to a career counsellor.</p>
      </div>

      <div className="bk-layout">
        <form className="bk-form" onSubmit={handleSubmit} noValidate>
          <div className="bk-row">
            <label className="bk-field">
              <span>Full name</span>
              <input
                type="text"
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                className={errors.name ? 'has-error' : ''}
              />
              {errors.name && <em>{errors.name}</em>}
            </label>
            <label className="bk-field">
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
          </div>

          <label className="bk-field">
            <span>What would you like help with?</span>
            <select value={form.topic} onChange={(e) => update('topic', e.target.value)}>
              {topics.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>

          <label className="bk-field">
            <span>Preferred date</span>
            <input
              type="date"
              min={todayString()}
              value={form.date}
              onChange={(e) => update('date', e.target.value)}
              className={errors.date ? 'has-error' : ''}
            />
            {errors.date && <em>{errors.date}</em>}
          </label>

          <div className="bk-field">
            <span>Time slot</span>
            <div className="bk-chips">
              {slots.map((s) => (
                <button
                  type="button"
                  key={s}
                  className={'bk-chip' + (form.slot === s ? ' selected' : '')}
                  onClick={() => update('slot', s)}
                >
                  {s}
                </button>
              ))}
            </div>
            {errors.slot && <em>{errors.slot}</em>}
          </div>

          <div className="bk-field">
            <span>Session mode</span>
            <div className="bk-chips">
              {modes.map((m) => (
                <button
                  type="button"
                  key={m}
                  className={'bk-chip' + (form.mode === m ? ' selected' : '')}
                  onClick={() => update('mode', m)}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <label className="bk-field">
            <span>Anything you'd like us to know? (optional)</span>
            <textarea
              rows="4"
              placeholder="For example: I'm unsure between software and data roles."
              value={form.notes}
              onChange={(e) => update('notes', e.target.value)}
            />
          </label>

          <button type="submit" className="btn btn-primary btn-lg bk-submit">
            Confirm Booking
          </button>
        </form>

        <aside className="bk-side">
          <h2>What to expect</h2>
          <ul>
            {expect.map((item) => (
              <li key={item}>
                <img src={checkIcon} alt="" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="bk-duration">
            <img src={clockIcon} alt="" />
            <span>Sessions last about 30 minutes</span>
          </div>
          <p className="bk-prefer">
            Prefer a quick answer first? <Link to="/counsellor">Chat with the Career Assistant</Link>.
          </p>
        </aside>
      </div>
    </div>
  )
}