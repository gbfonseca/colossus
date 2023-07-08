import { Module } from '@nestjs/common';
import { ColossusModule } from './modules/colossus/colossus.module';
import { CommandService } from './utils/command/command.service';

@Module({
  imports: [ColossusModule],
  controllers: [],
  providers: [CommandService],
})
export class AppModule {}
