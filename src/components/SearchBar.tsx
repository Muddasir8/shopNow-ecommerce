"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const SearchBar = () => {
  const router = useRouter();
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    if (name) {
      router.push(`/List?name=${name}`);
    }
  };

  return (
    <form className="flex items-center bg-gray-100 justify-between gap-4 rounded-md p-2 flex-1" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search"
        className="flex-1 w-24 bg-transparent outline-none text-black "
      />
      <button className="">
        <Image src="/search.svg" alt="search" width={16} height={16} />
      </button>
    </form>
  );
};

export default SearchBar;
