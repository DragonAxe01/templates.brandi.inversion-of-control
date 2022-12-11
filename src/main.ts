import { mainContainer, containerTokens } from "./brandi/mainContainer";

const main = () => {
  console.log("starting...");
  const serv = mainContainer.get(containerTokens.myService);
  console.log(`DATA RECEIVED: ${serv.getSomething()}`);
};

main();
