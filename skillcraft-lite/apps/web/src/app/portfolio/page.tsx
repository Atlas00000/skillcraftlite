import React, { useState } from 'react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import { animations } from '../utils/animations';
import { mockProjects, mockCertificates, mockUsers } from '../utils/mockData';

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState<'projects' | 'certificates' | 'skills'>('projects');
  const user = mockUsers[0]; // Using the first user as an example

  const renderProjects = () => (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {mockProjects.map((project) => (
        <Card key={project.id} className={`${animations.fadeIn}`}>
          <img
            src={project.imageUrl}
            alt={project.title}
            className="mb-4 h-48 w-full rounded-lg object-cover"
          />
          <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">{project.title}</h3>
          <p className="mb-4 text-gray-600 dark:text-gray-300">{project.description}</p>
          <div className="mb-4 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center">
                <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {project.likes}
              </span>
              <span className="flex items-center">
                <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                {project.comments}
              </span>
            </div>
            <div className="flex space-x-2">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                GitHub
              </a>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-indigo-600 px-3 py-1 text-sm text-white hover:bg-indigo-700"
              >
                Live Demo
              </a>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderCertificates = () => (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {mockCertificates.map((certificate) => (
        <Card key={certificate.id} className={`${animations.fadeIn}`}>
          <img
            src={certificate.imageUrl}
            alt={certificate.title}
            className="mb-4 w-full rounded-lg"
          />
          <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">{certificate.title}</h3>
          <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
            Issued on {new Date(certificate.issueDate).toLocaleDateString()}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Verification Code: {certificate.verificationCode}
            </span>
            <button
              onClick={() => window.open(certificate.imageUrl, '_blank')}
              className="rounded-md bg-indigo-600 px-3 py-1 text-sm text-white hover:bg-indigo-700"
            >
              View Certificate
            </button>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderSkills = () => (
    <div className="space-y-6">
      {['Advanced', 'Intermediate', 'Beginner'].map((level) => (
        <div key={level}>
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">{level} Skills</h3>
          <div className="flex flex-wrap gap-2">
            {user.skills
              .filter((skill) => skill.level === level)
              .map((skill) => (
                <Badge
                  key={skill.name}
                  variant={level === 'Advanced' ? 'success' : level === 'Intermediate' ? 'primary' : 'secondary'}
                  size="lg"
                >
                  {skill.name}
                </Badge>
              ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">Portfolio</h1>
        <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700">
          {(['projects', 'certificates', 'skills'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`border-b-2 px-4 py-2 text-sm font-medium capitalize ${
                activeTab === tab
                  ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        {activeTab === 'projects' && renderProjects()}
        {activeTab === 'certificates' && renderCertificates()}
        {activeTab === 'skills' && renderSkills()}
      </div>
    </div>
  );
} 