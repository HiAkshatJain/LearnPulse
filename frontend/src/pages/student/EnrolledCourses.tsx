//@ts-nocheck
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../services/operations/profileAPI";
import { Card, CardHeader, Image } from "@nextui-org/react";

const EnrolledCourses = () => {
  const { token } = useSelector((state) => state.auth);

  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const getEnrolledCourses = async () => {
    try {
      const res = await getUserEnrolledCourses(token);
      setEnrolledCourses(res);
    } catch (error) {
      console.log("Could not fetch enrolled courses.");
    }
  };

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  if (enrolledCourses?.length == 0) {
    return (
      <p className="grid h-[50vh] w-full place-content-center text-center text-richblack-5 text-3xl">
        You have not enrolled in any course yet.
      </p>
    );
  }

  return (
    <div className="m-8">
      {enrolledCourses.map((course) => (
        <Card key={course._id} className="w-full mb-4">
          <CardHeader className="flex gap-3">
            <Image
              alt="course image"
              height={40}
              radius="sm"
              src={course.thumbnail}
              width={40}
            />
            <div className="flex flex-col">
              <p className="text-md">{course.courseName}</p>{" "}
              {/* Adjust according to your course object properties */}
              <p className="text-small text-default-500">
                {course.courseDescription}
              </p>{" "}
              {/* Adjust according to your course object properties */}
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default EnrolledCourses;
