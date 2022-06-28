module.exports = {
  removeTrailingSlashes: (path) => {
    if (path) {
      let pathStr = path.toString();
      return pathStr.replace(/\\+$/, '');
    } else {
      return path;
    }
  }
};
