import { servicesContainer, containerTokens } from "./brandi/servicesContainer";

const main = () => {
  console.log("starting...");
  const container = new servicesContainer();
  const serv = container.get(containerTokens.myService);
  console.log(`DATA RECEIVED: ${serv.getSomething()}`);
};

main();
