import {
  Controller,
  Inject,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ColossusService } from './colossus.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('colossus')
export class ColossusController {
  constructor(
    @Inject(ColossusService) private readonly colossusService: ColossusService,
  ) {}

  @Post('/file')
  @UseInterceptors(FileInterceptor('file'))
  async createServerlessFunction(@UploadedFile() file: Express.Multer.File) {
    return await this.colossusService.createFunction(file);
  }
}
