import { Model } from 'mongoose';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Review, ReviewDocument } from './schemas/feedback.schema';
import { FilterReviewDto } from './dto/filter-review.dto';
import axios from 'axios';
import { ParseReviewDto } from './dto/parse-review.dto';

@Injectable()
export class AppService {

  constructor(@InjectModel(Review.name) private reviewModel: Model<ReviewDocument>) { }

  private logger = new Logger(AppService.name);

  async createOneOrUpdate(createReview: Review): Promise<Review> {
    try {
      const review = await this.reviewModel.findOne({
        orderHash: createReview.orderHash,
      }, { _id: 0, v: 0 });
      if (review) {
        if (review?.rated !== createReview?.rated) {
          await this.reviewModel.updateOne({
            orderHash: createReview.orderHash,
            createReview,
          });
        }
        return review;
      } else {
        return await this.reviewModel.create(createReview);
      }
    } catch (error) {
      this.logger.error(error);
    }
  }

  async findAll(filters: FilterReviewDto): Promise<Review[]> {
    try {
      const query: Review = {} as Review;
      if (filters.rating) query.icon = filters.rating;
      return this.reviewModel.find({
        rated: {
          $gte: new Date(filters?.dateStart || 0),
          $lte: new Date(filters?.dateEnd || Date.now()),
        },
        ...query,
      })
        .skip(filters?.limit || 0)
        .limit(filters?.limit || 0)
        .sort({ rated: filters?.sortByDate || 1 })
        .exec();
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Cant get reviews data');
    }
  }

  async parseReviews(parseReviewDto: ParseReviewDto): Promise<boolean> {
    try {
      // Если мы работаем с большим объемом данных, то мы можем упереться в лимиты по памяти
      // Нужно разбивать работу с отзывами на чанки и обрабатывать их в цикле отдельно
      // Если объем чанка будет выставлен на прием данных крупного размера 
      // То можно испрользовать стримы, в данном случае - Readble Stream. 
      const limit = parseReviewDto.limit || 10;
      const chankSize = parseReviewDto.chankSize || 10;
      const offset = parseReviewDto.offset || 0;
      const chainId = parseReviewDto.chainId || 48274;
      const cycleCount = Math.ceil(limit / chankSize);
      for (let i = 0; i < cycleCount; i++) {
        console.log({ i });
        const data = (await axios.get('https://api.delivery-club.ru/api1.2/reviews', {
          params: {
            chainId,
            limit: chankSize,
            offset: offset + chankSize * i,
            // cacheBreaker: 1664679021,
          }
        })).data;
        for (let j = 0; j < data.reviews.length; j++) {
          console.log({ j });
          const resultOfSave = await this.createOneOrUpdate(data.reviews[j]);
          console.log({ resultOfSave });
        }
      }
      return true;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Cant get reviews data');
    }
  }

}