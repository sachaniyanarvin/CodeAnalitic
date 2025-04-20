import React, { useState, useEffect, useCallback } from 'react';
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-javascript";
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import './App.css';

function App() {
  const [review, setReview] = useState('');
  const [code, setCode] = useState('function sum() {\n  return 1 + 1;\n}');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const highlightCode = useCallback((code) => {
    return highlight(code, languages.javascript, 'javascript');
  }, []);

  useEffect(() => {
    highlightCode(code);
  }, [code, highlightCode]);

  async function codeReview() {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.post('http://localhost:5000/ai/get-review', { code });
      setReview(response.data);
    } catch (err) {
      setError(err.message || 'An error occurred while getting the review');
      console.error('Review error:', err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main>
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={highlightCode}
            padding={10}
            style={{
              fontFamily: '"Fira Code", "Fira Mono", monospace',
              fontSize: 16,
              border: "1px solid #ddd",
              borderRadius: "5px",
              height: "100%",
              width: "100%"
            }}
          />
        </div>
        <button
          onClick={codeReview}
          className="review"
          disabled={isLoading}
        >
          {isLoading ? 'Reviewing...' : 'Review'}
        </button>
      </div>
      <div className="right">
        {error && <div className="error">{error}</div>}
        <Markdown rehypePlugins={[rehypeHighlight]}>
          {review}
        </Markdown>
      </div>
    </main>
  );
}

export default App;
