// "use client";

// import type { ClassifiedWithImages } from "@/config/types";
// import { use } from "react";
// import { ClassifiedCard } from "./classified-card";

// interface ClassifiedsListProps {
//   // classifieds: Promise<ClassifiedWithImages[]>;
//   classifieds: ClassifiedWithImages[]
//   favourites: number[];
// }

// export const ClassifiedsList = (props: ClassifiedsListProps) => {
//   const { classifieds, favourites } = props;
//   const inventory = use(classifieds);
//   return (
//     <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
//       {inventory.map((classified) => {
//         return (
//           <ClassifiedCard
//             key={classified.id}
//             classified={classified}
//             favourites={favourites} 
//           />
//         );
//       })}
//     </div>
//   );
// };


"use client";

import type { ClassifiedWithImages } from "@/config/types";
import { ClassifiedCard } from "./classified-card";

interface ClassifiedsListProps {
  classifieds: ClassifiedWithImages[]; // ✅ Already resolved data
  favourites: number[];
}

export const ClassifiedsList = ({
  classifieds,
  favourites,
}: ClassifiedsListProps) => {
  return (
    <div className="grid grid-cols-2 mt-6 mx-4 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {classifieds.map((classified) => (
        <ClassifiedCard
          key={classified.id}
          classified={classified}
          favourites={favourites}
        />
      ))}
    </div>
  );
};

