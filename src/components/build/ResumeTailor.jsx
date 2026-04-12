import { useState, useRef, useCallback } from "react";
import Namespace from '../general/Namespace'
// ─── Styles ────────────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@300;400;500&display=swap');

  .rt-root {
    --ink: #1a1a1a;
    --paper: #f5f0e8;
    --cream: #ede8de;
    --accent: #b5451b;
    --accent-light: #e8b49a;
    --muted: #7a7060;
    --border: #d4cfc4;
    --success: #2d6a4f;

    font-family: 'DM Mono', monospace;
    background: var(--paper);
    color: var(--ink);
    min-height: 100vh;
    padding: 0;
  }

  .rt-app {
    max-width: 900px;
    margin: 0 auto;
    padding: 48px 24px;
  }

  /* Header */
  .rt-header { text-align: center; margin-bottom: 52px; }
  .rt-header h1 {
    font-family: 'DM Serif Display', serif;
    font-size: 3rem;
    color: var(--ink);
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin: 0;
  }
  .rt-header h1 em { font-style: italic; color: var(--accent); }
  .rt-header p {
    font-size: 0.8rem;
    color: var(--muted);
    margin-top: 12px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  .rt-divider {
    width: 60px; height: 2px;
    background: var(--accent);
    margin: 16px auto;
  }

  /* Grid */
  .rt-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-bottom: 28px;
  }
  @media (max-width: 600px) {
    .rt-grid { grid-template-columns: 1fr; }
    .rt-header h1 { font-size: 2.2rem; }
  }

  /* Panel */
  .rt-panel {
    background: white;
    border: 1px solid var(--border);
    border-radius: 2px;
    overflow: hidden;
    box-shadow: 3px 3px 0 var(--border);
  }
  .rt-panel-header {
    background: var(--ink);
    color: var(--paper);
    padding: 12px 18px;
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .rt-panel-num {
    background: var(--accent);
    color: white;
    width: 20px; height: 20px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.65rem; font-weight: 500;
  }
  .rt-panel-body { padding: 20px; }

  /* Drop zone */
  .rt-drop-zone {
    border: 2px dashed var(--border);
    border-radius: 2px;
    padding: 32px 20px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s;
    background: var(--cream);
    position: relative;
  }
  .rt-drop-zone:hover, .rt-drop-zone.dragover {
    border-color: var(--accent);
    background: #fdf5f0;
  }
  .rt-drop-zone input {
    position: absolute; inset: 0;
    opacity: 0; cursor: pointer;
    width: 100%; height: 100%;
  }
  .rt-drop-icon { font-size: 2rem; margin-bottom: 10px; display: block; }
  .rt-drop-label { font-size: 0.72rem; color: var(--muted); letter-spacing: 0.05em; line-height: 1.6; }
  .rt-drop-label strong { color: var(--accent); display: block; font-size: 0.78rem; margin-bottom: 4px; }
  .rt-file-tag {
    display: inline-flex; align-items: center; gap: 6px;
    background: #eef7f2; border: 1px solid #9dd4b5;
    color: var(--success);
    padding: 5px 10px; border-radius: 2px;
    font-size: 0.68rem; margin-top: 10px; letter-spacing: 0.04em;
  }

  /* Textarea */
  .rt-textarea {
    width: 100%; min-height: 140px;
    border: 2px solid var(--border);
    border-radius: 2px;
    padding: 14px;
    font-family: 'DM Mono', monospace;
    font-size: 0.72rem;
    color: var(--ink);
    background: var(--cream);
    resize: vertical;
    transition: border-color 0.2s;
    line-height: 1.7;
    box-sizing: border-box;
  }
  .rt-textarea:focus {
    outline: none;
    border-color: var(--accent);
    background: white;
  }
  .rt-textarea::placeholder { color: var(--muted); opacity: 0.7; }

  /* Generate button */
  .rt-generate-btn {
    width: 100%; padding: 18px;
    background: var(--ink); color: var(--paper);
    border: none; border-radius: 2px;
    font-family: 'DM Mono', monospace;
    font-size: 0.78rem; letter-spacing: 0.12em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 4px 4px 0 var(--accent);
    position: relative; overflow: hidden;
  }
  .rt-generate-btn:hover:not(:disabled) {
    background: var(--accent);
    box-shadow: 4px 4px 0 var(--ink);
    transform: translate(-1px, -1px);
  }
  .rt-generate-btn:disabled { opacity: 0.5; cursor: not-allowed; box-shadow: none; }
  .rt-generate-btn.loading::after {
    content: '';
    position: absolute; bottom: 0; left: -100%;
    width: 100%; height: 2px;
    background: var(--accent-light);
    animation: rt-progress 2s ease-in-out infinite;
  }
  @keyframes rt-progress { to { left: 100%; } }

  /* Status bar */
  .rt-status-bar {
    background: var(--cream); border: 1px solid var(--border);
    border-radius: 2px; padding: 10px 16px;
    font-size: 0.68rem; color: var(--muted);
    letter-spacing: 0.05em; margin-bottom: 20px;
    display: flex; align-items: center; gap: 8px;
    animation: rt-fadeIn 0.3s ease;
  }
  .rt-status-bar.thinking { color: var(--accent); border-color: var(--accent-light); background: #fdf5f0; }
  .rt-status-bar.done { color: var(--success); border-color: #9dd4b5; background: #eef7f2; }
  @keyframes rt-fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }

  .rt-spinner {
    width: 12px; height: 12px;
    border: 2px solid currentColor;
    border-top-color: transparent;
    border-radius: 50%;
    animation: rt-spin 0.7s linear infinite;
    flex-shrink: 0;
  }
  @keyframes rt-spin { to { transform: rotate(360deg); } }

  /* Error bar */
  .rt-error-bar {
    background: #fff0ee; border: 1px solid #f4a89a; color: #8b2500;
    padding: 10px 16px; border-radius: 2px;
    font-size: 0.7rem; letter-spacing: 0.04em;
    margin-bottom: 16px;
    animation: rt-fadeIn 0.3s ease;
  }

  /* Result panel */
  .rt-result-panel {
    background: white; border: 1px solid var(--border);
    border-radius: 2px; overflow: hidden;
    box-shadow: 3px 3px 0 var(--border);
    margin-top: 32px;
    animation: rt-slideUp 0.4s ease;
  }
  @keyframes rt-slideUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

  .rt-result-header {
    background: var(--success); color: white;
    padding: 14px 20px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .rt-result-header-left {
    font-size: 0.7rem; letter-spacing: 0.1em;
    text-transform: uppercase;
    display: flex; align-items: center; gap: 8px;
  }
  .rt-download-btn {
    padding: 8px 18px;
    background: white; color: var(--success);
    border: none; border-radius: 2px;
    font-family: 'DM Mono', monospace;
    font-size: 0.68rem; letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer; transition: all 0.2s; font-weight: 500;
    display: flex; align-items: center; gap: 6px;
  }
  .rt-download-btn:hover { background: var(--ink); color: white; }

  .rt-result-body {
    padding: 28px 32px;
    max-height: 500px;
    overflow-y: auto;
  }
  .rt-result-body::-webkit-scrollbar { width: 4px; }
  .rt-result-body::-webkit-scrollbar-track { background: var(--cream); }
  .rt-result-body::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }

  .rt-resume-content {
    font-family: 'DM Mono', monospace;
    font-size: 0.73rem;
    line-height: 1.85;
    color: var(--ink);
    white-space: pre-wrap;
  }
`;

// ─── PDF Download helper (no external library needed for plain text) ──────────
function downloadAsPDF(text) {
  // Dynamically load jsPDF from CDN if not already present
  if (window.jspdf) {
    generatePDF(text);
    return;
  }
  const script = document.createElement("script");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
  script.onload = () => generatePDF(text);
  document.head.appendChild(script);
}

function generatePDF(text) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const margin = 60;
  const usableWidth = doc.internal.pageSize.getWidth() - margin * 2;
  const lineHeight = 14;
  const pageHeight = doc.internal.pageSize.getHeight();
  let y = margin;

  doc.setFont("Courier", "normal");
  doc.setFontSize(10);

  const lines = doc.splitTextToSize(text, usableWidth);
  lines.forEach((line) => {
    if (y + lineHeight > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
    const isSectionHeader =
      /^[A-Z\s&]+$/.test(line.trim()) && line.trim().length > 2;
    doc.setFont("Courier", isSectionHeader ? "bold" : "normal");
    doc.text(line, margin, y);
    y += lineHeight;
  });

  doc.save("tailored-resume.pdf");
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function ResumeTailor() {
  const [resumeText, setResumeText] = useState("");
  const [fileName, setFileName] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [status, setStatus] = useState(null); // { msg, type }
  const [error, setError] = useState("");
  const [tailoredResume, setTailoredResume] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const resultRef = useRef(null);

  // Inject styles once
  if (typeof document !== "undefined" && !document.getElementById("rt-styles")) {
    const tag = document.createElement("style");
    tag.id = "rt-styles";
    tag.textContent = styles;
    document.head.appendChild(tag);
  }

  const parseFile = useCallback(async (file) => {
    const ext = file.name.split(".").pop().toLowerCase();
    setFileName(file.name);
    setError("");

    if (ext === "txt") {
      setResumeText(await file.text());
    } else if (ext === "docx") {
      try {
        // Dynamically load mammoth
        if (!window.mammoth) {
          await new Promise((res, rej) => {
            const s = document.createElement("script");
            s.src =
              "https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js";
            s.onload = res;
            s.onerror = rej;
            document.head.appendChild(s);
          });
        }
        const buf = await file.arrayBuffer();
        const result = await window.mammoth.extractRawText({ arrayBuffer: buf });
        setResumeText(result.value);
      } catch {
        setError("Could not parse .docx — try saving as .txt.");
      }
    } else if (ext === "pdf") {
      setResumeText(
        "[PDF uploaded — for best results use .txt or .docx format.]"
      );
      setError("PDF text extraction is limited in browser. Use .txt or .docx for best results.");
    } else {
      setResumeText(await file.text());
    }
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragOver(false);
      if (e.dataTransfer.files[0]) parseFile(e.dataTransfer.files[0]);
    },
    [parseFile]
  );

  const handleFileChange = (e) => {
    if (e.target.files[0]) parseFile(e.target.files[0]);
  };

  const generateResume = async () => {
    setError("");
    if (!resumeText) return setError("Please upload your resume first.");
    if (!jobDesc.trim()) return setError("Please paste the job description.");

    setLoading(true);
    setTailoredResume("");
    setStatus({ msg: "Reading your resume and job description...", type: "thinking" });

    const prompt = `You are an expert resume writer and career coach. Tailor the provided resume specifically for the given job description.

ORIGINAL RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDesc}

Instructions:
1. Rewrite the resume to align with the job description's keywords, skills, and requirements
2. Keep all factual information accurate — do NOT invent experience or credentials
3. Reorder and emphasize bullet points most relevant to this role
4. Use keywords from the job description naturally throughout
5. Adjust the professional summary/objective to target this specific role
6. Maintain a clean, professional resume format
7. Output ONLY the tailored resume text — no commentary, no preamble

Format with sections: Name & Contact, Professional Summary, Experience, Skills, Education (as applicable from the original).`;

    try {
      setStatus({ msg: "Claude is tailoring your resume to the role...", type: "thinking" });

      const response = await fetch("http://localhost:3001/api/anthropic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || "API error");

      const result = data.content.map((b) => b.text || "").join("\n");
      setTailoredResume(result);
      setStatus({ msg: "Resume tailored successfully!", type: "done" });
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      setError("Something went wrong: " + err.message);
      setStatus(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rt-root">
      <div className="rt-app">
        {/* Header */}
        <div className="rt-header">
          <h1>
            Resume <em>Tailor</em>
          </h1>
          <div className="rt-divider" />
          <Namespace />
        </div>

        {/* Input Grid */}
        <div className="rt-grid">
          {/* Resume Upload */}
          <div className="rt-panel">
            <div className="rt-panel-header">
              <div className="rt-panel-num">1</div>
              Your Resume
            </div>
            <div className="rt-panel-body">
              <div
                className={`rt-drop-zone${dragOver ? " dragover" : ""}`}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".txt,.pdf,.doc,.docx"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <span className="rt-drop-icon">📄</span>
                <div className="rt-drop-label">
                  <strong>Upload Resume</strong>
                  .txt · .docx · .pdf
                </div>
              </div>
              {fileName && (
                <div style={{ textAlign: "center" }}>
                  <span className="rt-file-tag">✓ {fileName}</span>
                </div>
              )}
            </div>
          </div>

          {/* Job Description */}
          <div className="rt-panel">
            <div className="rt-panel-header">
              <div className="rt-panel-num">2</div>
              Job Description
            </div>
            <div className="rt-panel-body">
              <textarea
                className="rt-textarea"
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                placeholder="Paste the job description here — title, responsibilities, required skills, company details..."
              />
            </div>
          </div>
        </div>

        {/* Error */}
        {error && <div className="rt-error-bar">⚠ {error}</div>}

        {/* Status */}
        {status && (
          <div className={`rt-status-bar ${status.type}`}>
            {status.type === "thinking" && <div className="rt-spinner" />}
            {status.type === "done" && <span>✓</span>}
            <span>{status.msg}</span>
          </div>
        )}

        {/* Generate Button */}
        <button
          className={`rt-generate-btn${loading ? " loading" : ""}`}
          onClick={generateResume}
          disabled={loading}
        >
          {loading ? "⟳  Tailoring your resume..." : "✦   Tailor My Resume"}
        </button>

        {/* Result */}
        {tailoredResume && (
          <div className="rt-result-panel" ref={resultRef}>
            <div className="rt-result-header">
              <div className="rt-result-header-left">✓ &nbsp; Tailored Resume Ready</div>
              <button
                className="rt-download-btn"
                onClick={() => downloadAsPDF(tailoredResume)}
              >
                ⬇ Download PDF
              </button>
            </div>
            <div className="rt-result-body">
              <pre className="rt-resume-content">{tailoredResume}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
