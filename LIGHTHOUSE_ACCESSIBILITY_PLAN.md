# Lighthouse Accessibility Plan

## Context

- Report source: `c:\Users\Dhrubo\Documents\Downloads\www.hawkeri.com-20260424T003550.html`
- Tested URL: `https://www.hawkeri.com/`
- Lighthouse version: `13.0.2`
- Fetch time: `2026-04-23T18:35:50.597Z`
- Current status: findings reviewed, no code changes made yet

## Confirmed Issues From The Report

### 1. `aria-hidden-focus`

Problem:
- The cart drawer is hidden visually but remains in the DOM with focusable descendants.
- Lighthouse flagged the closed drawer because buttons and links inside it can still be focused while the drawer has `aria-hidden="true"`.

Why it matters:
- This is an accessibility failure.
- Screen reader users and keyboard users can reach controls that should be unavailable.

Confirmed affected area:
- `src/components/shared/navbar/CartDrawer.tsx`

Flagged elements inside the drawer:
- Close button
- `View Cart` link
- `Proceed to Checkout` link

### 2. `button-name`

Problem:
- Some hero/banner buttons do not have accessible names.

Why it matters:
- Screen readers may announce them as generic buttons with no clear purpose.

Confirmed affected area:
- `src/components/home/HeroBanner.tsx`

Flagged elements:
- Previous slide arrow button
- Next slide arrow button
- Slider pagination dot buttons

## Primary Files To Change Later

### High Priority

#### `src/components/shared/navbar/CartDrawer.tsx`

Work needed:
- Replace the current hidden-state accessibility behavior.
- Ensure closed drawer content is not focusable.
- Consider using proper dialog or drawer semantics.
- Add focus management when opening and closing.
- Add keyboard-safe behavior for `Escape`, focus entry, and focus return.

Expected outcome:
- Hidden cart drawer controls cannot be tabbed to.
- Drawer behaves like an accessible interactive panel.

#### `src/components/home/HeroBanner.tsx`

Work needed:
- Add explicit accessible names to previous and next buttons.
- Add labels to pagination dot buttons.
- Remove the nested interactive pattern where a `button` exists inside a `Link`.
- Review slider autoplay behavior and controls for accessibility.

Expected outcome:
- All slider controls are announced correctly by assistive technology.

### Medium Priority

#### `src/components/shared/navbar/NavbarClient.tsx`

Work needed:
- Support improved drawer open and close state handling.
- Optionally hold the trigger ref so focus can return correctly after drawer close.
- Keep drawer state wiring clean if dialog-style handling is introduced.

#### `src/components/shared/navbar/MainHeader.tsx`

Work needed:
- Add stronger cart trigger semantics if tied to drawer state.
- Review account dropdown keyboard behavior.
- Review accessible naming and expanded state where relevant.

#### `src/components/shared/navbar/MobileHeader.tsx`

Work needed:
- Add explicit accessible names for mobile menu and cart controls.
- Review mobile account expansion behavior.
- Make sure mobile navigation interactions are keyboard accessible.

### Lower Priority Review

#### `src/components/shared/ProductSearchBox.tsx`

Work needed:
- Review whether the input needs an explicit accessible label.
- Review the suggestion panel interaction pattern.
- Improve semantics if this should behave like a combobox or searchable results panel.

#### `src/app/(protected)/cart/_components/CartIconAnimation.tsx`

Work needed:
- Keep animation decorative only.
- Ensure the parent cart button exposes useful text and count semantics.
- Recheck reduced-motion handling after navbar work is done.

## Files That Do Not Need Immediate Work

#### `src/app/(public)/product/_components/AddToCartButton.tsx`

Notes:
- Already has `aria-label="Add to cart"`.
- Not part of the confirmed Lighthouse failures reviewed in this pass.

#### `src/components/shared/navbar/cartMockData.ts`

Notes:
- File was referenced in the IDE tab list, but it was not found in the current repo path during review.
- Not relevant to the confirmed issues above unless it is added later.

## Folder-Level Scope

Main areas for the future fix:

1. `src/components/shared/navbar/`
2. `src/components/home/`
3. `src/components/shared/`
4. `src/app/(protected)/cart/_components/`

## Recommended Order Of Work

1. Fix cart drawer accessibility in `CartDrawer.tsx`
2. Update drawer state coordination in `NavbarClient.tsx` if needed
3. Fix hero slider control labeling and interaction structure in `HeroBanner.tsx`
4. Review desktop and mobile header trigger semantics
5. Review search box semantics
6. Re-run Lighthouse and keyboard-only testing

## Detailed Deferred Checklist

### Cart Drawer

- Remove focusability when drawer is closed
- Avoid `aria-hidden` on a container that still contains active controls
- Add dialog labeling if implemented as a true dialog
- Move focus into the drawer when it opens
- Return focus to the cart trigger when it closes
- Prevent keyboard users from tabbing behind the open drawer if modal behavior is intended
- Re-test with keyboard only

### Hero Banner

- Add `aria-label` or equivalent accessible naming to prev and next buttons
- Add meaningful labels to pagination buttons
- Remove `button` inside `Link`
- Recheck autoplay impact on usability
- Re-run Lighthouse accessibility audit

### Header Components

- Verify cart trigger labels on desktop and mobile
- Verify account dropdown toggle behavior
- Add `aria-expanded` and related attributes where appropriate
- Check keyboard closing and outside-click behavior

### Search

- Confirm search input naming
- Confirm result panel semantics
- Check keyboard navigation inside the result list

## Validation Plan For Later

After implementation, validate with:

1. Lighthouse accessibility audit
2. Keyboard-only navigation
3. Screen reader spot checks
4. Mobile and desktop interaction testing
5. Regression check on cart open, close, clear, and checkout flows

## Notes

- This document is a planning handoff only.
- No code was modified as part of this review.
- The current findings are based on the saved Lighthouse report and direct inspection of the related source files.
