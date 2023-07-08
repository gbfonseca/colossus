// eslint-disable-next-line @typescript-eslint/no-var-requires
const Clazz = require('./developer-code');

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
