// Native fetch is available in Node 18+

async function testSignup() {
    try {
        const response = await fetch('http://localhost:3000/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: "Node Test",
                email: "node_test_v1@example.com",
                password: "Password123!"
            })
        });

        const data = await response.json();
        console.log('Status:', response.status);
        console.log('Body:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

testSignup();
