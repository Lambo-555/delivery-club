import { ApiProperty } from '@nestjs/swagger';

export class ParseReviewDto {
    @ApiProperty({
        required: false,
        type: Number,
        default: 0,
    })
    limit: number;

    @ApiProperty({
        required: false,
        type: Number,
        default: 0,
    })
    chankSize: number;

    @ApiProperty({
        required: false,
        type: Number,
        default: 0,
    })
    offset: number;

    @ApiProperty({
        required: false,
        type: Number,
        default: 0,
    })
    chainId: number;
}