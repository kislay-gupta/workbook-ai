import { useEffect } from "react";

const usePageTitle = (
  title: string,
  defaultTitle = "Persona AI || Kislay Gupta"
) => {
  useEffect(() => {
    document.title = title;

    return () => {
      document.title = defaultTitle;
    };
  }, [title, defaultTitle]);
};

export default usePageTitle;
