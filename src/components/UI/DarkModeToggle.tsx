import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-regular-svg-icons";

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("bg-[#121212]", "text-white");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("bg-[#121212]", "text-white");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <button onClick={() => setIsDark(!isDark)}>
      <FontAwesomeIcon icon={isDark ? faSun : faMoon} />
    </button>
  );
};

export default DarkModeToggle;
