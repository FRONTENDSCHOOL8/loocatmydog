const typeOf = (target: any) => {
  return Object.prototype.toString.call(target).slice(8, -1).toLowerCase();
};

export default typeOf;
