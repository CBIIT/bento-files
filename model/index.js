const config = require('../config');
const bent = require('bent');

const queryBackend = bent('POST', 'json');

let model;
switch (config.project) {
  case config.projectNames.ICDC:
    model = require('./icdc');
    break;
  case config.projectNames.BENTO:
    model = require('./bento');
    break;
  case config.projectNames.GMB:
    model = require('./gmb');
    break;
  case config.projectNames.C3DC:
    model = require('./c3dc');
    break;
  case config.projectNames.CTDC:
    model = require('./ctdc');
    break;
  default:
    throw `Unknown project "${config.project}"`;
}

// Calling this API will return file information
// callback parameter will trigger to receive the desired field in a file from result.data
// ex) await getFileInfo(file_id, model.getLocation); searching for a file location by a field id
async function getFileInfo(file_id, getFieldCallback) {
  const result = await queryBackend(config.backendUrl, {
    query: model.query,
    variables: {
      file_id
    }
  });
  if (result && result.data) {
    const location = getFieldCallback(result.data);
    if (location) {
      return location;
    }
    throw {statusCode: 404, message: 'File not found in database'}
  } else {
    let message = 'Query database failed';
    if (result && result.errors) {
      message = result.errors.reduce((message, msg) => message ? `${message}\n${msg.message}` : msg.message, '');
    }
    throw {statusCode: 400, message}
  }
}

module.exports = {
  async getFileLocation(file_id) {
    return await getFileInfo(file_id, model.getLocation);
  },
  async getFileACL(file_id) {
    return await getFileInfo(file_id, model.getAcl);
  }
}