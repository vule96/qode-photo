import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, type Photo } from '@prisma/client';
import { getImageHash } from '@qode-photo/back-common';
import { PrismaService } from '@qode-photo/db';
import { PhotoType } from '@qode-photo/shared';
import { UserService } from '../user/user.service';

@Injectable()
export class PhotoService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private readonly configService: ConfigService
  ) {}

  async findPhoto(
    photoWhereUniqueInput: Prisma.PhotoWhereUniqueInput
  ): Promise<Photo | null> {
    return this.prisma.photo.findUnique({
      where: photoWhereUniqueInput,
    });
  }

  async getPhotos(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PhotoWhereUniqueInput;
    where?: Prisma.PhotoWhereInput;
    orderBy?: Prisma.PhotoOrderByWithRelationInput;
  }): Promise<Photo[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.photo.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async upload(files: Express.Multer.File[], userId: string) {
    const user = await this.userService.findUser({
      id: userId,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const host = this.configService.get('NEXT_PUBLIC_API_URL');

    const images = await Promise.all(
      files.map(async (item) => {
        const hash = await getImageHash(item.path);

        return {
          url: host + '/' + item.path.replace('apps/server/', ''),
          originalName: item.originalname,
          hash,
        } as PhotoType;
      })
    );

    const result = await this.prisma.photo.createMany({
      data: images.map((item) => ({
        ...item,
        userId,
      })),
    });

    return result;
  }
}
