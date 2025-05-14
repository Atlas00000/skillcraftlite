import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { Progress, Prisma } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('progress')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Post()
  create(@Request() req, @Body() createProgressDto: Prisma.ProgressCreateInput) {
    return this.progressService.create({
      ...createProgressDto,
      user: { connect: { id: req.user.id } },
    });
  }

  @Get()
  @Roles(Role.ADMIN)
  findAll() {
    return this.progressService.findAll();
  }

  @Get('my-progress')
  async findMyProgress(@Request() req) {
    const progress = await this.progressService.findAll();
    return progress.filter(p => p.userId === req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.progressService.findOne(id);
  }

  @Get('course/:courseId')
  async findCourseProgress(@Request() req, @Param('courseId') courseId: string) {
    return this.progressService.findByUserAndCourse(req.user.id, courseId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProgressDto: Prisma.ProgressUpdateInput,
  ) {
    return this.progressService.update(id, updateProgressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.progressService.remove(id);
  }
} 