import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { BlogModel } from './blog.model';
import { BlogController } from './blog.controller';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: BlogModel,
        schemaOptions: {
          collection: 'Blog',
        },
      },
    ]),
  ],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}