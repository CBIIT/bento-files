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
  default:
    throw `Unknown project "${config.project}"`;
}

async function getFileInfo(file_id, callback) {
  const result = await queryBackend(config.backendUrl, {
    query: model.query,
    variables: {
      file_id
    }
  });
  if (result && result.data) {
    const location = callback(result.data);
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

module.exports = async function getFileLocation(file_id) {
  await getFileInfo(file_id, model.getLocation);
};

module.exports = {
  async getFileACL(file_id) {
    return await getFileInfo(file_id, model.getAcl);
  }
}