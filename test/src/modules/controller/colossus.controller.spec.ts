import { Test, TestingModule } from '@nestjs/testing';
import { KnativeService } from 'src/infra/knative/knative.service';

import { ColossusController } from '../../../../src/modules/colossus/colossus.controller';
import { ColossusService } from '../../../../src/modules/colossus/colossus.service';
import { ColossusRepository } from '../../../../src/modules/colossus/repository/colossus.repository';
import { CommandService } from '../../../../src/utils/command/command.service';
import { Factory } from '../../../fixtures/Factory';

describe('ColossusController', () => {
  let controller: ColossusController;
  let colossusService: ColossusService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ColossusController],
      providers: [
        ColossusService,
        ColossusRepository,
        CommandService,
        KnativeService,
      ],
    }).compile();

    controller = module.get<ColossusController>(ColossusController);
    colossusService = module.get<ColossusService>(ColossusService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be create serverless function', async () => {
    const files = Factory.createFunctionFile();

    jest
      .spyOn(colossusService, 'createFunction')
      .mockResolvedValueOnce({ ok: true });

    const createFunctionDTO = Factory.createFunctionDTO();
    const result = await controller.createServerlessFunction(
      files,
      createFunctionDTO,
    );

    expect(result.ok).toBe(true);
  });
});
