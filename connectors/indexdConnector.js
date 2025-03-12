const bent = require("bent");
const config = require("../config");

const getJSON = bent(config.indexDUrl, "json");

module.exports = async function (file_id) {
  try {
    let result = await getJSON(`/${file_id}`);
    return result.url;
  } catch (error) {
    console.error(`Error fetching file from IndexD: ${file_id}`, error);
    let err = new Error("Retrieving pre-signed URL failed");
    err.status = 500;
    throw err;
  }
};
