import { makeStudentStore, makeUserStore } from "../../models";

const userStore = makeUserStore();
const studentStore = makeStudentStore();

describe("Student Model Suite", () => {
  let user: { id: number; username: string };
  beforeAll(async () => {
    user = await userStore.createUser("test-user", "12345");
  });

  it("Adds a student", async () => {
    const student = await studentStore.add({
      name: "Test student",
      id: user.id,
    });

    expect(student.id).toBe(user.id);
  });

  it("Lists students", async () => {
    const students = await studentStore.index();
    expect(students.length).toBeGreaterThanOrEqual(0);
  });

  it("Shows a student", async () => {
    const student = await studentStore.get(user.id);
    expect(student.name).toBe("Test student");
  });

  it("Updates a student", async () => {
    const newStudent = await studentStore.update({
      overallGrade: "C",
      name: "New name",
      id: user.id,
    });

    expect(newStudent.overallGrade).toBe("C");
  });

  it("Removes a student", async () => {
    await studentStore.remove(user.id);
  });
});
