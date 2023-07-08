import { Inject, Injectable, Logger } from '@nestjs/common';
import { ServerlessClient } from 'src/domain/ServerlessClient';
import { CommandService } from 'src/utils/command/command.service';

@Injectable()
export class KnativeService implements ServerlessClient {
  DEFAULT_REGISTRY = 'gbfonseca';
  private readonly logger = new Logger(KnativeService.name);

  constructor(
    @Inject(CommandService) private readonly commandService: CommandService,
  ) {}

  async createFunction(
    serverlessStoragePath: string,
  ): Promise<{ message: string }> {
    if (!serverlessStoragePath)
      throw new Error(
        'Path para o storage da função serverless é inválido ou nulo',
      );

    const command = `cd ${serverlessStoragePath} && func deploy --registry ${this.DEFAULT_REGISTRY}`;
    this.logger.debug('Processando deploy para o Knative', { command });

    await this.commandService.exec(command);

    return {
      message: 'Função serverless criada com sucesso!',
    };
  }
}
