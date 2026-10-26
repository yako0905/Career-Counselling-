import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import sparklesIcon from '../assets/sparkles.svg'
import sparklesWhite from '../assets/sparkles-white.svg'
import botIcon from '../assets/bot.svg'
import shieldIcon from '../assets/shield-check.svg'
import compassIcon from '../assets/compass-purple.svg'
import bookIcon from '../assets/book-open.svg'
import routeIcon from '../assets/route.svg'
import messagesIcon from '../assets/messages-square.svg'
import lightbulbIcon from '../assets/lightbulb.svg'
import messageGray from '../assets/message-gray.svg'
import sendIcon from '../assets/send.svg'
import searchIcon from '../assets/search.svg'
import chevronIcon from '../assets/chevron-right.svg'
import refreshIcon from '../assets/refresh.svg'
import './Counsellor.css'

const suggestions = [
  { icon: compassIcon, text: 'Which career is right for me?' },
  { icon: bookIcon, text: 'What skills should I learn?' },
  { icon: routeIcon, text: 'How can I improve my roadmap?' },
  { icon: messagesIcon, text: 'Help me prepare for interviews' },
]

const quickActions = [
  { icon: searchIcon, title: 'Explore Careers', text: 'Browse roles matched to your interests', to: '/career-details' },
  { icon: routeIcon, title: 'View My Roadmap', text: 'Continue your personalized learning plan', to: '/roadmap' },
  { icon: refreshIcon, title: 'Retake Assessment', text: 'Update your interests and strengths', to: '/assessment' },
]

// Sample replies. A real AI would need a backend/API; see the note in the chat.
function getReply(question) {
  const q = question.toLowerCase()
  if (q.includes('career') || q.includes('right for me') || q.includes('job')) {
    return "Based on your assessment, Software Developer is your strongest match at 87%, followed by Data Analyst (82%) and UI/UX Designer (74%). Your strengths in problem solving and technology point toward software roles. You can compare them side by side on the Compare page."
  }
  if (q.includes('skill') || q.includes('learn')) {
    return "For a Software Developer path, focus on C++ or Python first, then Data Structures & Algorithms, Git & GitHub, and basic Web Development. Your Python (45%) and DSA (30%) have the most room to grow right now."
  }
  if (q.includes('roadmap') || q.includes('improve') || q.includes('plan')) {
    return "You're currently on Stage 1 of 5: Learn Programming (about 4-6 weeks). Finish Python basics, then move to Stage 2: Master DSA. Completing one stage at a time will lift your readiness score toward the 50% milestone."
  }
  if (q.includes('interview') || q.includes('prepare')) {
    return "Start with 2-3 coding problems a week on topics you've learned, practise explaining your thinking out loud, and prepare short stories about your projects. System design basics come after you've built a few projects."
  }
  if (q.includes('hello') || q.includes('hi')) {
    return "Hello Arjun! Ask me about careers, skills, your roadmap, or interviews."
  }
  return "That's a great question. I can help with choosing a career, which skills to learn, improving your roadmap, and interview preparation. Try one of the suggested questions, or tell me more about what you enjoy."
}

