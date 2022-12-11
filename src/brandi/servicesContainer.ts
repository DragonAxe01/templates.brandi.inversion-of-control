import { Container, injected, token } from "brandi";
import { connString } from "./config";
import {
  ApiServiceMock,
  CounterService,
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
  counterService: token<CounterService>("counterService"),
  connString: token<string>("connectionString"),
};

injected(RepoConnectorMock, containerTokens.logger);
injected(MyServiceMock, containerTokens.connString, containerTokens.logger);

export const servicesContainer = new Container();

servicesContainer.bind(containerTokens.connString).toConstant(connString);
// configs
servicesContainer.bind(containerTokens.connString).toConstant(connString);

// services
servicesContainer
  .bind(containerTokens.apiService)
  .toInstance(ApiServiceMock)
  .inSingletonScope();
servicesContainer
  .bind(containerTokens.logger)
  .toInstance(Logger)
  .inSingletonScope();
servicesContainer
  .bind(containerTokens.repoConnector)
  .toInstance(RepoConnectorMock)
  .inSingletonScope();
servicesContainer
  .bind(containerTokens.myService)
  .toInstance(MyServiceMock) // the mock implementation will be used
  .inTransientScope();
servicesContainer
  .bind(containerTokens.counterService)
  .toInstance(CounterService)
  .inSingletonScope();
