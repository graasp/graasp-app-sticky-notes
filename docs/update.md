### Update

.eslintrc

`
{
  "extends": [
    "airbnb",
    "prettier"
  ],
  "plugins": [
    "import",
    "jsx-a11y",
    "react"
  ],
  "env": {
    "browser": true,
    "node": true,
    "mocha": true,
    "jest": true
  },
  "globals": {
    "cy": true,
    "Cypress": true
  },
  "parser": "@babel/eslint-parser",
  "parserOptions": {
    "requireConfigFile": false
  },
  "rules": {
    "no-underscore-dangle": [
      "error",
      {
        "allow": [
          "_id",
          "__REDUX_DEVTOOLS_EXTENSION__"
        ]
      }
    ],
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        "components": ["Link"],
        "specialLink": ["to", "hrefLeft", "hrefRight"],
        "aspects": ["noHref", "invalidHref", "preferButton"]
      }
    ],
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [".js", ".jsx"]
      }
    ],
    "react/jsx-no-constructed-context-values": ["warn"],
    "react/function-component-definition": ["warn", {"namedComponents": "arrow-function"}],
    "react/static-property-placement": ["error", "static public field"],
    "jsx-a11y/click-events-have-key-events": ["warn"],
    "jsx-a11y/mouse-events-have-key-events": ["warn"],
    "import/no-named-as-default": 0
  }
}{
  "extends": [
    "airbnb",
    "prettier"
  ],
  "plugins": [
    "import",
    "jsx-a11y",
    "react"
  ],
  "env": {
    "browser": true,
    "node": true,
    "mocha": true,
    "jest": true
  },
  "globals": {
    "cy": true,
    "Cypress": true
  },
  "parser": "@babel/eslint-parser",
  "parserOptions": {
    "requireConfigFile": false
  },
  "rules": {
    "no-underscore-dangle": [
      "error",
      {
        "allow": [
          "_id",
          "__REDUX_DEVTOOLS_EXTENSION__"
        ]
      }
    ],
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        "components": ["Link"],
        "specialLink": ["to", "hrefLeft", "hrefRight"],
        "aspects": ["noHref", "invalidHref", "preferButton"]
      }
    ],
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [".js", ".jsx"]
      }
    ],
    "react/jsx-no-constructed-context-values": ["warn"],
    "react/function-component-definition": ["warn", {"namedComponents": "arrow-function"}],
    "react/static-property-placement": ["error", "static public field"],
    "jsx-a11y/click-events-have-key-events": ["warn"],
    "jsx-a11y/mouse-events-have-key-events": ["warn"],
    "import/no-named-as-default": 0
  }
}
`

package.json

`
"react-scripts": "~5.0.0",
`