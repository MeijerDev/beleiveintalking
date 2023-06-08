#!/bin/bash
TIMESTAMP=$(date +%s%N)
CONTACT_ENDPOINT=https://6vepad8o23.execute-api.eu-central-1.amazonaws.com/default/ContactFormBelieveInTalking

rm -f ./out/*.js
npx tsc index.ts --outFile ./out/$TIMESTAMP.js

cp -r *.png ./out
cp -r favicon.ico ./out
cp -r favicon.svg ./out
cp -r *.webmanifest ./out

cp *.html ./out
sed -i -e "s#CONTACT_ENDPOINT#$CONTACT_ENDPOINT#g" ./out/$TIMESTAMP.js
rm -f ./out/*.js-e
sed -i -e "s#style.css#$TIMESTAMP.css#g" ./out/index.html
sed -i -e "s#index.js#$TIMESTAMP.js#g" ./out/index.html
sed -i -e "s#style.css#$TIMESTAMP.css#g" ./out/start.html
sed -i -e "s#index.js#$TIMESTAMP.js#g" ./out/start.html
sed -i -e "s#style.css#$TIMESTAMP.css#g" ./out/about.html
sed -i -e "s#index.js#$TIMESTAMP.js#g" ./out/about.html
sed -i -e "s#style.css#$TIMESTAMP.css#g" ./out/contact.html
sed -i -e "s#index.js#$TIMESTAMP.js#g" ./out/contact.html
rm -f ./out/*.html-e

rm -f ./out/*.css
cp style.css "./out/$TIMESTAMP.css"

aws s3 sync --region eu-central-1 out "s3://meijer-m93.nl/" --exclude "*.DS_Store*" 
aws cloudfront create-invalidation --distribution-id E2O8C7EREJTLL3 --paths "/*"