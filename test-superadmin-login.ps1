# Test SuperAdmin Login with PowerShell
Write-Host "Testing SuperAdmin Login..." -ForegroundColor Cyan

$loginData = @{
    email = "superadmin@mawi.com"
    password = "SuperAdmin2025!"
} | ConvertTo-Json

$headers = @{
    "Content-Type" = "application/json"
}

try {
    Write-Host "Sending login request to: http://localhost:3000/Consultas/api/login" -ForegroundColor Yellow
    Write-Host "Email: superadmin@mawi.com" -ForegroundColor White
    
    $response = Invoke-RestMethod -Uri "http://localhost:3000/Consultas/api/login" -Method POST -Headers $headers -Body $loginData
    
    Write-Host "LOGIN SUCCESS!" -ForegroundColor Green
    Write-Host "Token: $($response.token.Substring(0, 50))..." -ForegroundColor White
    Write-Host "Role: $($response.rol)" -ForegroundColor White
    Write-Host "Status: $($response.estado)" -ForegroundColor White
    
    # Decode token to see payload
    $tokenParts = $response.token.Split('.')
    $payload = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($tokenParts[1] + "=="))
    Write-Host "Token Payload: $payload" -ForegroundColor Cyan
    
} catch {
    Write-Host "LOGIN FAILED" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Yellow
    if ($_.ErrorDetails.Message) {
        Write-Host "Response: $($_.ErrorDetails.Message)" -ForegroundColor Yellow
    }
}
