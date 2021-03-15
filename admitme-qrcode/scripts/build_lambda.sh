#!/usr/bin/env bash

set_params(){
    ROOT_DIR=$(cd .. && pwd)
    DIST_DIR="$ROOT_DIR/dist"
    BUILD_DIR="$ROOT_DIR/build"
    LAMBDA_NAME="QrcodeDetails"
    #CODE_VERSION=$(date '+%d%m%Y%H%M%S')
    CODE_VERSION=$(date '+%d%m%Y%H%M')
    ZIP_FILE="${LAMBDA_NAME}_${CODE_VERSION}.zip"

    echo "ROOT_DIR=${ROOT_DIR}"
    echo "DIST_DIR=${DIST_DIR}"
    echo "ZIP_FILE=${ZIP_FILE}"
    echo " "
}

zip_package(){
    cd "${ROOT_DIR}"
    npm install --progress=false --production

    mkdir -p $DIST_DIR
    zip -q -9 -r "${DIST_DIR}/${ZIP_FILE}" '*.json' '*.js' 'mock/*' 'node_modules/*' 'src/*'
    #zip -q -9 -r "${DIST_DIR}/${ZIP_FILE}" .
    echo "Lambda zip file has been created : ${ZIP_FILE}"
}

upload_zip_to_s3(){
    echo "Uploading Lambda to S3"
    cd ${DIST_DIR}
    aws s3 cp ${ZIP_FILE} s3://lambda-userdetails/${ZIP_FILE}
    echo "Upload to S3 Succesfull"
}


set_params
zip_package
upload_zip_to_s3
