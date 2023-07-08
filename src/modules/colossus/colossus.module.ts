import { Module } from '@nestjs/common';
import { ColossusService } from './colossus.service';
import { ColossusRepository } from './repository/ColossusRepository';
import { ColossusController } from './colossus.controller';
import { CommandService } from 'src/utils/command/command.service';

@Module({
  imports: [CommandService],
  providers: [ColossusService, ColossusRepository],
  controllers: [ColossusController],
})
export class ColossusModule {}
