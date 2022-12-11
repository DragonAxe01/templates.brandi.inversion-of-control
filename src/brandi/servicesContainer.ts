import { Container, injected, token } from "brandi";
import { connString } from "./config";
import {
  ApiServiceMock,
  IMyService,
  Logger,
  MyServiceMock,
  RepoConnectorMock,
} from "./services";

export const containerTokens = {
  apiService: token<ApiServiceMock>("apiService"), // the string is a unique id, no need to match it with code
  logger: token<Logger>("logger"),
  repoConnector: token<RepoConnectorMock>("repoConnector"),
  myService: token<IMyService>("repoConnector"),
  connString: token<string>("connectionString"),
};

injected(RepoConnectorMock, containerTokens.logger);
injected(MyServiceMock, containerTokens.connString, containerTokens.logger);

export class ServicesContainer extends Container {
  constructor() {
    super();
    // configs
    this.bind(containerTokens.connString).toConstant(connString);

    // services
    this.bind(containerTokens.apiService)
      .toInstance(ApiServiceMock)
      .inSingletonScope();
    this.bind(containerTokens.logger).toInstance(Logger).inSingletonScope();
    this.bind(containerTokens.repoConnector)
      .toInstance(RepoConnectorMock)
      .inSingletonScope();
    this.bind(containerTokens.myService)
      .toInstance(MyServiceMock) // the mock implementation will be used
      .inTransientScope();
  }
}
