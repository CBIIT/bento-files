const config = require('../config');
const AWS = require('aws-sdk');
const {getFileLocation} = require("../model");


const DEFAULT_EXPIRATION_SECONDS = 60 * 60 * 24; // 24 hours

const signer = new AWS.CloudFront.Signer(config.cfKeyPairId, config.cfPrivateKey);

function getExpiration() {
  const expiresInSeconds = config.urlExpiresInSeconds || DEFAULT_EXPIRATION_SECONDS;
  return Math.floor((new Date()).getTime() / 1000) + expiresInSeconds; //Current Time in UTC + expiresInSeconds
}

function transformToCloudFrontUrl(file_location) {
  if (!file_location || file_location.length === 0) {
    console.error("File location retrieved from database is empty!");
  }

  const url = new URL(file_location);
  const newUrl = new URL(url.pathname, config.cfUrl);
  return newUrl.toString();
}

async function getSignedURL(file_location) {
  if (config.fake) {
    return file_location;
  }
  const signedUrl = signer.getSignedUrl({
    url: transformToCloudFrontUrl(file_location),
    expires: getExpiration()
  });
  return signedUrl;
}

module.exports = async function (file_id) {
  const location = await getFileLocation(file_id);
  return await getSignedURL(location);
}

