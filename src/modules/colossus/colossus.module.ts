import { Module } from '@nestjs/common';
import { KnativeService } from 'src/infra/knative/knative.service';
import { CommandService } from 'src/utils/command/command.service';

import { ColossusController } from './colossus.controller';
import { ColossusService } from './colossus.service';
import { ColossusRepository } from './repository/colossus.repository';

@Module({
  imports: [],
  providers: [
    ColossusService,
    ColossusRepository,
    CommandService,
    KnativeService,
  ],
  controllers: [ColossusController],
})
export class ColossusModule {}
