import { useLocation } from "react-router-dom";

const useFirstPathName = () => {
  const location = useLocation();
  const pathName = location.pathname;

  const type = pathName.split("/")[1];

  return type;
}

export default useFirstPathName;

// 첫 경로를 따오는 훅 함수
// ex) http://localhost:3000/stories/post  => return stories