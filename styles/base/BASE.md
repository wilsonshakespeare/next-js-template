# Base

## Responsiveness

Classes are as follow

| Class Name   | Use Case                   | Mechanics                                    |
| ------------ | -------------------------- | -------------------------------------------- |
| hide-md-down | Tablet and Above View      | hide for small and below                     |
| ------------ | ---------------------      | ------------------------                     |
| hide-md-up   | Mobile Only View           | hide for medium and above                    |
| ------------ | ---------------------      | ------------------------                     |
| md-only      | Tablet Only View           | hide for small and below and large and above |
| ------------ | ---------------------      | ------------------------                     |
| hide-lg-down | Desktop Only View          | hide for medium and below                    |
| ------------ | ---------------------      | ------------------------                     |
| hide-lg-up   | Tablet and Below Only View | hide for large and above                     |

There following other 4 that is unlikely to be used. Refer to comment at \_responsive.scss if needed

## Animations

Naming Convention:

1. Using `ani__` as class prefix to indicate animation classes helper
2. using `kf_` as keyframes prefix to indicate the name is for keyframes

## Typography

### Google Fonts Import

Abstracts's Google Fonts mixins enable the simplicity of including google fonts during server side render:

```scss
@include google-font {
  @include google-font($font-main, $font-main-sizes);
  @include google-font($font-secondary, $font-secondary-sizes);
}
```

### Headers Responsive Reset

The following codes will generate responsive header css:

```scss
@each $header, $values in $header-fonts {
  #{$header} {
    //.. codes
  }
}
```

As Follows which in response to `styles/layouts/_layouts` html base font size responsiveness:

```css
// from h1 to h6
h1 {
  font-size: 1.25rem;
  margin: 1.125rem 0;
}

@media screen and (min-width: 769px) {
  h1 {
    font-size: 1.33333rem;
    margin: 1.22222rem 0;
  }
}

@media screen and (min-width: 992px) {
  h1 {
    font-size: 1.3rem;
    margin: 1.2rem 0;
  }
}
```

### Fonts Helper Classes

| Class Name | Size              | Weight                            |
| ---------- | ----------------- | --------------------------------- |
| xl-font    | Extra Large       | Heavy                             |
| ---------- | ----------------- | --------------------------------- |
| lg-font    | Large             | Bold                              |

## Forms

// TODO

## Display Helper Cheat Sheet

Under `base/display`:

Classes that can be reused just to add or override certain properties for common display manipulation

### Display

Handles display property

| Class Name | Use Case                | Property          |
| ---------- | ----------------------- | ----------------- |
| hide       | To Hide Element         | `display: none`   |
| ---------- | -----------------       | ----------------- |
| show       | To Show Element (Block) | `display: block`  |

### Text Display Helper Classes

Handles text property

| Class Name   | Use Case            | Property                            |
| ------------ | ------------------- | ----------------------------------- |
| text-light   | Light Font Weight   | `font-weight: $font-weight-light`   |
| ----------   | -----------------   | ---------------------------------   |
| text-regular | Regular Font Weight | `font-weight: $font-weight-regular` |
