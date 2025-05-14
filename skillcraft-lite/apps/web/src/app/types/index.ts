export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Student' | 'Instructor';
  joinDate: string;
  bio: string;
  avatar: string;
  stats: {
    coursesCompleted: number;
    totalXP: number;
    currentLevel: number;
    nextLevelXP: number;
  };
  skills: Array<{
    name: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
  }>;
  achievements: number[];
  projects: number[];
  certificates: number[];
  connections: number[];
}

export interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  instructor: string;
  rating: number;
  students: number;
  price: number;
  curriculum: Array<{
    week: number;
    title: string;
    lessons: Array<{
      id: number;
      title: string;
      duration: string;
      completed: boolean;
    }>;
  }>;
  xpReward: number;
  certificateId: number;
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  date: string;
  xpReward: number;
  icon: 'star' | 'trophy' | 'sun' | 'users';
}

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  githubUrl: string;
  liveUrl: string;
  likes: number;
  comments: number;
}

export interface Certificate {
  id: number;
  title: string;
  issueDate: string;
  courseId: number;
  imageUrl: string;
  verificationCode: string;
}

export interface Comment {
  id: number;
  userId: number;
  content: string;
  timestamp: string;
  likes: number;
}

export interface SocialPost {
  id: number;
  userId: number;
  content: string;
  timestamp: string;
  likes: number;
  comments: Comment[];
}

export interface LeaderboardEntry {
  id: number;
  name: string;
  avatar: string;
  xp: number;
  level: number;
} 