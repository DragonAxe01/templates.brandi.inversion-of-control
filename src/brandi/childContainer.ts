import { Container } from "brandi";
import { mainContainer } from "./mainContainer";

export const container2Tokens = {
  // bindings for this particular container would be here
};

export const childContainer = new Container();
childContainer.extend(mainContainer);
// other bindings for this particular container would be here
