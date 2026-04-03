# Feature Specifications

## Time Tracking
- Live clock synced to selected timezone
- Default timezone: PHT (Philippine Standard Time)
- Time In/Out button toggles state and records timestamp
- Display current date above the clock

## Leave Request (Modal)
Triggered from left sidebar button. Fields:
- **Date range:** Start date — End date (date pickers)
- **Leave Type:** Dropdown (options TBD)
- **Category:** Dropdown (options TBD)
- **Filing Type:** Dropdown (options TBD)
- **Reason:** Text area (required)
- **Attachments:** Drag-and-drop file upload, max 2 files
- **Remaining PTO:** Display remaining PTO for current year
- **Leave Accrual:** Display accrual info
- Submit / Cancel buttons

## Outage Report (Modal)
Triggered from left sidebar button. Fields:
- **Type of Outage:** Dropdown (internet / power)
- **Outage Cause:** Dropdown or text
- **Street Address:** Text input
- **City:** Text input
- **Start Time / End Time:** Time pickers
- **Start Date / End Date:** Date pickers
- **Details:** Rich text area with styling
- Submit button

## End of Shift Report
Always visible in center column. See layout.md for field details.
- Mood selection is required
- Accomplishments field is required
- Challenges/Next steps field is required
- Management support field is optional (visible only to management)

## Report History
- Located below the shift report form
- Each past report displayed as an accordion
- Shows date and summary in collapsed state
- Expands to show full report details

## Ticketing (Floating Button)
- Floating action button accessible from anywhere on the dashboard
- Opens a modal/panel for filing internal tickets
- Categories: HR, Finance, IT
- IT sub-categories: Peripherals, Permissions
- Fields TBD — prepare the structure

## US Holidays (Right Sidebar)
Static data for current year. Collapsible list.

## About Us (Right Sidebar)
Two tabs — Core Values and Purpose. Content is static.

## FAQ (Right Sidebar)
Link list — URLs to be added later:
- Club Portal
- Bulletin
- Payroll FAQ Sheet
- Product Request
- Referral Form - recruit your friends
