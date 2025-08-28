import React, { useState } from "react";
import DarkTheme from "../components/darktheme";

export default function Page() {
  const [dark, setDark] = useState(false);

  return (
    <div className={`${dark ? "bg-black text-white" : "bg-white text-black"}`}>
      <DarkTheme onToggle={() => setDark((prev) => !prev)} />

      <h1 className="text-center p-4">
        {dark ? "Dark Theme Active 🌙" : "Light Theme Active ☀️"}
      </h1>
    </div>
  );
}
