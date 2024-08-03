//@ts-nocheck
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../services/operations/courseDetailsAPI";
import { COURSE_STATUS } from "../../../../types/constants";
import { setCourse, setStep } from "../../../../slices/courseSlice";
import toast from "react-hot-toast";
import {
  Button,
  Card,
  CardBody,
  Divider,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import ChipInput from "./ChipInput";
import Upload from "./Upload";
import RequirementsField from "./RequirementsField";

const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch(); //@ts-ignore
  const { token } = useSelector((state) => state.auth); //@ts-ignore
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const categories: any = await fetchCourseCategories();
      if (categories.length > 0) {
        setCourseCategories(categories);
      }
      setLoading(false);
    };

    if (editCourse) {
      // console.log("editCourse ", editCourse)
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
    }

    getCategories();
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();
    // console.log("changes after editing form values:", currentValues)
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseRequirements.toString() !==
        course.instructions.toString() ||
      currentValues.courseImage !== course.thumbnail
    ) {
      return true;
    }
    return false;
  };

  const onSubmit = async (data: any) => {
    if (editCourse) {
      // const currentValues = getValues()
      // console.log("changes after editing form values:", currentValues)
      // console.log("now course:", course)
      // console.log("Has Form Changed:", isFormUpdated())
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();
        // console.log('data -> ',data)
        formData.append("courseId", course._id);
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle);
        }
        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc);
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice);
        }
        if (currentValues.courseTags.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.courseTags));
          // formData.append("tag", data.courseTags)
        }
        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits);
        }
        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory);
        }
        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          );
        }
        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage);
        }

        // send data to backend
        setLoading(true);
        const result = await editCourseDetails(formData, token);
        setLoading(false);
        if (result) {
          dispatch(setStep(2));
          dispatch(setCourse(result));
        }
      } else {
        toast.error("No changes made to the form");
      }
      return;
    }

    // user has visted first time to step 1
    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    formData.append("tag", JSON.stringify(data.courseTags));
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("category", data.courseCategory);
    formData.append("status", COURSE_STATUS.DRAFT);
    formData.append("instructions", JSON.stringify(data.courseRequirements));
    formData.append("thumbnailImage", data.courseImage);
    setLoading(true);
    const result = await addCourseDetails(formData, token);
    if (result) {
      dispatch(setStep(2));
      dispatch(setCourse(result));
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-5">
      {/* Course Title */}
      <Card className="w-full mb-4">
        <CardBody>
          <h1>
            Course Title <sup className="text-pink-200">*</sup>
          </h1>
        </CardBody>
        <Divider />
        <CardBody>
          <div className="w-full flex flex-row flex-wrap gap-4">
            <Input
              id="courseTitle"
              placeholder="Enter Course Title"
              {...register("courseTitle", { required: true })}
              className="w-full"
            />
          </div>
        </CardBody>
        <Divider />
      </Card>

      {/* Course Short Description  */}
      <Card className="w-full mb-4">
        <CardBody>
          <h1>
            Course Short Description<sup className="text-pink-200">*</sup>
          </h1>
        </CardBody>
        <Divider />
        <CardBody className="w-full">
          <Textarea
            size="lg"
            id="courseShortDesc"
            placeholder="Enter Description"
            {...register("courseShortDesc", { required: true })}
          />
        </CardBody>
        <Divider />
      </Card>

      {/* course price  */}
      <Card className="w-full mb-4">
        <CardBody>
          <h1>
            Course Price<sup className="text-pink-200">*</sup>
          </h1>
        </CardBody>
        <Divider />
        <CardBody>
          <div className="w-full flex flex-row flex-wrap gap-4">
            <Input
              id="coursePrice"
              placeholder="Enter Course Price"
              {...register("coursePrice", {
                required: true,
                valueAsNumber: true, //@ts-ignore
                pattern: {
                  value: /^(0|[1-9]\d*)(\.\d+)?$/,
                },
              })}
              className="w-full ml-10"
            />
            <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400 ml-2" />
          </div>
        </CardBody>
        <Divider />
      </Card>

      {/* course category */}
      <Card className="w-full mb-4">
        <CardBody>
          <h1>
            Course Catagory<sup className="text-pink-200">*</sup>
          </h1>
        </CardBody>
        <Divider />
        <CardBody>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Select
              items={courseCategories}
              {...register("courseCategory", { required: true })}
              //@ts-ignore
              defaultValue=""
              id="courseCategory"
            >
              {(courseCategories) => (
                //@ts-ignore
                <SelectItem key={courseCategories._id}>
                  {courseCategories.name}
                </SelectItem>
              )}
            </Select>
          </div>
        </CardBody>
        <Divider />
      </Card>

      {/* Tags */}
      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press Enter or Comma"
        register={register}
        errors={errors}
        setValue={setValue}
      />

      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />

      {/* Course Benifit Description  */}
      <Card className="w-full mb-4">
        <CardBody>
          <h1>
            Course Benifit Description<sup className="text-pink-200">*</sup>
          </h1>
        </CardBody>
        <Divider />
        <CardBody className="w-full">
          <Textarea
            size="lg"
            id="courseBenefits"
            placeholder="Enter benefits of the course"
            {...register("courseBenefits", { required: true })}
          />
        </CardBody>
        <Divider />
      </Card>

      <RequirementsField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        setValue={setValue}
        //@ts-ignore
        errors={errors}
      />
      <div className="flex justify-end gap-x-2">
        {editCourse && (
          <button
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className={`flex cursor-pointer items-center gap-x-2 rounded-md py-[8px] px-[20px] font-semibold
              text-richblack-900 bg-richblack-300 hover:bg-richblack-900 hover:text-richblack-300 duration-300`}
          >
            Continue Wihout Saving
          </button>
        )}
        <Button
          className="mt-4"
          color="warning"
          onClick={handleSubmit(onSubmit)}
        >
          {!editCourse ? "Next" : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};

export default CourseInformationForm;
