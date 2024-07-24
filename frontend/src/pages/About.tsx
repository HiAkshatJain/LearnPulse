import BannerImage1 from "/about/aboutus1.webp";
import BannerImage2 from "/about/aboutus2.webp";
import BannerImage3 from "/about/aboutus3.webp";
import Quote from "../components/core/Quote";
import Footer from "../components/common/Footer";
import AboutForm from "../components/common/AboutForm";

export const About = () => {
  return (
    <div>
      <div className="relative mx-7 mt-4  mb-4">
        <section className="bg-slate-300 rounded-3xl mb-2">
          <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-white">
            <div className=" text-xl md:text-4xl text-black font-semibold mx-auto py-5 pb-2 text-center">
              Driving Innovation in Online Education for a <br />
              Brighter Future
            </div>

            <div className="mx-auto py-5 pb-10 text-xl text-center text-white">
              LearnPulse is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </div>

            <div className="sm:h-[70px] lg:h-[150px]"></div>

            <div className=" absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5">
              <img src={BannerImage1} alt="" />
              <img src={BannerImage2} alt="" />
              <img src={BannerImage3} alt="" />
            </div>
          </div>
        </section>
        <section className="border-b rounded-3xl bg-slate-500">
          <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
            <div className="h-[100px] "></div>
            <Quote />
          </div>
        </section>
      </div>
      <AboutForm />
      <Footer />
    </div>
  );
};
