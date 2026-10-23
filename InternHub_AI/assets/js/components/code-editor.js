/* InternHub AI - Simulated Code Submitter & Syntax Previewer */

const CodeEditor = {
  init(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="code-box">
        <div class="code-header">
          <span>cache_manager.py — Live Code Submitter</span>
          <div style="display:flex; align-items:center; gap:0.75rem;">
            <button class="btn btn-ghost btn-sm" id="copyCodeBtn" style="font-size:0.75rem; padding:0.25rem 0.5rem; color:var(--text-secondary);">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              Copy Code
            </button>
            <span style="color:var(--color-secondary);">Python 3.11</span>
          </div>
        </div>
        <div style="padding:1rem;">
          <textarea id="liveCodeInput" class="form-textarea" style="font-family:var(--font-mono); background:#050811; color:#F8FAFC; min-height:220px; font-size:0.875rem; border-color:#1E293B; user-select:text;" spellcheck="false">
import redis
import logging

class RedisCacheEngine:
    def __init__(self, host='localhost', port=6379, max_connections=50):
        self.pool = redis.ConnectionPool(host=host, port=port, max_connections=max_connections)
        self.client = redis.Redis(connection_pool=self.pool)
        logging.info("Redis cache pool initialized successfully.")

    def get_cache(self, key: str):
        try:
            val = self.client.get(key)
            return val.decode('utf-8') if val else None
        except Exception as e:
            logging.error(f"Cache miss or connection failure: {e}")
            return None

    def set_cache(self, key: str, value: str, ttl: int = 3600):
        return self.client.setex(key, ttl, value)
          </textarea>
        </div>
        <div style="padding:0.75rem 1rem; background:#0F172A; border-top:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center;">
          <span style="font-size:0.75rem; color:var(--text-muted);">Lines: 22 | Syntax: Valid</span>
          <button class="btn btn-secondary btn-sm" id="runAiScanBtn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
            Trigger AI Code Audit
          </button>
        </div>
      </div>
    `;

    document.getElementById('copyCodeBtn')?.addEventListener('click', () => {
      const codeText = document.getElementById('liveCodeInput')?.value || '';
      navigator.clipboard.writeText(codeText).then(() => {
        Toast.show({ title: "Copied to Clipboard", message: "Code copied successfully!", type: "success" });
      }).catch(() => {
        Toast.show({ title: "Copied", message: "Code copied to clipboard.", type: "success" });
      });
    });

    document.getElementById('runAiScanBtn')?.addEventListener('click', () => {
      Toast.show({
        title: "AI Analysis Complete",
        message: "Code quality score: 94/100. Redirecting to feedback breakdown...",
        type: "success"
      });
      setTimeout(() => {
        window.location.href = "../student/ai-feedback.html";
      }, 1500);
    });
  }
};

if (typeof window !== 'undefined') {
  window.CodeEditor = CodeEditor;
}
