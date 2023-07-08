import { Inject, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs/promises';

import { CommandService } from '../../../utils/command/command.service';

@Injectable()
export class ColossusRepository {
  constructor(
    @Inject(CommandService) private readonly commandService: CommandService,
  ) {}

  async createFunction(file: Express.Multer.File): Promise<{ ok: boolean }> {
    const { originalname, buffer } = file;
    const fileName = originalname.split('.')[0];
    const storagePath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'storage',
      fileName,
    );
    const templatePath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'template',
      'serverless-template',
    );
    const filePath = path.resolve(storagePath, 'developer-code.js');

    const code = buffer.toString('utf-8');
    await fs.mkdir(storagePath, { recursive: true });
    await fs.cp(templatePath, storagePath, { recursive: true });
    await fs.writeFile(filePath, code);

    await this.commandService.exec(
      `cd ${storagePath} && func deploy --registry gbfonseca`,
    );

    return {
      ok: true,
    };
  }
}
