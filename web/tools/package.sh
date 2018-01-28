#!/bin/bash

VERSION=$(grep "\"version\"" ../package.json | cut -d':' -f 2,3 | cut -d'"' -f2)

# Bake Game Files
./bake.sh

# Download NWJS files
mkdir -p downloads
cd downloads/
wget -q -i ../nwjs-downloads.txt -nc -c

# Extract

# Back to the tools directory
cd ../

# Reset temp folders
rm -r ../dist/
mkdir -p ../dist/package.nw/
rm -r ../output/
mkdir -p ../output

# Copy only necessary files into release
mkdir ../dist/package.nw/gameinputjs
cp -r ../js ../dist/package.nw/
cp -r ../media ../dist/package.nw/
cp -r ../fonts ../dist/package.nw/
cp -r ../index.html ../dist/package.nw/
cp -r ../package.json ../dist/package.nw/
cp -r ../game.min.js ../dist/package.nw/
cp -r ../manifest.webapp ../dist/package.nw/
cp -r ../LICENSE.md ../dist/package.nw/
cp -r ../LICENSE.md ../dist/

# Copy some build files into the dist folder
cp build-debian.sh ../dist/
cp build-windows-installer.sh ../dist/
cp SwitchboardCopperGame.nsi ../dist/
cp 64bit.nsh ../dist/
cp 32bit.nsh ../dist/

cp ../media/icon.png ../dist/game.png
cp ../media/game.ico ../dist/
cp ../media/game.ico ../dist/installer.ico

# Start Packaging
cd ../dist/

# OSX App
unzip ../tools/downloads/nwjs-*-osx-x64.zip -d ../dist
mv nwjs-*-osx-x64/nwjs.app SwitchboardCopperGame.app
rm -r nwjs-*-osx-x64
cp -r package.nw SwitchboardCopperGame.app/Contents/Resources/app.nw
png2icns SwitchboardCopperGame.app/Contents/Resources/app.icns game.png
cp -r ../tools/dmg-contents ./
mv ./SwitchboardCopperGame.app ./dmg-contents/SwitchboardCopperGame.app
png2icns dmg-contents/.VolumeIcon.icns game.png
genisoimage -V SwitchboardCopperGame -D -R -apple -no-pad -o "Switchboard Copper $VERSION.dmg" dmg-contents
mv *.dmg ../output/
rm -r dmg-contents

# Linux 64bit App
tar -zxvf ../tools/downloads/nwjs-*-linux-x64.tar.gz -C ../dist/
mv nwjs-*-linux-x64 switchboard-copper-game
cp -r package.nw switchboard-copper-game/
mv switchboard-copper-game/nw switchboard-copper-game/switchboard-copper-game
chmod +x switchboard-copper-game/switchboard-copper-game
#tar -zcvf "../output/switchboard-copper-game-$VERSION-linux-amd64.tar.gz" switchboard-copper-game
bash build-debian.sh amd64
mv *.deb ../output/
rm -r switchboard-copper-game

## Linux 32bit App
#tar -zxvf ../tools/downloads/nwjs-*-linux-ia32.tar.gz -C ../dist/
#mv nwjs-*-linux-ia32 switchboard-copper-game
#cp -r package.nw switchboard-copper-game/
#mv switchboard-copper-game/nw switchboard-copper-game/switchboard-copper-game
#chmod +x switchboard-copper-game/switchboard-copper-game
##tar -zcvf "../output/switchboard-copper-game-$VERSION-linux-i386.tar.gz" switchboard-copper-game
#bash build-debian.sh i386
#mv *.deb ../output/
#rm -r switchboard-copper-game

# Windows 64bit App
unzip ../tools/downloads/nwjs-*-win-x64.zip -d ../dist
mv nwjs-*-win-x64 SwitchboardCopperGame
cp -r package.nw SwitchboardCopperGame/
mv SwitchboardCopperGame/nw.exe SwitchboardCopperGame/SwitchboardCopperGame.exe
chmod +x SwitchboardCopperGame/SwitchboardCopperGame.exe
bash build-windows-installer.sh 64
mv "Install SwitchboardCopper.exe" "../output/Install Switchboard Copper $VERSION (64bit).exe"
rm -r SwitchboardCopperGame

## Windows 32bit App
unzip ../tools/downloads/nwjs-*-win-ia32.zip -d ../dist
mv nwjs-*-win-ia32 SwitchboardCopperGame
cp -r package.nw SwitchboardCopperGame/
mv SwitchboardCopperGame/nw.exe SwitchboardCopperGame/SwitchboardCopperGame.exe
chmod +x SwitchboardCopperGame/SwitchboardCopperGame
bash build-windows-installer.sh 32
mv "Install SwitchboardCopper.exe" "../output/Install Switchboard Copper $VERSION (32bit).exe"
rm -r SwitchboardCopperGame

rm -r ../dist/
exit
