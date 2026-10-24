# Spare Leads

Spare Leads is a React application that turns a list of available electronics
components into practical project ideas using Google Gemini.

## Demo

Try the deployed application at
[spareleads.vercel.app](https://spareleads.vercel.app/).

## Features

- Add electronics components to an inventory list
- Reset the component list
- Generate one detailed electronics project or three concise project options
- Render the generated response as Markdown
- Responsive layout for desktop and mobile screens

## Tech stack

- React
- Vite
- Google Gemini API
- `@google/genai`
- `react-markdown`

## Getting started

### Requirements

- Node.js 20 or newer
- A Google Gemini API key

### Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/kumaranurag00748-byte/SpareLeads.git
cd SpareLeads
npm install
```

Create a local `.env` file in the project root:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key
```

You can use `.env.example` as a template.

### Run the development server

```bash
npm run dev
```

Open the local URL shown by Vite, usually:

```text
http://localhost:5173
```

### Create a production build

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## How it works

1. The user adds components through the form.
2. The `components` state stores the current component list.
3. After at least four components are added, the user chooses
   **One project** or **Three options**.
4. The app sends the component list and requested output count to Gemini.
5. The response is stored in the `project` state and rendered as Markdown.

### Generation modes

The project card provides two generation buttons:

- **One project** sends one request for a detailed project idea.
- **Three options** sends one request for three concise project ideas.

Only the button that was selected displays the loading state. Both buttons are
disabled while the request is in progress to prevent duplicate requests.

## Multiple project options and API usage

Generating multiple options can use more quota, but the exact usage depends on how it is implemented:

- Making three separate Gemini requests uses roughly three times the request overhead and input tokens.
- Making one request that asks for three concise options is usually more efficient.
- Longer options use more output tokens and may consume quota faster.

This project requests three concise options in one API call, which is more
efficient than making three separate requests. Detailed build instructions can
then be generated for a selected option in a future enhancement.

## Security note

The `VITE_GEMINI_API_KEY` variable is exposed to browser code because Vite exposes variables prefixed with `VITE_`. This is acceptable for local learning and prototypes, but it is not a secure production architecture.

For production, move the Gemini request to a server-side endpoint and keep the API key in the server environment.

Never commit `.env` or publish API keys. If a key has already been exposed,
revoke it and create a replacement before uploading the repository.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create an optimized production build |
| `npm run preview` | Preview the production build locally |

## Project structure

```text
spareLeads/
├── components/
│   ├── ComponentsList.jsx
│   ├── Footer.jsx
│   ├── Response.jsx
│   ├── header.jsx
│   └── main.jsx
├── images/
│   └── logo.png
├── public/
│   └── logo.png
├── styles/
│   └── main.css
├── .env.example
├── .gitignore
├── ai.js
├── app.jsx
├── index.html
├── index.jsx
├── LICENSE
├── package-lock.json
├── package.json
└── README.md
```

The `images/logo.png` file is used in the application header, while
`public/logo.png` is served directly as the browser favicon.

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for
the complete license text.
