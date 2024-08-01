//@ts-nocheck
import { Button, Card, CardHeader } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  createNewCategory,
  deleteCategory,
  fetchCourseCategories,
} from "../../services/operations/courseDetailsAPI";
import { RiDeleteBin6Line } from "react-icons/ri";

const CreateCategory = () => {
  //@ts-ignore
  const { token } = useSelector((state) => state.auth);
  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [description, setDescription] = useState("");

  const fetchSublinks = async () => {
    try {
      setLoading(true);
      const res = await fetchCourseCategories();
      setSubLinks(res);
    } catch (error) {
      console.log("Error ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSublinks();
  }, []);

  const handleCreateCategory = async () => {
    await createNewCategory(newCategory, description, token);
    setNewCategory("");
    setDescription("");
    window.location.reload(false);
  };

  const handleDeleteCategory = async (categoryId: string) => {
    await deleteCategory(categoryId, token);
    window.location.reload(false);
  };

  return (
    <div className="m-4">
      <Card className="w-full mb-7">
        <CardHeader className="flex items-center justify-between rounded-2xl border-[1px] border-richblack-700 bg-richblack-800 p-8 px-3 sm:px-12">
          <div className="flex gap-10">
            <div className="flex flex-col justify-center">
              <p className="text-lg font-semibold text-richblack-5 capitalize">
                Create Category
              </p>
            </div>
          </div>
        </CardHeader>

        <div className="p-6 space-y-6">
          <form>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-6">
                <input
                  type="text"
                  value={newCategory}
                  placeholder="Enter new category name"
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                />
              </div>
              <div className="col-span-6 sm:col-span-6">
                <input
                  type="text"
                  value={description}
                  placeholder="Enter description of category"
                  onChange={(e) => setDescription(e.target.value)}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                />
              </div>
            </div>
          </form>
          <div className="flex justify-end">
            <Button onClick={handleCreateCategory} color="warning">
              Add
            </Button>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-6 m-16 text-black">
          {loading ? (
            <p>Loading</p>
          ) : (
            subLinks?.map((subLink, i) => (
              <div key={i} className="flex justify-between font-bold gap-10">
                <p>{subLink.name}</p>
                <button onClick={() => handleDeleteCategory(subLink._id)}>
                  <RiDeleteBin6Line className="hover:text-pink-200 " />
                </button>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

export default CreateCategory;
