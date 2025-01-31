import React from "react";
import { Input } from "@/components/ui/input"
import Component from "@/components/fileUpload";

const now = new Date();
const time = now.toLocaleTimeString("en-IN", {
  hour: "2-digit",
  minute: "2-digit",
});
const date = new Intl.DateTimeFormat("en-IN", { dateStyle: "full" }).format(
  now
);
const Home = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <div className="h-[200px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">
              {time}
              <p className="text-lg font-medium text-sky-1 lg:text-2xl">
                {date}
              </p>
            </h1>
          </div>
        </div>
      </div>
      <div className="h-[200px] w-full rounded-[20px] bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-extrabold lg:text-2xl text-center py-10">
              Upload Your Report here <br /> <br />
              <Component />
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
