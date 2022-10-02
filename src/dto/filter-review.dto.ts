import { ApiProperty } from '@nestjs/swagger';

export class FilterReviewDto {
    @ApiProperty({
        description: 'Emoji rating (bad or good review)',
        example: '😖',
        required: false,
        type: String,
    })
    rating: number; // icon?

    @ApiProperty({
        required: false,
        type: Date,
    })
    dateFrom: Date;

    @ApiProperty({
        required: false,
        type: Date,
    })
    dateTo: Date;

    @ApiProperty({
        required: false,
        type: Number,
    })
    limit: number;

    @ApiProperty({
        required: false,
        type: Number,
    })
    offset: number;
}