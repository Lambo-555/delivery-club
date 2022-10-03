import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { FilterReviewDto } from './dto/filter-review.dto';
import { ParseReviewDto } from './dto/parse-review.dto';
import { Review } from './schemas/feedback.schema';

@ApiTags('reviews')
@Controller('reviews')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @ApiOkResponse({ description: 'Files are found.', type: [Review] })
  @ApiInternalServerErrorResponse({ description: 'DB error.', type: Error })
  getReviews(@Body() filter: FilterReviewDto): Promise<Review[]> {
    return this.appService.findAll(filter);
  }

  @Post('parse')
  @ApiOkResponse({ description: 'Data parsed.', type: Boolean })
  @ApiInternalServerErrorResponse({ description: 'Data not parsed.', type: Error })
  parseReviews(@Body() parseReviewDto: ParseReviewDto): Promise<boolean> {
    return this.appService.parseReviews(parseReviewDto);
  }

}
