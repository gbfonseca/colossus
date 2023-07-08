import { Inject, Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import { KnativeService } from 'src/infra/knative/knative.service';

import { CreateFunctionDTO } from '../dto/CreateFunctionDTO';

@Injectable()
export class ColossusRepository {
  private readonly logger = new Logger(ColossusRepository.name);

  constructor(
    @Inject(KnativeService) private readonly knativeService: KnativeService,
  ) {}

  async createFunction(
    file: Express.Multer.File,
    createFunctionDTO: CreateFunctionDTO,
  ): Promise<{ ok: boolean }> {
    const { originalname, buffer } = file;
    const { slug } = createFunctionDTO;
    const fileName = originalname.split('.')[0];
    const storagePath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'storage',
      slug,
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

    this.logger.debug(
      'Criando storage a apartir do template e movendo serverless function',
      { code },
    );

    await fs.mkdir(storagePath, { recursive: true });
    await fs.cp(templatePath, storagePath, { recursive: true });
    await fs.writeFile(filePath, code);

    await this.knativeService.createFunction(storagePath);

    this.logger.debug('Serverless function criada e deployada com sucesso!', {
      fileName,
      slug,
    });

    return {
      ok: true,
    };
  }
}
