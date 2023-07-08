/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ColossusRepository } from './ColossusRepository';
import { Readable } from 'stream';
import { CommandService } from '../../../utils/command/command.service';

describe('Colossus Repository Tests', () => {
  let colossusRepository: ColossusRepository;
  let commandService: CommandService;

  const file: Express.Multer.File = {
    filename: 'teste.js',
    buffer: Buffer.from(`module.exports = class Serverless {
      async handler(req){
        console.log(">>>>>>>>>>>>>")
      return {message: 'coeeeee'}
      }
    }`),
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

    const response = await colossusRepository.createFunction(file);

    expect(response.ok).toBe(true);
  });
});
