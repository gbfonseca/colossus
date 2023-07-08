import { Test, TestingModule } from '@nestjs/testing';
import { CommandService } from './command.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { exec } from 'child_process';

jest.doMock('child_process', () => ({
  exec: jest.fn().mockReturnValue({}),
}));

describe('CommandService', () => {
  let service: CommandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommandService],
    }).compile();

    service = module.get<CommandService>(CommandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return error if invalid command provided', async () => {
    const command = null;

    const promise = service.exec(command);

    expect(promise).rejects.toThrow('Comando provido é nulo ou inválido.');
  });

  it('should exec command', async () => {
    const command = 'ls -la';

    const result = await service.exec(command);

    expect(result).toBeTruthy();
  });
});
