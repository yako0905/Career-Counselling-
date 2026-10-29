import { Link } from 'react-router-dom'
import heroImg from '../assets/hero-illustration.png'
import arrowIcon from '../assets/arrow-right.svg'
import codeIcon from '../assets/code.svg'
import barChartIcon from '../assets/bar-chart.svg'
import layoutIcon from '../assets/layout.svg'
import megaphoneIcon from '../assets/megaphone.svg'
import botIcon from '../assets/bot.svg'
import './Home.css'

const steps = [
  { n: 1, title: 'Assess Yourself', text: 'Take our AI-powered quiz to understand your strengths and interests.' },
  { n: 2, title: 'Explore Careers', text: 'Browse 100+ careers with salary data, growth prospects, and required skills.' },
  { n: 3, title: 'Build Your Roadmap', text: 'Create a personalized 5-year plan with courses and certifications.' },
  { n: 4, title: 'Take Your Next Step', text: 'Apply to colleges or start building your professional portfolio.' },
]

const careers = [
  { title: 'Software Developer', text: 'Design, build, and test software programs for a wide range of industries.', icon: codeIcon },
  { title: 'Data Analyst', text: 'Help organizations make better decisions by analyzing complex data sets.', icon: barChartIcon },
  { title: 'UI/UX Designer', text: 'Create user-friendly and visually appealing digital products and interfaces.', icon: layoutIcon },
  { title: 'Digital Marketer', text: 'Promote products and services using digital channels like social media and SEO.', icon: megaphoneIcon },
]

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Your Career. Your Path. Your Future.</h1>
          <p>
            Confused about what to study or which career to choose? Discover
            careers that match your interests, skills, and goals.
          </p>
          <div className="hero-buttons">
            <Link to="/assessment" className="btn btn-primary btn-lg">
              Discover My Career
              <img src={arrowIcon} alt="" />
            </Link>
            <Link to="/career-details" className="btn btn-outline btn-lg">
              Explore Careers
            </Link>
          </div>
        </div>
        <img className="hero-image" src={heroImg} alt="Student exploring a career roadmap on a tablet" />
      </section>

      <section className="how-it-works">
        <div className="section-head">
          <h2>How it works</h2>
          <p>A simple 4-step journey to your dream career.</p>
        </div>
        <div className="card-row">
          {steps.map((step) => (
            <div className="card" key={step.n}>
              <div className="step-number">{step.n}</div>
              <div className="card-text">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="popular">
        <div className="section-head">
          <h2>Popular Careers</h2>
          <p>Explore in-demand roles that students are loving.</p>
        </div>
        <div className="card-row">
          {careers.map((career) => (
            <Link to="/career-details" className="card" key={career.title}>
              <div className="career-icon">
                <img src={career.icon} alt="" />
              </div>
              <div className="card-text">
                <h3>{career.title}</h3>
                <p>{career.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="chatbot">
        <div className="chatbot-icon">
          <img src={botIcon} alt="" />
        </div>
        <div className="chatbot-text">
          <h3>Have a career question?</h3>
          <p>Ask our Career Assistant anything about careers, courses, skills, or career paths.</p>
        </div>
        <Link to="/book" className="btn btn-primary btn-md">
          Chat with Career Assistant
          <img src={arrowIcon} alt="" />
        </Link>
      </section>

      <section className="counsellor">
        <div className="counsellor-card">
          <span className="pill">Student-friendly guidance</span>
          <h3>Get personalized advice from a career counsellor.</h3>
          <p>
            Discuss your interests, strengths, and goals with an expert who can
            help you choose the right path.
          </p>
          <div className="avatars">
            <span>A</span>
            <span>S</span>
            <span>M</span>
          </div>
        </div>
        <div className="counsellor-text">
          <h2>Still unsure?</h2>
          <p>Talk to a professional counsellor who can help you make the right choice.</p>
          <Link to="/book" className="btn btn-primary btn-lg">
            Book a Session
          </Link>
        </div>
      </section>
    </div>
  )
}