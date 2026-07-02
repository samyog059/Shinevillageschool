# Shine Village International Academy — Website

## IMPORTANT: How to Preview This Site Locally

This website uses a **shared header and footer** system (`partials/header.html`
and `partials/footer.html`) so that editing the navigation menu, logo, or
footer contact info in ONE file updates it across ALL pages automatically.

This works using JavaScript `fetch()`, which **requires a local web server**.
If you just double-click `index.html`, the header/footer will NOT load
(you'll see a red error message instead).

### Option A: Using Python (already installed on most computers)

1. Open a terminal / command prompt
2. Navigate to the `school-website` folder:
   ```
   cd path/to/school-website
   ```
3. Run:
   ```
   python -m http.server 8000
   ```
   (On some systems use `python3` instead of `python`)
4. Open your browser and go to:
   ```
   http://localhost:8000
   ```

### Option B: Using VS Code "Live Server" Extension

1. Install the "Live Server" extension in VS Code
2. Right-click `index.html` → "Open with Live Server"

### Option C: Using Node.js

```
npx serve
```

---

## How to Edit Shared Header / Footer

- **Navigation menu, logo, top bar** → edit `partials/header.html`
- **Footer columns, contact info, social links** → edit `partials/footer.html`

Any change you make to these two files will appear on **every page**
(Home, About, Academics, Gallery, etc.) the next time the page loads.

## How to Edit Contact Info (Phone, Email, Social Links)

Edit `assets/js/contact-info.js` — change the values for `phone1`, `email`,
`facebook`, `youtube`, `instagram`, etc. These automatically populate every
element with a `data-info="..."` attribute, in both the header and footer,
on every page.

## Folder Structure

```
school-website/
├── index.html
├── about/
│   └── index.html
├── academics/
│   └── index.html
├── admissions/
│   └── index.html
├── faculty/
│   └── index.html
├── notices/
│   └── index.html
├── events/
│   └── index.html
├── gallery/
│   └── index.html
├── contact/
│   └── index.html
├── partials/
│   ├── header.html     ← shared top bar + navbar
│   └── footer.html     ← shared footer
└── assets/
    ├── css/style.css
    ├── js/
    │   ├── script.js          (animations, sliders, etc.)
    │   ├── contact-info.js     (edit phone/email/social here)
    │   └── include.js          (loads header/footer — don't edit)
    ├── images/
    └── documents/
```

## Uploading to Hosting (.edu.np)

Once uploaded to real web hosting (cPanel, etc.), the site will work
normally in any browser — no local server needed. The `fetch()` system
works automatically once the files are served over HTTP(S) by a real
web server, which all hosting providers do.
