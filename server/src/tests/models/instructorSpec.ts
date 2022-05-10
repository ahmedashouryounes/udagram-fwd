import { makeInstructorStore, makeUserStore } from "../../models";

const userStore = makeUserStore();
const instructorStore = makeInstructorStore();

describe("Instructor Model Suite", () => {
  let user: { id: number; username: string };
  beforeAll(async () => {
    user = await userStore.createUser("test-instructor", "12345");
  });

  it("Adds an instructor", async () => {
    const instructor = await instructorStore.add({
      name: "Test instructor",
      id: user.id,
    });

    expect(instructor.id).toBe(user.id);
  });

  it("Lists instructors", async () => {
    const instructors = await instructorStore.index();
    expect(instructors.length).toBeGreaterThanOrEqual(0);
  });

  it("Shows an instructor", async () => {
    const instructor = await instructorStore.get(user.id);
    expect(instructor.name).toBe("Test instructor");
  });

  it("Updates an instructor", async () => {
    const newInstructor = await instructorStore.update({
      name: "New name",
      id: user.id,
    });

    expect(newInstructor.name).toBe("New name");
  });

  it("Removes an instructor", async () => {
    await instructorStore.remove(user.id);
  });
});
