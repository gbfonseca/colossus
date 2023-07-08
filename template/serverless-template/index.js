/* eslint-disable @typescript-eslint/no-var-requires */
const Clazz = require('./main');
require('dotenv').config();

const handle = async (context, body) => {
  context.log.info('query', context.query);
  context.log.info('body', body);
  const { method } = body;
  const clazz = new Clazz();

  if (context.method !== 'POST') {
    throw new Error('Method not Allowed');
  }
  const response = await clazz[method]();

  context.log.info({ response });
  return response;
};

module.exports = { handle };
