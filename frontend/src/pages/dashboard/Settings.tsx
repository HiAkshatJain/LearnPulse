import ChangeProfilePicture from "../../components/core/settings/ChangeProfilePicture";
import DeleteAccount from "../../components/core/settings/DeleteAccount";
import EditProfile from "../../components/core/settings/EditProfile";
import UpdatePassword from "../../components/core/settings/UpdatePassword";

const Settings = () => {
  return (
    <div className="p-10">
      <h1 className="mb-14 text-3xl font-medium text-richblack-5 font-boogaloo text-center sm:text-left">
        Edit Profile
      </h1>

      <ChangeProfilePicture />
      <EditProfile />
      <UpdatePassword />
      <DeleteAccount />
    </div>
  );
};

export default Settings;
