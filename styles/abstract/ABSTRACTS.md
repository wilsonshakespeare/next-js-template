# Abstracts:

Abstracts must be **purely variables only** setting `!default` used across all projects.

It could be known as utilities or helpers. No scss classes should be declared even related.

## Rules:

1. Nothing in Abstract should be transpiled directly into css classes.
2. Variables must always be default.
3. `_collective_variables` have the variables and functions arranged in order.
4. `_variables.scss` goes last, which utilizes all default variables that has been declared.
5. `_mixins` and `_placeholders` can always be `@include` or `@extend` respectively.
   a. Main difference:
   `_placeholders` do not have `@context` and no variables.
   b. Many oftenly being mixed up, and only uses `_mixins`

## Rationate:

1. `_collective_variables` will compile all variables to be reused at other location (not withing styles folder)
2. Hence classes in abstract will again be redeclared when compiled to css.

## Responsiveness

1. Breakpoints: Following The Standard of Bootstrap 4.x Breakpoints Standard
   a. xs-device: 0 - 575px: Mobile
   b. sm-device: 576px - 768px: Mobile
   c. md-device: 769px - 991px: Tablet
   d. lg-device: 992px - 1119px: Desktop
   e. xl-device: 1200px - ∞: Desktop

2. Visibility Concepts:

down: meaning below the current min device breakpoint
md-down: meaning xs and sm device

up: meaning above the current min device breakpoint
md-up: meaning md, lg, and xl device

3. Usage of `respond-to` mixin

**Variables available for use:**

```
a. $small-up: 576px - ∞
b. $small-down: 0 - 575px
c. $small-only: 576px - 768px
d. $medium-up: 769px - ∞: Tablet and Above
e. $medium-down: 0 - 768px: Mobile Only
f. $medium-only: 769px - 991px: Tablet Only
g. $large-down: 0 - 991px: Tablet and Below Only
h. $large-up: 992px - ∞: Desktop Only
i. $large-only: 992px - 1119px
j. $xlarge-down: 0 - 1119px
k. $xlarge-up: 1200px - ∞
```

Usage Example:
In `base/_responsive.scss`

```scss
.hide-md-down {
  @include respond-to($medium-down) {
    display: none !important;
  }
}
```

Translates to:

```css
@media screen and (max-width: 768px) {
  .hide-md-down {
    display: none !important;
  }
}
```

## Base Colors Values:

1. Material Design Palette:
   Following are the colors in Matterial Design Palette:
   https://www.materialpalette.com/colors

**Knowm Caveat: Our material colours for now being calculated**
We will later improvise to follow Material Design Palette 2014 Standard

Colors for Material Palette:
at `abstract/colors/_material_palette.scss`

```scss
// Colors for 500 as base color for calculation
$baseColors: (
  'red': #f44336,
  'pink': #e91e63,
  'purple': #9c27b0,
  'deep-purple': #673ab7,
  'indigo': #3f51b5,
  'blue': #2196f3,
  'light-blue': #03a9f4,
  'cyan': #00bcd4,
  'teal': #009688,
  'green': #4caf50,
  'light-green': #8bc34a,
  'lime': #cddc39,
  'yellow': #ffeb3b,
  'amber': #ffc107,
  'orange': #ff9800,
  'deep-orange': #ff5722,
  'brown': #795548,
  'gray': #9e9e9e,
  'blue-gray': #607d8b,
);
```

We have material palette function. the function name follows the standard Material Palette color names as above:

**Examples:**

```scss
.bg-red-300 {
  // this will return you red-300 color
  background-color: mat-red(300);
}
.bg-blue-gray-200 {
  // this will return you blue-gray-200 color
  background-color: mat-blue-gray(200);
}
```

2. Standard Color Names

Color Codes and Variables for colour code should not simply be named.

Following tools helps to find the color name:
Color Naming: http://chir.ag/projects/name-that-color

All standard color variables are declared at: `abstract/colors/_names.scss`

Note: These colors are constants so NO `!default` usage

3. Setting Default Colors:

Always use **Color Names** to set default colours at `abstract/variables/colors`

Example as follows:

```scss
$default-red: $persimmon !default;
$default-green: $apple !default;
$default-blue: $waikawa-gray !default;
$default-yellow: $fuel-yellow !default;
$default-orange: $texas-rose !default;
$default-indigo: $blue-bell !default;
```

## Variables

### Colors:

Put all other colors variable that can be reuse for other projects. under `abstract/variables/colors`

As Example:

```scss
//rating colors
$rate-excellent: #27ae60 !default;
$rate-very-good: #4aae27 !default;
$rate-good: #a2c569 !default;
$rate-fair: #f2c94c !default;
$rate-poor: #8b97a8 !default;
```

### Typography and Responsiveness

##### Concept:

1. Default font size for rem reference

- `$base-font-size: 16px` is the default root font size for mobile
- `$base-font-tablet: 18px` is the default root font size for tablet
- `$base-font-desktop: 20px` is the default root font size for desktop
- `$font-size-offset: -2px` will offset all base font sizes without adjusting every font. All px uses `rem()` should be with reference to default base font sizes.

```scss
html {
  font-size: $base-font-size + $font-size-offset;
  @include respond-to($medium-up) {
    font-size: $base-font-tablet + $font-size-offset;
  }
  @include respond-to($large-up) {
    font-size: $base-font-desktop + $font-size-offset;
  }
}
```

2. Using function to convert px to rem

a. `rem($pixel-size)` for mobile size rem
b. `rem-tablet($pixel-size)` for tablet size rem
c. `rem-desktop($pixel-size)` for desktop size rem

In regular cases, do not need `rem-tablet` or `rem-desktop` unless the `rem` value of the font size is different for desktop or tablet.

Example as follow:
(In this case header rem is different for tablet and desktop)

```scss
// Set headers font sizes based on _typography variables
@each $header, $values in $header-fonts {
  #{$header} {
    font-size: rem(map-get($values, base));
    margin: rem(map-get($values, base) - 2px) 0;
    // Respond to Tablet Size
    @include respond-to($medium-up) {
      font-size: rem-tablet(map-get($values, tablet));
      margin: rem-tablet(map-get($values, tablet) - 2px) 0;
    }
    // Respond to Desktop Size
    @include respond-to($large-up) {
      font-size: rem-desktop(map-get($values, desktop));
      margin: rem-desktop(map-get($values, desktop) - 2px) 0;
    }
  }
}
```

3. Typography Rules:

a. Use `rem` all the time, since there is helper function specifically for rem calculation.
b. Use `$font-size-offset` to adjust the base value of the font pixels at all times

### Other Variables

a. Under `abstract/_variables.scss`, These variables are not being used for other abstract scss.
b. They are meant for the whole project components and can use `abstract/_functions.scss`
c. Any variables used in `abstract/_functions.scss` must be declared under variables folder
