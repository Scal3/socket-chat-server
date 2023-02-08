import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from '../events/events.module';
import config from '../../../config';

@Module({
  imports: [
    EventsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      envFilePath: `${process.cwd()}/env/${process.env['NODE_ENV']}.env`,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
