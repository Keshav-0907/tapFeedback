import { NextRequest } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest, { params }: { params: { popupId: string } }) {
  const { popupId } = params;

  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_SITE_URL}/api/popup/get-popup`, {
      popupId,
    });

    const popup = res.data.popup;

    const script = `
(function() {
  var widget = document.createElement('div');
  widget.innerHTML = \`
    <div id="tap-popup" style="
      width: 320px;
      background-color: #1a1a1a;
      color: white;
      font-family: sans-serif;
      padding: 24px;
      border-radius: 12px;
      position: fixed;
      bottom: 40px;
      right: 40px;
      z-index: 9999;
      box-shadow: 0 0 20px rgba(0,0,0,0.5);
      border: 1px solid #ffffff22;
    ">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <h3 style="font-size: 18px; font-weight: bold;">Hello, Did you find what you wanted ??</h3>
        <button id="closeBtn" style="
          background: none;
          border: none;
          color: white;
          font-size: 18px;
          cursor: pointer;
        ">&times;</button>
      </div>
      <div style="margin: 16px 0; text-align: center;">
        \${[1,2,3,4,5].map(i => \`<span class="tap-star" data-rating="\${i}" style="font-size: 24px; cursor: pointer;">☆</span>\`).join('')}
        <div style="display: flex; justify-content: space-between; font-size: 12px; margin-top: 4px;">
          <span>Poor</span><span>Awesome</span>
        </div>
      </div>
      <textarea id="feedbackText" placeholder="Leave your comments..." style="
        width: 100%;
        padding: 8px;
        margin-top: 10px;
        border-radius: 6px;
        border: none;
        resize: vertical;
        height: 60px;
        background-color: #333;
        color: white;
      "></textarea>
      <button id="submitBtn" style="
        margin-top: 12px;
        width: 100%;
        padding: 10px;
        background-color: #444;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
      ">SUBMIT</button>
      <hr style="margin: 16px 0; border-color: #555;" />
      <div style="text-align: center; font-size: 12px;">Powered by Tap Feedback</div>
    </div>
  \`;

  document.body.appendChild(widget);

  document.querySelectorAll('.tap-star').forEach(star => {
    star.addEventListener('click', function() {
      const rating = this.getAttribute('data-rating');
      document.querySelectorAll('.tap-star').forEach(s => s.textContent = '☆');
      for (let i = 0; i < rating; i++) {
        document.querySelectorAll('.tap-star')[i].textContent = '★';
      }
    });
  });

  document.getElementById('closeBtn').addEventListener('click', () => {
    document.getElementById('tap-popup')?.remove();
  });

  document.getElementById('submitBtn').addEventListener('click', () => {
    alert("Thanks for your feedback!");
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
