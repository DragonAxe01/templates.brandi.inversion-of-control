import { childContainer } from "./childContainer";
import { mainContainer, containerTokens } from "./mainContainer";
import { MyPartialContainer, partialContainerTokens } from "./partialContainer";
import { ApiService } from "./services/apiService";
import { MyMultiImplServiceMock } from "./services/multiImplementationsService";
import { RepoService } from "./services/repoService";

describe("Dependency injection tests", () => {
  it("Makes a simple object", () => {
    // run
    const serv = mainContainer.get(containerTokens.apiService);
    const res = serv.get();

    // expect
    expect(serv).toBeInstanceOf(ApiService);
    expect(res).toBe("hello from api service");
  });

  it("Makes an object with injected dependencies", () => {
    // run
    const serv = mainContainer.get(containerTokens.repoConnector);
    const res = serv.getData();

    // assert
    expect(serv).toBeInstanceOf(RepoService);
    expect(res).toBe("hello from mock repo");
  });

  it("Makes an object from interface", () => {
    // run
    const serv = mainContainer.get(containerTokens.myService);
    const res = serv.getSomething();

    // assert
    expect(serv.connString).toBe("aaa"); // see .env file
    expect(serv).toBeInstanceOf(MyMultiImplServiceMock);
    expect(res).toBe(11);
  });

  it("Has singleton instance accross many containers", () => {
    // prepare
    const serv1 = mainContainer.get(containerTokens.counterService);
    const serv2 = childContainer.get(containerTokens.counterService);

    // run
    serv1.increment();
    const value1 = serv1.getValue();
    const value2 = serv2.getValue();

    // assert
    expect(value1).toBe(1);
    expect(value1).toBe(value2);
  });

  it("Make an instance using a partial container configuration", () => {
    // prepare
    const mockConfig = "__mock__";
    const cont = new MyPartialContainer(mockConfig);

    // run
    const serv = cont.get(partialContainerTokens.partialService);

    // assert
    expect(serv.conf).toBe(mockConfig);
  });
});

export {};
