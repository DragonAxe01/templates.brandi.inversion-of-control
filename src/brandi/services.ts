export class Logger {
  public log = (message: string) => {
    console.log(`LOGGER: ${message}`);
  };
}

export class ApiServiceMock {
  constructor() {
    //
  }

  public get = () => {
    return "hello from api service";
  };
}

export class RepoConnectorMock {
  private _logger: Logger;

  constructor(logger: Logger) {
    this._logger = logger;
  }

  public getData = () => {
    this._logger.log("getting mock data from repo...");
    return "hello from mock repo";
  };
}

export interface IMyService {
  connString: string;
  getSomething: () => number;
}

export class MyServiceMock implements IMyService {
  constructor(public connString: string, private _logger: Logger) {
    _logger.log(`Conn string: ${connString}`);
  }

  public getSomething = () => {
    this._logger.log("MyServiceMock running...");
    return 11;
  };
}

export class MyServiceProd implements IMyService {
  constructor(public connString: string, private _logger: Logger) {
    _logger.log(`Conn string: ${connString}`);
  }

  public getSomething = () => {
    this._logger.log("MyServiceProd running...");
    return 22;
  };
}
