import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    login: jest.fn(),
    register: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return login response', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        role: 'USER',
      };

      const mockLoginResponse = {
        access_token: 'mockToken',
        user: mockUser,
      };

      mockAuthService.login.mockResolvedValue(mockLoginResponse);

      const req = { user: mockUser };
      const result = await controller.login(req);

      expect(result).toEqual(mockLoginResponse);
      expect(authService.login).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('register', () => {
    it('should register new user and return login response', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };

      const mockUser = {
        id: '1',
        email: createUserDto.email,
        name: createUserDto.name,
      };

      const mockLoginResponse = {
        access_token: 'mockToken',
        user: mockUser,
      };

      mockAuthService.register.mockResolvedValue(mockUser);
      mockAuthService.login.mockResolvedValue(mockLoginResponse);

      const result = await controller.register(createUserDto);

      expect(result).toEqual(mockLoginResponse);
      expect(authService.register).toHaveBeenCalledWith(
        createUserDto.email,
        createUserDto.password,
        createUserDto.name,
      );
    });
  });

  describe('getProfile', () => {
    it('should return user profile', () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        role: 'USER',
      };

      const req = { user: mockUser };
      const result = controller.getProfile(req);

      expect(result).toEqual(mockUser);
    });
  });
}); 