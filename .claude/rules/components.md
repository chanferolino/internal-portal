# Component Patterns

## Modals

- Use shadcn/ui `Dialog` for all modals (leave request, outage report, ticketing)
- Modal trigger lives in the parent; modal content is a separate component
- Each modal gets its own file in `src/components/modals/`
- Modal forms reset on close

## Accordions

- Use shadcn/ui `Accordion` for report history
- Each accordion item shows date and summary when collapsed
- Full report details on expand

## Emoji Picker (Mood)

- Custom component, not a library
- Render as a row of clickable emoji cards with labels
- Single select — highlight the selected mood
- Maps to the `Mood` enum (EXCITED, HAPPY, NEUTRAL, TIRED, STRESSED)

## Live Clock

- Client component (`'use client'`) with `useEffect` interval
- Respects the selected timezone from dropdown
- Displays time in 12-hour format with AM/PM

## Floating Action Button

- Fixed position bottom-right for the ticketing button
- Opens a dialog/sheet for filing tickets
- Always visible on the dashboard