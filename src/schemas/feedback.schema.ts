import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReviewDocument = Review & Document;

@Schema()
export class ReviewProduct {
    @Prop()
    name: string; //"Баскет S 12 Острых Крыльев",
}

@Schema()
export class ReviewAnswer {
    @Prop()
    answer: string; //"Благодарим за отзыв! Мы обязательно проведем проверку и свяжемся с вами в ближайшее время.\n",

    @Prop()
    createdAt: Date; //"2022-09-30T09:01:08+0300",

    @Prop()
    publicUuid: string; //"46ec2872-4085-11ed-9a1f-168881b04291",

    @Prop()
    sourceId: string; //"chain",

    @Prop()
    statusId: string; //"published"
}

@Schema()
export class Review {
    @Prop({ type: () => [ReviewAnswer], default: [] })
    answers: ReviewAnswer[];

    @Prop()
    author: string;

    @Prop()
    body: string;

    @Prop()
    icon: string; // Emoji Enum?

    @Prop()
    orderHash: string;

    @Prop({ type: () => [ReviewAnswer], required: true })
    products: ReviewProduct[];

    @Prop()
    rated: Date; // Example "2022-09-29T16:14:49+0300" // d.m.Y H:i:s
}

export const ReviewSchema = SchemaFactory.createForClass(Review);