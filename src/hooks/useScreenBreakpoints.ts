import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";
import { useEffect, useState } from "react";

// https://gist.github.com/SimeonGriggs/7071958b8a629faf9137734aec713a0c

const fullConfig = resolveConfig(tailwindConfig);
const {
  theme: { screens },
} = fullConfig;
const useScreenBreakpoints = (query: keyof typeof screens): boolean => {
  const mediaQuery = `(min-width: ${screens[query]})`;
  const [isMatch, setMatch] = useState<boolean>(false);
  const onChange = (e: MediaQueryListEvent) => setMatch(e.matches);
  useEffect(() => {
    setMatch(matchQueryList.matches);
    matchQueryList.addEventListener("change", onChange);
    return () => matchQueryList.removeEventListener("change", onChange);
  }, [query]);

  
  if(typeof window === 'undefined') return false;

  const matchQueryList = window.matchMedia(mediaQuery);

  return isMatch;
}

export default useScreenBreakpoints;