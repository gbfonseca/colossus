import { Test, TestingModule } from '@nestjs/testing';
import { KnativeService } from 'src/infra/knative/knative.service';
import { CommandService } from 'src/utils/command/command.service';

import { ColossusRepository } from '../../../../../src/modules/colossus/repository/colossus.repository';
import { Factory } from '../../../../fixtures/Factory';

describe('Colossus Repository Tests', () => {
  let colossusRepository: ColossusRepository;
  let knativeService: KnativeService;

  const files = Factory.createFunctionFile();
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ColossusRepository, KnativeService, CommandService],
      imports: [],
    }).compile();

    colossusRepository = module.get<ColossusRepository>(ColossusRepository);
    knativeService = module.get<KnativeService>(KnativeService);
  });

  it('should create function', async () => {
    jest
      .spyOn(knativeService, 'createFunction')
      .mockImplementationOnce(
        () =>
          new Promise((resolve) => resolve({ message: 'Criado com sucesso' })),
      );

    const createFunctionDTO = Factory.createFunctionDTO();
    const response = await colossusRepository.createFunction(
      files,
      createFunctionDTO,
    );

    expect(response.ok).toBe(true);
  });
});
