import { ServicesContainer, containerTokens } from "./brandi/servicesContainer";

const main = () => {
  console.log("starting...");
  const container = new ServicesContainer();
  const repo = container.get(containerTokens.repoConnector);
  console.log(`DATA RECEIVED: ${repo.getData()}`);
};

main();
