# SpatialHunt — Design System (from codebase)

Values below are **discovered in the repository**, not invented.

## Brand

- Wordmark: **SPATIAL** `#F4B942` + **HUNT** `#1E5A4F`
- Logo assets: `/SH-LOGO.svg`, `/SH.svg`
- Promise: Verified Homes. Direct To Landlords. Zero Stress.

## Typography

- Font: **Manrope** (`next/font/google`, CSS var `--font-manrope`)
- Body/default: `#2E2E2E`
- Muted: `#777777`, `#8A8A8A`, `#9A9A9A`, `#A0A0A0`
- On evergreen: `#D8E4E1`, `#C9D8D4`

## Color tokens

| Role | Hex |
| --- | --- |
| Evergreen primary | `#1E5A4F` |
| Evergreen hover | `#17483F` |
| Evergreen mid | `#1B6345` |
| Evergreen translucent active | `#117E2540` |
| Success / verified | `#117E25`, `#378653` |
| Success soft | `#DDF2E4`, `#F0F7F4`, `#EAF3F0` |
| Amber accent | `#F4B942` / `#F4B940` |
| Amber text/hover | `#C58D16`, `#C99A20` |
| Amber soft | `#FFF4D6`, `#FFF6D9` |
| Page wash | `#FAFAF8` |
| Borders | `#EAEAEA`, `#E5E5E5`, `#EEEEEE`, `#DDDDDD` |
| Image placeholder | `#F7F7F7` |

**Semantics:** Evergreen = trust/verified. Amber = CTA, alert, needs-attention.

## Spacing & layout

- Public content often `max-w-7xl`; dashboards `max-w-[1400px]`
- Gutters `px-4` → `xl:px-8/12`
- Section gaps commonly `gap-4` / `gap-5`

## Radius & elevation

- Controls/cards: `rounded-[5px]`–`rounded-[8px]`, `rounded-md`, `rounded-lg`
- Prefer borders over heavy multi-layer shadows
- Mobile menus may use `shadow-lg`

## Buttons

- Amber CTA: `bg-[#F4B942] text-[#1E5A4F] font-semibold`
- Evergreen: `bg-[#1E5A4F] text-white`
- Outline: border `#DDDDDD`, hover border evergreen

## Forms

- Border `#E5E5E5`, focus `#1E5A4F`
- Error text `#C58D16`
- Password visibility toggle as text control (existing auth pattern)

## Badges

- Verified: soft green `#DDF2E4` / `#117E25`
- Pending/attention: `#FFF6D9` / `#C99A20`

## Navigation

- Public: evergreen links, amber active underline, amber hover wash `#FFF4D6`
- App sidebars: evergreen panel `#1E5A4F`, active `#117E2540`

## Breakpoints

Tailwind defaults: `sm` `md` `lg` `xl` `2xl`. Tenant mobile-first; landlord/admin desktop-first but responsive.

## Motion

- `transition-all duration-200`
- Subtle `hover:scale-[1.02]` / `group-hover:scale-105`
- Prefer skeletons over decorative dashboard animation

## Icons

Static SVGs in `/public` — prefer existing assets over new icon packages.
