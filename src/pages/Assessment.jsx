import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import sparklesIcon from '../assets/sparkles.svg'
import paletteIcon from '../assets/palette.svg'
import usersIcon from '../assets/users.svg'
import chartIcon from '../assets/chart-24.svg'
import cpuIcon from '../assets/cpu.svg'
import infoIcon from '../assets/info.svg'
import arrowLeft from '../assets/arrow-left.svg'
import arrowRight from '../assets/arrow-right.svg'
import './Assessment.css'

const TOTAL_QUESTIONS = 8

const questions = [
  {
    title: 'What activities do you enjoy the most?',
    hint: 'Select one or more',
    answers: [
      { icon: sparklesIcon, title: 'Solving problems and puzzles', text: 'You enjoy figuring out how things work, spotting patterns, and finding creative solutions.' },
      { icon: paletteIcon, title: 'Creating designs or artwork', text: 'You like bringing ideas to life through visuals, composition, and creative expression.' },
      { icon: usersIcon, title: 'Helping and communicating with people', text: 'You enjoy listening, advising, and working with others to make a positive impact.' },
      { icon: chartIcon, title: 'Working with numbers and data', text: 'You like analyzing patterns, trends, and insights to understand what the numbers mean.' },
      { icon: cpuIcon, title: 'Building or working with technology', text: 'You enjoy coding, prototyping, and using tools to create digital products and systems.' },
    ],
  },
]

export default function Assessment() {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState({}) // { questionIndex: [answerIndex, ...] }

  const question = questions[current]
  const chosen = selected[current] || []
  const progress = Math.floor(((current + 1) / TOTAL_QUESTIONS) * 100)

  function toggle(i) {
    const next = chosen.includes(i) ? chosen.filter((x) => x !== i) : [...chosen, i]
    setSelected({ ...selected, [current]: next })
  }

  function goBack() {
    if (current === 0) navigate('/')
    else setCurrent(current - 1)
  }

  function goNext() {
    if (current < questions.length - 1) setCurrent(current + 1)
    else navigate('/results')
  }

  return (
    <div className="assessment">
      <div className="assessment-intro">
        <h1>Let's discover what fits you</h1>
        <p>Answer a few simple questions about your interests, strengths and goals. There are no right or wrong answers.</p>
      </div>

      <div className="progress-card">
        <div className="progress-row">
          <div>
            <div className="progress-title">Question {current + 1} of {TOTAL_QUESTIONS}</div>
            <div className="progress-sub">Progress: {progress}%</div>
          </div>
          <span className="step-pill">Step {current + 1}</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="question-card">
        <div className="question-head">
          <h2>{question.title}</h2>
          <p>{question.hint}</p>
        </div>
        <div className="answers">
          {question.answers.map((a, i) => {
            const isOn = chosen.includes(i)
            return (
              <button
                type="button"
                key={a.title}
                className={`answer ${isOn ? 'selected' : ''}`}
                onClick={() => toggle(i)}
                aria-pressed={isOn}
              >
                <div className="answer-top">
                  <div className="answer-icon">
                    <img src={a.icon} alt="" />
                  </div>
                  <span className="answer-radio" />
                </div>
                <div className="answer-text">
                  <h3>{a.title}</h3>
                  <p>{a.text}</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <div className="info-card">
        <div className="info-icon">
          <img src={infoIcon} alt="" />
        </div>
        <p>Your answers help us understand your preferences and suggest career paths that may suit you.</p>
      </div>

      <div className="actions">
        <button type="button" className="btn btn-outline btn-action" onClick={goBack}>
          <img src={arrowLeft} alt="" />
          Back
        </button>
        <button type="button" className="btn btn-primary btn-action" onClick={goNext}>
          Next
          <img src={arrowRight} alt="" />
        </button>
      </div>
    </div>
  )
}
