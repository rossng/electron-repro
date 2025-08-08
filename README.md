# Electron stderr Error Handling Comparison

This repository demonstrates the difference in error output behavior between two Electron app launch methods when run through Playwright.

## The Error

The coreimage-raw-convert library is intentionally compiled against the wrong Node.js version (NODE_MODULE_VERSION 127 vs required 136). This causes the module loader to fail during the synchronous require() call in main.js, before any user code executes.

## Setup

The repository contains two entry points:
- `main.js` - Standard Electron entry point with synchronous require
- `bootstrap.js` - Wrapper that installs uncaughtException handlers before async importing main.js

## Running the Comparison

### Direct Electron Launch (error appears in both cases)
```bash
# Both commands will show the error in terminal
npm run start:main
npm run start:bootstrap
```

### Playwright Launch (demonstrates the issue)
```bash
# Error NOT captured to stderr
npm run test:main

# Error IS captured to stderr  
npm run test:bootstrap
```

## Expected Behavior

When launched directly with Electron:
- Both entry points display the error in the terminal

When launched via Playwright:
- **main.js entry**: Error does not appear in stderr (Playwright cannot capture it)
- **bootstrap.js entry**: Error is captured and written to stderr by the uncaughtException handler

## Technical Details

The bootstrap.js file registers handlers for:
- `process.on('uncaughtException')` 
- `process.on('unhandledRejection')`

These handlers execute before the async import of main.js, ensuring errors during module loading are captured and written to stderr. This is critical for CI/CD environments where Playwright tests need to detect Electron startup failures.
