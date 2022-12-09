import { ApiServiceMock, MyServiceMock, RepoConnectorMock } from "./services";
import { ServicesContainer, containerTokens } from "./servicesContainer";

describe("Dependency injection tests", () => {
  it("Makes a simple object", () => {
    // prepare
    const container = new ServicesContainer();

    // run
    const serv = container.get(containerTokens.apiService);
    const res = serv.get();

    // expect
    expect(serv).toBeInstanceOf(ApiServiceMock);
    expect(res).toBe("hello from api service");
  });

  it("Makes an object with injected dependencies", () => {
    // prepare
    const container = new ServicesContainer();

    // run
    const serv = container.get(containerTokens.repoConnector);
    const res = serv.getData();

    // assert
    expect(serv).toBeInstanceOf(RepoConnectorMock);
    expect(res).toBe("hello from mock repo");
  });

  it("Makes an object from interface", () => {
    // prepare
    const container = new ServicesContainer();

    // run
    const serv = container.get(containerTokens.myService);
    const res = serv.getSomething();

    // assert
    expect(serv.connString).toBe("abc"); // see .env file
    expect(serv).toBeInstanceOf(MyServiceMock);
    expect(res).toBe(11);
  });
});

export {};
