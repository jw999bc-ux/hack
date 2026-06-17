# 🔓 Vulnerable Login Lab

**Educational Purpose Only** - This is an intentionally vulnerable web application designed for security testing and learning.

## ⚠️ Vulnerabilities Included

This lab contains **15+ intentional security flaws** for you to discover and exploit:

### Authentication & Authorization
1. **SQL Injection** - Hardcoded credentials, vulnerable query concatenation
2. **Weak Token Validation** - Token only checks for "admin" substring
3. **Information Disclosure** - Error messages reveal user existence
4. **Hardcoded Credentials** - Credentials stored directly in code

### Web Vulnerabilities  
5. **Reflected XSS** - `/search?q=` endpoint reflects user input without escaping
6. **CORS Misconfiguration** - Allows requests from any origin
7. **Open Redirect** - `/redirect?url=` redirects to any URL without validation
8. **Path Traversal** - `/files/:filename` allows directory traversal

### Additional Issues
9. **Missing Input Validation** - No sanitization of user inputs
10. **Information Leakage** - Sensitive data in responses
11. **Weak Authentication Logic** - Case-insensitive username matching

## 🚀 Quick Start

### Installation
```bash
npm install
```

### Run the Application
```bash
npm start
```

The app will be available at `http://localhost:3000`

## 🎯 Attack Scenarios

### Attack #1: SQL Injection
**Try these credentials:**
- Username: `admin' OR '1'='1`
- Password: anything

### Attack #2: Bypass with Weak Token
**Curl command:**
```bash
curl -H "Authorization: Bearer admin_token" http://localhost:3000/api/admin
```

### Attack #3: Reflected XSS
Visit: `http://localhost:3000/search?q=<img src=x onerror="alert('XSS')">`

### Attack #4: Open Redirect
Visit: `http://localhost:3000/redirect?url=https://evil.com`

## 📋 Default Credentials

- **Admin**: `admin` / `admin123`
- **User**: `user` / `password`
- **Test**: `test` / `test`

## 🔐 Learning Objectives

- Understand how SQL injection works
- Learn token-based authentication flaws
- Identify XSS vulnerabilities
- Recognize information disclosure
- Practice responsible penetration testing

## ⚖️ Legal Notice

This application is for **educational purposes only**. Use it only:
- In your own lab environment
- On your own servers
- For authorized security testing
- Never on production systems without permission

## 🛡️ Secure Version

After testing, learn how to fix these vulnerabilities by checking out the secure-branch with:
- Parameterized queries
- Input validation and sanitization
- Proper token validation with JWT
- CSP headers to prevent XSS
- Secure CORS configuration

---

**Happy Hacking! (Responsibly)** 🎓