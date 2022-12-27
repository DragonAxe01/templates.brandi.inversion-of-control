import { AsyncFactory, Container, Factory, injected, token } from "brandi";
import { Guid } from "guid-typescript";
import { AsyncClient, AsyncRepo } from "./services/asynServices";

export const asyncContainerTokens = {
  asyncRepo: token<Promise<AsyncRepo>>("asyncRepo"),
  asyncClient: token<Promise<AsyncClient>>("asyncClient"),
};

/** The main container "knows" everything about how to kickstart the whole app. */
class AsyncContainer extends Container {
  constructor() {
    super();

    this.bind(asyncContainerTokens.asyncClient)
      .toInstance(async () => {
        const id = Guid.create().toString();
        const client = new AsyncClient(id);
        await client.init();
        return client;
      })
      .inSingletonScope();
    this.bind(asyncContainerTokens.asyncRepo)
      .toInstance(async () => {
        const client = await this.get(asyncContainerTokens.asyncClient);
        const id = Guid.create().toString();
        const repo = new AsyncRepo(id, client);
        return repo;
      })
      .inSingletonScope();
  }
}

export const asyncContainer = new AsyncContainer();
