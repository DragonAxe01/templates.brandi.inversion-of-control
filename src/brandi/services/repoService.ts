import { Logger } from "./logger";

/** A repo service that we will use as a dependency for other services. */
export class RepoService {
  private _logger: Logger;

  constructor(logger: Logger) {
    this._logger = logger;
  }

  public getData = () => {
    this._logger.log("getting mock data from repo...");
    return "hello from mock repo";
  };
}
