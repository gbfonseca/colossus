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
    files: Express.Multer.File[],
    createFunctionDTO: CreateFunctionDTO,
  ): Promise<{ ok: boolean }> {
    const { slug } = createFunctionDTO;
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

    for (const file of files) {
      const { originalname, buffer } = file;
      const filePath = path.resolve(storagePath, originalname);

      const code = buffer.toString('utf-8');
      await fs.mkdir(storagePath, { recursive: true });
      await fs.cp(templatePath, storagePath, { recursive: true });
      await fs.writeFile(filePath, code);
    }

    this.logger.debug(
      'Criando storage a apartir do template e movendo serverless function',
      { slug },
    );

    await this.knativeService.createFunction(storagePath);

    this.logger.debug('Serverless function criada e deployada com sucesso!', {
      slug,
    });

    return {
      ok: true,
    };
  }
}
