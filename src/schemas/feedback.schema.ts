import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';


export type ReviewDocument = Review & Document;

@Schema()
export class ReviewProduct {
    @ApiProperty({
        description: 'Name of the product',
        example: 'Баскет S 12 Острых Крыльев',
        required: true,
        type: String,
    })
    @Prop({ type: String, required: true })
    name: string;
}

@Schema()
export class ReviewAnswer {
    @ApiProperty({
        example: 'Благодарим за отзыв! Мы обязательно проведем проверку и свяжемся с вами в ближайшее время.\n',
        required: true,
        type: String,
    })
    @Prop({ type: String, required: true })
    answer: string;

    @ApiProperty({
        example: '2022-09-30T09:01:08+0300',
        required: true,
        type: Date,
    })
    @Prop({ type: Date, required: true })
    createdAt: Date;

    @ApiProperty({
        example: '46ec2872-4085-11ed-9a1f-168881b04291',
        required: true,
        type: String,
    })
    @Prop({ type: String, required: true })
    publicUuid: string;

    @ApiProperty({
        example: 'chain',
        required: true,
        type: String,
    })
    @Prop({ type: String, required: true })
    sourceId: string;

    @ApiProperty({
        example: 'published',
        required: true,
        type: String,
    })
    @Prop({ type: String, required: true })
    statusId: string;
}

@Schema()
export class Review {
    @ApiProperty({
        required: true,
        type: [ReviewAnswer],
    })
    @Prop({ type: () => [ReviewAnswer], default: [] })
    answers: ReviewAnswer[];

    @ApiProperty({
        example: 'Евгений',
        required: true,
        type: String,
    })
    @Prop({ type: String, required: true })
    author: string;

    @ApiProperty({
        example: 'Вместо 12 крыльев привезли 9',
        required: true,
        type: String,
    })
    @Prop({ type: String, required: true })
    body: string;

    @ApiProperty({
        example: '😖', // 😊
        required: true,
        type: String,
    })
    @Prop({ type: String, required: true })
    icon: string; // Emoji Enum?

    @ApiProperty({
        example: '86bebbfe78495dc02511f492e78eaddffa06cbab',
        required: true,
        type: String,
    })
    @Prop({ type: String, required: true })
    orderHash: string;

    @ApiProperty({
        required: true,
        type: [ReviewProduct],
    })
    @Prop({ type: () => [ReviewAnswer], required: true })
    products: ReviewProduct[];

    @ApiProperty({
        example: '2022-09-29T16:14:49+0300',
        required: true,
        type: Date,
    })
    @Prop({ type: Date, required: true })
    rated: Date; // Example "2022-09-29T16:14:49+0300" // d.m.Y H:i:s
}

export const ReviewSchema = SchemaFactory.createForClass(Review);