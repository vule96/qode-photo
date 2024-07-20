import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TransformResultInterceptor } from '@qode-photo/back-common';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { CommentModule } from './modules/comment/comment.module';
import { PhotoModule } from './modules/photo/photo.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PhotoModule,
    CommentModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env`],
    }),
    ServeStaticModule.forRoot({
      rootPath: `${process.cwd()}/apps/server/uploads`,
      serveRoot: '/uploads/',
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResultInterceptor,
    },
  ],
})
export class AppModule {}
