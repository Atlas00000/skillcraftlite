import { User, Course, Achievement, SocialPost, Comment, Project, Certificate } from '../types';

export const mockUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Student',
    joinDate: '2024-01-15',
    bio: 'Passionate about web development and learning new technologies.',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=6366f1&color=fff',
    stats: {
      coursesCompleted: 5,
      totalXP: 2500,
      currentLevel: 8,
      nextLevelXP: 3000,
    },
    skills: [
      { name: 'HTML', level: 'Advanced' },
      { name: 'CSS', level: 'Intermediate' },
      { name: 'JavaScript', level: 'Intermediate' },
      { name: 'React', level: 'Beginner' },
    ],
    achievements: [1, 2, 3],
    projects: [1, 2],
    certificates: [1, 2],
    connections: [2, 3, 4],
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Instructor',
    joinDate: '2023-12-01',
    bio: 'Full-stack developer and passionate educator.',
    avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=6366f1&color=fff',
    stats: {
      coursesCompleted: 12,
      totalXP: 5000,
      currentLevel: 15,
      nextLevelXP: 6000,
    },
    skills: [
      { name: 'React', level: 'Advanced' },
      { name: 'Node.js', level: 'Advanced' },
      { name: 'TypeScript', level: 'Intermediate' },
    ],
    achievements: [1, 2, 3, 4],
    projects: [3],
    certificates: [1, 2, 3],
    connections: [1, 3, 4],
  },
];

export const mockCourses: Course[] = [
  {
    id: 1,
    title: 'Web Development Fundamentals',
    description: 'Learn the basics of HTML, CSS, and JavaScript',
    category: 'Programming',
    level: 'Beginner',
    duration: '8 weeks',
    instructor: 'Jane Smith',
    rating: 4.8,
    students: 1234,
    price: 49.99,
    curriculum: [
      {
        week: 1,
        title: 'Introduction to Web Development',
        lessons: [
          { id: 1, title: 'Understanding the Web', duration: '30 min', completed: true },
          { id: 2, title: 'Setting up your development environment', duration: '45 min', completed: true },
          { id: 3, title: 'Basic HTML structure', duration: '60 min', completed: false },
        ],
      },
      {
        week: 2,
        title: 'HTML Fundamentals',
        lessons: [
          { id: 4, title: 'HTML elements and attributes', duration: '45 min', completed: false },
          { id: 5, title: 'Semantic HTML', duration: '60 min', completed: false },
          { id: 6, title: 'Forms and input types', duration: '75 min', completed: false },
        ],
      },
    ],
    xpReward: 500,
    certificateId: 1,
  },
];

export const mockAchievements: Achievement[] = [
  {
    id: 1,
    title: 'Fast Learner',
    description: 'Completed 5 courses in one month',
    date: '2024-02-15',
    xpReward: 200,
    icon: 'star',
  },
  {
    id: 2,
    title: 'Perfect Score',
    description: 'Achieved 100% in a course',
    date: '2024-02-20',
    xpReward: 300,
    icon: 'trophy',
  },
  {
    id: 3,
    title: 'Early Bird',
    description: 'Started learning before 8 AM',
    date: '2024-03-01',
    xpReward: 100,
    icon: 'sun',
  },
  {
    id: 4,
    title: 'Social Butterfly',
    description: 'Connected with 10 other learners',
    date: '2024-03-05',
    xpReward: 150,
    icon: 'users',
  },
];

export const mockProjects: Project[] = [
  {
    id: 1,
    title: 'E-commerce Website',
    description: 'A full-stack e-commerce platform built with React and Node.js',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    imageUrl: 'https://via.placeholder.com/400x300',
    githubUrl: 'https://github.com/johndoe/ecommerce',
    liveUrl: 'https://ecommerce-demo.com',
    likes: 45,
    comments: 12,
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates',
    technologies: ['React', 'Firebase', 'Tailwind CSS'],
    imageUrl: 'https://via.placeholder.com/400x300',
    githubUrl: 'https://github.com/johndoe/taskmanager',
    liveUrl: 'https://taskmanager-demo.com',
    likes: 32,
    comments: 8,
  },
];

export const mockCertificates: Certificate[] = [
  {
    id: 1,
    title: 'Web Development Fundamentals',
    issueDate: '2024-02-15',
    courseId: 1,
    imageUrl: 'https://via.placeholder.com/800x600',
    verificationCode: 'CERT-2024-001',
  },
  {
    id: 2,
    title: 'Advanced JavaScript',
    issueDate: '2024-03-01',
    courseId: 2,
    imageUrl: 'https://via.placeholder.com/800x600',
    verificationCode: 'CERT-2024-002',
  },
];

export const mockSocialPosts: SocialPost[] = [
  {
    id: 1,
    userId: 1,
    content: 'Just completed the Web Development Fundamentals course! 🎉',
    timestamp: '2024-03-10T14:30:00Z',
    likes: 15,
    comments: [
      {
        id: 1,
        userId: 2,
        content: 'Congratulations! 🎉',
        timestamp: '2024-03-10T14:35:00Z',
        likes: 3,
      },
    ],
  },
  {
    id: 2,
    userId: 2,
    content: 'New course coming soon: Advanced React Patterns! Stay tuned.',
    timestamp: '2024-03-09T10:00:00Z',
    likes: 25,
    comments: [
      {
        id: 2,
        userId: 1,
        content: 'Can\'t wait! 😊',
        timestamp: '2024-03-09T10:05:00Z',
        likes: 2,
      },
    ],
  },
];

export const mockLeaderboard = mockUsers
  .map(user => ({
    id: user.id,
    name: user.name,
    avatar: user.avatar,
    xp: user.stats.totalXP,
    level: user.stats.currentLevel,
  }))
  .sort((a, b) => b.xp - a.xp)
  .slice(0, 10); 