# Design system

The site is built to read like a printed document. Warm paper, near-black ink, thin rules and a single green accent used the way a rubber stamp marks a page. A second accent in terracotta plays the role of an editorial correction mark. The goal is an archival record, not a flat SaaS layout.

## Color

Colors live as OKLCH tokens in `styles/globals.css`. The hex values below are approximate.

- Paper `#F4F4F0`. The page background, a warm off-white.
- Ink `#1F2520`. Primary text, a near-black with a faint green cast.
- Ink secondary `#4B524C` and tertiary `#707671`. Supporting text and metadata.
- Line `#CDD2CE` and `#B6BCB7`. Hairline rules and borders.
- Stamp `#1D754C` and stamp ink `#01603A`. The green accent for links, marks and active states.
- Correction `#C03F26`. A terracotta used rarely, only as a correction style highlight.

The accent is scarce on purpose. Green marks the few things worth acting on. Everything else is ink on paper.

## Type

- Display: Archivo. Section titles and the hero.
- Body: Asap. Running text.
- Mono: Geist Mono. Kickers, metadata, the terminal and technical labels.

Hierarchy comes from weight, size and rules rather than color. Headings are ink, never colored.

## Texture and motion

A faint fractal noise overlay gives the paper its grain. Motion is small and quick, and it is removed entirely when the visitor prefers reduced motion. Transparency effects fall back to solid panels under reduced transparency.

## Components

- Rules. Single, heavy and double rules separate sections, echoing a printed form.
- Stamp. A rotated bordered label used as an approval mark.
- Panel. Bordered blocks on paper, or sunk into a slightly darker paper.
- Leaders. Dotted lines that connect a label to a value across a row.
- Buttons. Square cornered, mono label, solid ink or outline. Hover on the solid button shifts to the green ink.

## Principles

- Keep the accent under roughly ten percent of any view.
- Let weight and rules carry hierarchy before reaching for color.
- Respect reduced motion and reduced transparency.
- Avoid decorative gradients behind long text and oversized rounded corners.
