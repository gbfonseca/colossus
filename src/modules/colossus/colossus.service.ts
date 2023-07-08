import { Inject, Injectable } from '@nestjs/common';
import { ColossusRepository } from './repository/ColossusRepository';

@Injectable()
export class ColossusService {
  constructor(
    @Inject(ColossusRepository)
    private readonly colossusRepository: ColossusRepository,
  ) {}

  async createFunction(file: Express.Multer.File): Promise<{ ok: boolean }> {
    if (!file) throw new Error('Arquivo de função provido é inválido ou nulo');

    return await this.colossusRepository.createFunction(file);
  }
}
