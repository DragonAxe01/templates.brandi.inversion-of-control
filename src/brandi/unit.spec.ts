import { ApiServiceMock, MyServiceMock, RepoConnectorMock } from "./services";
import { servicesContainer, containerTokens } from "./servicesContainer";
import { servicesContainer2 } from "./servicesContainer2";

describe("Dependency injection tests", () => {
  it("Makes a simple object", () => {
    // run
    const serv = servicesContainer.get(containerTokens.apiService);
    const res = serv.get();

    // expect
    expect(serv).toBeInstanceOf(ApiServiceMock);
    expect(res).toBe("hello from api service");
  });

  it("Makes an object with injected dependencies", () => {
    // run
    const serv = servicesContainer.get(containerTokens.repoConnector);
    const res = serv.getData();

    // assert
    expect(serv).toBeInstanceOf(RepoConnectorMock);
    expect(res).toBe("hello from mock repo");
  });

  it("Makes an object from interface", () => {
    // run
    const serv = servicesContainer.get(containerTokens.myService);
    const res = serv.getSomething();

    // assert
    expect(serv.connString).toBe("abc"); // see .env file
    expect(serv).toBeInstanceOf(MyServiceMock);
    expect(res).toBe(11);
  });

  it("Has singleton instance accross many containers", () => {
    // prepare
    const serv1 = servicesContainer.get(containerTokens.counterService);
    const serv2 = servicesContainer2.get(containerTokens.counterService);

    // run
    serv1.increment();
    const value1 = serv1.getValue();
    const value2 = serv2.getValue();

    // assert
    expect(value1).toBe(1);
    expect(value1).toBe(value2);
  });
});

export {};
