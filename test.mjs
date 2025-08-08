import { _electron as electron } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  const entryPoint = process.env.ELECTRON_ENTRY || 'main';
  const entryFile = entryPoint === 'bootstrap' ? 'bootstrap.js' : 'main.js';
  
  console.log(`Testing with entry point: ${entryFile}`);
  console.log('Launching Electron app...');
  
  let stderrOutput = '';
  
  const electronApp = await electron.launch({
    args: [path.join(__dirname, entryFile)],
    env: {
      ...process.env,
    }
  });

  electronApp.process().stderr.on('data', (data) => {
    stderrOutput += data.toString();
    console.log('STDERR:', data.toString());
  });

  await new Promise(resolve => setTimeout(resolve, 2000));

  const window = await electronApp.firstWindow();
  
  if (window) {
    console.log('Electron app window opened successfully');
  }

  console.log('Closing Electron app...');
  await electronApp.close();
  
  console.log('\n=== Test Results ===');
  console.log(`Entry point: ${entryFile}`);
  console.log(`Stderr output captured: ${stderrOutput.length > 0 ? 'YES' : 'NO'}`);
  if (stderrOutput.length > 0) {
    console.log('Stderr content:', stderrOutput);
  } else {
    console.log('No stderr output was captured');
  }
  console.log('Test completed');
})();