import { _electron as electron } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  // Launch Electron app
  console.log('Launching Electron app...');
  
  const electronApp = await electron.launch({
    args: [path.join(__dirname, 'main.js')],
    // Capture stderr output
    env: {
      ...process.env,
    }
  });

  // Wait a moment to ensure app is fully initialized
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Get the first window
  const window = await electronApp.firstWindow();
  
  if (window) {
    console.log('Electron app window opened successfully');
    
    // Optional: take a screenshot
    // await window.screenshot({ path: 'electron-screenshot.png' });
  }

  // Close the app
  console.log('Closing Electron app...');
  await electronApp.close();
  
  console.log('Test completed');
})();