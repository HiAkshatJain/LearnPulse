import React, { useState } from "react";

// Define the structure of each FAQ item
interface FaqItem {
  question: string;
  answer: string;
}

// Define the props interface for FaqAccordion component
interface FaqAccordionProps {
  items: FaqItem[]; // Array of FAQ items passed as props
}

const FaqAccordion: React.FC<FaqAccordionProps> = ({ items }) => {
  // State to manage the open/close state of each accordion item
  const [accordions, setAccordions] = useState<boolean[]>(
    new Array(items.length).fill(false) // Initialize all accordions closed initially
  );

  // Function to toggle the accordion item at a given index
  const toggleAccordion = (index: number) => {
    const newAccordions = [...accordions]; // Create a copy of the state array
    newAccordions[index] = !newAccordions[index]; // Toggle the clicked accordion item
    setAccordions(newAccordions); // Update the state with the new array
  };

  return (
    <div className="lg:container lg:mx-auto lg:py-16 md:py-12 py-12 px-4">
      {/* FAQ section title */}
      <h1 className="text-center dark:text-white lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800 font-semibold">
        FAQ's
      </h1>

      {/* Search and information section */}
      <div className="lg:mt-12 bg-gray-100 dark:bg-gray-800 rounded-3xl mb-4 md:mt-10 mt-8 lg:py-7 lg:px-6 md:p-6 py-6 px-4 lg:w-8/12 w-full mx-auto">
        <div className="flex justify-between md:flex-row flex-col">
          {/* Heading and description */}
          <div className="md:mb-0 mb-8 md:text-left text-center">
            <h2 className="font-medium dark:text-white text-xl leading-5 text-gray-800 lg:mb-2 mb-4">
              Questions
            </h2>
            <p className="font-normal dark:text-gray-300 text-sm leading-5 text-gray-600 md:w-8/12 md:ml-0 w-11/12 mx-auto">
              If you don’t find your answer, Please contact us or Leave a
              Message, we’ll be more than happy to assist you.
            </p>
          </div>

          {/* Search input */}
          <div className="flex justify-center items-center">
            <div className="focus:outline-none rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 flex bg-white md:justify-center justify-between items-center px-4 py-3 w-full">
              <input
                className="focus:outline-none px-2 bg-white"
                type="text"
                placeholder="Search"
              />
              <img
                src="https://tuk-cdn.s3.amazonaws.com/can-uploader/faq-8-svg1.svg"
                alt="search"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Accordion items section */}
      <div className="lg:w-8/12 w-full mx-auto">
        {items.map((item, index) => (
          <div key={index}>
            {/* Divider line between each accordion item */}
            <hr className="w-full lg:mt-10 md:mt-12 md:mb-8 my-8" />

            <div className="w-full md:px-6">
              <div className="flex justify-between items-center w-full">
                {/* Question and toggle button */}
                <div>
                  <p className="flex justify-center items-center dark:text-white font-medium text-base leading-6 md:leading-4 text-gray-800">
                    {/* Q{index + 1} displays the question number */}
                    <span className="lg:mr-6 mr-4 dark:text-white lg:text-2xl md:text-xl text-lg leading-6 md:leading-5 lg:leading-4 font-semibold text-gray-800">
                      Q{index + 1}.
                    </span>{" "}
                    {item.question} {/* Display the question */}
                  </p>
                </div>
                {/* Button to toggle accordion */}
                <button
                  className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                  aria-label="toggler"
                  onClick={() => toggleAccordion(index)} // Calls toggleAccordion function on click
                >
                  {/* Toggle button icon, rotates if accordion is open */}
                  <img
                    className={`transform ${
                      accordions[index] ? "rotate-180" : ""
                    } dark:hidden`}
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/faq-8-svg2.svg"
                    alt="toggler"
                  />
                  <img
                    className={`transform ${
                      accordions[index] ? "rotate-180" : ""
                    } dark:block hidden`}
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/faq-8-svg2dark.svg"
                    alt="toggler"
                  />
                </button>
              </div>
              {/* Answer section of the accordion, toggles visibility based on state */}
              <div
                className={`mt-6 w-full ${accordions[index] ? "" : "hidden"}`}
              >
                <p className="text-base leading-6 text-gray-600 dark:text-gray-300 font-normal">
                  {item.answer} {/* Display the answer */}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqAccordion;
