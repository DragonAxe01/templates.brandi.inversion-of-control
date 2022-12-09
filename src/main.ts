import { ServicesContainer, containerTokens } from "./brandi/servicesContainer";

const main = () => {
  console.log("starting...");
  const container = new ServicesContainer();
  const serv = container.get(containerTokens.myService);
  console.log(`DATA RECEIVED: ${serv.getSomething()}`);
};

main();
