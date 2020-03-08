# Themeing Guideline:

## Important Note:

All partials here need to be themed using jsx style to override

## Rationale:

1. When you have multiple tenant frontend, there is only 2 ways to handle:

- Methods:
  a. Different Tenant, Different Deployment. (This will have higher overhead cost especially when traffic can be load balanced)
  b. Based on configuration (retrieved) during server side rendering
- Handling:
  a. method will require different \_theme file, and using ci / cd to replace during build time.
  b. method will require jsx to override

2. Hence all themeable properties should be declared here.
3. Do not try to compile scss real time at server side. This will create overhead for loading time.

## Why Not Styled Components:

Following are the areas need to look into:

1. Complex mixin and function logic that have been setup here
2. Some Sass standard guidelines (foldering and partials) have been setup, need to know the convention for Styled Components.
3. Exact replication or replacement of current Scss files and to be used globally with child override
4. Although flexible theming have been researched, but above matters need to be addressed first

## Color Selection Process

1. For Theme colour selection, please follow the following concept:
   https://www.websitebuilderexpert.com/designing-websites/how-to-choose-color-for-your-website/
2. When deciding primary colour, check contrast with the background colour:
   https://webaim.org/resources/contrastchecker/
   Make sure `large text` and `graphical object` pass
3. Once primary color is decided, please choose secondary color based on on complimentary or split complimentary:
   Use the following tools for it:
   a. http://colorschemedesigner.com/csd-3.5/
   b. https://material.io/design/color/the-color-system.html#tools-for-picking-colors
   c. https://coolors.co/
4. Finally use the following tool to find primary and secondary colour light and dark colour:
   https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=007dbb&secondary.color=50016a

## Note: Remember everything here needs to be handled by JSX if whitelabel is applied
