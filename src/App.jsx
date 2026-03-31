import React, { useEffect, useState, useMemo } from "react"
import { gsap } from "gsap"
import Section from "./components/Section"
import ThemeToggle from "./components/ThemeToggle"
import ProjectsPage from "./components/ProjectsPage"
import "./styles.css"

const App = () => {
  const [projects, setProjects] = useState([])
  const [currentPage, setCurrentPage] = useState("landing") 
  const [targetProjectId, setTargetProjectId] = useState(null)
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme")
    return savedTheme ? savedTheme === "dark" : true
  })

  useEffect(() => {
    fetch("/projects.json")
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error("Failed to load projects:", err))
  }, [])

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light")
    document.body.className = isDarkMode ? "dark-mode" : "light-mode"
  }, [isDarkMode])

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev)
  }

  const navigateToProjects = (id) => {
    setTargetProjectId(id);
    setCurrentPage("projects");
  };

  const sections = useMemo(() => [
    {
      id: "first",
      title: "Welcome to My Portfolio",
      className: "first",
      isLanding: true,
      imageUrl: "/sanketh-photo.jpg"
    },
    {
      id: "education",
      title: "Education",
      className: "second",
      content: `
        <div class="about-content">
          <div class="education-section">
            <h3>Education</h3>
            <div class="edu-item">
              <h4>Purdue University, Daniels School of Business</h4>
              <p class="degree">Master of Business and Technology (Tech MBA) - AI Track</p>
              <p class="location">West Lafayette, IN | August 2025 - May 2026</p>
              <p class="coursework">Coursework: Project Management, Business Intelligence, Digital Product Design, Technology Strategy</p>
            </div>
            <div class="edu-item">
              <h4>University of Visvesvaraya College of Engineering</h4>
              <p class="degree">Mechanical Engineering, GPA 3.8/4</p>
              <p class="location">Bangalore, India | June 2022</p>
              <p class="coursework">Built "Smart Agriculture" ML hardware project to improve crop yield prediction</p>
            </div>
          </div>
        </div>
      `
    },
    {
      id: "work",
      title: "Work Experience",
      className: "third",
      content: `
        <div class="about-content">
          <div class="experience-section">
            <h3>Professional Experience</h3>
            <div class="exp-item">
              <h4>SAP, Product Quality</h4>
              <p class="location">Bangalore, India | July 2022 - July 2025</p>
              <ul>
                <li>Raised automation coverage from 20% to 95% (Ariba) and 70% to 90% (BNAC) by identifying gaps, prioritizing high-risk flows, and building stable test suites with WebDriverIO and Puppeteer</li>
                <li>Drove shift-left QA adoption enabling detection of ~25-33% of defects, boosting every quarter</li>
                <li>Established an AI workflow through LLMs and APIs maintaining a QA dashboard to track regression</li>
                <li>Presented risk insights and automation impact to stakeholders, influencing roadmap and resources</li>
                <li>Built a QA knowledge base working with teams from China, Singapore, Germany and USA for documentation, tutorials, and system workflows to reduce onboarding time by 3 weeks</li>
              </ul>
            </div>
            <div class="exp-item">
              <h4>SAP, Developer Intern</h4>
              <p class="location">Bangalore, India | January 2022 – July 2022</p>
              <ul>
                <li>Implemented custom error messages for SAP ByD using ABAP, enhancing user clarity by up to 10%</li>
              </ul>
            </div>
          </div>
        </div>
      `
    },
    {
      id: "projects",
      title: "My Projects",
      className: "fourth",
      content: `
        <div class="projects-content">
          ${projects.map(project => `
            <div class="project-item">
              <h3>${project.title}</h3>
              <p>${project.tagline}</p>
              <button class="view-project-btn" data-id="${project.id}">View</button>
            </div>
          `).join("")}
        </div>
      `
    },
    {
      id: "skills",
      title: "Skills & Expertise",
      className: "fifth",
      content: `
        <div class="skills-content">
          <div class="skills-card">
            <h3>Product & Strategy</h3>
            <div class="skills-list">
              <span class="skill-tag">Product Strategy</span>
              <span class="skill-tag">Product Leadership</span>
              <span class="skill-tag">Data Analysis</span>
              <span class="skill-tag">Business Intelligence</span>
            </div>
          </div>
          <div class="skills-card">
            <h3>Technology</h3>
            <div class="skills-list">
              <span class="skill-tag">ML & AI Fundamentals</span>
              <span class="skill-tag">Python</span>
              <span class="skill-tag">WebDriverIO</span>
              <span class="skill-tag">Puppeteer</span>
              <span class="skill-tag">ABAP</span>
              <span class="skill-tag">SAP BTP</span>
            </div>
          </div>
          <div class="skills-card">
            <h3>Tools & Platforms</h3>
            <div class="skills-list">
              <span class="skill-tag">LLMs & APIs</span>
              <span class="skill-tag">QA Automation</span>
              <span class="skill-tag">Predictive Modeling</span>
              <span class="skill-tag">Data Lake Architecture</span>
            </div>
          </div>
        </div>
      `
    },
    {
      id: "contact",
      title: "Get In Touch",
      className: "fifth",
      content: `
        <div class="contact-content">
          <div class="contact-info">
            <div class="contact-item">
              <h3>Email</h3>
              <a href="mailto:patil232@purdue.edu" class="contact-link">patil232@purdue.edu</a>
            </div>
            <div class="contact-item">
              <h3>Phone</h3>
              <a href="tel:+17655439608" class="contact-link">(765) 543-9608</a>
            </div>
            <div class="contact-item">
              <h3>LinkedIn</h3>
              <a href="https://www.linkedin.com/in/sanketh-raj-patil/" target="_blank" rel="noopener noreferrer" class="contact-link">linkedin.com/in/sanketh-raj-patil/</a>
            </div>
            <div class="contact-item">
              <h3>Location</h3>
              <p class="contact-text">West Lafayette, IN</p>
            </div>
          </div>
        </div>
      `
    },
  ], [projects]);

  useEffect(() => {
    if (currentPage !== "landing") return;
    let sectionsSelector = document.querySelectorAll(".section"),
      bgImages = document.querySelectorAll(".bg-image"),
      headings = document.querySelectorAll(".section-title"),
      outerWrappers = document.querySelectorAll(".wrapper-outer"),
      innerWrappers = document.querySelectorAll(".wrapper-inner"),
      currentIndex = -1,
      wrap = (index, max) => (index + max) % max,
      animating

  gsap.set(outerWrappers, { yPercent: 100 })
  gsap.set(innerWrappers, { yPercent: -100 })
  gsap.set(bgImages, { scale: 1, yPercent: 0 })

    let activeTimeline = null

    function gotoSection(index, direction) {
      index = wrap(index, sectionsSelector.length)
      if (animating || index === currentIndex) return
      animating = true

      let fromTop = direction === -1
      let dFactor = fromTop ? -1 : 1
      if (activeTimeline) {
        activeTimeline.kill()
        activeTimeline = null
      }
      let tl = gsap.timeline({ 
        defaults: { duration: 1.1, ease: "power2.inOut" }, 
        onComplete: () => (animating = false) 
      })
      activeTimeline = tl

      if (currentIndex >= 0) {
        gsap.set(sectionsSelector[currentIndex], { zIndex: 0 })
        tl.to(bgImages[currentIndex], { yPercent: -15 * dFactor })
          .set(sectionsSelector[currentIndex], { autoAlpha: 0 })
      }

      gsap.set(sectionsSelector[index], { autoAlpha: 1, zIndex: 1 })
      tl.fromTo(
        [outerWrappers[index], innerWrappers[index]], 
        { yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor) }, 
        { yPercent: 0 }, 
        0
      )
        .fromTo(
          bgImages[index], 
          { yPercent: 15 * dFactor }, 
          { yPercent: 0 }, 
          0
        )
        .fromTo(
          headings[index], 
          { autoAlpha: 0, yPercent: 150 * dFactor }, 
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 1,
            ease: "power2",
          }, 
          0.2
        )

      const ZOOM_STEP = 0.06
      const targetScale = 1 + index * ZOOM_STEP
      tl.to(bgImages[index], { scale: targetScale, duration: 1.1, ease: "power2.inOut" }, 0)
      for (let i = 0; i < bgImages.length; i++) {
        if (i !== index) {
          const otherTarget = 1 + Math.max(0, i * ZOOM_STEP - ZOOM_STEP)
          tl.to(bgImages[i], { scale: otherTarget, duration: 1.1, ease: "power2.inOut" }, 0)
        }
      }

      currentIndex = index
    }

    function navigateSectionById(id) {
      let index = Array.from(sectionsSelector).findIndex(section => section.id === id)

      if (index !== -1 && index !== currentIndex) {
        gotoSection(index, index > currentIndex ? 1 : -1)
      }
    }

    let lastTap = 0
    let wheelTimeout = null
    let wheelAccum = 0
    let lastWheelTs = 0

    const handleTouchEnd = function (event) {
      let currentTime = new Date().getTime()
      let tapLength = currentTime - lastTap
      if (tapLength < 500 && tapLength > 0 && !animating) {
        gotoSection(currentIndex + 1, 1)
        event.preventDefault()
      }
      lastTap = currentTime
    }

    const handleWheel = (event) => {
      let delta = event.deltaY
      if (event.deltaMode === 1) {
        delta *= 16 
      }
      const now = Date.now()
      if (now - lastWheelTs > 300) wheelAccum = 0
      lastWheelTs = now

      wheelAccum += delta
      const ACC_THRESHOLD = 90

      const contentWrapper = event.target.closest(".content-wrapper")
      if (contentWrapper) {
        const isAtTop = contentWrapper.scrollTop === 0
        const isAtBottom = contentWrapper.scrollHeight - contentWrapper.scrollTop <= contentWrapper.clientHeight + 5
        
        if ((delta < 0 && !isAtTop) || (delta > 0 && !isAtBottom)) {
          return 
        }
        
        if ((delta < 0 && isAtTop) || (delta > 0 && isAtBottom)) {
          event.preventDefault()
        }
      }

      if (wheelTimeout) return
      
      wheelTimeout = setTimeout(() => {
        wheelTimeout = null
      }, 250)

      if (!animating && Math.abs(wheelAccum) >= ACC_THRESHOLD) {
        const dir = wheelAccum < 0 ? -1 : 1
        wheelAccum = 0
        if (dir < 0) {
          gotoSection(currentIndex - 1, -1)
        } else {
          gotoSection(currentIndex + 1, 1)
        }
      }
    }

    const handleNavClick = (e) => {
      e.preventDefault()
      navigateSectionById(e.currentTarget.getAttribute("href").slice(1))
    }

    const handleViewProjectClick = (e) => {
      const projectId = e.target.getAttribute("data-id");
      if (projectId) {
        navigateToProjects(projectId);
      }
    };

    document.addEventListener("touchend", handleTouchEnd)
    window.addEventListener("wheel", handleWheel, { passive: false })

    document.querySelectorAll("nav a").forEach(a => {
      a.addEventListener("click", handleNavClick)
    })

    document.querySelectorAll(".view-project-btn").forEach(btn => {
      btn.addEventListener("click", handleViewProjectClick)
    });

    gotoSection(0, 1)

    return () => {
      window.removeEventListener("wheel", handleWheel)
      document.removeEventListener("touchend", handleTouchEnd)
      document.querySelectorAll("nav a").forEach(a => {
        a.removeEventListener("click", handleNavClick)
      })
      document.querySelectorAll(".view-project-btn").forEach(btn => {
        btn.removeEventListener("click", handleViewProjectClick)
      });
      if (wheelTimeout) {
        clearTimeout(wheelTimeout)
      }
    }
  }, [currentPage, projects])

  if (currentPage === "projects") {
    return (
      <div className="app-container">
        <header className="header" style={{ position: "fixed", top: "20px", left: "20px", zIndex: 1001 }}>
          <button className="back-btn" onClick={() => setCurrentPage("landing")} style={{ background: "none", border: "1px solid currentColor", padding: "10px 20px", cursor: "pointer", borderRadius: "4px", color: "inherit" }}>&larr; Back</button>
        </header>
        <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <ProjectsPage projects={projects} isDarkMode={isDarkMode} />
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="header">
        <nav>
          <a href="#first">Hero</a>
          <a href="#education">Education</a>
          <a href="#work">Work</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>
      <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      {sections.map((section) => (
        <Section
          key={section.id}
          id={section.id}
          title={section.title}
          className={section.className}
          isDarkMode={isDarkMode}
          isLanding={section.isLanding}
          imageUrl={section.imageUrl}
          content={section.content}
        />
      ))}
    </div>
  )
}

export default App
