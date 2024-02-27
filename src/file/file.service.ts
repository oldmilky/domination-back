import { Injectable } from '@nestjs/common';
import { FileResponse } from './file.interface';
import { ensureDir, writeFile } from 'fs-extra';
import { path } from 'app-root-path';
import { promises as fsPromises } from 'fs';

const { unlink, access, constants } = fsPromises;

@Injectable()
export class FilesService {
  async saveFiles(
    files: Express.Multer.File[],
    folder: string = 'default',
  ): Promise<FileResponse[]> {
    const uploadFolder = `${path}/uploads/${folder}`;
    await ensureDir(uploadFolder);
    const res: FileResponse[] = await Promise.all(
      files.map(async (file) => {
        await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);
        return {
          url: `/uploads/${folder}/${file.originalname}`,
          name: file.originalname,
        };
      }),
    );

    return res;
  }
  async deleteFile(filePath: string): Promise<void> {
    const fullPath = `${path}${filePath}`;
    try {
      // Проверка на существование файла
      await access(fullPath, constants.F_OK);
      await unlink(fullPath);
    } catch (error) {
      // Если файл не существует или произошла другая ошибка
      throw new Error(`Failed to delete file: ${error.message}`);
    }
  }
}
