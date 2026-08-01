Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "cmd /c node server/index.cjs", 0, False
