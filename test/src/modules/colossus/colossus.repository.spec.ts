import { Test, TestingModule } from '@nestjs/testing';

import { ColossusRepository } from '../../../../src/modules/colossus/repository/colossus.repository';
import { CommandService } from '../../../../src/utils/command/command.service';
import { Factory } from '../../../fixtures/Factory';

describe('Colossus Repository Tests', () => {
  let colossusRepository: ColossusRepository;
  let commandService: CommandService;

  const file = Factory.createFunctionFile();
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ColossusRepository, CommandService],
      imports: [],
    }).compile();

    colossusRepository = module.get<ColossusRepository>(ColossusRepository);
    commandService = module.get<CommandService>(CommandService);
  });

  it('should create function', async () => {
    jest
      .spyOn(commandService, 'exec')
      .mockImplementationOnce(
        () => new Promise((resolve) => resolve({ stdout: '', stderr: '' })),
      );

    const createFunctionDTO = Factory.createFunctionDTO();
    const response = await colossusRepository.createFunction(
      file,
      createFunctionDTO,
    );

    expect(response.ok).toBe(true);
  });
});
