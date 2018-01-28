#!/bin/bash

# Get Variables
ARCH="$@"

PRODUCT_NAME=$(grep "\"app_name_short\"" ../package.json | cut -d':' -f 2,3 | cut -d'"' -f2)

PRODUCT_VERSION=$(grep "\"version\"" ../package.json | cut -d':' -f 2,3 | cut -d'"' -f2)
DESCRIPTION=$(grep "\"app_description\"" ../package.json | cut -d':' -f 2,3 | cut -d'"' -f2)
MAINTANER=$(grep "\"package_maintainer\"" ../package.json | cut -d':' -f 2,3 | cut -d'"' -f2)
PRODUCT_WEB_SITE=$(grep "\"app_homepage\"" ../package.json | cut -d':' -f 2,3 | cut -d'"' -f2 | sed -e 's/\//\\\//g')
PRODUCT_PUBLISHER=$(grep "\"app_company\"" ../package.json | cut -d':' -f 2,3 | cut -d'"' -f2)

# Create temp control file
sed -i "s/!define PRODUCT_NAME \"\(.*\)\"/\!define PRODUCT_NAME \"$PRODUCT_NAME\"/"  ./SwitchboardCopperGame.nsi
sed -i "s/!define PRODUCT_VERSION \"\(.*\)\"/\!define PRODUCT_VERSION \"$PRODUCT_VERSION\"/"  ./SwitchboardCopperGame.nsi
sed -i "s/!define PRODUCT_PUBLISHER \"\(.*\)\"/\!define PRODUCT_PUBLISHER \"$PRODUCT_PUBLISHER\"/"  ./SwitchboardCopperGame.nsi
sed -i "s/!define PRODUCT_WEB_SITE \"\(.*\)\"/\!define PRODUCT_WEB_SITE \"$PRODUCT_WEB_SITE\"/"  ./SwitchboardCopperGame.nsi

if [ "$ARCH" = "64" ]; then
    sed -i "s/;*\!include 64bit.nsh/\!include 64bit.nsh/"  ./SwitchboardCopperGame.nsi
    sed -i "s/\!include 32bit.nsh/;\!include 32bit.nsh/"  ./SwitchboardCopperGame.nsi
else
    sed -i "s/\!include 64bit.nsh/;\!include 64bit.nsh/"  ./SwitchboardCopperGame.nsi
    sed -i "s/;*\!include 32bit.nsh/\!include 32bit.nsh/"  ./SwitchboardCopperGame.nsi
fi
pwd
ls -l
makensis SwitchboardCopperGame.nsi
