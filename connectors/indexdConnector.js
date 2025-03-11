const bent = require("bent");
const config = require("../config");

const getJSON = bent(config.indexDUrl, "json");

module.exports = async function (file_id) {
  try {
    let result = await getJSON(`/${file_id}`);
    return result.url;
  } catch (error) {
    console.log(error);
  }
};
