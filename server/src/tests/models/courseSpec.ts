import {
  makeCourseStore,
  makeInstructorStore,
  makeUserStore,
} from "../../models";

const instructorStore = makeInstructorStore();
const userStore = makeUserStore();
const courseStore = makeCourseStore();

describe("Course model suite", () => {
  let instructor: { id: number; name: string };
  let testCourse: { id: number; name: string };

  beforeAll(async () => {
    const user = await userStore.createUser("test-instructor-course", "12345");
    instructor = await instructorStore.add({
      id: user.id,
      name: "Mr Instructor",
    });
  });

  it("Creates a course", async () => {
    testCourse = await courseStore.add({
      instructor_id: instructor.id,
      name: "Maths",
    });
    expect(testCourse.name).toBe("Maths");
  });

  it("Lists courses", async () => {
    const courses = await courseStore.index();
    expect(courses.length).toBeGreaterThanOrEqual(0);
  });

  it("Shows a course", async () => {
    const course = await courseStore.get(testCourse.id);
    expect(course.name).toBe("Maths");
  });

  it("Updates a course", async () => {
    const course = await courseStore.update({
      id: testCourse.id,
      name: "French",
    });
    expect(course.name).toBe("French");
  });

  it("Deletes a course", async () => {
    await courseStore.remove(testCourse.id);
  });
});
