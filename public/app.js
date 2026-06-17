document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('error');
    
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Store token in localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);
            
            errorDiv.innerHTML = '';
            
            if (data.role === 'admin') {
                alert('✓ Admin access granted! Redirecting to admin panel...');
                window.location.href = '/admin';
            } else {
                alert('✓ Login successful!');
                window.location.href = '/user-dashboard';
            }
        } else {
            errorDiv.innerHTML = '❌ ' + (data.error || 'Login failed');
        }
    } catch (error) {
        errorDiv.innerHTML = '❌ Connection error: ' + error.message;
    }
});