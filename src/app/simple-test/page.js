
'use client';
import { useState } from 'react';

export default function SimpleTest() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [file, setFile] = useState(null);

    const handleAnalyze = async () => {
        if (!file) {
            setError('Please upload a PDF file');
            return;
        }

        setLoading(true);
        setError('');
        setResult(null);

        try {
            const formData = new FormData();
            formData.append('file', file);

            // No header needed, backend uses process.env.GOOGLE_API_KEY
            const res = await fetch('/api/analyze', {
                method: 'POST',
                body: formData
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Analysis failed');
            }

            setResult(data);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ backgroundColor: 'white', color: 'black', minHeight: '100vh', padding: '50px', fontFamily: 'sans-serif' }}>
            <h1>Simple PDF Analysis</h1>

            <div style={{ border: '2px solid black', padding: '20px', margin: '20px 0', borderRadius: '8px' }}>
                <h3>1. Upload Resume</h3>
                <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ marginBottom: '20px', display: 'block' }}
                />
            </div>

            <button
                onClick={handleAnalyze}
                disabled={loading}
                style={{
                    padding: '12px 24px',
                    background: loading ? '#ccc' : 'blue',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontSize: '16px'
                }}>
                {loading ? 'Analyzing...' : 'Run Analysis'}
            </button>

            {error && (
                <div style={{ marginTop: '20px', padding: '15px', background: '#fee2e2', color: '#dc2626', borderRadius: '4px' }}>
                    <strong>Error:</strong> {error}
                </div>
            )}

            {result && (
                <div style={{ marginTop: '30px', padding: '20px', background: '#f8fafc', border: '1px solid #ccc', borderRadius: '8px' }}>
                    <h3>Analysis Result (from Gemini)</h3>
                    <pre style={{ background: '#1e293b', color: '#a5f3fc', padding: '15px', overflowX: 'auto', borderRadius: '4px' }}>
                        {JSON.stringify(result, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
}
