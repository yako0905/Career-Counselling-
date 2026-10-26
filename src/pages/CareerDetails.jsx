import { useState } from 'react'
import { Link } from 'react-router-dom'
import heroImg from '../assets/career-hero.png'
import arrowIcon from '../assets/arrow-right.svg'
import heartIcon from '../assets/heart.svg'
import bookIcon from '../assets/book-open.svg'
import codeIcon from '../assets/code.svg'
import monitorIcon from '../assets/monitor.svg'
import trendingIcon from '../assets/trending-up.svg'
import './CareerDetails.css'

const snapshot = [
  { icon: bookIcon, label: 'Typical Education', value: 'Degree / Diploma / Relevant Training' },
  { icon: codeIcon, label: 'Key Skills', value: 'Programming, DSA, Problem Solving' },
  { icon: monitorIcon, label: 'Work Areas', value: 'Technology, Software, Web, Mobile' },
  { icon: trendingIcon, label: 'Career Growth', value: 'Developer → Senior Developer → Tech Lead' },
]

const skills = [
  'C++', 'JavaScript', 'Python', 'Data Structures & Algorithms',
  'Problem Solving', 'Git & GitHub', 'SQL', 'Web Development',
]

const steps = [
  { title: 'Learn Programming', text: 'Master languages like C++, Python, or JavaScript to construct solid algorithmic foundations.' },
  { title: 'Build Projects', text: 'Apply your code on real web applications, utilities, and mobile developer portfolios.' },
  { title: 'Practice DSA', text: 'Deepen structured coding abilities using Data Structures and Algorithms for optimization.' },
  { title: 'Apply for Jobs', text: 'Construct resumes, apply for structural internship cycles, and begin interviewing.' },
]

export default function CareerDetails() {
  const [saved, setSaved] = useState(false)

  return (
    <div className="details">
      <section className="details-hero">
        <div className="details-hero-content">
          <span className="match-pill">87% Match For You</span>
          <div className="title-group">
            <h1>Software Developer</h1>
            <p>Build applications, websites and software solutions using programming and problem-solving skills.</p>
          </div>
          <div className="details-actions">
            <Link to="/roadmap" className="btn btn-primary details-btn">
              Start Career Roadmap
              <img src={arrowIcon} alt="" />
            </Link>
            <button type="button" className="btn btn-outline details-btn" onClick={() => setSaved(!saved)}>
              <img src={heartIcon} alt="" />
              {saved ? 'Saved' : 'Save Career'}
            </button>
          </div>
        </div>
        <img className="details-hero-image" src={heroImg} alt="Developer workspace with two monitors" />
      </section>

      <section className="overview">
        <h2>What does a Software Developer do?</h2>
        <p>
          Software developers design, build, test and maintain software
          applications. They use programming languages and problem-solving
          skills to create solutions for users and organizations. They work in
          collaborative environments alongside product managers, designers, and
          other engineers to bring complex systems to life.
        </p>
      </section>

      <section className="snapshot">
        <h2>Career Snapshot</h2>
        <div className="snapshot-grid">
          {snapshot.map((s) => (
            <div className="snapshot-card" key={s.label}>
              <div className="snapshot-icon">
                <img src={s.icon} alt="" />
              </div>
              <div className="snapshot-text">
                <span className="snapshot-label">{s.label}</span>
                <strong>{s.value}</strong>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="skills-needed">
        <div className="block-head">
          <h2>Skills You Need</h2>
          <p>Mastering these tools and concepts will set you up for absolute success.</p>
        </div>
        <div className="skills-wrap">
          {skills.map((s) => (
            <span className="skill-chip" key={s}>{s}</span>
          ))}
        </div>
      </section>

      <section className="how-to-enter">
        <div className="block-head">
          <h2>How to Enter This Career</h2>
          <p>A clear, proven timeline mapping out your next professional steps.</p>
        </div>
        <div className="steps-row">
          {steps.map((step, i) => (
            <div className="step-node" key={step.title}>
              <div className="step-num">{i + 1}</div>
              <div className="step-text">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bottom-cta">
        <div className="cta-text">
          <h2>Ready to explore this career?</h2>
          <p>Start planning your classes, online courses, and personal milestone achievements today.</p>
        </div>
        <Link to="/roadmap" className="btn btn-primary details-btn">Build My Roadmap →</Link>
      </section>
    </div>
  )
}
