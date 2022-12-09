import { ServicesContainer, tokens } from "./brandi/servicesContainer";

const main = () => {
  console.log("starting...");
  const container = new ServicesContainer();
  const repo = container.get(tokens.repoConnector);
  console.log(`DATA RECEIVED: ${repo.getData()}`);
};

main();
