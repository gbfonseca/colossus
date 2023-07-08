import { Test, TestingModule } from '@nestjs/testing';
import { ColossusService } from './colossus.service';
import { Readable } from 'stream';
import { ColossusRepository } from './repository/ColossusRepository';
import { CommandService } from '../../utils/command/command.service';
describe('ColossusService', () => {
  let service: ColossusService;
  let colossusRepository: ColossusRepository;

  const file: Express.Multer.File = {
    filename: 'teste.js',
    buffer: Buffer.from(''),
    destination: '',
    fieldname: '',
    mimetype: '',
    originalname: 'teste',
    path: '/tmp/test.js',
    size: 120,
    encoding: '',
    stream: new Readable(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ColossusService, ColossusRepository, CommandService],
    }).compile();

    service = module.get<ColossusService>(ColossusService);
    colossusRepository = module.get<ColossusRepository>(ColossusRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return error if invalid file provided when try create function', async () => {
    const file = null;
    const promise = service.createFunction(file);

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

    const promise = service.createFunction(file);

    await expect(promise).rejects.toThrow('Houve um erro ao criar função.');
  });

  it('should create function', async () => {
    jest
      .spyOn(colossusRepository, 'createFunction')
      .mockResolvedValueOnce({ ok: true });

    const result = await service.createFunction(file);

    expect(result.ok).toBe(true);
  });
});
