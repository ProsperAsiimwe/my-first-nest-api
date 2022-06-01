import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) {}

  /**
   *
   * @param dto
   * @returns
   */
  async signUp(dto: AuthDto) {
    try {
      // generate the password hash
      const hash = await argon.hash(dto.password);

      const data = {
        email: dto.email,
        password: hash,
      };
      // Save the new user in the db
      const user = await this.prisma.user.create({
        data,
      });

      return this.encodeToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // Unique field violation
        if (error.code === 'P2002') {
          throw new ForbiddenException(`Credentials Already Taken: ${error.meta.target}.`);
        }
      } else {
        throw error;
      }
    }
  }

  /**
   *
   * @param dto
   * @returns
   */
  async signIn(dto: AuthDto) {
    // find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    // If user does not exist, throw exception
    if (!user) throw new ForbiddenException('The Email Provided Does not Exist.');
    // compare password
    const pwdMatches = await argon.verify(user.password, dto.password);
    // if password is incorrect, throw an exception
    if (!pwdMatches) throw new ForbiddenException('Incorrect Password');

    return this.encodeToken(user.id, user.email);
  }

  /**
   *
   * @param userId
   * @param email
   * @returns
   */
  async encodeToken(userId: number, email: string): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return { access_token: token };
  }
}
