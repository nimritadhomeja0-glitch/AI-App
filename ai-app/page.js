"use client";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!prompt.trim()) return;
    setLoading(true);
    setReply("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setReply(data.reply ?? data.error ?? "No reply");
    } catch (e) {
      setReply("Request failed: " + e.message);
    }
    setLoading(false);
  }

  return (
    <div style={{ padding: 24, maxWidth: 800, margin: "0 auto" }}>
      <h1>AI Chatbot</h1>
      <textarea
        rows={5}
        style={{ width: "100%", fontSize: 16, padding: 8 }}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask anything..."
      />
      <div style={{ marginTop: 8 }}>
        <button onClick={sendMessage} disabled={loading || !prompt.trim()}>
          {loading ? "Thinking…" : "Send"}
        </button>
      </div>

      <h3>Reply</h3>
      <div style={{ whiteSpace: "pre-wrap", background: "#f7f7f7", padding: 12 }}>
        {reply || <em>No reply yet</em>}
      </div>
    </div>
  );
}
