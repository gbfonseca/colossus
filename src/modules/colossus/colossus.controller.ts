import {
  Body,
  Controller,
  Inject,
  Logger,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { KnativeService } from 'src/infra/knative/knative.service';

import { ColossusService } from './colossus.service';
import { CreateFunctionDTO } from './dto/CreateFunctionDTO';
import { InvokeFunctioDTO } from './dto/InvokeFunctionDTO';

@Controller('colossus')
export class ColossusController {
  private readonly logger = new Logger(ColossusController.name);

  constructor(
    @Inject(ColossusService) private readonly colossusService: ColossusService,
    @Inject(KnativeService) private readonly knativeService: KnativeService,
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

  @Post('invoke')
  async invokeFunction(@Body() body: InvokeFunctioDTO) {
    return await this.knativeService.invoke(body);
  }
}
