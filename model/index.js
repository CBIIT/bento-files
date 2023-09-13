const config = require('../config');
const bent = require('bent');

const queryBackend = bent('POST', 'json');

let model;
switch (config.project.toUpperCase()) {
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
  case config.projectNames.CDS:
    model = require('./cds');
    break;
  default:
    throw `Unknown project "${config.project}"`;
}

// Calling this API will return file information
// callback parameter will trigger function for the desired field
// ex) await getFileInfo(file_id, model.getLocation); getting location field
const getFileInfo = async (file_id, fieldCallback, cookie) => {
  const result = await queryBackend(config.backendUrl, {
    query: model.query,
    variables: {
      file_id
    }
  }, (cookie) ? {Cookie: cookie} : {});
  if (result && result.data) {
    const location = fieldCallback(result.data);
    if (location) {
      return location;
    } else {
      throw {statusCode: 404, message: 'File not found in database'}
    }
  } else {
    let message = 'Query database failed';
    if (result && result.errors) {
      message = result.errors.reduce((message, msg) => message ? `${message}\n${msg.message}` : msg.message, '');
    }
    throw {statusCode: 400, message}
  }
}

module.exports = {
  async getFileLocation(file_id, cookie) {
    return await getFileInfo(file_id, model.getLocation, cookie);
  },
  async getFileACL(file_id, cookie) {
    return await getFileInfo(file_id, model.getAcl, cookie);
  }
}
