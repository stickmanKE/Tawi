# Tawi

**Tawi** (Swahili for "branch") is a small, build-free link tree you can make your own. Plain HTML, CSS and JavaScript: no npm, no framework.
Content lives in one file, the look lives in swappable theme files. Built for freelancers, gig workers and small businesses.

![All five themes](docs/screenshots/all-themes.png)

## Themes

Same `config.js`, five looks. Switch with `theme:` in the config, or preview any of them with `?theme=name` on the URL.

<table>
  <tr>
    <td align="center"><img src="docs/screenshots/receipt.png" width="180" alt="receipt theme"><br><b>receipt</b><br><sub>till slip, stamp, barcode</sub></td>
    <td align="center"><img src="docs/screenshots/terminal.png" width="180" alt="terminal theme"><br><b>terminal</b><br><sub>teal on black</sub></td>
    <td align="center"><img src="docs/screenshots/dark.png" width="180" alt="dark theme"><br><b>dark</b><br><sub>serif + colour-coded cards</sub></td>
    <td align="center"><img src="docs/screenshots/library.png" width="180" alt="library theme"><br><b>library</b><br><sub>Ex Libris parchment</sub></td>
    <td align="center"><img src="docs/screenshots/starter.png" width="180" alt="starter theme"><br><b>starter</b><br><sub>clean base to copy</sub></td>
  </tr>
</table>

The receipt theme also has a tear-off contact strip. Drag or tap it and a contact stub opens, which sends your message straight to WhatsApp:

<p align="center"><img src="docs/screenshots/receipt-contact.png" width="300" alt="receipt contact stub"></p>

Full-page captures: [receipt](docs/screenshots/receipt-full.png) · [terminal](docs/screenshots/terminal-full.png) · [dark](docs/screenshots/dark-full.png) · [library](docs/screenshots/library-full.png) · [starter](docs/screenshots/starter-full.png)

```
index.html      thin shell (edit the <title> and share-preview tags by hand)
config.js       ALL your content: name, links, socials, contact. Start here.
core.css        shared mechanics (animation, tear strip, form basics). Rarely edited.
app.js          builds the page from config.js. No need to edit.
assets/         your pictures (optional): profile photo, project images
.github/workflows/pages.yml   publishes the site to a gh-pages branch automatically
docs/           screenshots for this README (not published to your site)
themes/
  receipt.css   thermal till slip: torn paper, stamp, barcode
  terminal.css  teal on black, blinking cursor
  dark.css      warm near-black, serif headlines, rounded cards, colour-coded links
  library.css   "Ex Libris" parchment: small caps, roman numerals, ruled notice box
  starter.css   clean neutral base, fully commented. Copy this one.
```

## 1. Make it yours (5 minutes)
1. Open `config.js` and replace the name, links, socials and contact details.
2. Set `theme:` to `"receipt"`, `"terminal"`, `"dark"`, `"library"` or `"starter"`. Preview any of them with `?theme=terminal` on the URL.
3. Edit the `<title>` and `<meta>` tags in `index.html` so shared links look right.
4. Put it on GitHub and publish it for free (see [Host it on GitHub Pages](#host-it-free-on-github-pages)).

## 2. Create your own theme
1. Copy `themes/starter.css` to `themes/mylook.css`.
2. Change the colour and font tokens at the top, then restyle the hooks (the list is at the top of that file).
3. Set `theme: "mylook"` in `config.js`.

Rules of thumb:
- Themes only restyle. They never need to touch `app.js` or `config.js`.
- Set the tokens `--bg --surface --ink --muted --accent --hl --slip --font-body --font-head` and the tear strip and contact form follow your palette automatically.
- Decorations (`.stamp`, `.bar`, `.deco-top`) are hidden by default. Show them with `display:block` if your design wants them.
- Hide what you don't need with `display:none` (for example `.meta`, `.sum`, `.total`).
- A link's `color` reaches your CSS as `var(--c)`. Fall back with `var(--c, var(--accent))`.
- Keep tap targets at least 44px high and test on a phone.

## 3. Config reference
| Key | What it does |
| --- | --- |
| `profile` | name, highlighted part of the name, owner, tagline, intro line, `avatar` (optional picture) |
| `links[]` | `title`, `url`, `desc`, `tag` (LIVE/DEMO…), `cta` (button text), `color` (optional accent used by the dark and library themes), `image` (optional project picture) |
| `summary[]`, `total` | optional stat rows; themes may hide them |
| `connect.socials[]` | buttons such as GitHub, TikTok, Instagram |
| `contact` | `whatsapp` (international format, no +), `email`, `dm` link, form wording |
| `themes[]`, `features.picker` | `picker: true` shows a theme switcher at the bottom (handy for demos, turn it off on a real page) |
| `features.tear` | `true` = tear-off strip reveals the form, `false` = form is just open |
| `stamp`, `meta`, `thanks`, `footer` | flavour text that themes can show or hide |

All config text is inserted as plain text, so characters like `<` or `&` are safe.

## 4. Pictures (optional)
Put images in `assets/` and point to them from `config.js`. Leave a field out and nothing is shown.

```js
profile: { avatar: "assets/me.jpg", ... }          // profile picture, square works best
links: [{ title: "Mauzo", image: "assets/mauzo.png", ... }]   // project picture, 16:9 works best
```
- A path that doesn't load is hidden automatically, so you never get a broken-image icon.
- Each theme styles pictures to match: grayscale thermal print on `receipt`, green phosphor on `terminal`, sepia plates on `library`.
- Keep each file under about 200 KB (resize before uploading) so the page stays fast on mobile data.

## Host it free on GitHub Pages
No domain, no server, no new repo per page. One repository holds your page, and a small workflow publishes only the website files to a `gh-pages` branch.

1. Click **Use this template > Create a new repository** (make it public). The repo name becomes part of your address, so `tawi` gives you `https://YOUR-USERNAME.github.io/tawi/`.
2. Open `config.js` in GitHub (pencil icon), put in your own name, links and WhatsApp number, and commit. Set `features.picker` to `false`.
3. Open the **Actions** tab (click enable if it asks). **Publish to gh-pages** runs on every commit and creates the `gh-pages` branch in about 30 seconds.
4. Go to **Settings > Pages**, set Source to **Deploy from a branch**, choose `gh-pages` and `/ (root)`, and save.
5. In about a minute your page is live. Every later commit to `main` republishes it automatically.

### Use your own domain (optional)
1. Add a file named `CNAME` at the top of the repo containing just your domain, for example `tawi.alexmbugua.me`.
2. At your DNS provider add a record: type `CNAME`, name `tawi`, value `YOUR-USERNAME.github.io`.
3. In **Settings > Pages > Custom domain** enter the domain, and tick **Enforce HTTPS** once GitHub's DNS check passes.

Use the `CNAME` file rather than typing the domain only in settings: the workflow copies the file onto `gh-pages` every time, so your domain survives updates. For a bare domain without a subdomain, GitHub's custom-domain docs list the A records to use.

### Other hosts
Vercel and Netlify also work: import the repo, no build command, output directory is the repo root.

## Notes
- Link previews (WhatsApp, X, etc.) read `index.html` only, so set the `og:` tags there.
- Themes load Google Fonts; swap the `@import` line for self-hosted fonts if you want zero third-party requests.
- Free to use and modify. Credit is appreciated, not required.
