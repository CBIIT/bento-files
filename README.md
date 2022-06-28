# Bento Files service

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/84ffdedd0c534383a52ca5157a0b79dc)](https://app.codacy.com/gh/CBIIT/bento-files?utm_source=github.com&utm_medium=referral&utm_content=CBIIT/bento-files&utm_campaign=Badge_Grade_Settings)

## Environmental Variables
Following environmental variables are needed

- VERSION : version number
- DATE : build date
- URL_SRC : source for signed URL, can be one of INDEXD, CLOUD_FRONT, SIGNED_S3 or DUMMY (default)
- BACKEND_URL : URL of bento GraphQL backend
- AUTH_ENABLED: set to "true" to enable authentication
- PROJECT : can be one of ICDC, BENTO, GMB or C3DC 
- FAKE : set to "true" will bypass CLOUD_FRONT calls, it's only used for local testing

Following variable is only needed when AUTH_ENABLED is set to true
- AUTH_URL : URL of bento-auth service
- AUTHORIZATION_ENABLED: if set to "true" under AUTH_URL enabled, it will use a file acl as an additional authenticator.

  Following variables are only needed for specific source

### INDEXD 
- INDEXD_URL : URL of IndexD service

### CLOUD_FRONT
- CF_URL : URL of CloudFront service
- CF_KEY_PAIR_ID
- CF_PRIVATE_KEY
- URL_EXPIRES_IN_SECONDS : expiration for signed URL

### SIGNED_S3
- URL_EXPIRES_IN_SECONDS : expiration for signed URL
