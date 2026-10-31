/**
 * Test Harness Helpers for Aura & Paw Grooming Studio
 * Provides SSR rendering, CSS extraction, and headless Chrome iframe execution.
 */

import React from 'react';
import { renderToString } from 'react-dom/server';
import fs from 'fs';
import path from 'path';
import { spawn, execSync } from 'child_process';

export const TARGET_VIEWPORTS = [375, 390, 768, 1024, 1280] as const;
export type ViewportWidth = (typeof TARGET_VIEWPORTS)[number];

export interface ViewportResult {
  innerWidth: number;
  scrollWidth: number;
  bodyScrollWidth: number;
  overflow: boolean;
  overflowDelta: number;
  overflowingElements: Array<{
    tag: string;
    cls: string;
    right: number;
    width: number;
  }>;
}

export function getChromeExecutable(): string {
  const candidates = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  throw new Error('No compatible Chromium browser found (Chrome/Edge)');
}

export function getCompiledCss(): string {
  const distAssets = path.join(process.cwd(), 'dist', 'assets');
  if (!fs.existsSync(distAssets)) {
    console.log('Dist assets not found. Triggering clean build...');
    execSync('npm run build', { stdio: 'inherit' });
  }
  const cssFile = fs.readdirSync(distAssets).find((f) => f.endsWith('.css'));
  if (!cssFile) {
    throw new Error('CSS file not found in dist/assets. Build may have failed.');
  }
  return fs.readFileSync(path.join(distAssets, cssFile), 'utf-8');
}

export function renderComponentToString(component: React.ReactElement): string {
  return renderToString(component);
}

/**
 * Execute client-side test code inside real Headless Chrome across specified viewports.
 */
export async function executeInChrome<T>(
  viewportWidths: number[],
  bodyHtml: string,
  clientTestFn: string
): Promise<Record<number, T>> {
  const chromePath = getChromeExecutable();
  const cssContent = getCompiledCss();

  const runnerHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Aura &amp; Paw Headless E2E Runner</title>
</head>
<body>
  <div id="status">Running tests...</div>
  <script id="test-results" type="application/json"></script>
  <script>
    const vps = ${JSON.stringify(viewportWidths)};
    const css = ${JSON.stringify(cssContent)};
    const bodyHtml = ${JSON.stringify(bodyHtml)};
    const evalClient = ${clientTestFn};
    const out = {};

    function runNext(idx) {
      if (idx >= vps.length) {
        document.getElementById('status').textContent = 'DONE';
        document.getElementById('test-results').textContent = JSON.stringify(out);
        return;
      }
      const w = vps[idx];
      const ifr = document.createElement('iframe');
      ifr.style.width = w + 'px';
      ifr.style.height = '1200px';
      ifr.style.border = 'none';
      document.body.appendChild(ifr);

      const doc = ifr.contentDocument || ifr.contentWindow.document;
      doc.open();
      doc.write('<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>' + css + '</style></head><body class="bg-[#FAF8F3] text-[#202923] w-full max-w-full overflow-x-clip">' + bodyHtml + '</body></html>');
      doc.close();

      setTimeout(() => {
        try {
          out[w] = evalClient(ifr.contentWindow, doc, w);
        } catch (err) {
          out[w] = { error: err.message || String(err) };
        }
        ifr.remove();
        runNext(idx + 1);
      }, 80);
    }

    runNext(0);
  </script>
</body>
</html>`;

  const tempFilePath = path.join(
    process.cwd(),
    'tests',
    `temp_harness_${Date.now()}_${Math.random().toString(36).slice(2)}.html`
  );

  fs.writeFileSync(tempFilePath, runnerHtml, 'utf-8');

  return new Promise((resolve, reject) => {
    const p = spawn(chromePath, [
      '--headless=new',
      '--no-sandbox',
      '--disable-gpu',
      '--allow-file-access-from-files',
      '--window-size=1600,1400',
      '--virtual-time-budget=10000',
      '--run-all-compositor-stages-before-draw',
      '--dump-dom',
      'file:///' + tempFilePath.replace(/\\/g, '/')
    ]);

    let stdout = '';
    let stderr = '';
    p.stdout.on('data', (d) => (stdout += d.toString()));
    p.stderr.on('data', (d) => (stderr += d.toString()));

    p.on('close', (code) => {
      try {
        if (fs.existsSync(tempFilePath)) {
          fs.unlinkSync(tempFilePath);
        }
      } catch {}

      const match = stdout.match(
        /<script id="test-results" type="application\/json">([\s\S]*?)<\/script>/
      );
      if (match && match[1]) {
        try {
          const parsed = JSON.parse(match[1]);
          resolve(parsed);
        } catch (e: any) {
          reject(new Error(`Failed to parse test results JSON: ${e.message}\nRaw: ${match[1]}`));
        }
      } else {
        reject(
          new Error(
            `No test results extracted from Chrome output. Exit code: ${code}\nStderr: ${stderr}`
          )
        );
      }
    });

    p.on('error', (err) => {
      try {
        if (fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath);
      } catch {}
      reject(err);
    });
  });
}
