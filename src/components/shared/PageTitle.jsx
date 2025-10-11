import React from "react";

export default function PageTitle({title}) {
  return (
    <div className="flex flex-col mt-15 mx-auto lg:px-8 bg-gray-950 py-1 rounded-xl shadow-sm shadow-amber-200">
      <div className="mx-auto sm:w-full sm:max-w-3xl flex shrink-0">
        <h2 className=" mx-auto text-center text-xl/9 font-bold tracking-widest text-gray-900 dark:text-[#4aa2ca]">
          {title}
        </h2>
      </div>
    </div>
  );
}
