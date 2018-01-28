#!/bin/bash

# Get Variables
ARCH="$@"

GAMEFOLDER="switchboard-copper-game"

TITLE_UPPER=$(grep "\"app_name\"" ../package.json | cut -d':' -f 2,3 | cut -d'"' -f2)
TITLE_LOWER_DASH=$(grep "\"name\"" ../package.json | cut -d':' -f 2 | cut -d'"' -f2)
TITLE_LOWER_UNDERSCORE=$(echo $TITLE_LOWER_DASH  | sed -e 's/-/_/g')

COMPANY_UPPER=$(grep "\"app_company\"" ../package.json | cut -d':' -f 2,3 | cut -d'"' -f2)
COMPANY_LOWER=$(grep "\"app_company_short\"" ../package.json | cut -d':' -f 2,3 | cut -d'"' -f2 | tr '[:upper:]' '[:lower:]')
COMPANY_LOWER_UNDERSCORE=$(echo $COMPANY_LOWER  | sed -e 's/ /_/g')
COMPANY_LOWER_DASH=$(echo $COMPANY_LOWER  | sed -e 's/ /-/g')

VERSION=$(grep "\"version\"" ../package.json | cut -d':' -f 2,3 | cut -d'"' -f2)
DESCRIPTION=$(grep "\"app_description\"" ../package.json | cut -d':' -f 2,3 | cut -d'"' -f2)
MAINTANER=$(grep "\"package_maintainer\"" ../package.json | cut -d':' -f 2,3 | cut -d'"' -f2)
HOMEPAGE=$(grep "\"app_homepage\"" ../package.json | cut -d':' -f 2,3 | cut -d'"' -f2 | sed -e 's/\//\\\//g')

PACKAGENAME="$TITLE_LOWER_DASH"
DEBIANNAME="$PACKAGENAME-$VERSION"_"$ARCH"

# Create temp control file
echo "Creating control file..."
cp ../tools/control ./control.temp
`sed -i "s/Version: \(.*\)/Version: $VERSION/"  ./control.temp`
`sed -i "s/Architecture: \(.*\)/Architecture: $ARCH/"  ./control.temp`
`sed -i "s/Description: \(.*\)/Description: $DESCRIPTION/"  ./control.temp`
`sed -i "s/Maintainer: \(.*\)/Maintainer: $MAINTANER/"  ./control.temp`
`sed -i "s/Homepage: \(.*\)/Homepage: $HOMEPAGE/"  ./control.temp`
`sed -i "s/Package: \(.*\)/Package: $PACKAGENAME/"  ./control.temp`

# Create temp desktop file
echo "Creating desktop file..."
cp ../tools/app.desktop ./app.desktop.temp
`sed -i "s/Comment=\(.*\)/Comment=$DESCRIPTION/"  ./app.desktop.temp`
`sed -i "s/Name=\(.*\)/Name=$TITLE_UPPER/"  ./app.desktop.temp`
`sed -i "s/Name=\(.*\)/Name=$TITLE_UPPER/"  ./app.desktop.temp`
`sed -i "s/Exec=\(.*\)/Exec=\/opt\/"$PACKAGENAME"\/switchboard-copper-game/"  ./app.desktop.temp`
`sed -i "s/Icon=\(.*\)/Icon=\/opt\/"$PACKAGENAME"\/game.png/"  ./app.desktop.temp`

# Create fakeroot
echo "Creating fakeroot at $DEBIANNAME/DEBIAN ..."
mkdir -p "$DEBIANNAME"/DEBIAN
mkdir -p "$DEBIANNAME"/opt/"$PACKAGENAME"
mkdir -p "$DEBIANNAME"/usr/share/applications/
mkdir -p "$DEBIANNAME"/usr/share/pixmaps/

# Copy file into them
echo "Populating fakeroot..."
cp ./control.temp "$DEBIANNAME"/DEBIAN/control
cp -r "$GAMEFOLDER"/* "$DEBIANNAME"/opt/"$PACKAGENAME"/

if [ -f ../tools/license.txt ]; then
    cp -r ../tools/license.txt "$DEBIANNAME"/opt/"$PACKAGENAME"/LICENSE
fi

cp ../dist/game.png "$DEBIANNAME"/opt/"$PACKAGENAME"/
cp ./app.desktop.temp "$DEBIANNAME"/usr/share/applications/"$PACKAGENAME".desktop

# Build the package
dpkg-deb --build "$DEBIANNAME" "$DEBIANNAME".deb

# Cleanup
echo "Cleaning up..."
rm -r "$DEBIANNAME"

echo "Finished!"
exit 0


