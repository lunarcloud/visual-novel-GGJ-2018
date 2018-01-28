!include x64.nsh

Function .onInit
  ${If} ${RunningX64}
    StrCpy $INSTDIR "$PROGRAMFILES64\${PRODUCT_NAME}"
    SetRegView 64
  ${Else}
    Abort "This is a 64bit installer, cannot install on a 32bit system."
  ${Endif}
FunctionEnd

Function un.onInit
  MessageBox MB_ICONQUESTION|MB_YESNO|MB_DEFBUTTON2 "Are you sure you want to completely remove $(^Name) and all of its components?" IDYES +2
  Abort

  ${If} ${RunningX64}
    StrCpy $INSTDIR "$PROGRAMFILES64\${PRODUCT_NAME}"
    SetRegView 64
  ${Endif}
FunctionEnd
