
'use client';
import { useState } from 'react';

export default function PdfTestPage() {
    const [file, setFile] = useState(null);
    const [apiKey, setApiKey] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

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

            const headers = {};
            if (apiKey) {
                headers['x-gemini-api-key'] = apiKey;
            }

            const res = await fetch('/api/analyze', {
                method: 'POST',
                headers: headers, // Do NOT set Content-Type, fetch sets it for FormData
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
        <div style={{
            padding: '40px',
            maxWidth: '800px',
            margin: '0 auto',
            fontFamily: 'sans-serif',
            color: '#000', // Force black text for this test page
            backgroundColor: '#fff', // Force white background
            minHeight: '100vh'
        }}>
            <h1 style={{ fontSize: '24px', marginBottom: '20px', color: '#000' }}>PDF Reader & Gemini Agent Test</h1>

            <div style={{ marginBottom: '20px', padding: '20px', border: '2px solid #000', borderRadius: '8px' }}>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>1. Upload Resume (PDF)</label>
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setFile(e.target.files[0])}
                        style={{
                            display: 'block',
                            padding: '10px',
                            border: '1px solid #000',
                            width: '100%',
                            backgroundColor: '#f0f0f0',
                            color: '#000'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>2. Gemini API Key (Optional)</label>
                    <input
                        type="text"
                        placeholder="Enter your API Key here..."
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '12px',
                            border: '1px solid #000',
                            borderRadius: '4px',
                            color: '#000',
                            backgroundColor: '#fff',
                            fontSize: '16px'
                        }}
                    />
                    <small style={{ color: '#666', display: 'block', marginTop: '5px' }}>
                        If this box is not working, please check if your browser disables javascript or has overlay plugins.
                    </small>
                </div>

                <button
                    onClick={handleAnalyze}
                    disabled={loading}
                    style={{
                        padding: '12px 24px',
                        backgroundColor: loading ? '#ccc' : '#0070f3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        fontSize: '16px',
                        fontWeight: 'bold'
                    }}
                >
                    {loading ? 'Analyzing...' : 'Run Analysis'}
                </button>
            </div>

            {error && (
                <div style={{
                    padding: '15px',
                    backgroundColor: '#fee2e2',
                    color: '#dc2626',
                    border: '1px solid #dc2626',
                    borderRadius: '8px',
                    marginBottom: '20px'
                }}>
                    <strong>Error:</strong> {error}
                </div>
            )}

            {result && (
                <div style={{ padding: '20px', border: '1px solid #000', borderRadius: '8px', backgroundColor: '#f8fafc' }}>
                    <h2 style={{ fontSize: '18px', marginBottom: '10px', color: '#000' }}>Analysis Result</h2>
                    <pre style={{
                        backgroundColor: '#1e293b',
                        color: '#a5f3fc',
                        padding: '15px',
                        borderRadius: '6px',
                        overflowX: 'auto',
                        fontSize: '14px'
                    }}>
                        {JSON.stringify(result, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
}
