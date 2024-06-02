# 29/05/2024

We implemented the following changes:

- Code formatter: Adding Prettier to project:
  \*one person to-> Add issue and feature branch for the prettier extension

- Run this:
  "npm install --save-dev --save-exact prettier"

- Created a file named- ".prettierrc"
- Pasted this code in it:
  {
  "semi": false,
  "tabWidth": 2,
  "printWidth": 80,
  "singleQuote": false,
  "jsxSingleQuote": false,
  "bracketSpacing": true,
  "bracketSameLine": false,
  "trailingComma": "all",
  "arrowParens": "avoid",
  "singleAttributePerLine": true
  }

- Set default formatter as prettier for this to run automatically.
  ''npx prettier --write .'' (to format the whole project)
