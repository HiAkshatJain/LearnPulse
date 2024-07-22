import React from "react";
import FaqAccordion from "../core/FaqAccordion"; // Importing the FaqAccordion component
import { faqItems } from "../../data/faqItems";

const FAQPage: React.FC = () => {
  return (
    <div>
      {/* Render FaqAccordion component and pass faqItems as props */}
      <FaqAccordion items={faqItems} />
    </div>
  );
};

export default FAQPage;
