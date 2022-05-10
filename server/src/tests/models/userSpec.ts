import { makeUserStore } from "../../models";

const userStore = makeUserStore();

describe("User model suite", () => {
  it("It creates a user", async () => {
    const user = await userStore.createUser("test-user", "12345");
    expect(user.username).toBe("test-user");
  });

  it("It gets a user", async () => {
    const user = await userStore.getUser("test-user");
    expect(user).toBeDefined();
  });
});
