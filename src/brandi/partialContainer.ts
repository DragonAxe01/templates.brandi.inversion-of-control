import { Container, injected, token } from "brandi";
import { MyPartialService } from "./services/partialService";

export const partialContainerTokens = {
  partialService: token<MyPartialService>("partialService"),
};

// we dont expose these tokens
const privateTokens = {
  conf: token<string>("token"),
};

/** A container where some of the DI configuration is unknown. */
export class MyPartialContainer extends Container {
  constructor(externalConf: string) {
    super();

    // injections
    injected(MyPartialService, privateTokens.conf);

    // conf
    this.bind(privateTokens.conf).toConstant(externalConf);

    // bindings
    this.bind(partialContainerTokens.partialService)
      .toInstance(MyPartialService)
      .inTransientScope();
  }
}
