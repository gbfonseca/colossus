import {
  Body,
  Controller,
  Inject,
  Logger,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import { ColossusService } from './colossus.service';
import { CreateFunctionDTO } from './dto/CreateFunctionDTO';

@Controller('colossus')
export class ColossusController {
  private readonly logger = new Logger(ColossusController.name);

  constructor(
    @Inject(ColossusService) private readonly colossusService: ColossusService,
  ) {}

  @Post('/file')
  @UseInterceptors(FilesInterceptor('file'))
  async createServerlessFunction(
    @UploadedFiles() file: Express.Multer.File[],
    @Body() body: CreateFunctionDTO,
  ) {
    this.logger.debug(
      'Processando request de criação de serverless function',
      file,
      body,
    );
    return await this.colossusService.createFunction(file, body);
  }
}
