import { Test, TestingModule } from '@nestjs/testing';
import { CommandService } from 'src/utils/command/command.service';

import { KnativeService } from '../../../../src/infra/knative/knative.service';

describe('KnativeService', () => {
  let service: KnativeService;
  let commandService: CommandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KnativeService, CommandService],
    }).compile();

    service = module.get<KnativeService>(KnativeService);
    commandService = module.get<CommandService>(CommandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw if command service throws', async () => {
    const fakeServerlessStoragePath = '/tmp/not-exists';

    jest
      .spyOn(commandService, 'exec')
      .mockImplementationOnce(() =>
        Promise.reject(new Error('Houve um erro inesperado')),
      );

    const promise = service.createFunction(fakeServerlessStoragePath);
    await expect(promise).rejects.toThrow('Houve um erro inesperado');
  });

  it('should return error if invalid fakeServerlessStoragePath', async () => {
    const fakeServerlessStoragePath = null;

    const promise = service.createFunction(fakeServerlessStoragePath);
    await expect(promise).rejects.toThrow(
      'Path para o storage da função serverless é inválido ou nulo',
    );
  });

  it('should create function', async () => {
    const fakeServerlessStoragePath = '/tmp/not-exists';

    jest.spyOn(commandService, 'exec').mockResolvedValueOnce({
      stderr: '',
      stdout: 'Criado com sucesso...',
    });

    const result = await service.createFunction(fakeServerlessStoragePath);
    expect(result).toBeTruthy();
    expect(result.message).toBe('Função serverless criada com sucesso!');
  });
});
