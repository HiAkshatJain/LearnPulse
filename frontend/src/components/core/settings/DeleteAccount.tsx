import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { deleteProfile } from "../../../services/operations/settingsAPI";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [check, setCheck] = useState(false); //@ts-ignore
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOpen = () => {
    onOpen();
  };

  return (
    <div className="my-10 flex flex-row gap-x-5 rounded-md border-[1px] border-pink-700 bg-pink-900 p-8 px-6 sm:px-12">
      <div className="flex flex-wrap gap-3">
        <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700">
          <FiTrash2 className="text-3xl text-pink-200" />
        </div>

        <div className="flex flex-col ">
          <h2 className="text-lg font-semibold text-white "> Delete Account</h2>

          <div className="sm:w-3/5 text-pink-50 flex flex-col gap-3 mt-1">
            <p>Would you like to delete account ?</p>
            <p>
              This account may contain Paid Courses. Deleting your account is
              permanent and will remove all the contain associated with it.
            </p>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-indigo-600 rounded-full form-style cursor-pointer"
              checked={check}
              onChange={() => setCheck((prev) => !prev)}
            />

            <button
              type="button"
              className="w-fit italic text-pink-300  "
              onClick={() => check && handleOpen()}
            >
              I want to delete my account.
            </button>
          </div>
        </div>
      </div>
      <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Are you sure ?
              </ModalHeader>
              <ModalBody>
                <p>Delete my account...!</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" radius="lg" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="danger"
                  radius="lg"
                  onPress={() => {
                    //@ts-ignore
                    dispatch(deleteProfile(token, navigate));
                  }}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
