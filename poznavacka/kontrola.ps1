$json = Get-Content "ptaci.json" | ConvertFrom-Json
$json |% {(Test-Path $_.Image).ToString() + "`t" + $_.Image}