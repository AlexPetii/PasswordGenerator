# Password Generator

A password generator application built with Angular and TypeScript, featuring API Ninjas integration.

## Features

- Generate secure random passwords
- Customize password length (4–64 characters)
- Include or exclude numbers and special characters in local mode
- Generate passwords using API Ninjas
- Copy generated passwords to the clipboard
- Automatic fallback to local generation if the API is unavailable
- Reactive interface using Angular Signals

## Technologies

- Angular
- TypeScript
- HTML / CSS
- RxJS
- Node.js / Express
- API Ninjas

## Installation

Clone the repository:

```bash
git clone https://github.com/AlexPetii/PasswordGenerator.git
cd PasswordGenerator
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```env
API_NINJAS_KEY=your_api_key
```

Start the backend server:

```bash
node server.mjs
```

In a separate terminal, start Angular:

```bash
ng serve --proxy-config proxy.conf.json
```

Open http://localhost:4200 in your browser.

## Notes

- The API key is stored in `.env` and must not be committed.
- Local password generation uses the Web Crypto API.
- Number and symbol preferences are guaranteed in local mode.

## Author

Angular Password Generator Project
