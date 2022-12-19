import { AsyncFactory, Container, Factory, injected, token } from "brandi";
import { connString, partialConf } from "./configs";
import { MyPartialContainer } from "./partialContainer";
import { ApiService } from "./services/apiService";
import {
  AsyncServ,
  AsyncServFactory,
  AsyncServParent,
} from "./services/asynServ";
import { CounterService } from "./services/counterService";
import { Logger } from "./services/logger";
import {
  IMyMultiImplService,
  MyMultiImplServiceMock,
} from "./services/multiImplementationsService";
import { RepoService } from "./services/repoService";

export const containerTokens = {
  apiService: token<ApiService>("apiService"), // the string is a unique id, no need to match it with code
  logger: token<Logger>("logger"),
  repoConnector: token<RepoService>("repoConnector"),
  myService: token<IMyMultiImplService>("repoConnector"),
  counterService: token<CounterService>("counterService"),
  asyncServProm: token<Promise<AsyncServ>>("asyncServ"),
  AsyncServParentProm: token<Promise<AsyncServParent>>("asyncServParent"),
};

// we dont want to expose these tokens
const privateTokens = {
  connString: token<string>("connectionString"),
};

injected(RepoService, containerTokens.logger);
injected(
  MyMultiImplServiceMock,
  privateTokens.connString,
  containerTokens.logger
);

/** The main container "knows" everything about how to kickstart the whole app. */
class MainContainer extends Container {
  constructor() {
    super();
    const partialContainer = new MyPartialContainer(partialConf);
    this.extend(partialContainer);

    // configs
    this.bind(privateTokens.connString).toConstant(connString);

    // services
    this.bind(containerTokens.apiService)
      .toInstance(ApiService)
      .inSingletonScope();
    this.bind(containerTokens.logger).toInstance(Logger).inSingletonScope();
    this.bind(containerTokens.repoConnector)
      .toInstance(RepoService)
      .inSingletonScope();
    this.bind(containerTokens.myService)
      .toInstance(MyMultiImplServiceMock) // the mock implementation will be used
      .inTransientScope();
    this.bind(containerTokens.counterService)
      .toInstance(CounterService)
      .inSingletonScope();
    // async
    this.bind(containerTokens.asyncServProm)
      .toInstance(async () => {
        const res = await new AsyncServFactory().getAsyncServ("_");
        return res;
      })
      .inSingletonScope();
    this.bind(containerTokens.AsyncServParentProm)
      .toInstance(async () => {
        const asyncServ = await this.get(containerTokens.asyncServProm);
        await asyncServ.init();
        return new AsyncServParent(asyncServ);
      })
      .inSingletonScope();
  }
}

export const mainContainer = new MainContainer();
