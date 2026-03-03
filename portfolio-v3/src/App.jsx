import { useEffect, useState } from 'react'
import DancingBars from './components/DancingBars'
import './index.css'

const fetchPortfolio = async () => {
  const response = await fetch('/portfolio.json')
  if (!response.ok) {
    throw new Error('Unable to load portfolio data')
  }
  return response.json()
}

function App() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPortfolio()
      .then(setData)
      .catch((err) => setError(err.message))
  }, [])

  if (error) {
    return (
      <main className="page">
        <p className="status error">{error}</p>
      </main>
    )
  }

  if (!data) {
    return (
      <main className="page">
        <p className="status">Loading portfolio...</p>
      </main>
    )
  }

  const { hero, about, projects, highlights, metrics, contact } = data
  const traits = Array.isArray(hero.traits) ? hero.traits : ['Minimal • data-forward']
  const productStrategy = Array.isArray(about.productStrategy) ? about.productStrategy : []
  const technicalExecution = Array.isArray(about.technicalExecution) ? about.technicalExecution : []

  return (
    <div className="page">
      <header className="hero" id="top">
        <div className="hero__eyebrow">{hero.availability}</div>
        <h1 className="hero__title">{hero.name}</h1>
        <p className="hero__tagline">{hero.tagline}</p>
        <p className="hero__summary">{hero.summary}</p>
        <div className="hero__meta">
          <span className="pill">{hero.location}</span>
          <span className="pill pill--soft">{traits.join(' • ')}</span>
        </div>
        <div className="hero__actions">
          {hero.actions.map((action) => (
            <a key={action.label} className="btn" href={action.href}>
              {action.label}
            </a>
          ))}
        </div>
      </header>

      <section className="panel" id="about">
        <div className="panel__header">
          <p className="eyebrow">About</p>
          <h2>Building calm, intentional products</h2>
        </div>
        <p className="panel__body">{about.bio}</p>
        <div className="chips">
          {about.focus.map((item) => (
            <span key={item} className="chip">
              {item}
            </span>
          ))}
        </div>
        <div className="list-grid">
          <div>
            <p className="eyebrow">Product & Strategy</p>
            <ul>
              {productStrategy.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Technical Execution</p>
            <ul>
              {technicalExecution.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Principles</p>
            <ul>
              {about.principles.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="panel" id="projects">
        <div className="panel__header">
          <p className="eyebrow">Projects</p>
          <h2>Recent builds</h2>
        </div>
        <div className="cards">
          {projects.map((project) => (
            <article key={project.title} className="card">
              <div className="card__top">
                <p className="eyebrow">{project.year}</p>
                <h3>{project.title}</h3>
                <p className="muted">{project.description}</p>
              </div>
              <div className="card__meta">
                <div className="tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <a className="arrow" href={project.link} target="_blank" rel="noreferrer">
                  View ↗
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="panel" id="highlights">
        <div className="panel__header">
          <p className="eyebrow">Highlights</p>
          <h2>Signals of how I work</h2>
        </div>
        <div className="grid">
          {highlights.map((item) => (
            <div key={item.title} className="tile">
              <p className="eyebrow">{item.title}</p>
              <p>{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="panel" id="contact">
        <div className="panel__header">
          <p className="eyebrow">Contact</p>
          <h2>Let&apos;s build something intentional</h2>
        </div>
        <p className="panel__body">
          I&apos;m most alive at the intersection of product strategy, AI, and playful data visuals. If you&apos;re thinking deeply about what to build next — we&apos;ll get along.
        </p>
        <div className="contact__actions">
          <a className="btn" href={`mailto:${contact.email}`}>
            Email {contact.email}
          </a>
          <div className="links">
            {contact.social.map((item) => (
              <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="panel panel--bars" aria-label="Animated stats">
        <div className="panel__header">
          <p className="eyebrow">Dancing bars</p>
          <h2>Momentum across work</h2>
        </div>
        <p className="muted">Live, looping bars driven by the metrics data.</p>
        <DancingBars data={metrics} />
      </section>
    </div>
  )
}

export default App
