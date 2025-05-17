import { NextRequest } from "next/server";
import axios from "axios";

export async function GET(
  req: NextRequest,
) {
  const popupId = req.nextUrl.pathname.split("/").pop();

  try {
    const res = await axios.post(`https://tap-feedback.vercel.app/api/popup/get-popup`, {
      popupId,
    });

    const popup = res.data.popup;

    const script = `
(function() {
  const popup = ${JSON.stringify(popup)};
  const popupId = popup.id;

  const div = document.createElement('div');
  div.innerHTML = \`
    <div id="tap-popup" style="
      width: 360px;
      background-color: \${popup.backgroundColor || '#fff'};
      color: \${popup.textColor || '#000'};
      font-family: Inter, sans-serif;
      padding: 20px;
      border-radius: \${popup.borderRadius || 12}px;
      position: fixed;
      bottom: 40px;
      right: 40px;
      z-index: 9999;
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
      border: \${popup.borderWidth || 1}px solid \${popup.borderColor || '#ddd'};
      animation: \${popup.entryAnimation || 'fade-in'} 0.4s ease-out;
      transition: all 0.5s ease;
    ">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div style="font-weight: 600; color: \${popup.titleColor}; font-size: \${popup.titleSize || 16}px;">
          \${popup.title || 'How was your experience?'}
        </div>
        <button onclick="document.getElementById('tap-popup')?.remove()" style="
          background: transparent;
          border: none;
          color: \${popup.titleColor || '#000'};
          font-size: 20px;
          cursor: pointer;
          line-height: 1;
        ">×</button>
      </div>

      <div style="margin: 16px 0 8px;">
        <div style="display: flex; justify-content: space-between; gap: 10px;">
          \${[1, 2, 3, 4, 5].map(i => {
            const emojis = ['😡','😕','😐','🙂','😍'];
            const labels = ['Terrible','Bad','Okay','Good','Excellent'];
            return \`
              <div onclick="setRating(\${i})" style='text-align: center; cursor: pointer; user-select: none; color: #ccc;' data-index="\${i}">
                <div style="font-size: 24px;">\${emojis[i - 1]}</div>
                <div style="font-size: 10px; margin-top: 4px; color: \${popup.titleColor || '#666'};">\${labels[i - 1]}</div>
              </div>
            \`;
          }).join('')}
        </div>
      </div>

      \${popup.showTextInput ? \`
        <textarea id="feedbackText" placeholder="Leave your comments..." style="
          width: 100%;
          padding: 10px;
          margin-top: 10px;
          border-radius: 6px;
          border: 1px solid #ccc;
          background-color: rgba(240,240,240,0.6);
          color: #333;
          resize: vertical;
          height: 60px;
          font-size: 14px;
          font-family: inherit;
        "></textarea>
      \` : ''}

      <button id="submitBtn" disabled style="
        margin-top: 14px;
        width: 100%;
        padding: 10px 16px;
        background-color: \${popup.ctaBackgroundColor || '#000'};
        color: \${popup.ctaTextColor || '#fff'};
        border: none;
        border-radius: 6px;
        cursor: not-allowed;
        font-weight: 600;
        font-size: 14px;
        opacity: 0.6;
      ">
        \${popup.ctaText || 'Submit'}
      </button>
      <div style="margin-top: 5px; font-size: 12px; color: \${popup.titleColor || '#666'}; display: flex; justify-content: center; align-items: center; gap: 4px;">
        <div>Powered by</div>
        <a href="https://tap-feedback.vercel.app" target="_blank" style="font-size: 12px; font-style: italic; font-weight: 600; text-decoration: none; color: \${popup.titleColor || '#666'};">
          Tap Feedback
        </a>
      </div>
    </div>
  \`;

  document.body.appendChild(div);

  let currentRating = 0;
  const stars = div.querySelectorAll('[data-index]');

  window.setRating = function(i) {
    currentRating = i;
    stars.forEach((s, idx) => {
      s.style.color = idx < i ? '#f5a623' : '#ccc';
      s.style.fontWeight = idx < i ? 'bold' : 'normal';
    });
    const btn = document.getElementById('submitBtn');
    if (btn) {
      btn.disabled = false;
      btn.style.cursor = 'pointer';
      btn.style.opacity = '1';
    }
  };

  document.getElementById('submitBtn')?.addEventListener('click', async () => {
    const feedbackText = document.getElementById('feedbackText')?.value || "";

    try {
      await fetch('https://tap-feedback.vercel.app/api/popup/submit-popup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          popupId,
          rating: currentRating,
          feedback: feedbackText,
        }),
      });

      console.log('Thank you for your feedback!');
    } catch (err) {
      console.error('Failed to submit feedback:', err);
    }

    document.getElementById('tap-popup')?.remove();
  });
})();
`;

    return new Response(script, {
      headers: {
        "Content-Type": "application/javascript",
        "Cache-Control": "no-store",
      },
    });
  } catch (err: any) {
    return new Response(`console.error("Error loading widget: ${err.message}")`, {
      headers: { "Content-Type": "application/javascript" },
      status: 500,
    });
  }
}
