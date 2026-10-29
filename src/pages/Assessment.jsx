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
import { userKey } from '../userKey'
import './Assessment.css'

// Question 1 comes from the Figma design. Questions 2-8 are added content.
// w = points toward careers: dev (Software Developer), data (Data Analyst),
//     ux (UI/UX Designer), mkt (Digital Marketer)
// s = points toward strengths: ps (Problem Solving), tech (Technology),
//     cre (Creativity), comm (Communication)
const questions = [
  {
    title: 'What activities do you enjoy the most?',
    hint: 'Select one or more',
    answers: [
      { icon: sparklesIcon, title: 'Solving problems and puzzles', text: 'You enjoy figuring out how things work, spotting patterns, and finding creative solutions.', w: { dev: 2, data: 1 }, s: { ps: 2 } },
      { icon: paletteIcon, title: 'Creating designs or artwork', text: 'You like bringing ideas to life through visuals, composition, and creative expression.', w: { ux: 2, mkt: 1 }, s: { cre: 2 } },
      { icon: usersIcon, title: 'Helping and communicating with people', text: 'You enjoy listening, advising, and working with others to make a positive impact.', w: { mkt: 2, ux: 1 }, s: { comm: 2 } },
      { icon: chartIcon, title: 'Working with numbers and data', text: 'You like analyzing patterns, trends, and insights to understand what the numbers mean.', w: { data: 2 }, s: { ps: 1, tech: 1 } },
      { icon: cpuIcon, title: 'Building or working with technology', text: 'You enjoy coding, prototyping, and using tools to create digital products and systems.', w: { dev: 2, ux: 1 }, s: { tech: 2 } },
    ],
  },
  {
    title: 'Which subjects do you enjoy most in school or college?',
    hint: 'Select one or more',
    answers: [
      { icon: sparklesIcon, title: 'Maths and logic', text: 'You like clear rules, puzzles, and working out the right answer step by step.', w: { data: 2, dev: 1 }, s: { ps: 2 } },
      { icon: cpuIcon, title: 'Computer science', text: 'You enjoy programming, how computers work, and building things with code.', w: { dev: 2, data: 1 }, s: { tech: 2 } },
      { icon: paletteIcon, title: 'Art and design', text: 'You like drawing, visual ideas, and expressing yourself creatively.', w: { ux: 2, mkt: 1 }, s: { cre: 2 } },
      { icon: usersIcon, title: 'Languages and social studies', text: 'You enjoy reading, writing, discussion, and understanding people and society.', w: { mkt: 2, ux: 1 }, s: { comm: 2 } },
    ],
  },
  {
    title: 'What are you naturally good at?',
    hint: 'Select one or more',
    answers: [
      { icon: chartIcon, title: 'Analysing and reasoning', text: 'You break big problems into parts and think them through carefully.', w: { data: 2, dev: 1 }, s: { ps: 2 } },
      { icon: paletteIcon, title: 'Creative thinking', text: 'You come up with new ideas and original ways of doing things.', w: { ux: 2, mkt: 1 }, s: { cre: 2 } },
      { icon: usersIcon, title: 'Communicating with others', text: 'You explain ideas clearly and people feel comfortable talking to you.', w: { mkt: 2 }, s: { comm: 2 } },
      { icon: cpuIcon, title: 'Building and fixing things', text: 'You enjoy hands-on work and figuring out why something is not working.', w: { dev: 2 }, s: { tech: 2, ps: 1 } },
    ],
  },
  {
    title: 'How do you like to work?',
    hint: 'Select one or more',
    answers: [
      { icon: cpuIcon, title: 'On my own, with focus', text: 'You do your best work with quiet time and few interruptions.', w: { dev: 1, data: 1 }, s: { ps: 1, tech: 1 } },
      { icon: usersIcon, title: 'Together in a team', text: 'You enjoy sharing ideas and getting things done with other people.', w: { mkt: 1, ux: 1 }, s: { comm: 2 } },
      { icon: sparklesIcon, title: 'Leading and organising', text: 'You like setting direction, planning, and keeping everyone on track.', w: { mkt: 2 }, s: { comm: 1, ps: 1 } },
      { icon: chartIcon, title: 'Following a clear process', text: 'You like structure, clear steps, and knowing what is expected.', w: { data: 2, dev: 1 }, s: { ps: 1 } },
    ],
  },
  {
    title: 'Which work environment appeals to you most?',
    hint: 'Select one or more',
    answers: [
      { icon: cpuIcon, title: 'A tech company or startup', text: 'Fast-moving teams building digital products and trying new tools.', w: { dev: 2, ux: 1 }, s: { tech: 2 } },
      { icon: paletteIcon, title: 'A creative studio or agency', text: 'Colourful, idea-driven spaces where design and storytelling come first.', w: { ux: 2, mkt: 1 }, s: { cre: 2 } },
      { icon: chartIcon, title: 'A corporate or finance office', text: 'Structured teams working with data, planning, and business decisions.', w: { data: 2, mkt: 1 }, s: { ps: 1, comm: 1 } },
      { icon: usersIcon, title: 'Education, health, or community work', text: 'Roles where you directly help and support other people.', w: { mkt: 1, ux: 1 }, s: { comm: 2 } },
    ],
  },
  {
    title: 'What matters most to you in a future career?',
    hint: 'Select one or more',
    answers: [
      { icon: sparklesIcon, title: 'Learning and growth', text: 'You want to keep learning new things and improving your skills.', w: { dev: 1, data: 1 }, s: { ps: 1, tech: 1 } },
      { icon: paletteIcon, title: 'Creative freedom', text: 'You want room to express ideas and make things your own way.', w: { ux: 2, mkt: 1 }, s: { cre: 2 } },
      { icon: usersIcon, title: 'Making a difference', text: 'You want your work to help people or improve society.', w: { ux: 1, mkt: 1 }, s: { comm: 2 } },
      { icon: chartIcon, title: 'Salary and stability', text: 'You want a secure job with good pay and clear progression.', w: { dev: 1, data: 2 }, s: { ps: 1 } },
    ],
  },
  {
    title: 'How do you prefer to learn new skills?',
    hint: 'Select one or more',
    answers: [
      { icon: cpuIcon, title: 'Hands-on projects', text: 'You learn best by building something real and learning from mistakes.', w: { dev: 2, ux: 1 }, s: { tech: 2 } },
      { icon: chartIcon, title: 'Reading and research', text: 'You like books, articles, and studying a topic in depth.', w: { data: 2, dev: 1 }, s: { ps: 1 } },
      { icon: usersIcon, title: 'Talking with mentors or groups', text: 'You learn by discussing ideas and getting feedback from others.', w: { mkt: 2 }, s: { comm: 2 } },
      { icon: paletteIcon, title: 'Experimenting and creating', text: 'You like trying things out and exploring different approaches.', w: { ux: 2, mkt: 1 }, s: { cre: 2 } },
    ],
  },
  {
    title: 'Where do you see yourself in five years?',
    hint: 'Select one or more',
    answers: [
      { icon: cpuIcon, title: 'Building products or software', text: 'Working on apps, systems, or tools that people use every day.', w: { dev: 2, ux: 1 }, s: { tech: 2 } },
      { icon: chartIcon, title: 'Analysing data and advising', text: 'Turning numbers into insights that help others make decisions.', w: { data: 2, mkt: 1 }, s: { ps: 2 } },
      { icon: paletteIcon, title: 'Designing experiences', text: 'Creating designs and interfaces that people enjoy using.', w: { ux: 2 }, s: { cre: 2 } },
      { icon: usersIcon, title: 'Leading or supporting a team', text: 'Guiding people, solving problems together, and growing a team.', w: { mkt: 2, dev: 1 }, s: { comm: 2 } },
    ],
  },
]

