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
