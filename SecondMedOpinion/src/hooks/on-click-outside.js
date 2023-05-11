import { useEffect } from "react";

const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (e) => {
      const node = ref?.current;

      if (!node || node.contains(e?.target || null)) {
        return;
      }

      handler(e);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
