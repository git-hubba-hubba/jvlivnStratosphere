// AnswerModal.jsx

import React from "react";

const AnswerModal = ({ isOpen, onClose, code }) => {
  if (!isOpen) return null;

  // Auto-format incoming JS code
  const formatCode = (input) => {
    try {
      // Basic indentation formatter
      let indentLevel = 0;

      return input
        .replace(/;/g, ";\n")
        .replace(/{/g, "{\n")
        .replace(/}/g, "\n}\n")
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
          if (line.includes("}")) indentLevel--;

          const formatted =
            "  ".repeat(Math.max(indentLevel, 0)) + line;

          if (line.includes("{")) indentLevel++;

          return formatted;
        })
        .join("\n");
    } catch (err) {
      return input;
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2 style={styles.title}>Solution</h2>

          <button style={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>

        <pre style={styles.codeBlock}>
          <code>{formatCode(code)}</code>
        </pre>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },

  modal: {
    width: "80%",
    maxWidth: "900px",
    maxHeight: "80vh",
    overflowY: "auto",
    backgroundColor: "#1e1e1e",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 0 25px rgba(0,0,0,0.4)",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  title: {
    color: "#fff",
    margin: 0,
  },

  closeBtn: {
    background: "transparent",
    border: "none",
    color: "#fff",
    fontSize: "22px",
    cursor: "pointer",
  },

  codeBlock: {
    backgroundColor: "#111",
    color: "#00ff99",
    padding: "20px",
    borderRadius: "10px",
    overflowX: "auto",
    fontSize: "14px",
    lineHeight: "1.6",
    fontFamily: "monospace",
    whiteSpace: "pre-wrap",
  },
};

export default AnswerModal;