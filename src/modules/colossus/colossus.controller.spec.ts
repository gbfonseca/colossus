import { Test, TestingModule } from '@nestjs/testing';
import { ColossusController } from './colossus.controller';
import { ColossusService } from './colossus.service';
import { ColossusRepository } from './repository/ColossusRepository';
import { CommandService } from '../../utils/command/command.service';
import { Readable } from 'stream';
import child_process from 'child_process';

jest.doMock('child_process');

describe('ColossusController', () => {
  let controller: ColossusController;
  let colossusService: ColossusService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ColossusController],
      providers: [ColossusService, ColossusRepository, CommandService],
    }).compile();

    controller = module.get<ColossusController>(ColossusController);
    colossusService = module.get<ColossusService>(ColossusService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be create serverless function', async () => {
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

    jest
      .spyOn(colossusService, 'createFunction')
      .mockResolvedValueOnce({ ok: true });

    const result = await controller.createServerlessFunction(file);

    expect(result.ok).toBe(true);
  });
});
