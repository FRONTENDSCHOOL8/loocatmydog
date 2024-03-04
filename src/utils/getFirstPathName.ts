const getFirstPathName = () => {
  const pathName = window.location.pathname;
  const type = pathName.split("/")[1];

  return type
}

export default getFirstPathName;