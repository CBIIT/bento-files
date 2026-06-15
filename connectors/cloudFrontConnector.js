const config = require("../config");
const { getSignedUrl } = require("@aws-sdk/cloudfront-signer");

const DEFAULT_EXPIRATION_SECONDS = 60 * 60 * 24; // 24 hours

const { getFileLocation } = require("../model");

function getExpiration() {
  const configuredExpiration = config.urlExpiresInSeconds;
  const expiresInSeconds =
    configuredExpiration === undefined ||
    configuredExpiration === null ||
    configuredExpiration === ""
      ? DEFAULT_EXPIRATION_SECONDS
      : Number(configuredExpiration);

  if (!Number.isFinite(expiresInSeconds) || expiresInSeconds < 0) {
    throw new Error(
      `Invalid config.urlExpiresInSeconds value: ${config.urlExpiresInSeconds}. Expected a finite, non-negative number of seconds.`,
    );
  }
  return new Date(Date.now() + expiresInSeconds * 1000).toISOString();
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
  const signedUrl = getSignedUrl({
    url: transformToCloudFrontUrl(file_location),
    keyPairId: config.cfKeyPairId,
    privateKey: config.cfPrivateKey,
    dateLessThan: getExpiration()
  });
  return signedUrl;
}

module.exports = async function (file_id, cookie) {
  const location = await getFileLocation(file_id, cookie);
  return await getSignedURL(location);
};
