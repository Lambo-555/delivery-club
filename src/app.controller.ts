import { Body, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { FilterReviewDto } from './dto/filter-review.dto';
import { Review } from './schemas/feedback.schema';

@Controller('reviews')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getReviews(@Body() filter: FilterReviewDto): Promise<Review[]> {
    return this.appService.findAll(filter);
  }

}
