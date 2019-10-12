#!/bin/bash

butler -v push export/windows/ "citizensofantiford/switchboard-copper:win"
butler -v push --fix-permissions export/macos/Switchboard\ Copper.zip "citizensofantiford/switchboard-copper:mac"
butler -v push --fix-permissions export/linux/ "citizensofantiford/switchboard-copper:linux"
#butler -v push --fix-permissions export/web/ "citizensofantiford/switchboard-copper:web"
#butler -v push export/android/switchboard-copper.apk "citizensofantiford/switchboard-copper:android"
