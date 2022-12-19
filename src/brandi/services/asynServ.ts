export class AsyncServFactory {
  public getAsyncServ = async (conf: string): Promise<AsyncServ> => {
    const serv = new AsyncServ(conf);
    await serv.init();
    return serv;
  };
}

export class AsyncServ {
  public initialized: boolean = false;

  constructor(public readonly value: string) {}

  public init = async () => {
    this.initialized = true;
  };
}

export class AsyncServParent {
  constructor(public readonly child: AsyncServ) {}
}
