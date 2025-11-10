import React from 'react'

const Section = ({ id, title, className, isDarkMode, isLanding, imageUrl, content }) => {
  if (isLanding) {
    return (
      <section id={id} className={`section ${className} landing-section`}>
        <div className="wrapper-outer">
          <div className="wrapper-inner">
            <div className="background">
              <div className="bg-image" />
              <div className={`mask-overlay ${isDarkMode ? 'dark-mode' : 'light-mode'}`}></div>
              <div className="landing-content">
                <div className="landing-image-container">
                  <img 
                    src={imageUrl} 
                    alt="Sanketh MBT" 
                    className="landing-image"
                    onError={(e) => {
                      console.error('Image not found:', imageUrl, '- Please add your image to the public folder')
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect width="400" height="400" fill="%23ddd"%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999" font-family="Arial" font-size="18"%3EImage not found%3C/text%3E%3C/svg%3E'
                    }}
                  />
                </div>
                <div className="landing-text-container">
                  <div className="landing-text">
                    <h1 className="landing-line">Hi,</h1>
                    <h1 className="landing-line">My name is Sanketh</h1>
                    <h1 className="landing-line">MBT @ Purdue (May 2026)</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (content) {
    return (
      <section id={id} className={`section ${className} content-section`}>
        <div className="wrapper-outer">
          <div className="wrapper-inner">
            <div className="background">
              <div className="bg-image" />
              <div className={`mask-overlay ${isDarkMode ? 'dark-mode' : 'light-mode'}`}></div>
              <div className="content-wrapper">
                <h2 className="section-title">{title}</h2>
                <div className="section-content" dangerouslySetInnerHTML={{ __html: content }} />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id={id} className={`section ${className}`}>
      <div className="wrapper-outer">
        <div className="wrapper-inner">
          <div className="background">
            <div className="bg-image" />
            <div className={`mask-overlay ${isDarkMode ? 'dark-mode' : 'light-mode'}`}></div>
            <div className="clip-text">
              <h2 className="section-title">{title}</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Section

