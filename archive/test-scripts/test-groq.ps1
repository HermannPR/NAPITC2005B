# Test Groq API with PowerShell
Write-Host "🚀 Testing Groq API..." -ForegroundColor Cyan

$headers = @{
    "Content-Type" = "application/json"
    "Authorization" = "Bearer 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"
}

$body = @{
    model = "meta-llama/llama-4-scout-17b-16e-instruct"
    messages = @(
        @{
            role = "user"
            content = "¿Qué es biomonitoreo ambiental? Responde en español brevemente."
        }
    )
    max_tokens = 150
    temperature = 0.7
} | ConvertTo-Json -Depth 3

try {
    Write-Host "📡 Calling Groq API..." -ForegroundColor Yellow
    
    $response = Invoke-RestMethod -Uri "https://api.groq.com/openai/v1/chat/completions" -Method POST -Headers $headers -Body $body
    
    Write-Host "✅ SUCCESS! Groq API is working!" -ForegroundColor Green
    Write-Host "🤖 Model: $($response.model)" -ForegroundColor White
    Write-Host "💬 Response: $($response.choices[0].message.content)" -ForegroundColor White
    Write-Host "⚡ Tokens Used: $($response.usage.total_tokens)" -ForegroundColor Cyan
    
} catch {
    Write-Host "❌ ERROR: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "📄 Response: $($_.ErrorDetails.Message)" -ForegroundColor Yellow
}
