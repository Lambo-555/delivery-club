import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Review, ReviewSchema } from './schemas/feedback.schema';

@Module({
  imports: [
    // TODO to config
    MongooseModule.forRoot('mongodb://mongodb:27017'),
    MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
