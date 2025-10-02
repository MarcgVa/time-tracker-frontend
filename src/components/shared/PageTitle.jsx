import React from "react";

export default function PageTitle({title}) {
  return (
    <div className="flex flex-col px-6 mt-10 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-3xl flex shrink-0">
        <h2 className="my-10 w-full text-center text-2xl/9 font-bold tracking-widest text-gray-900 dark:text-gray-300">
          {title}
        </h2>
      </div>
    </div>
  );
}