const TOTAL_QUESTIONS = questions.length

// Adds up the points for the chosen answers and turns them into
// match percentages (careers) and levels (strengths).
function computeResult(selected) {
  const careers = { dev: 0, data: 0, ux: 0, mkt: 0 }
  const strengths = { ps: 0, tech: 0, cre: 0, comm: 0 }

  questions.forEach((q, qi) => {
    const picked = selected[qi] || []
    picked.forEach((ai) => {
      const a = q.answers[ai]
      Object.keys(a.w).forEach((k) => { careers[k] += a.w[k] })
      Object.keys(a.s).forEach((k) => { strengths[k] += a.s[k] })
    })
  })

  const maxC = Math.max(...Object.values(careers), 1)
  const maxS = Math.max(...Object.values(strengths), 1)
  const result = { careers: {}, strengths: {} }

  Object.keys(careers).forEach((k) => {
    result.careers[k] = Math.round(40 + (52 * careers[k]) / maxC)
  })
  Object.keys(strengths).forEach((k) => {
    const ratio = strengths[k] / maxS
    result.strengths[k] = ratio >= 0.67 ? 'Strong' : ratio >= 0.34 ? 'Moderate' : 'Developing'
  })
  return result
}

export default function Assessment() {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState({}) // { questionIndex: [answerIndex, ...] }

  const question = questions[current]
  const chosen = selected[current] || []
  const progress = Math.floor(((current + 1) / TOTAL_QUESTIONS) * 100)
  const isLast = current === TOTAL_QUESTIONS - 1

  function toggle(i) {
    const next = chosen.includes(i) ? chosen.filter((x) => x !== i) : [...chosen, i]
    setSelected({ ...selected, [current]: next })
  }

  function goBack() {
    if (current === 0) {
      navigate('/')
    } else {
      setCurrent(current - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function goNext() {
    if (chosen.length === 0) return
    if (!isLast) {
      setCurrent(current + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      try {
        localStorage.setItem(userKey('careerpath-result'), JSON.stringify(computeResult(selected)))
      } catch {
        /* storage not available: Results will show the sample data */
      }
      navigate('/results')
    }
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
        <button
          type="button"
          className="btn btn-primary btn-action"
          onClick={goNext}
          disabled={chosen.length === 0}
        >
          {isLast ? 'See My Results' : 'Next'}
          <img src={arrowRight} alt="" />
        </button>
      </div>
    </div>
  )
}