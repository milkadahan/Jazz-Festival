(function () {
  /* ── Inject shared footer CSS ── */
  var style = document.createElement('style');
  style.textContent = `
    footer {
      background: #002D87;
      border-top: 1px solid rgba(224,86,11,0.3);
      padding: 4rem 3rem 2rem;
      direction: rtl;
    }
    .footer-grid {
      display: grid;
      grid-template-columns: 1.8fr 1fr 1fr 1.7fr;
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
      background: rgba(255,0,102,0.25);
      border-color: var(--primary);
    }
    .footer-col-title {
      font-size: 0.8rem; color: #fff;
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

    /* ── Newsletter signup ── */
    .footer-news-heading {
      font-size: 0.9rem;
      color: #fff;
      font-weight: 500;
      line-height: 1.6;
      margin-bottom: 0.3rem;
    }
    .footer-news-text {
      font-size: 0.9rem;
      color: rgba(230,216,214,0.65);
      line-height: 1.6;
      margin-bottom: 1.1rem;
      max-width: 300px;
    }
    .footer-news-form { max-width: 340px; }
    .footer-news-field {
      display: flex;
      align-items: center;
      gap: 6px;
      background: rgba(255,255,255,0.07);
      border: 1px solid rgba(255,255,255,0.14);
      border-radius: 50px;
      padding: 5px 24px 5px 5px;
      transition: border-color 0.2s, background 0.2s;
    }
    .footer-news-field:focus-within {
      border-color: var(--primary);
      background: rgba(255,255,255,0.11);
    }
    .footer-news-input {
      flex: 1;
      min-width: 0;
      background: transparent;
      border: none;
      outline: none;
      color: #f2ebe8;
      font-family: var(--font);
      font-size: 0.9rem;
      padding: 0.5rem 0;
      direction: rtl;
    }
    .footer-news-input::placeholder { color: rgba(230,216,214,0.5); }
    .footer-news-input:-webkit-autofill { -webkit-text-fill-color: #f2ebe8; transition: background-color 9999s; }
    .footer-news-btn {
      flex-shrink: 0;
      background: rgba(255,255,255,0.12);
      color: rgba(255,255,255,0.55);
      border: none;
      border-radius: 50px;
      padding: 0.5rem 1.25rem;
      font-family: var(--font);
      font-size: 0.85rem;
      font-weight: 700;
      cursor: not-allowed;
      white-space: nowrap;
      transition: background 0.2s, color 0.2s, filter 0.2s, transform 0.2s;
    }
    .footer-news-btn:not(:disabled) {
      background: linear-gradient(135deg, var(--primary), #FF0066);
      color: #fff;
      cursor: pointer;
    }
    .footer-news-btn:not(:disabled):hover { filter: brightness(1.08); transform: translateY(-1px); }
    .footer-news-btn:not(:disabled):active { transform: translateY(0); }
    .footer-news-msg {
      font-size: 0.8rem;
      line-height: 1.5;
      margin-top: 0.65rem;
      padding-inline-start: 0.4rem;
      min-height: 1.1em;
      opacity: 0;
      transform: translateY(-2px);
      transition: opacity 0.25s, transform 0.25s;
    }
    .footer-news-msg.show { opacity: 1; transform: translateY(0); }
    .footer-news-msg.success { color: #35C88F; }
    .footer-news-msg.error { color: #FF6F6F; }

    .footer-sponsors {
      margin-bottom: 2.5rem;
      max-width: 1200px;
      margin-inline: auto;
    }
    .footer-sponsors-label {
      font-size: 0.72rem; color: rgba(230,216,214,0.5); text-transform: uppercase; letter-spacing: 0.06em;
      font-weight: 700; margin-bottom: 1.2rem; text-align: center;
    }
    .footer-sponsors-strip {
      display: flex; align-items: center; justify-content: center;
      flex-wrap: wrap; row-gap: 1.6rem; column-gap: clamp(18px, 2.3vw, 38px);
    }
    .footer-sponsor-logo {
      height: clamp(13px, 1.6vw, 24px); width: auto; flex-shrink: 0;
      object-fit: contain; display: block;
    }
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
    .footer-bottom a { color: #0099FD; text-decoration: none; }
    .footer-bottom a:hover { color: #fff; }
    @media (max-width: 900px) {
      .footer-grid { grid-template-columns: 1fr 1fr; }
      .footer-news-col { grid-column: 1 / -1; }
      .footer-news-form { max-width: 420px; }
      footer { padding: 3rem 1.5rem 2rem; }
    }
    @media (max-width: 600px) {
      .footer-grid { grid-template-columns: 1fr 1fr; gap: 2rem 1.25rem; }
      /* מובייל: גוש לוגו+טאגליין+סושיאל ואחריו הניוזלטר — שניהם ברוחב מלא (span 2
         העמודות); אחריהם עמודות ניווט ומידע זו לצד זו (כל אחת עמודה אחת) */
      .footer-grid > div:nth-child(1) { grid-column: 1 / -1; order: 1; text-align: center; }
      .footer-news-col { grid-column: 1 / -1; order: 2; }
      .footer-grid > div:nth-child(2) { grid-column: auto; order: 3; }
      .footer-grid > div:nth-child(3) { grid-column: auto; order: 4; }
      .footer-news-form { max-width: 100%; }
      /* לוגו, תגית וסושיאל ממורכזים באמצע העמודה */
      .footer-logo-img, .footer-tagline { margin-inline: auto; }
      .footer-social { justify-content: center; }
      /* שני פסי הפרדה מעל ומתחת לניוזלטר — אותו צבע בהיר כמו הבורדר של
         כפתורי הסושיאל ושל שדה המייל (rgba(255,255,255,0.14)) */
      .footer-news-col {
        border-top: 1px solid rgba(255,255,255,0.14);
        border-bottom: 1px solid rgba(255,255,255,0.14);
        padding-block: 1.75rem;
      }
      /* מסתירים רק את הכותרת הכתומה "ניוזלטר" — לא נוגעים ב"ניווט"/"מידע" */
      .footer-news-col .footer-col-title { display: none; }
      /* שורת הזכויות/קישורים התחתונה — ממורכזת ואחת מתחת לשנייה */
      .footer-bottom { flex-direction: column; justify-content: center; text-align: center; }
    }
  `;
  document.head.appendChild(style);

  /* ── Footer HTML ── */
  var html = `
    <div class="footer-grid">
      <div>
        <img src="./Graphig assets/State=Horizontal.png?v=2" alt="Red Sea Jazz Festival" class="footer-logo-img" />
        <div class="footer-tagline">
          40 שנות מוזיקה על חוף ים סוף.<br>
          נמל אילת · 11–14 בנובמבר 2026
        </div>
        <div class="footer-social">
          <button class="footer-social-btn" aria-label="פייסבוק">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h-2a4 4 0 0 0-4 4v3H6v4h3v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </button>
          <button class="footer-social-btn" aria-label="אינסטגרם">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" stroke="none"/></svg>
          </button>
          <button class="footer-social-btn" aria-label="טיקטוק">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3v10.8a3.6 3.6 0 1 1-3.6-3.6c.32 0 .63.03.93.1"/><path d="M14 3c0 2.6 2.1 4.7 4.7 4.7"/></svg>
          </button>
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
          <li><a href="./faq.html">שאלות נפוצות</a></li>
          <li><a href="./contact.html">יצירת קשר</a></li>
        </ul>
      </div>

      <div class="footer-news-col">
        <div class="footer-col-title">ניוזלטר</div>
        <div class="footer-news-heading">הישארו מעודכנים!</div>
        <div class="footer-news-text">
          לוח הופעות, אמנים חדשים והטבות מוקדמות, ישירות למייל.
        </div>
        <form class="footer-news-form" novalidate>
          <div class="footer-news-field">
            <input
              type="email"
              class="footer-news-input"
              placeholder="כתובת המייל שלך"
              aria-label="כתובת מייל להרשמה לניוזלטר"
              autocomplete="email"
              inputmode="email"
            />
            <button type="submit" class="footer-news-btn" disabled>הרשמה</button>
          </div>
          <div class="footer-news-msg" role="status" aria-live="polite"></div>
        </form>
      </div>
    </div>

    <div class="footer-sponsors">
      <div class="footer-sponsors-label">בחסות</div>
      <div class="footer-sponsors-strip">
        <img class="footer-sponsor-logo" src="./Graphig assets/sponsors/ministry-culture-sport.svg" alt="משרד התרבות והספורט" loading="lazy" />
        <img class="footer-sponsor-logo" src="./Graphig assets/sponsors/ministry-tourism.png" alt="משרד התיירות" loading="lazy" />
        <img class="footer-sponsor-logo" src="./Graphig assets/sponsors/ministry-negev-galilee.png" alt="משרד הנגב, הגליל והחוסן הלאומי" loading="lazy" />
        <img class="footer-sponsor-logo" src="./Graphig assets/sponsors/mifal-hapayis.svg" alt="מפעל הפיס" loading="lazy" />
        <img class="footer-sponsor-logo" src="./Graphig assets/sponsors/eilat-municipality.svg" alt="עיריית אילת" loading="lazy" />
        <img class="footer-sponsor-logo" src="./Graphig assets/sponsors/eilat-tourism-corp.png" alt="תאגיד התיירות אילת" loading="lazy" />
        <img class="footer-sponsor-logo" src="./Graphig assets/sponsors/kan-88.svg" alt="כאן 88" loading="lazy" />
        <img class="footer-sponsor-logo" src="./Graphig assets/sponsors/kan-kol-hamusica.png" alt="כאן קול המוזיקה" loading="lazy" />
        <img class="footer-sponsor-logo" src="./Graphig assets/sponsors/isrotel.png" alt="Isrotel" loading="lazy" />
        <img class="footer-sponsor-logo" src="./Graphig assets/sponsors/forum-productions.png" alt="פורום הפקות" loading="lazy" />
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

    /* ── Newsletter signup behaviour ── */
    var form  = footer.querySelector('.footer-news-form');
    var input = footer.querySelector('.footer-news-input');
    var btn   = footer.querySelector('.footer-news-btn');
    var msg   = footer.querySelector('.footer-news-msg');

    if (form && input && btn && msg) {
      var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // כפתור מתחיל דיסייבל; ברגע שמתחילים להקליד — הופך זמין
      input.addEventListener('input', function () {
        btn.disabled = input.value.trim().length === 0;
        // ניקוי הודעת ולידציה קודמת ברגע שממשיכים להקליד
        if (msg.classList.contains('show')) {
          msg.classList.remove('show', 'success', 'error');
        }
      });

      function setMessage(text, type) {
        msg.textContent = text;
        msg.classList.remove('success', 'error');
        msg.classList.add(type, 'show');
      }

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var value = input.value.trim();
        if (value.length === 0) return; // כפתור אמור להיות דיסייבל ממילא

        if (EMAIL_RE.test(value)) {
          setMessage('נרשמת בהצלחה! נתראה על חוף ים סוף 🎷', 'success');
          input.value = '';
          btn.disabled = true;
        } else {
          setMessage('כתובת מייל לא תקינה — בדקו ונסו שוב.', 'error');
          input.focus();
        }
      });
    }
  }
})();
