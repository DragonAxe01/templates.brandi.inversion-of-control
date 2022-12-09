import { Container, injected, token } from "brandi";
import { ApiServiceMock, Logger, RepoConnectorMock } from "./services";

export const tokens = {
  apiService: token<ApiServiceMock>("apiService"),
  logger: token<Logger>("logger"),
  repoConnector: token<RepoConnectorMock>("repoConnectorMock"),
};

injected(RepoConnectorMock, tokens.logger);

export class ServicesContainer extends Container {
  constructor() {
    super();
    this.bind(tokens.apiService).toInstance(ApiServiceMock).inSingletonScope();
    this.bind(tokens.logger).toInstance(Logger).inSingletonScope();
    this.bind(tokens.repoConnector)
      .toInstance(RepoConnectorMock)
      .inSingletonScope();
  }
}
