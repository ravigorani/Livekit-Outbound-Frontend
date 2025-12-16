# **App Name**: CallFlow Catalyst

## Core Features:

- Call Type Selection: Allow the user to select between 'Inbound' and 'Outbound' call scenarios via a radio selection.
- Inbound Call Form: Dynamically render a form with fields for Agent Name, Prompt, static Telephony No. and Telephony provider (Twilio) when 'Inbound' is selected.
- Outbound Call Form: Dynamically render a form with fields for Agent Name, User Name, Prompt, static Telephony No., User's No. and Telephony provider (Twilio) when 'Outbound' is selected.
- API Call Trigger: Provide a button that triggers a POST request to a predefined API endpoint, sending form data as the payload for each module.

## Style Guidelines:

- Primary color: Deep sky blue (#499bea) evoking clarity and communication.
- Background color: Light blue (#e4f2fb), a desaturated version of the primary color creating a calming and professional feel.
- Accent color: Cyan (#49bfb1), a similar hue to the primary, used for interactive elements.
- Body and headline font: 'Inter', a grotesque-style sans-serif font, offering a modern and neutral aesthetic suitable for a professional telephony interface.
- Implement a clean, single-page layout with clearly defined sections for each call type.
- Use simple, recognizable icons to represent inbound and outbound call actions.
- Incorporate subtle animations on button clicks and form transitions to enhance user engagement without distraction.