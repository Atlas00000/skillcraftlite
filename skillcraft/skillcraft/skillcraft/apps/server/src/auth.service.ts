import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(email: string, password: string, name?: string) {
    console.log('AuthService.register called with:', { email, name });
    try {
      const existing = await this.prisma.user.findUnique({ where: { email } });
      if (existing) {
        console.log('Email already in use:', email);
        throw new ConflictException('Email already in use');
      }
      const hashed = await bcrypt.hash(password, 10);
      const user = await this.prisma.user.create({
        data: { email, password: hashed, name },
      });
      console.log('User created successfully:', {
        id: user.id,
        email: user.email,
      });
      return { id: user.id, email: user.email, name: user.name };
    } catch (error) {
      console.error('Error in register method:', error);
      throw error;
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return null;
    return user;
  }

  async login(email: string, password: string) {
    console.log('AuthService.login called with:', { email });
    try {
      const user = await this.validateUser(email, password);
      if (!user) {
        console.log('Invalid credentials for:', email);
        throw new UnauthorizedException('Invalid credentials');
      }
      const payload = { sub: user.id, email: user.email };
      console.log('Login successful for:', email);
      return {
        access_token: this.jwtService.sign(payload),
        user: { id: user.id, email: user.email, name: user.name },
      };
    } catch (error) {
      console.error('Error in login method:', error);
      throw error;
    }
  }
}