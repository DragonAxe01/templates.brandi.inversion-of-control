import { Container, token } from "brandi";
import { servicesContainer } from "./servicesContainer";

export const container2Tokens = {
  // bindings for this particular container would be here
};

export const servicesContainer2 = new Container();
servicesContainer2.extend(servicesContainer);
// bindings for this particular container would be here
