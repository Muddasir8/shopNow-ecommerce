import React from "react";
import Image from "next/legacy/image";
import { Banner } from '../../sanity.types'
import { urlFor } from "@/sanity/lib/image";


const Home = ({banner}:{banner:Banner}) => {
  return (
    <>
    <div className=" min-h-screen mx-auto relative">
      <div className="flex flex-wrap ">
        {banner &&
        <div className="w-full h-full">
          <Image
            src={banner.image ? urlFor(banner.image).url() : ''}
            alt="hero"
            layout="fill"
            sizes="100%"
            className="object-cover"
          />
        </div>}
        <div className="absolute flex flex-col text-center gap-16 px-24 text-white pt-10 sm:pt-16 sm:justify-center sm:px-60">
          <h2 className="text-6xl font-bold text-gray-800">{banner.heading}</h2>
          <p className="text-md font-semibold text-gray-900 line-clamp-3 ">
            {banner.decs}
          </p>
        </div>
      </div>
    </div>
    <div className="flex justify-center items-center py-10">
            <h1 className="text-6xl font-semibold text-gray-800">Products</h1>
          </div>
          </>
  );
};

export default Home;
