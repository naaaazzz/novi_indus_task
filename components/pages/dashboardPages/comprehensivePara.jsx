"use client";

import React from "react";
import { Button } from "@/components/ui/button";

const ComprehensivePara = ({ closeDialog }) => {
  return (
    <div className="w-full max-w-[900px] mx-auto">
      {/* Container */}
      <div className="  rounded-lg overflow-hidden bg-white ">
        {/* Header */}
        <div className="bg-[#fff] px-4 py-3 border-b">
          <h2 className="text-sm md:text-base font-semibold text-[#1c3141]">
            Comprehensive Paragraph
          </h2>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6 max-h-[60vh] overflow-y-auto text-[13px] md:text-sm leading-relaxed text-gray-700 space-y-4">
          <p>
            Ancient Indian history spans several millennia and offers a profound
            glimpse into the origins of one of the world's oldest and most
            diverse civilizations. It begins with the Indus Valley Civilization
            (c. 2500–1500 BCE), which is renowned for its advanced urban
            planning, architecture, and water management systems. Cities like
            Harappa and Mohenjo-Daro were highly developed, with sophisticated
            drainage systems and well-organized streets, showcasing the early
            brilliance of Indian civilization. The decline of this civilization
            remains a mystery, but it marks the transition to the next
            significant phase in Indian history.
          </p>

          <p>
            Following the Indus Valley Civilization, the Vedic Period (c.
            1500–600 BCE) saw the arrival of the Aryans in northern India. This
            period is characterized by the composition of the Vedas, which laid
            the foundations of Hinduism and early Indian society.
          </p>

          <p>
            It was during this time that the varna system (social hierarchy)
            began to develop, which later evolved into the caste system. The
            Vedic Age also witnessed the rise of important kingdoms and the
            spread of agricultural practices across the region, significantly
            impacting the social and cultural fabric of ancient India.
          </p>

          <p>
            The 6th century BCE marked a turning point with the emergence of new
            religious and philosophical movements. Buddhism and Jainism, led by
            Gautama Buddha and Mahavira, challenged the existing Vedic orthodoxy
            and offered alternative paths to spiritual enlightenment. These
            movements gained widespread popularity and had a lasting influence
            on Indian society and culture. During this time, the kingdom of
            Magadha became one of the most powerful, laying the groundwork for
            future empires.
          </p>

          <p>
            The Maurya Empire (c. 322–185 BCE), founded by Chandragupta Maurya,
            became the first large empire to unify much of the Indian
            subcontinent. Under Ashoka the Great, the empire reached its zenith,
            and Buddhism flourished both in India and abroad. Ashoka’s support
            for non-violence, his spread of Buddhist teachings, and his
            contributions to governance and infrastructure had a lasting legacy
            in Indian history. His reign marks one of the earliest and most
            notable examples of state-sponsored religious tolerance and moral
            governance.
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-4 bg-[#fff]">
          <Button
            onClick={closeDialog}
            className="bg-[#1c3141] hover:bg-[#162733] text-white px-6"
          >
            Minimize
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ComprehensivePara;
