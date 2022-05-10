import {
  makeUserStore,
  makeInstructorStore,
  makeCourseStudentStore,
  makeCourseStore,
  makeStudentStore,
} from "../../models";

const userStore = makeUserStore();
const studentStore = makeStudentStore();
const instructorStore = makeInstructorStore();
const courseStudentStore = makeCourseStudentStore();
const courseStore = makeCourseStore();

describe("Course Student Model Suite", () => {
  let instructor: { id: number; name: string };
  let s1: { id: number; name: string };
  let course: { id: number; name: string; instructor_id: number };

  beforeAll(async () => {
    const instructorUser = await userStore.createUser(
      "course-student-instructor",
      "12345"
    );
    instructor = await instructorStore.add({
      name: "Mr Instructor",
      id: instructorUser.id,
    });

    const studnetUser = await userStore.createUser(
      "course-student-student",
      "12345"
    );
    s1 = await studentStore.add({ name: "Khaled", id: studnetUser.id });

    course = await courseStore.add({
      name: "Maths",
      instructor_id: instructor.id,
    });
  });

  it("Adds a student to a course", async () => {
    await courseStudentStore.add({ studentId: s1.id, courseId: course.id });
  });

  it("Updates a student grade", async () => {
    await courseStudentStore.updateGrade({
      studentId: s1.id,
      courseId: course.id,
      grade: "C",
    });
  });

  it("Removes a student from a course", async () => {
    await courseStudentStore.remove({ studentId: s1.id, courseId: course.id });
  });
});
