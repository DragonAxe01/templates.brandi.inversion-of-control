import { Container, Factory, injected, token } from "brandi";
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
    this.bind(containerTokens.connString)
      .toInstance(() => {
        return getConnString();
      })
      .inSingletonScope();
  }
}

const getConnString = (): string => {
  // return "abc";
  const val = process.env.CONN_STRING_MOCK;
  if (typeof val === "undefined") {
    throw "Config value not defined.";
  }
  return val;
};
