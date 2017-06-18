$json = Get-Content "savci.json" | ConvertFrom-Json
$json |% {(Test-Path $_.Image).ToString() + "`t" + $_.Image}