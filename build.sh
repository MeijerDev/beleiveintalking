#!/bin/bash
CONTACT_ENDPOINT=https://6vepad8o23.execute-api.eu-central-1.amazonaws.com/default/ContactFormBelieveInTalking

rm -f ./src/*.js
npx tsc ./src/index.ts --outFile ./src/index.js

sed -i -e "s#CONTACT_ENDPOINT#$CONTACT_ENDPOINT#g" ./src/index.js
rm -f ./src/*.js-e

npx @11ty/eleventy

# aws s3 sync --region eu-central-1 out "s3://meijer-m93.nl/" --exclude "*.DS_Store*" 
# aws cloudfront create-invalidation --distribution-id E2O8C7EREJTLL3 --paths "/*"