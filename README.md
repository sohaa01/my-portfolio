# Soha — Personal Portfolio Website

Static multi-page portfolio built with HTML, CSS, and vanilla JavaScript.

## Structure
```
/
├── index.html      Home
├── about.html      About
├── skills.html     Skills
├── projects.html   Projects
├── contact.html    Contact
├── css/style.css
├── js/main.js
└── images/         (add your photo as profile.jpg, project screenshots as project1.jpg etc.)
```

## Run locally
Just open index.html in a browser, or serve it:
```
npx serve .
```

## Deploy — GitHub + Vercel

1. Create a new repo on GitHub (e.g. `soha-portfolio`), don't initialize with a README.
2. From this folder:
   ```
   git init
   git add .
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/soha-portfolio.git
   git push -u origin main
   ```
3. Go to vercel.com → New Project → Import the GitHub repo.
   Framework preset: "Other" (it's static HTML, no build step needed).
4. Click Deploy. Vercel will give you a live `.vercel.app` URL in under a minute.

Every future `git push` to `main` auto-redeploys.
