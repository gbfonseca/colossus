import { Inject, Injectable } from '@nestjs/common';

import { CreateFunctionDTO } from './dto/CreateFunctionDTO';
import { ColossusRepository } from './repository/colossus.repository';

@Injectable()
export class ColossusService {
  constructor(
    @Inject(ColossusRepository)
    private readonly colossusRepository: ColossusRepository,
  ) {}

  async createFunction(
    file: Express.Multer.File,
    createFunctionDTO: CreateFunctionDTO,
  ): Promise<{ ok: boolean }> {
    if (!file) throw new Error('Arquivo de função provido é inválido ou nulo');

    return await this.colossusRepository.createFunction(
      file,
      createFunctionDTO,
    );
  }
}
