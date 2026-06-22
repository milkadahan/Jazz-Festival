(function () {
  /* ── Inject shared footer CSS ── */
  var style = document.createElement('style');
  style.textContent = `
    footer {
      background: #2d2726;
      border-top: 1px solid rgba(224,86,11,0.3);
      padding: 4rem 3rem 2rem;
      direction: rtl;
    }
    .footer-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 3rem;
      margin-bottom: 3rem;
      max-width: 1200px;
      margin-inline: auto;
      margin-bottom: 3rem;
    }
    .footer-logo-img {
      height: 44px; width: auto; display: block;
      filter: brightness(0) invert(1);
      margin-bottom: 1rem;
    }
    .footer-tagline {
      font-size: 0.9rem;
      color: rgba(230,216,214,0.65);
      line-height: 1.7;
      max-width: 280px;
    }
    .footer-social {
      display: flex; gap: 0.8rem; margin-top: 1.2rem;
    }
    .footer-social-btn {
      width: 44px; height: 44px; border-radius: 10px;
      background: rgba(255,255,255,0.07);
      border: 1px solid rgba(255,255,255,0.14);
      display: flex; align-items: center; justify-content: center;
      font-size: 1rem; transition: all 0.2s; cursor: pointer;
      color: #e6d8d6;
    }
    .footer-social-btn:hover {
      background: rgba(255,107,26,0.25);
      border-color: #E0560B;
    }
    .footer-col-title {
      font-size: 0.8rem; color: #E0560B;
      text-transform: uppercase; margin-bottom: 1.2rem; font-weight: 600;
    }
    .footer-links {
      list-style: none; padding: 0; margin: 0;
      display: flex; flex-direction: column; gap: 0.7rem;
    }
    .footer-links a {
      font-size: 0.9rem;
      color: rgba(230,216,214,0.65);
      text-decoration: none;
      transition: color 0.2s;
    }
    .footer-links a:hover { color: #fff; }
    .footer-bottom {
      border-top: 1px solid rgba(255,255,255,0.1);
      padding-top: 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
      font-size: 0.8rem;
      color: rgba(230,216,214,0.45);
      max-width: 1200px;
      margin-inline: auto;
    }
    .footer-bottom a { color: #0A8F8E; text-decoration: none; }
    .footer-bottom a:hover { color: #fff; }
    @media (max-width: 900px) {
      .footer-grid { grid-template-columns: 1fr 1fr; }
      footer { padding: 3rem 1.5rem 2rem; }
    }
    @media (max-width: 600px) {
      .footer-grid { grid-template-columns: 1fr; gap: 2rem; }
    }
  `;
  document.head.appendChild(style);

  /* ── Footer HTML ── */
  var html = `
    <div class="footer-grid">
      <div>
        <img src="./Graphig assets/State=Horizontal.png" alt="Red Sea Jazz Festival" class="footer-logo-img" />
        <div class="footer-tagline">
          40 שנות מוזיקה על חוף ים סוף.<br>
          נמל אילת · 11–14 בנובמבר 2026
        </div>
        <div class="footer-social">
          <button class="footer-social-btn" aria-label="פייסבוק">f</button>
          <button class="footer-social-btn" aria-label="יוטיוב">▶</button>
          <button class="footer-social-btn" aria-label="אינסטגרם">📸</button>
          <button class="footer-social-btn" aria-label="ספוטיפיי">♪</button>
        </div>
      </div>

      <div>
        <div class="footer-col-title">ניווט</div>
        <ul class="footer-links">
          <li><a href="./index.html">דף הבית</a></li>
          <li><a href="./lineup.html">לוח הופעות 2026</a></li>
          <li><a href="./past-artists.html">אמנים משנים קודמות</a></li>
          <li><a href="./index.html#hotels">מלונות ונופש</a></li>
          <li><a href="./index.html#venue">מיקום</a></li>
        </ul>
      </div>

      <div>
        <div class="footer-col-title">מידע</div>
        <ul class="footer-links">
          <li><a href="./about.html">אודות הפסטיבל</a></li>
          <li><a href="#">שאלות נפוצות</a></li>
          <li><a href="#">נגישות</a></li>
          <li><a href="#">יצירת קשר</a></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <span>© 2026 Red Sea Jazz Festival. כל הזכויות שמורות.</span>
      <span><a href="#">מדיניות פרטיות</a> · <a href="#">תנאי שימוש</a></span>
    </div>
  `;

  /* ── Replace existing footer content ── */
  var footer = document.querySelector('footer');
  if (footer) {
    footer.innerHTML = html;
  }
})();
