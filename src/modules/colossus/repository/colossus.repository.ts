import { Inject, Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';

import { CommandService } from '../../../utils/command/command.service';
import { CreateFunctionDTO } from '../dto/CreateFunctionDTO';

@Injectable()
export class ColossusRepository {
  private readonly logger = new Logger(ColossusRepository.name);

  constructor(
    @Inject(CommandService) private readonly commandService: CommandService,
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

    const command = `cd ${storagePath} && func deploy --registry gbfonseca`;

    this.logger.debug('Processando deploy para o Knative', { command });
    await this.commandService.exec(command);

    this.logger.debug('Serverless function criada e deployada com sucesso!', {
      fileName,
      slug,
    });

    return {
      ok: true,
    };
  }
}
