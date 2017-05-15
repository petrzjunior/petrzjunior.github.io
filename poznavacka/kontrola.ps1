$json = Get-Content "plazi.json" | ConvertFrom-Json
$json |% {(Test-Path $_.Image).ToString() + "`t" + $_.Image}