import React, { useState } from "react";
import { MdDarkMode } from "react-icons/md";
import { Link } from "react-router-dom";

export default function DarkTheme({ onToggle }) {
  return (
    <div className="ml-[-150px] mr-[20px] text-2xl">
      <Link onClick={onToggle}>
        <MdDarkMode />
      </Link>
    </div>
  );
}




