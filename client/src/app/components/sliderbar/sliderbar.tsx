import Link from "next/link";
import React, { useMemo } from "react";
import { BiHash, BiHomeCircle, BiMoney, BiUser } from "react-icons/bi";
import { BsBell, BsBookmark, BsEnvelope, BsTwitter } from "react-icons/bs";
import { SlOptions } from "react-icons/sl";

interface SliderbarButton {
  title: string;
  icon: React.ReactNode;
  link: string;
}

interface SociallayoutProps {
  children: React.ReactNode;
}

const Sliderbar: React.FC<SociallayoutProps> = (props) => {
  const sliderbarMenuItem: SliderbarButton[] = useMemo(() => [
    {
      title: "Home",
      icon: <BiHomeCircle />,
      link: "/",
    },
    {
      title: "Explore",
      icon: <BiHash />,
      link: "/",
    },
    {
      title: "Notifications",
      icon: <BsBell />,
      link: "/",
    },
    {
      title: "Messages",
      icon: <BsEnvelope />,
      link: "/",
    },
    {
      title: "Bookmarks",
      icon: <BsBookmark />,
      link: "/",
    },
    {
      title: "Social Blue",
      icon: <BiMoney />,
      link: "/",
    },
    // {
    //   title: "Profile",
    //   icon: <BiUser />,
    //   link: `/${user?.id}`,
    // },
    {
      title: "More Options",
      icon: <SlOptions />,
      link: "/",
    },
  ]);

  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen sm:px-56">
        <div className="col-span-2 sm:col-span-3 pt-1 flex sm:justify-end pr-4 relative">
          <div>
            <div className="text-2xl h-fit w-fit hover:bg-gray-800 rounded-full p-4 cursor-pointer transition-all">
              <BsTwitter />
            </div>
            <div className="mt-1 text-xl pr-4">
              <ul>
                {sliderbarMenuItem.map((item) => (
                  <li key={item.title}>
                    <Link
                      className="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-3 py-3 w-fit cursor-pointer mt-2"
                      href={item.link}
                    >
                      <span className=" text-3xl">{item.icon}</span>
                      <span className="hidden sm:inline">{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sliderbar;
