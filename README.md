# Sitemap-Table-Inspector

📑 Sitemap Table Inspector Documentation

1. Overview
The Sitemap Table Inspector is a Chrome Extension designed for SEO specialists, Web Developers, and QA Engineers. It transforms complex, hard-to-read XML sitemaps—specifically those using XSL stylesheets a clean, interactive, and human-readable HTML table.

By stripping away the "pretty" CSS rendering and XSL transformations that often block data scraping, this tool gives you a direct, structured view of the underlying metadata.

Why this helps the user:
Audit Efficiency: View all URLs, translation links (hreflangs), priorities, and last modified dates in a single, sortable view.

Hreflang Validation: Instantly check if international versions of a page are correctly mapped without digging into the source code.

Data Accuracy: Removes XSL layers that can sometimes hide specific XML nodes.

Light Mode Comfort: Provides a high-contrast, professional UI that is easier on the eyes during long audits.

2. Key Features
- Atomic Namespace Swap: Bypasses strict XML security to render HTML directly inside an XML document.
- Hreflang Parsing: Specifically extracts xhtml:link attributes and displays them as readable "language pills."
- Real-time Transformation: One-click activation via the browser toolbar.
- Direct Navigation: All extracted URLs are clickable for immediate verification.

3. Installation Guide
Since this is a custom-built tool, you will install it via Developer Mode:

Step 1: Prepare the Files
Ensure you have the following three files in a single folder named sitemap-cleaner:
  - manifest.json
  - popup.html / popup.js
  - content.js

Step 2: Open Chrome Extensions
 - Open Google Chrome.
 - In the address bar, type chrome://extensions/ and press Enter.
 - In the top-right corner, toggle the Developer mode switch to ON.

Step 3: Load the Extension
 - Click the Load unpacked button that appears in the top-left.
 - Select the sitemap-cleaner folder you created in Step 1.
 - The extension "Sitemap Raw Viewer" will now appear in your list.

4. How to Use
Navigate to a sitemap URL (e.g., https://www.test.com/sitemap.xml).
  - Click the Puzzle Piece icon (Extensions) in your Chrome toolbar and pin the Sitemap Raw Viewer.
  - Click the extension icon.
  - Click the "Clean Sitemap" button.
  - Result: The page will instantly transform from a styled XML list into a structured Audit Table.

5. Technical Troubleshooting
 - "Connection end does not exist": This happens if the page was open before the extension was installed. Simply Refresh the webpage and try again.
 - Formatting Issues: Ensure the sitemap is a valid XML file. The extension is optimized for standard <urlset> and <url> structures used by major enterprises.
