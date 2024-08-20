import { CreateBlogDto } from './dto/create-blog.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { BlogModel } from './blog.model';
import { ModelType } from '@typegoose/typegoose/lib/types';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(BlogModel) private readonly blogModel: ModelType<BlogModel>,
  ) {}

  async getAll(searchTerm?: string) {
    let options = {};
    if (searchTerm)
      options = {
        $or: [
          {
            title: new RegExp(searchTerm, 'i'),
          },
          {
            titleEn: new RegExp(searchTerm, 'i'),
          },
        ],
      };
    return this.blogModel
      .find(options)
      .select('-updatedAt -__v')
      .sort({
        createdAt: 'desc',
      })
      .exec();
  }

  async bySlug(slug: string) {
    const doc = await this.blogModel.findOne({ slug }).exec();
    if (!doc) throw new NotFoundException('Cheat not found');
    return doc;
  }

  // Admin
  async byId(_id: string) {
    const doc = await this.blogModel.findById(_id);
    if (!doc) throw new NotFoundException('Cheat not found');

    return doc;
  }

  async create() {
    const defaultValue: CreateBlogDto = {
      title: '',
      titleEn: '',
      slug: '',
      subtitle: '',
      subtitleEn: '',
      seoTitle: '',
      seoTitleEn: '',
      desc: '',
      descEn: '',
      date: '',
      author: '',
      texts: [],
    };
    const blog = await this.blogModel.create(defaultValue);
    return blog._id;
  }

  async update(_id: string, dto: CreateBlogDto) {
    const updateDoc = await this.blogModel
      .findByIdAndUpdate(_id, dto, {
        new: true,
      })
      .exec();
    if (!updateDoc) throw new NotFoundException('blog not found');

    return updateDoc;
  }

  async delete(id: string) {
    const deleteDoc = this.blogModel.findByIdAndDelete(id).exec();
    if (!deleteDoc) throw new NotFoundException('blog not found');

    return deleteDoc;
  }
}
