import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  getBookmarks(userId: number) {
    return this.prisma.bookmark.findMany({
      where: {
        userId,
      },
    });
  }

  getBookmarkById(userId: number, bookmarkId: number) {
    return this.prisma.bookmark.findFirst({
      where: {
        id: bookmarkId,
        userId,
      },
    });
  }

  async createBookmark(userId: number, dto: CreateBookmarkDto) {
    const bookmark = await this.prisma.bookmark.create({
      data: {
        userId,
        ...dto,
      },
    });

    return bookmark;
  }

  async editBookmarkById(userId: number, bookMarkId: number, dto: EditBookmarkDto) {
    // Get the bookmark by id
    const bookmark = await this.prisma.bookmark.findUnique({
      where: {
        id: bookMarkId,
      },
    });

    // Check if user owns the bookmark
    if (!bookmark || bookmark.userId !== userId) {
      throw new ForbiddenException('Access To Resource Denied!');
    }

    return this.prisma.bookmark.update({
      where: {
        id: bookMarkId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteBookmarkById(userId: number, bookMarkId: number) {
    // Get the bookmark by id
    const bookmark = await this.prisma.bookmark.findUnique({
      where: {
        id: bookMarkId,
      },
    });

    // Check if user owns the bookmark
    if (!bookmark || bookmark.userId !== userId) {
      throw new ForbiddenException('Access To Resource Denied!');
    }

    await this.prisma.bookmark.delete({
      where: {
        id: bookMarkId,
      },
    });
  }
}
