Attempt to reproduce when this error doesn't get logged to stderr:

```
Uncaught Exception:
Error: The module '/Users/ross/Projects/electron-repro/node_modules/coreimage-raw-convert/build/Release/raw_converter.node'
was compiled against a different Node.js version using
NODE_MODULE_VERSION 127. This version of Node.js requires
NODE_MODULE_VERSION 136. Please try re-compiling or re-installing
the module (for instance, using `npm rebuild` or `npm install`).
at process.func [as dlopen] (node:electron/js2c/node_init:2:2617)
at Module._extensions..node (node:internal/modules/cjs/loader:1930:18)
at Object.func [as .node] (node:electron/js2c/node_init:2:2617)
at Module.load (node:internal/modules/cjs/loader:1472:32)
at Module._load (node:internal/modules/cjs/loader:1289:12)
at c._load (node:electron/js2c/node_init:2:18013)
at TracingChannel.traceSync (node:diagnostics_channel:322:14)
at wrapModuleLoad (node:internal/modules/cjs/loader:242:24)
at Module.require (node:internal/modules/cjs/loader:1494:12)
at require (node:internal/modules/helpers:135:16)
```

Run `npm run test:playwright` to see the error as a dialog (and that it fails to be logged to stderr).
