export abstract class ServerlessClient {
  abstract createFunction(serverlessStoragePath: string): Promise<unknown>;
}
