import { Readable } from 'stream';

import { CreateFunctionDTO } from '../../src/modules/colossus/dto/CreateFunctionDTO';
import { InvokeFunctioDTO } from '../../src/modules/colossus/dto/InvokeFunctionDTO';

export class Factory {
  static createFunctionDTO(): CreateFunctionDTO {
    return {
      slug: 'miniapp-zoro',
    };
  }

  static createFunctionFile(): Express.Multer.File[] {
    return [
      {
        filename: 'teste.js',
        buffer: Buffer.from(''),
        destination: '',
        fieldname: '',
        mimetype: '',
        originalname: 'teste',
        path: '/tmp/test.js',
        size: 120,
        encoding: '',
        stream: new Readable(),
      },
    ];
  }

  static createInvokeFunctionDTO(): InvokeFunctioDTO {
    return {
      body: {},
      method: 'handler',
      slug: 'miniapp-zoro',
    };
  }
}
