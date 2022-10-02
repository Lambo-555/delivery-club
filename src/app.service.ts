import { parse } from 'node-html-parser';
import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Review, ReviewDocument } from './schemas/feedback.schema';
import { FilterReviewDto } from './dto/filter-review.dto';


@Injectable()
export class AppService {
  constructor(@InjectModel(Review.name) private reviewModel: Model<ReviewDocument>) { }

  getHello(): string {
    return 'Hello World!';
  }

  // TODO move CRUD to libs
  async create(createReview: Review): Promise<Review> {
    const createdReview = new this.reviewModel(createReview);
    return createdReview.save();
  }

  async findOne(id: mongoose.Types.ObjectId): Promise<Review> {
    return this.reviewModel.findOne(id).exec();
  }

  async findAll(filters: FilterReviewDto): Promise<Review[]> {
    // TODO apply filters to query
    return this.reviewModel.find().exec();
  }

  async updateOne(id: mongoose.Types.ObjectId): Promise<any> {
    // TODO update return type
    return this.reviewModel.updateOne(id).exec();
  }

  async deleteOne(id: mongoose.Types.ObjectId): Promise<Review[]> {
    // TODO apply try catch to all requests
    return this.reviewModel.remove(id).exec();
  }

  async parseReviews() {
    // TODO
    // check rated and hash fields
    // if "rated" is changed -> save new data into DB
    return true;
  }

  async getHtmlRoot() {
    // TODO if task will include html parsing mode
    const root = parse('<ul id="list"><li>Hello World</li></ul>');
    return root;
  }
}
