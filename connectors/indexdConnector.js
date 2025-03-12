const bent = require("bent");
const config = require("../config");

const getJSON = bent(config.indexDUrl, "json");
console.log(config.indexDUrl);
console.log(getJSON);

module.exports = async function (file_id) {
  try {
    let result = await getJSON(`/${file_id}`);
    console.log(result);
    return result.url;
  } catch (error) {
    console.error(error);
  }
};
