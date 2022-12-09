import { Container, injected, token } from "brandi";
import { ApiServiceMock, Logger, RepoConnectorMock } from "./services";

export const containerTokens = {
  apiService: token<ApiServiceMock>("apiService"), // the string is a unique id, no need to match it with code
  logger: token<Logger>("logger"),
  repoConnector: token<RepoConnectorMock>("repoConnector"),
};

injected(RepoConnectorMock, containerTokens.logger);

export class ServicesContainer extends Container {
  constructor() {
    super();
    this.bind(containerTokens.apiService)
      .toInstance(ApiServiceMock)
      .inSingletonScope();
    this.bind(containerTokens.logger).toInstance(Logger).inSingletonScope();
    this.bind(containerTokens.repoConnector)
      .toInstance(RepoConnectorMock)
      .inSingletonScope();
  }
}
