import { Button } from "@nextui-org/react";

const SignupSection = () => {
  return (
    <div className="max-w-5xl mx-auto mt-12 px-4 text-center">
      <div className="w-full max-w-3xl mx-auto">
        {/* Section title */}
        <h1 className="text-4xl font-bold mt-2 mb-6">
          {" "}
          Unlock Your Learning Potential
        </h1>

        {/* Section description */}
        <p className="px-4 leading-relaxed">
          Answer questions, get explanations, and explore topics in depth with
          our personalized learning platform with Industry Experts. Book a Demo.
        </p>

        {/* Additional description with emphasis */}
        <p className="mb-8 mt-2 px-4 leading-relaxed">
          Oh, and the best bit...
          <span className="text-blue-500 font-bold">It's free!</span>
        </p>

        {/* Sign-up button */}
        <Button className="mb-8" color="primary" variant="ghost">
          <a href="/signup">Sign-up for free</a>
        </Button>
      </div>
    </div>
  );
};

export default SignupSection;
