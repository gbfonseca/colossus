import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import * as util from 'util';

const asyncExec = util.promisify(exec);
@Injectable()
export class CommandService {
  async exec(command: string): Promise<unknown> {
    if (!command || command === '')
      throw new Error('Comando provido é nulo ou inválido.');

    return await asyncExec(command);
  }
}
