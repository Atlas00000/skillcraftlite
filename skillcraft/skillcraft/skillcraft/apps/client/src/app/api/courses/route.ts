import { NextResponse } from 'next/server';

// Mock data for courses
const mockCourses = [
  {
    id: '1',
    title: 'Introduction to Web Development',
    description: 'Learn the fundamentals of web development with HTML, CSS, and JavaScript.',
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    category: 'programming',
    level: 'beginner',
    duration: '6 weeks',
    instructor: {
      name: 'John Smith',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
  },
  {
    id: '2',
    title: 'UI/UX Design Principles',
    description: 'Master the principles of user interface and user experience design.',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5',
    category: 'design',
    level: 'intermediate',
    duration: '8 weeks',
    instructor: {
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
  },
  {
    id: '3',
    title: 'Digital Marketing Fundamentals',
    description: 'Learn essential digital marketing strategies and tools.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    category: 'marketing',
    level: 'beginner',
    duration: '4 weeks',
    instructor: {
      name: 'Michael Brown',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
  },
  {
    id: '4',
    title: 'Advanced React Development',
    description: 'Master advanced React concepts and build complex applications.',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
    category: 'programming',
    level: 'advanced',
    duration: '10 weeks',
    instructor: {
      name: 'Emily Chen',
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    },
  },
  {
    id: '5',
    title: 'Business Strategy and Management',
    description: 'Learn key business strategies and management principles.',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
    category: 'business',
    level: 'intermediate',
    duration: '12 weeks',
    instructor: {
      name: 'David Wilson',
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    },
  },
  {
    id: '6',
    title: 'Motion Graphics Design',
    description: 'Create stunning motion graphics for digital media.',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f',
    category: 'design',
    level: 'advanced',
    duration: '8 weeks',
    instructor: {
      name: 'Lisa Anderson',
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    },
  },
];

export async function GET() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return NextResponse.json({
    courses: mockCourses,
  });
} 