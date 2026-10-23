/* InternHub AI - Slide-Out Intern Drawer Controller */

const Drawer = {
  init() {
    this.createOverlay();
    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-drawer-close]')) {
        this.close();
      }
      if (e.target.classList.contains('drawer-overlay')) {
        this.close();
      }
    });
  },

  createOverlay() {
    if (!document.querySelector('.drawer-overlay')) {
      const overlay = document.createElement('div');
      overlay.className = 'drawer-overlay';
      overlay.innerHTML = `
        <div class="drawer-panel" id="appDrawerPanel">
          <div class="drawer-header">
            <h3 class="drawer-title" id="drawerTitle">Intern Details</h3>
            <button class="btn btn-ghost btn-sm" data-drawer-close>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <div class="drawer-body" id="drawerBody">
            <!-- Content dynamically injected -->
          </div>
        </div>
      `;
      document.body.appendChild(overlay);
    }
  },

  openStudentProfile(studentId) {
    this.init();
    const student = window.InternHubData?.interns.find(i => i.id === studentId) || window.InternHubData?.interns[0];
    const overlay = document.querySelector('.drawer-overlay');
    const drawerTitle = document.getElementById('drawerTitle');
    const drawerBody = document.getElementById('drawerBody');

    if (!student || !overlay) return;

    drawerTitle.innerText = `Intern Profile - ${student.name}`;
    drawerBody.innerHTML = `
      <div style="display:flex; align-items:center; gap:1.25rem; margin-bottom:1.5rem; padding-bottom:1.25rem; border-bottom:1px solid var(--border-color);">
        <img src="${student.avatar}" alt="${student.name}" style="width:64px; height:64px; border-radius:50%; object-fit:cover; border:2px solid var(--color-primary);" />
        <div>
          <h3 style="font-size:1.25rem; font-weight:700;">${student.name}</h3>
          <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:0.35rem;">${student.email}</p>
          <div style="display:flex; gap:0.5rem;">
            <span class="badge badge-primary">${student.track}</span>
            <span class="badge ${student.riskLevel === 'High' ? 'badge-danger' : 'badge-success'}">${student.riskLevel} Risk</span>
          </div>
        </div>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-bottom:1.5rem;">
        <div class="glass-card" style="padding:1rem; text-align:center;">
          <span style="font-size:0.75rem; color:var(--text-muted); font-weight:600;">COMPLETED TASKS</span>
          <div style="font-size:1.5rem; font-weight:700; color:var(--text-primary); margin-top:0.25rem;">${student.completedTasks}/${student.totalTasks}</div>
        </div>
        <div class="glass-card" style="padding:1rem; text-align:center;">
          <span style="font-size:0.75rem; color:var(--text-muted); font-weight:600;">AVG AI SCORE</span>
          <div style="font-size:1.5rem; font-weight:700; color:var(--color-secondary); margin-top:0.25rem;">${student.aiScore}/100</div>
        </div>
      </div>

      <h4 style="font-size:1rem; margin-bottom:0.75rem;">AI Co-Mentor Diagnostic Insights</h4>
      <div style="background:var(--bg-primary); padding:1rem; border-radius:var(--radius-md); border:1px solid var(--border-color); margin-bottom:1.5rem;">
        <div style="margin-bottom:0.75rem;">
          <strong style="font-size:0.85rem; color:#4ADE80;">Key Strength:</strong>
          <p style="font-size:0.85rem;">${student.topStrength}</p>
        </div>
        <div>
          <strong style="font-size:0.85rem; color:#F87171;">Area for Improvement:</strong>
          <p style="font-size:0.85rem;">${student.weakness}</p>
        </div>
      </div>

      <h4 style="font-size:1rem; margin-bottom:0.75rem;">Send Direct Mentor Note</h4>
      <div class="form-group">
        <textarea class="form-textarea" placeholder="Write feedback or schedule a 1-on-1 session with ${student.name}..."></textarea>
      </div>
      <button class="btn btn-primary btn-full" onclick="Toast.show({title:'Note Sent', message:'Feedback sent to ${student.name} via email & dashboard.', type:'success'}); Drawer.close();">Send Feedback Note</button>
    `;

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  close() {
    const overlay = document.querySelector('.drawer-overlay');
    if (overlay) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
};

if (typeof window !== 'undefined') {
  window.Drawer = Drawer;
}
