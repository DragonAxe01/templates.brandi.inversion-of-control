import { Logger } from "./logger";

/** An interface with multiple implementations. */
export interface IMyMultiImplService {
  connString: string;
  getSomething: () => number;
}

export class MyMultiImplServiceMock implements IMyMultiImplService {
  constructor(public connString: string, private _logger: Logger) {
    _logger.log(`Conn string: ${connString}`);
  }

  public getSomething = () => {
    this._logger.log("MyServiceMock running...");
    return 11;
  };
}

export class MyMultiImplServiceProd implements IMyMultiImplService {
  constructor(public connString: string, private _logger: Logger) {
    _logger.log(`Conn string: ${connString}`);
  }

  public getSomething = () => {
    this._logger.log("MyServiceProd running...");
    return 22;
  };
}
