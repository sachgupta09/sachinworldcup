# World Cup Intelligence Style Guide

This guide defines the shared visual system for all future World Cup Intelligence pages.

## Brand character

Editorial, assured, and international. Use bold condensed headlines, calm information surfaces, generous spacing, and restrained color. Let data—not decoration—create energy.

## Core palette

| Token | Hex | Role |
| --- | --- | --- |
| `--navy` | `#245F73` | Brand color, links, charts, information accents |
| `--clay` | `#733E24` | Calls to action, selected states, priority accents |
| `--mist` | `#BBBDC0` | Borders, secondary surfaces, inactive controls |
| `--ivory` | `#F2F0EF` | Page canvas and light text |

Supporting contrast shades:

- `--navy-dark: #173F4D` for headers, hero panels, and dark sections.
- `--clay-dark: #512B19` for hover and pressed states.
- White is reserved for cards and high-contrast text.

Avoid neon accents. Any new color must represent a specific state, meet WCAG AA contrast, and be documented here.

## Color application

- Page canvas: ivory.
- Header, hero, footer, and data-heavy sections: dark navy.
- Primary buttons and prominent active states: clay with ivory text.
- Charts, meters, and analytical highlights: navy.
- Light cards: white with mist borders.
- Dark cards: navy tint with ivory text.
- Copy: dark navy on light surfaces; ivory or mist on dark surfaces.

## Typography

- **Barlow Condensed**, weights 600–800: titles, scores, rankings, and short labels.
- **DM Sans**, weights 400 and 600: body copy, controls, tables, and navigation.
- Headlines are uppercase, tightly set, and written as short editorial phrases.
- Eyebrows and metadata use uppercase with `0.12em–0.18em` letter spacing.
- Keep body lines near 60–70 characters with `1.6–1.7` line height.

### Type scale

- Hero title: `clamp(65px, 9vw, 135px)`.
- Section title: `clamp(52px, 7vw, 88px)`.
- Card title: 18–24px.
- Body copy: 11–16px.
- Metadata: 8–10px; never use this size for essential instructions.

## Layout and spacing

- Desktop sections: `6vw` horizontal and `90px` vertical padding.
- Mobile sections: `20px` horizontal and `65px` vertical padding.
- Follow an 8px rhythm: 8, 16, 24, 32, and 40px gaps.
- Prefer crisp rectangular panels; reserve rounded corners for status pills.

## Components

### Buttons

Primary buttons use clay, ivory text, uppercase labels, and strong tracking. Hover and pressed states use clay-dark. Secondary controls are transparent with mist borders; selected controls become dark navy with ivory text. Preserve a visible keyboard focus ring.

### Cards

Light cards use white with a mist border. Featured cards may use dark navy and ivory. Keep hover movement subtle (`2–4px`) with a soft navy-tinted shadow.

### Navigation

Navigation sits on dark navy. Default links use mist; hover, focus, and current links use ivory. The brand marker uses an ivory numeral with a clay outline.

### Tables and data graphics

Use navy for bars, meters, and analytical emphasis. Reserve clay for thresholds, featured values, and active selections. Never rely on color alone: include a label, number, icon, or pattern.

## Interaction and accessibility

- Keep transitions between 150–250ms and use motion to clarify state changes.
- Respect `prefers-reduced-motion`.
- Give interactive elements visible hover, active, and keyboard-focus states.
- Maintain WCAG AA text and control contrast.
- Use semantic headings and meaningful labels.
- Retain table headers; flags and icons must not be the only identifier.

## CSS starter tokens

```css
:root {
  --navy: #245f73;
  --clay: #733e24;
  --mist: #bbbdc0;
  --ivory: #f2f0ef;
  --navy-dark: #173f4d;
  --clay-dark: #512b19;
}
```

## New-page checklist

- Use shared tokens rather than one-off hex values.
- Reuse existing navigation, button, card, and table patterns.
- Keep one clear headline and restrained accent usage.
- Test at 320px width and with keyboard navigation.
- Check contrast and reduced-motion behavior.
- Document genuinely new components or states here.
