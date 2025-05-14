import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@skillcraft.com' },
    update: {},
    create: {
      email: 'admin@skillcraft.com',
      password: adminPassword,
      role: 'ADMIN',
      profile: {
        create: {},
      },
    },
  });

  // Create regular user
  const userPassword = await bcrypt.hash('user123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'user@skillcraft.com' },
    update: {},
    create: {
      email: 'user@skillcraft.com',
      password: userPassword,
      name: 'Regular User',
      role: 'USER',
    },
  });

  // Create sample course
  const course = await prisma.course.create({
    data: {
      title: 'Introduction to Web Development',
      description: 'Learn the basics of web development including HTML, CSS, and JavaScript.',
      author: {
        connect: {
          id: admin.id,
        },
      },
      modules: {
        create: [
          {
            title: 'HTML Basics',
            description: 'Learn the fundamentals of HTML',
            order: 1,
            lessons: {
              create: [
                {
                  title: 'Introduction to HTML',
                  content: 'HTML is the standard markup language for creating web pages.',
                  order: 1,
                },
                {
                  title: 'HTML Elements',
                  content: 'HTML elements are the building blocks of HTML pages.',
                  order: 2,
                },
              ],
            },
          },
          {
            title: 'CSS Fundamentals',
            description: 'Learn how to style your web pages with CSS',
            order: 2,
            lessons: {
              create: [
                {
                  title: 'Introduction to CSS',
                  content: 'CSS is the language we use to style an HTML document.',
                  order: 1,
                },
                {
                  title: 'CSS Selectors',
                  content: 'CSS selectors are used to find HTML elements you want to style.',
                  order: 2,
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log({ admin, user, course });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 