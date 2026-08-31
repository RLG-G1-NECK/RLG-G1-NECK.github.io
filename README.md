# RLG G1 Neck Documentation

This is the documentation for the RLG G1 Neck. It is made with [MkDocs](https://www.mkdocs.org/).
It is avaiable in English (英語) and Japanese (日本語), and you can view it [here](https://rlg-g1-neck.github.io/)

## Translation notes
My Japanese is not good enough for writing readable and accurate docs. The
Japanese translation was done by the use of generative ai ("vibe-translated"),
and as such may contain inaccuracies. Although I have tried my best to double-check
the translated docs, alas a few inaccuracies may have slipped through. If you find any,
open an PR or let me know!

## Building
You can view the documentation locally by cloning the repository and viewing it via
```bash
mkdocs serve
```

## Deploying (GitHub pages)
To update website, do
```bash
mkdocs gh-deploy
```

## Dependencies
This project depends on a few markdown and Mkdocs extenions, namely
- `mkdocs-static-i18n` for multilangual capabilities 
- `pymdown-extensions` for code block fencing

# To do:
- Installation guide
- Assembly guide
- Wiring guide