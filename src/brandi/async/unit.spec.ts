import { asyncContainer, asyncContainerTokens } from "./asyncContainer";
import { AsyncRepo } from "./services/asynServices";

describe("Async tests:", () => {
  it("should make an async repo instance", (done) => {
    // act
    asyncContainer.get(asyncContainerTokens.asyncRepo).then(async (repo1) => {
      const repo2 = await asyncContainer.get(asyncContainerTokens.asyncRepo);
      // assert
      expect(repo1).toBeInstanceOf(AsyncRepo);
      expect(repo1.id).toBeDefined();
      expect(repo1.id).toBe(repo2.id);
      expect(repo1.client.initialized).toBeTruthy();
      expect(repo2.client.initialized).toBeTruthy();
      expect(repo1.id).toBe(repo2.id);
      expect(repo1.client.id).toBe(repo2.client.id);
      done();
    });
  });
});
