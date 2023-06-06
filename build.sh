#!/bin/bash

TIMESTAMP=$(date +%s%N)

rm -f ./out/*.js
npx tsc index.ts --outFile ./out/$TIMESTAMP.js

cp -r *.png ./out
cp -r favicon.ico ./out
cp -r favicon.svg ./out
cp -r *.webmanifest ./out

cp index.html ./out
sed -i -e "s/VERSION_STYLESHEET/$TIMESTAMP/g" ./out/index.html
sed -i -e "s/VERSION_SCRIPT/$TIMESTAMP/g" ./out/index.html
rm -f ./out/index.html-e

rm -f ./out/*.css
cp style.css "./out/$TIMESTAMP.css"

aws s3 sync --region eu-central-1 out "s3://meijer-m93.nl/" --exclude "*.DS_Store*" 
aws cloudfront create-invalidation --distribution-id E2O8C7EREJTLL3 --paths "/*"