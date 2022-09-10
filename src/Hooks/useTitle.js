import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `پروژه شخصی | ${title}`;
  }, []);
};
export default useTitle;
