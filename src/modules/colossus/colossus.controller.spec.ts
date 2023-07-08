import { Test, TestingModule } from '@nestjs/testing';
import { ColossusController } from './colossus.controller';
import { ColossusService } from './colossus.service';
import { ColossusRepository } from './repository/ColossusRepository';
import { CommandService } from '../../utils/command/command.service';

describe('ColossusController', () => {
  let controller: ColossusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ColossusController],
      providers: [ColossusService, ColossusRepository, CommandService],
    }).compile();

    controller = module.get<ColossusController>(ColossusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
