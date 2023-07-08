import { Module } from '@nestjs/common';

import { KnativeService } from './infra/knative/knative.service';
import { ColossusModule } from './modules/colossus/colossus.module';
import { CommandService } from './utils/command/command.service';

@Module({
  imports: [ColossusModule],
  controllers: [],
  providers: [CommandService, KnativeService],
})
export class AppModule {}
