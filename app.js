// Vulnerable login application for security lab testing
// This code contains intentional vulnerabilities for educational purposes

const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// VULNERABILITY #1: Hardcoded credentials in code (never do this in production!)
const users = {
    'admin': 'admin123',
    'user': 'password',
    'test': 'test'
};

const adminPanel = {
    secret_data: 'FLAG{SQL_Injection_is_Dangerous_XSS_Too}',
    database_config: {
        host: 'localhost',
        user: 'root',
        password: 'root_password_12345'
    },
    api_keys: [
        'sk_live_abc123def456',
        'sk_test_xyz789uvw012'
    ]
};

// VULNERABILITY #2: SQL Injection (simulated with string concatenation)
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    
    // VULNERABILITY #3: No input validation
    if (!username || !password) {
        return res.status(400).json({ error: 'Missing credentials' });
    }
    
    // VULNERABILITY #4: SQL Injection - vulnerable query (simulated)
    // In real scenario: "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'"
    // We can bypass this with: admin' OR '1'='1
    
    let query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    
    // Simulate SQL injection vulnerability
    if (username.includes("'") || password.includes("'")) {
        // If someone uses SQL injection syntax, they get admin access
        console.log('SQL Injection detected in query:', query);
        return res.json({ 
            success: true, 
            token: 'admin_token_12345',
            role: 'admin',
            message: 'SQL Injection vulnerability bypassed authentication!'
        });
    }
    
    // Normal authentication (case-insensitive - another vulnerability)
    const user = Object.keys(users).find(u => u.toLowerCase() === username.toLowerCase());
    
    if (user && users[user] === password) {
        return res.json({ 
            success: true, 
            token: 'user_token_' + Math.random().toString(36),
            role: user === 'admin' ? 'admin' : 'user'
        });
    }
    
    // VULNERABILITY #5: Information disclosure - revealing whether user exists
    if (Object.keys(users).includes(username)) {
        return res.status(401).json({ error: 'Invalid password' });
    }
    
    return res.status(401).json({ error: 'User not found' });
});

// VULNERABILITY #6: No token validation
app.get('/api/admin', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    // VULNERABILITY #7: Weak token validation
    if (token && token.includes('admin')) {
        return res.json(adminPanel);
    }
    
    // VULNERABILITY #8: Information disclosure in error messages
    return res.status(403).json({ 
        error: 'Unauthorized',
        hint: 'You need an admin token. Admin tokens contain "admin" in them.'
    });
});

// VULNERABILITY #9: Path Traversal
app.get('/files/:filename', (req, res) => {
    let filename = req.params.filename;
    
    // VULNERABILITY #10: No path validation
    const filepath = path.join(__dirname, 'uploads', filename);
    res.sendFile(filepath);
});

// VULNERABILITY #11: Reflected XSS
app.get('/search', (req, res) => {
    const query = req.query.q;
    
    // VULNERABILITY #12: Direct HTML concatenation without escaping
    res.send(`
        <html>
            <h1>Search Results for: ${query}</h1>
            <p>Searching for "${query}" in database...</p>
        </html>
    `);
});

// VULNERABILITY #13: Open redirect
app.get('/redirect', (req, res) => {
    const url = req.query.url;
    // VULNERABILITY #14: No URL validation
    res.redirect(url);
});

// VULNERABILITY #15: CORS misconfiguration
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

// Serve login page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Admin panel page (accessible if you get admin token)
app.get('/admin', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Admin Panel</title>
            <style>
                body { font-family: Arial; margin: 40px; }
                .secret { background: #f0f0f0; padding: 20px; border-radius: 5px; }
                h1 { color: #333; }
                .data { background: #fff3cd; padding: 10px; margin: 10px 0; border-radius: 3px; }
            </style>
        </head>
        <body>
            <h1>🔓 Admin Panel</h1>
            <p>You successfully bypassed authentication!</p>
            <div class="secret">
                <h2>Protected Data:</h2>
                <div class="data">
                    <strong>Secret Flag:</strong> FLAG{SQL_Injection_is_Dangerous_XSS_Too}
                </div>
                <div class="data">
                    <strong>Database Host:</strong> localhost
                </div>
                <div class="data">
                    <strong>API Keys:</strong>
                    <ul>
                        <li>sk_live_abc123def456</li>
                        <li>sk_test_xyz789uvw012</li>
                    </ul>
                </div>
            </div>
            <button onclick="fetch('/api/admin', {headers: {'Authorization': 'Bearer admin_token_12345'}}).then(r => r.json()).then(d => alert(JSON.stringify(d, null, 2)))">Fetch Admin Data via API</button>
        </body>
        </html>
    `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Vulnerable app running on http://localhost:${PORT}`);
    console.log('Warning: This application contains intentional security vulnerabilities for lab testing only!');
});