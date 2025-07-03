# Ellipsi Changelog

## 3.0.0 on 2025-07-02

### Added

- `Shadow`, a type that contains potential shadow roots
- `shadow`, a function that builds `Shadow`s
- `sheet`, a function that builds `CSSStyleSheet`s; a `CSSStyleSheet` can be
  attached to a shadow root via the `shadow` function

### Changed

- `forEach` loops to `for(let i = 0;...)` loops for performance

### Removed

- minified version, as performance gains turned out to be negligble and the
  minify package was unable to process regular expressions

## 2.4.2 on 2025-06-19

### Fixed

- bug when passing `null` or `undefined` to `tag` function

## 2.0.0 on 2025-06-18

### Added

- example directory

### Changed

- name to Ellipsi (Finnish for ellipsis) from @mozzie/dots

## 1.4.0 on 2025-06-17

### Added

- Minify as a development dependency
- ability to use JSON objects as attributes in `tag` function

## 1.0.0 on 2025-06-16

### Added

- Project start
