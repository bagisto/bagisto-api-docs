#!/usr/bin/env sh

# abort on errors
set -e

# regenerate the AI/LLM index (llms.txt + llms-full.txt) from src/api/**
npm run llms:generate

# build
npm run docs:build

# navigate into the build output directory
cd .vitepress/dist

echo 'api-docs.bagisto.com' > CNAME

git init
git add -A
git commit -m 'chore: deploy docs to github'
git push -f git@github.com:bagisto/bagisto-api-docs.git master:gh-pages

cd -
