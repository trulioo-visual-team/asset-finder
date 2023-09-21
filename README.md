# Asset Finder

![Design Lint Gif Example](https://github.com/destefanis/design-lint/blob/master/assets/lint-example.gif)


Find and fix errors in your designs with Design Lint, a plugin for Figma.

[View Plugin Page](https://www.figma.com/c/plugin/801195587640428208)

## Features 
* Selecting a layer with an error will also select the layer in Figma, letting you navigate your page and fix errors with full context.
* Design Lint polls for changes and will update as you fix errors.
* "Ignore" or "Ignore All" buttons let you skip special layers.
* Use the "Select All" option to fix multiple errors at once that share the same value.

## Install from the Figma Plugin Page
Although this plugin is open source, for most users you'll want to install from the Figma plugin community page.
[View Plugin Page](https://www.figma.com/c/plugin/801195587640428208)

## To Run Locally use following commands
* Run `yarn` to install dependencies.
* Run `yarn build:watch` to start webpack in watch mode.

### To Edit it
The react code, components, and UI can be found here [App.tsx](./src/app/components/App.tsx).  
The Figma API, Storage, and Linting happens in [controller.ts](./src/plugin/controller.ts).
Linting functions and rules can be found in [lintingFunctions.ts](./src/plugin/lintingFunctions.ts).

## JSON Data Structure

### Illustration
```json
{
  // Name
    "name": "No Results from Filter/Search",
  // Description
    "description": "Use when no results are returned from filtering or searching through a table.",
  // Tags to parse when text searching
    "tags": ["filter", "table", "data"],
  // Use case for filters
    "useCase": "table",
  // Product usage
    "products": "All Products",
  // "Best Match" filter level, 
    "level":1,
  // SVG equivelent
    "svg": "no_result",
  // Actual content
    "info": [
      {
      // name
        "type": "Illustration",
      // content for illustrations: componentID
        "content": "a31f422a4666f2326dcbc7c2e8b722a83d5a3870",
      // content type
        "var": "Component"
      },
      {
      // name
        "type": "Title Text",
      // content for text: text
        "content": "No results found",
      // content type
        "var": "String"
      }
    ]
  }
```

### Text
```json
{
  // Name
    "name": "Country List",
  // Description
    "description": "Contains countries within the dropdown",
  // Tags to parse when text searching
    "tags": ["filter", "table", "data"],
  // Product Filter
    "products": ["all"],
  // "Best Match" sort
    "level": 3,
  // Top Level Swap (swap all content) 1: true, 0:false
    "swap": 1,
  // actual content
    "info": [
      {
      // Top level swap: 1: true, 0: false
        "swap": 0,
      // title
        "title": "Australia",
      // nested content
        "items": [
          {
          // type
            "type": "text",
          // content
            "content": "Australia"
          },
          {
          // type
            "type": "svg",
          // content
            "content": "australia"
          }
        ]
      }
    ]
  }
```

### Tooling
This repo is using following:
* [Figma Plugin React Template](https://github.com/nirsky/figma-plugin-react-template)
* React + Webpack
* TypeScript
* TSLint
* Prettier precommit hook
