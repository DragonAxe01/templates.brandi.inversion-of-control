import { ApiServiceMock, RepoConnectorMock } from "./services";
import { ServicesContainer, tokens } from "./servicesContainer";

describe("Dependency injection tests", () => {
  it("Makes a simple object", () => {
    // prepare
    const container = new ServicesContainer();

    // run
    const serv = container.get(tokens.apiService);
    const res = serv.get();

    // expect
    expect(serv).toBeInstanceOf(ApiServiceMock);
    expect(res).toBe("hello from api service");
  });

  it("Makes an object with injected dependencies", () => {
    // prepare
    const container = new ServicesContainer();

    // run
    const serv = container.get(tokens.repoConnector);
    const res = serv.getData();

    // assert
    expect(serv).toBeInstanceOf(RepoConnectorMock);
    expect(res).toBe("hello from mock repo");
  });
});

export {};
