/* InternHub AI - SVG Chart Rendering Component */

const Chart = {
  renderLineChart(containerId, dataPoints = [40, 55, 65, 80, 85, 92, 94], labels = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7']) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = 220;
    const padding = 30;

    const maxVal = 100;
    const minVal = 0;

    const points = dataPoints.map((val, idx) => {
      const x = padding + (idx * ((width - 2 * padding) / (dataPoints.length - 1)));
      const y = height - padding - ((val - minVal) / (maxVal - minVal)) * (height - 2 * padding);
      return { x, y, val, label: labels[idx] };
    });

    const pathD = points.reduce((acc, pt, idx) => {
      return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
    }, '');

    const areaD = `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

    let circlesSvg = points.map(pt => `
      <circle cx="${pt.x}" cy="${pt.y}" r="5" fill="#06B6D4" stroke="#0F172A" stroke-width="2">
        <title>${pt.label}: ${pt.val}%</title>
      </circle>
    `).join('');

    let labelsSvg = points.map(pt => `
      <text x="${pt.x}" y="${height - 8}" font-size="11" fill="#64748B" text-anchor="middle">${pt.label}</text>
    `).join('');

    container.innerHTML = `
      <svg width="100%" height="${height}" viewBox="0 0 ${width} ${height}" style="overflow:visible;">
        <defs>
          <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#06B6D4" stop-opacity="0.35"/>
            <stop offset="100%" stop-color="#2563EB" stop-opacity="0.0"/>
          </linearGradient>
        </defs>

        <!-- Background grid lines -->
        <line x1="${padding}" y1="${padding}" x2="${width - padding}" y2="${padding}" stroke="rgba(255,255,255,0.05)" stroke-dasharray="4"/>
        <line x1="${padding}" y1="${height/2}" x2="${width - padding}" y2="${height/2}" stroke="rgba(255,255,255,0.05)" stroke-dasharray="4"/>
        <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke="rgba(255,255,255,0.1)"/>

        <!-- Gradient Area -->
        <path d="${areaD}" fill="url(#chartGlow)"/>

        <!-- Smooth Curve Line -->
        <path d="${pathD}" fill="none" stroke="#06B6D4" stroke-width="3.5" stroke-linecap="round"/>

        <!-- Data Points & Labels -->
        ${circlesSvg}
        ${labelsSvg}
      </svg>
    `;
  },

  renderDonutGauge(containerId, score = 92) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const size = 160;
    const strokeWidth = 14;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    container.innerHTML = `
      <div style="position:relative; width:${size}px; height:${size}px; margin:0 auto;">
        <svg width="${size}" height="${size}">
          <circle cx="${size/2}" cy="${size/2}" r="${radius}" fill="none" stroke="#1E293B" stroke-width="${strokeWidth}"/>
          <circle cx="${size/2}" cy="${size/2}" r="${radius}" fill="none" stroke="url(#donutGradient)" stroke-width="${strokeWidth}"
                  stroke-dasharray="${circumference}" stroke-dashoffset="${strokeDashoffset}" stroke-linecap="round"
                  transform="rotate(-90 ${size/2} ${size/2})" style="transition: stroke-dashoffset 1s ease;">
          </circle>
          <defs>
            <linearGradient id="donutGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#2563EB"/>
              <stop offset="100%" stop-color="#06B6D4"/>
            </linearGradient>
          </defs>
        </svg>
        <div style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center;">
          <span style="font-size:2.2rem; font-weight:800; font-family:var(--font-heading); color:#FFF;">${score}</span>
          <span style="font-size:0.75rem; color:var(--text-muted); font-weight:600;">AI QUALITY</span>
        </div>
      </div>
    `;
  }
};

if (typeof window !== 'undefined') {
  window.Chart = Chart;
}
