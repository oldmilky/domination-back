import {
  Controller,
  Delete,
  HttpCode,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './file.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileResponse } from './file.interface';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @HttpCode(200)
  @Auth('admin')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Query('folder') folder?: string,
  ): Promise<FileResponse[]> {
    return this.filesService.saveFiles([file], folder);
  }

  @Delete(':folder/:filename')
  @HttpCode(204)
  @Auth('admin')
  async deleteFile(
    @Param('folder') folder: string,
    @Param('filename') filename: string,
  ): Promise<void> {
    const filePath = `/uploads/${folder}/${filename}`;
    try {
      await this.filesService.deleteFile(filePath);
    } catch (error) {
      if (error.message.includes('no such file or directory')) {
        throw new NotFoundException('File not found');
      } else {
        throw new InternalServerErrorException('Failed to delete the file');
      }
    }
  }
}
