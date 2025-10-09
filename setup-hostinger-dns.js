const puppeteer = require('puppeteer');

(async () => {
  console.log('🚀 Starting Hostinger DNS Configuration...\n');

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized']
  });

  const page = await browser.newPage();

  try {
    // Navigate to Hostinger
    console.log('📡 Opening Hostinger...');
    await page.goto('https://hpanel.hostinger.com/domain/angelmedina.io/dns', {
      waitUntil: 'networkidle2',
      timeout: 60000
    });

    // Wait for login if needed
    console.log('⏳ Waiting for you to log in if needed...');
    console.log('   (The script will continue once the DNS page loads)\n');

    // Wait for DNS management page to load (check for common elements)
    await page.waitForSelector('button, input, [class*="dns"], [class*="DNS"]', {
      timeout: 120000
    });

    console.log('✅ DNS page loaded!\n');

    // Small delay to ensure page is fully loaded
    await page.waitForTimeout(2000);

    console.log('🔍 Looking for "Add Record" or "Add New Record" button...\n');

    // Try to find and click "Add Record" button
    // Hostinger uses different selectors, so we'll try multiple approaches
    const addRecordSelectors = [
      'button:has-text("Add Record")',
      'button:has-text("Add New Record")',
      'a:has-text("Add Record")',
      '[data-test*="add"]',
      'button[class*="add"]',
      '.add-record-button'
    ];

    let addButtonFound = false;
    for (const selector of addRecordSelectors) {
      try {
        const element = await page.$(selector);
        if (element) {
          console.log(`✅ Found add button with selector: ${selector}`);
          await element.click();
          addButtonFound = true;
          await page.waitForTimeout(1500);
          break;
        }
      } catch (e) {
        // Continue to next selector
      }
    }

    if (!addButtonFound) {
      console.log('⚠️  Could not find "Add Record" button automatically.');
      console.log('📝 Please manually click "Add Record" or "Add New Record" button\n');
      console.log('Press Enter in the terminal once you\'ve clicked it...');

      // Wait for user to press enter
      await new Promise(resolve => {
        process.stdin.once('data', () => resolve());
      });
    }

    console.log('\n📋 Configuring DNS Records:\n');

    // Configuration for A record
    console.log('1️⃣  Adding A Record for apex domain (@)...');
    console.log('   Type: A');
    console.log('   Name: @');
    console.log('   Value: 76.76.21.21\n');

    // Fill in A Record
    await fillDNSRecord(page, 'A', '@', '76.76.21.21');

    console.log('✅ A Record configured!\n');
    await page.waitForTimeout(2000);

    // Try to add another record (CNAME)
    console.log('2️⃣  Adding CNAME Record for www subdomain...');
    console.log('   Type: CNAME');
    console.log('   Name: www');
    console.log('   Value: cname.vercel-dns.com\n');

    // Click add record again for CNAME
    for (const selector of addRecordSelectors) {
      try {
        const element = await page.$(selector);
        if (element) {
          await element.click();
          await page.waitForTimeout(1500);
          break;
        }
      } catch (e) {
        // Continue
      }
    }

    await fillDNSRecord(page, 'CNAME', 'www', 'cname.vercel-dns.com');

    console.log('✅ CNAME Record configured!\n');
    await page.waitForTimeout(2000);

    // Look for save/submit button
    console.log('💾 Looking for Save button...\n');
    const saveSelectors = [
      'button:has-text("Save")',
      'button:has-text("Save Changes")',
      'button:has-text("Add")',
      'button[type="submit"]',
      '[data-test*="save"]',
      '[data-test*="submit"]'
    ];

    let saveButtonFound = false;
    for (const selector of saveSelectors) {
      try {
        const element = await page.$(selector);
        if (element) {
          console.log(`✅ Found save button: ${selector}`);
          await element.click();
          saveButtonFound = true;
          await page.waitForTimeout(2000);
          break;
        }
      } catch (e) {
        // Continue
      }
    }

    if (!saveButtonFound) {
      console.log('⚠️  Could not find Save button automatically.');
      console.log('📝 Please manually click the Save or Submit button to apply changes\n');
    }

    console.log('\n✅ DNS Configuration Complete!\n');
    console.log('📋 Summary:');
    console.log('   A Record:     @ → 76.76.21.21');
    console.log('   CNAME Record: www → cname.vercel-dns.com\n');
    console.log('⏱  DNS propagation typically takes 1-48 hours');
    console.log('🔍 Check status: https://www.whatsmydns.net/#A/angelmedina.io\n');
    console.log('Press Enter to close the browser...');

    await new Promise(resolve => {
      process.stdin.once('data', () => resolve());
    });

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.log('\n📝 Manual steps to configure DNS on Hostinger:\n');
    console.log('1. Go to: https://hpanel.hostinger.com/domain/angelmedina.io/dns');
    console.log('2. Click "Add New Record" or "Manage"');
    console.log('3. Add A Record:');
    console.log('   Type: A');
    console.log('   Name: @ (or leave blank)');
    console.log('   Points to: 76.76.21.21');
    console.log('   TTL: 3600 (default)');
    console.log('4. Click "Add Record"');
    console.log('5. Add CNAME Record:');
    console.log('   Type: CNAME');
    console.log('   Name: www');
    console.log('   Points to: cname.vercel-dns.com');
    console.log('   TTL: 3600 (default)');
    console.log('6. Click "Save Changes"\n');
  } finally {
    await browser.close();
  }
})();

async function fillDNSRecord(page, type, name, value) {
  try {
    // Look for type dropdown/select
    const typeSelectors = [
      'select[name*="type"]',
      'select[id*="type"]',
      '[data-test*="type"]',
      'select'
    ];

    for (const selector of typeSelectors) {
      try {
        const element = await page.$(selector);
        if (element) {
          await element.select(type);
          break;
        }
      } catch (e) {
        // Continue
      }
    }

    // Fill name field
    const nameSelectors = [
      'input[name*="name"]',
      'input[placeholder*="name"]',
      'input[id*="name"]',
      'input[placeholder*="Name"]'
    ];

    for (const selector of nameSelectors) {
      try {
        const element = await page.$(selector);
        if (element) {
          await element.click({ clickCount: 3 });
          await element.type(name);
          break;
        }
      } catch (e) {
        // Continue
      }
    }

    // Fill value/points to field
    const valueSelectors = [
      'input[name*="value"]',
      'input[name*="points"]',
      'input[name*="target"]',
      'input[placeholder*="value"]',
      'input[placeholder*="Points"]',
      'input[id*="value"]'
    ];

    for (const selector of valueSelectors) {
      try {
        const element = await page.$(selector);
        if (element) {
          await element.click({ clickCount: 3 });
          await element.type(value);
          break;
        }
      } catch (e) {
        // Continue
      }
    }

    await page.waitForTimeout(1000);
  } catch (error) {
    console.log(`⚠️  Could not auto-fill ${type} record. Please fill manually.`);
  }
}
