import mongoose, { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Review, ReviewDocument } from './schemas/feedback.schema';
import { FilterReviewDto } from './dto/filter-review.dto';
import axios from 'axios';

@Injectable()
export class AppService {

  constructor(@InjectModel(Review.name) private reviewModel: Model<ReviewDocument>) { }

  private logger = new Logger(AppService.name);

  async createOne(createReview: Review): Promise<Review> {
    try {
      const createdReview = new this.reviewModel(createReview);
      return createdReview.save();
    } catch (error) {
      this.logger.log(error);
    }
  }

  async createMany(createReview: Review): Promise<Review> {
    try {
      const createdReview = new this.reviewModel(createReview);
      return createdReview.save();
    } catch (error) {
      this.logger.log(error);
    }
  }

  async findOne(id: mongoose.Types.ObjectId): Promise<Review> {
    try {
      return this.reviewModel.findOne(id).exec();
    } catch (error) {
      this.logger.log(error);
    }
  }

  async findAll(filters: FilterReviewDto): Promise<Review[]> {
    try {
      return this.reviewModel.find({
        rated: {
          $lte: filters?.dateTo || Date.now(),
          $gte: filters?.dateFrom || 0
        },
        icon: filters?.rating || null,
      })
        .skip(filters?.limit || 0)
        .limit(filters?.limit || 0)
        .exec();
    } catch (error) {
      this.logger.log(error);
    }
  }

  async updateOne(id: mongoose.Types.ObjectId): Promise<any> {
    try {
      return this.reviewModel.updateOne(id).exec();
    } catch (error) {
      this.logger.log(error);
    }

  }

  async parseReviews() {
    try {
      const reviewCount = 10;
      const chankSize = 5;
      const cycleCount = Math.ceil(reviewCount / chankSize);
      for (let i = 0; i < cycleCount; i++) {
      }
      const reviews = await axios.get('https://api.delivery-club.ru/api1.2/reviews', {
        params: {
          chainId: 48274, // MSK
          limit: 5,
          offset: 0,
          // cacheBreaker: 1664679021,
        }
      });
      return reviews.data;
      // TODO
      // check rated and hash fields
      // if "rated" is changed -> save new data into DB
    } catch (error) {
      this.logger.log(error);
    }
  }

}