export default function Counsellor() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [messages, typing])

  function send(text) {
    const trimmed = text.trim()
    if (!trimmed || typing) return
    setMessages((m) => [...m, { role: 'user', text: trimmed }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setMessages((m) => [...m, { role: 'bot', text: getReply(trimmed) }])
      setTyping(false)
    }, 700)
  }

  function handleSubmit(e) {
    e.preventDefault()
    send(input)
  }

  const started = messages.length > 0

  return (
    <div className="counsellor-page">
      <div className="cp-intro">
        <span className="cp-badge">
          <img src={sparklesIcon} alt="" />
          Personalized career guidance
        </span>
        <h1>AI Career Counsellor</h1>
        <p>Get personalized guidance based on your interests, skills, goals, and career progress.</p>
      </div>

      <div className="cp-layout">
        <section className="chat">
          <div className="chat-header">
            <div className="chat-avatar">
              <img src={botIcon} alt="" />
            </div>
            <div className="chat-identity">
              <strong>Career Assistant</strong>
              <span>
                <i className="status-dot" />
                Online · Ready to help
              </span>
            </div>
            <span className="private-pill">
              <img src={shieldIcon} alt="" />
              Personalized guidance
            </span>
          </div>

          <div className="conversation">
            <div className="msg msg-bot">
              <div className="msg-avatar">
                <img src={sparklesWhite} alt="" />
              </div>
              <div className="msg-content">
                <div className="bubble bubble-welcome">
                  <strong>Hi! I'm your Career Assistant. What would you like help with today?</strong>
                  <p>I can use your assessment, skills, and roadmap progress to give you guidance that fits where you are right now.</p>
                </div>
                <span className="msg-time">Just now</span>
              </div>
            </div>

            {!started && (
              <>
                <div className="suggested">
                  <span className="suggested-title">Try asking a question</span>
                  <div className="suggested-grid">
                    {suggestions.map((s) => (
                      <button type="button" className="suggested-btn" key={s.text} onClick={() => send(s.text)}>
                        <img src={s.icon} alt="" />
                        {s.text}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="tip">
                  <img src={lightbulbIcon} alt="" />
                  <span>Tip: Share what you enjoy learning or what feels difficult for more useful advice.</span>
                </div>
              </>
            )}

            {messages.map((m, i) =>
              m.role === 'user' ? (
                <div className="msg msg-user" key={i}>
                  <div className="bubble bubble-user">{m.text}</div>
                </div>
              ) : (
                <div className="msg msg-bot" key={i}>
                  <div className="msg-avatar">
                    <img src={sparklesWhite} alt="" />
                  </div>
                  <div className="msg-content">
                    <div className="bubble bubble-reply">{m.text}</div>
                  </div>
                </div>
              )
            )}

            {typing && (
              <div className="msg msg-bot">
                <div className="msg-avatar">
                  <img src={sparklesWhite} alt="" />
                </div>
                <div className="msg-content">
                  <div className="bubble bubble-reply typing">Typing…</div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <form className="composer" onSubmit={handleSubmit}>
            <label className="composer-input">
              <img src={messageGray} alt="" />
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about your career..."
              />
            </label>
            <button type="submit" className="send-btn">
              Send
              <img src={sendIcon} alt="" />
            </button>
          </form>
        </section>

        <aside className="cp-side">
          <section className="profile-box">
            <div className="pb-head">
              <div className="pb-avatar">AK</div>
              <div className="pb-id">
                <strong>Arjun Kumar</strong>
                <span>3rd Year · B.Tech CSE</span>
              </div>
              <span className="uptodate">Up to date</span>
            </div>
            <div className="pb-rows">
              <div className="pb-row">
                <span>Career Goal</span>
                <em>Software Developer</em>
              </div>
              <div className="pb-row">
                <span>Career Match</span>
                <b>87% Match</b>
              </div>
              <div className="pb-progress">
                <div className="pb-progress-top">
                  <span>Roadmap Progress</span>
                  <b>20%</b>
                </div>
                <div className="pb-track">
                  <div className="pb-fill" style={{ width: '20%' }} />
                </div>
                <small>Stage 1 of 5 · Learn Programming</small>
              </div>
              <div className="pb-skills">
                <span>Top Skills</span>
                <div>
                  <i>C++</i>
                  <i>Python</i>
                  <i>Problem Solving</i>
                </div>
              </div>
            </div>
          </section>

          <section className="quick-box">
            <div className="qb-head">
              <strong>Quick Actions</strong>
              <span>Jump back into your career journey.</span>
            </div>
            <div className="qb-list">
              {quickActions.map((a) => (
                <Link to={a.to} className="qb-item" key={a.title}>
                  <div className="qb-icon">
                    <img src={a.icon} alt="" />
                  </div>
                  <div className="qb-copy">
                    <strong>{a.title}</strong>
                    <span>{a.text}</span>
                  </div>
                  <img className="qb-chevron" src={chevronIcon} alt="" />
                </Link>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}
