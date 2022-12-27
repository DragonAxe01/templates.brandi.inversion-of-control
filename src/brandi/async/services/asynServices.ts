import { Guid } from "guid-typescript";

export class AsyncServFactory {
  public getAsyncServ = async (conf: string): Promise<AsyncClient> => {
    const serv = new AsyncClient(conf);
    await serv.init();
    return serv;
  };
}

export class AsyncClient {
  public initialized: boolean = false;

  constructor(public readonly id: string) {}

  public init = async () => {
    this.initialized = true;
  };
}

export class AsyncRepo {
  constructor(
    public readonly id: string,
    public readonly client: AsyncClient
  ) {}
}
