$json = Get-Content "clenovci.json" | ConvertFrom-Json
$json |% {(Test-Path $_.Image).ToString() + "`t" + $_.Image}