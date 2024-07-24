import ChangeProfilePicture from "../../components/core/settings/ChangeProfilePicture";

const Settings = () => {
  return (
    <div className="p-10">
      <h1 className="mb-14 text-3xl font-medium text-richblack-5 font-boogaloo text-center sm:text-left">
        Edit Profile
      </h1>

      <ChangeProfilePicture />
    </div>
  );
};

export default Settings;
