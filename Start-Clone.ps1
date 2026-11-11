$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot
$runtimePython = Join-Path $env:USERPROFILE '.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe'
if (-not (Test-Path -LiteralPath $runtimePython)) { $runtimePython = (Get-Command python -ErrorAction Stop).Source }
$env:PORT = '4175'
$env:HOST = '0.0.0.0'
$env:CLONE_OFFLINE = '1'
Write-Host 'Open http://127.0.0.1:4175/ or http://<LAN-IP>:4175/ (Ctrl+C to stop)'
& $runtimePython (Join-Path $PSScriptRoot 'scripts/serve.py')
