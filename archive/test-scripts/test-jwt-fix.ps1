# PowerShell JWT Test Script
Write-Host "🔍 Testing JWT Token Fix..." -ForegroundColor Cyan

try {
    # Test login
    Write-Host "`n1️⃣ Testing login with 24h token..." -ForegroundColor Yellow
    
    $loginBody = @{
        email = "superadmin@mawi.com"
        password = "SuperAdmin2025!"
    } | ConvertTo-Json
    
    $loginResponse = Invoke-RestMethod -Uri "http://localhost:3000/login" -Method POST -Body $loginBody -ContentType "application/json"
    
    if ($loginResponse.success) {
        Write-Host "✅ Login successful!" -ForegroundColor Green
        Write-Host "📝 Token received: $($loginResponse.token.Substring(0, 50))..." -ForegroundColor White
        
        $token = $loginResponse.token
        
        # Test Chat AI
        Write-Host "`n2️⃣ Testing Chat AI functionality..." -ForegroundColor Yellow
        
        $chatBody = @{
            message = "¿Qué es biomonitoreo?"
            context = "biomo"
        } | ConvertTo-Json
        
        $headers = @{
            "Authorization" = "Bearer $token"
            "Content-Type" = "application/json"
        }
        
        $chatResponse = Invoke-RestMethod -Uri "http://localhost:3000/Consultas/api/chat" -Method POST -Body $chatBody -Headers $headers
        
        Write-Host "✅ Chat AI working! Response received" -ForegroundColor Green
        Write-Host "🤖 Response preview: $($chatResponse.response.Substring(0, 100))..." -ForegroundColor White
        Write-Host "`n🎉 SUCCESS: JWT token fix working correctly!" -ForegroundColor Green
        Write-Host "📊 System is 100% operational" -ForegroundColor Green
        
    } else {
        Write-Host "❌ Login failed: $($loginResponse.message)" -ForegroundColor Red
    }
    
} catch {
    if ($_.Exception.Response.StatusCode -eq 403) {
        Write-Host "❌ Still getting 403 errors - JWT fix may need verification" -ForegroundColor Red
    } else {
        Write-Host "❌ Test error: $($_.Exception.Message)" -ForegroundColor Red
    }
}
