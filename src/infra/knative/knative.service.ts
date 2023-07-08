import { Inject, Injectable, Logger } from '@nestjs/common';
import { ServerlessClient } from 'src/domain/ServerlessClient';
import { InvokeFunctioDTO } from 'src/modules/colossus/dto/InvokeFunctionDTO';
import { CommandService } from 'src/utils/command/command.service';

type KnServiceLSResultType = {
  URL: string;
  NAME: string;
};

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

  async invoke(invokeFunctioDTO: InvokeFunctioDTO) {
    const { slug, method, body } = invokeFunctioDTO;
    const bashCommand = `kn service ls`;

    const { stdout } = await this.commandService.exec(bashCommand);

    const data =
      this.convertOutputToArrayOfObject<KnServiceLSResultType>(stdout);
    console.log(data);
    const functionUrl = data.find((item) => item.NAME === slug).URL;

    const request = {
      method,
      body,
    };

    const response = await fetch(functionUrl, {
      method: 'POST',
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  }

  private convertOutputToArrayOfObject<T>(stdout: string): T[] {
    const lines = stdout.trim().split('\n');
    const headers = lines[0].split(/\s+/);
    const data = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(/\s+/);
      const entry = {};

      for (let j = 0; j < headers.length; j++) {
        entry[headers[j]] = values[j];
      }

      data.push(entry);
    }

    return data;
  }
}
