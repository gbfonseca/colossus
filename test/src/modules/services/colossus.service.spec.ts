import { Test, TestingModule } from '@nestjs/testing';
import { KnativeService } from 'src/infra/knative/knative.service';

import { ColossusService } from '../../../../src/modules/colossus/colossus.service';
import { ColossusRepository } from '../../../../src/modules/colossus/repository/colossus.repository';
import { CommandService } from '../../../../src/utils/command/command.service';
import { Factory } from '../../../fixtures/Factory';
describe('ColossusService', () => {
  let service: ColossusService;
  let colossusRepository: ColossusRepository;

  const files = Factory.createFunctionFile();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ColossusService,
        ColossusRepository,
        CommandService,
        KnativeService,
      ],
    }).compile();

    service = module.get<ColossusService>(ColossusService);
    colossusRepository = module.get<ColossusRepository>(ColossusRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return error if invalid file provided when try create function', async () => {
    const file = null;
    const createFunctionDTO = Factory.createFunctionDTO();
    const promise = service.createFunction(file, createFunctionDTO);

    await expect(promise).rejects.toThrow(
      'Arquivo de função provido é inválido ou nulo',
    );
  });

  it('should throws if colossus repository throws', async () => {
    jest
      .spyOn(colossusRepository, 'createFunction')
      .mockImplementationOnce(
        () =>
          new Promise((_, reject) =>
            reject(new Error('Houve um erro ao criar função.')),
          ),
      );
    const createFunctionDTO = Factory.createFunctionDTO();

    const promise = service.createFunction(files, createFunctionDTO);

    await expect(promise).rejects.toThrow('Houve um erro ao criar função.');
  });

  it('should create function', async () => {
    jest
      .spyOn(colossusRepository, 'createFunction')
      .mockResolvedValueOnce({ ok: true });
    const createFunctionDTO = Factory.createFunctionDTO();

    const result = await service.createFunction(files, createFunctionDTO);

    expect(result.ok).toBe(true);
  });
});
