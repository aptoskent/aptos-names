#!/bin/bash

function usage {
    cat <<EOF
Usage: deploy.sh -c <chain (mainnet or testnet)>

MUST run in ./functions/ directory.

Deploys cloud functions for the specified chain.
EOF
    exit 1
}

if [ $# -ne 2 ]; then
    usage
fi

if [ "$1" != "-c" ]; then
    usage
fi

DIR=$(basename "$PWD")

if [[ "$DIR" != "functions" ]]; then
    usage
fi

CHAIN=$2

if [[ "$CHAIN" == "mainnet" ]]; then
    PROJECT=aptos-names-mainnet-prod
    SERVICE_ACCOUNT=aptos-names-api@aptos-names-mainnet-prod.iam.gserviceaccount.com
    ENV_VARS_FILE=./.env.mainnet.yaml
    SIGNER_PRIVATE_KEY_VERSION=2
elif [[ "$CHAIN" == "testnet" ]]; then
    PROJECT=aptos-names-testnet-prod
    SERVICE_ACCOUNT=aptos-names-api@aptos-names-testnet-prod.iam.gserviceaccount.com
    ENV_VARS_FILE=./.env.testnet.yaml
    SIGNER_PRIVATE_KEY_VERSION=1
else
    usage
fi

yarn generate

yarn compile

cp package.json ./build/src/

MMDB=./build/src/geoip2_city_20220930.mmdb

if [ ! -f "$MMDB" ]; then
    echo "ERROR: Missing MMDB file: geoip2_city_20220930.mmdb"
    echo "ERROR: Please copy geoip2_city_20220930.mmdb to ./build/src/"
    exit 1
fi

gcloud functions deploy aptos-names-api \
    --gen2 \
    --runtime=nodejs16 \
    --source=./build/src \
    --entry-point=app \
    --trigger-http \
    --allow-unauthenticated \
    --project=$PROJECT \
    --service-account=$SERVICE_ACCOUNT \
    --env-vars-file=$ENV_VARS_FILE \
    --update-secrets="RECAPTCHA_SECRET_KEY=RECAPTCHA_SECRET_KEY:1,SIGNER_PRIVATE_KEY=SIGNER_PRIVATE_KEY:$SIGNER_PRIVATE_KEY_VERSION,RECAPTCHA_V2_SECRET_KEY=RECAPTCHA_V2_SECRET_KEY:1"
