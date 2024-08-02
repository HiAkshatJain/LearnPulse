import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import RenderSteps from "../../components/core/AddCourse/RenderSteps";

const AddCourse = () => {
  return (
    <div className="flex w-full items-start gap-x-8 p-12">
      <div className="flex flex-1 flex-col">
        <h1 className="mb-14 text-3xl font-medium text-richblack-5 font-boogaloo text-center lg:text-left">
          Add Course
        </h1>

        <div className="flex-1">
          <RenderSteps />
        </div>
      </div>

      <Card className="max-w-[400px]">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-md font-bold">⚡ Course Upload Tips</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <li>Set the Course Price option or make it free.</li>
          <li>Standard size for the course thumbnail is 1024x576.</li>
          <li>Video section controls the course overview video.</li>
          <li>Course Builder is where you create & organize a course.</li>
          <li>
            Add Topics in the Course Builder section to create lessons,quizzes,
            and assignments.
          </li>
          <li>
            Information from the Additional Data section shows up on thecourse
            single page.
          </li>
          <li>Make Announcements to notify any important</li>
          <li>Notes to all enrolled students at once.</li>
        </CardBody>
        <Divider />
      </Card>
    </div>
  );
};

export default AddCourse;
