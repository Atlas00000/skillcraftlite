import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Progress, Prisma } from '@prisma/client';

@Injectable()
export class ProgressService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ProgressCreateInput): Promise<Progress> {
    return this.prisma.progress.create({ data });
  }

  async findAll(): Promise<Progress[]> {
    return this.prisma.progress.findMany({
      include: {
        user: true,
        course: true,
      },
    });
  }

  async findOne(id: string): Promise<Progress> {
    const progress = await this.prisma.progress.findUnique({
      where: { id },
      include: {
        user: true,
        course: true,
      },
    });

    if (!progress) {
      throw new NotFoundException(`Progress with ID ${id} not found`);
    }

    return progress;
  }

  async findByUserAndCourse(userId: string, courseId: string): Promise<Progress> {
    const progress = await this.prisma.progress.findFirst({
      where: {
        userId,
        courseId,
      },
      include: {
        user: true,
        course: true,
      },
    });

    if (!progress) {
      throw new NotFoundException(
        `Progress not found for user ${userId} and course ${courseId}`,
      );
    }

    return progress;
  }

  async update(id: string, data: Prisma.ProgressUpdateInput): Promise<Progress> {
    try {
      return await this.prisma.progress.update({
        where: { id },
        data,
        include: {
          user: true,
          course: true,
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Progress with ID ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: string): Promise<Progress> {
    try {
      return await this.prisma.progress.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Progress with ID ${id} not found`);
      }
      throw error;
    }
  }
} 