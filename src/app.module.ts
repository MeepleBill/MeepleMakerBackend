import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { LobbyModule } from './lobby/lobby.module';


@Module({
  imports: [
    UserModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend'),
      
    }),
    LobbyModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
