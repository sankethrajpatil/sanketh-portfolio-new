import React from 'react';
import Section from './Section';

const ProjectsPage = ({ projects, isDarkMode }) => {
  return (
    <div className="projects-page">
      {projects.map((project, index) => (
        <Section
          key={project.id}
          id={`project-${project.id}`}
          title={project.title}
          className={`project-section-${index % 5}`}
          isDarkMode={isDarkMode}
          content={`
            <div class="project-detail">
              <h3 class="project-tagline">${project.tagline}</h3>
              <p class="project-description">${project.description}</p>
              <div class="project-links">
                <strong>View project at:</strong>
                <ul>
                  ${project.links.map(link => `<li><a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.label}</a></li>`).join('')}
                </ul>
              </div>
            </div>
          `}
        />
      ))}
    </div>
  );
};

export default ProjectsPage;
