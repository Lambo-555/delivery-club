import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

export class FilterReviewDto {
    @ApiProperty({
        description: 'Emoji rating (bad or good review)',
        example: '😖',
        required: false,
        type: String,
    })
    rating: string; // icon?

    @ApiProperty({
        required: false,
        type: Date,
    })
    dateStart: Date;

    @ApiProperty({
        required: false,
        type: Date,
    })
    dateEnd: Date;

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

    @ApiProperty({
        required: false,
        type: Number,
    })
    sortByDate: 1 | -1;
}