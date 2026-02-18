/**
 * content.js - Sitemap to Table Transformation
 * Features: Light Mode, Hreflang extraction, Namespace handling, and responsive layout.
 */

(function() {
    // 1. Listen for the message from popup.js
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === "clean") {
            try {
                executeSitemapTable();
                sendResponse({ status: "success" });
            } catch (error) {
                console.error("Sitemap Table Error:", error);
                sendResponse({ status: "error", message: error.toString() });
            }
        }
        return true; 
    });

    /**
     * Extracts data from XML and builds a clean HTML table
     */
    function executeSitemapTable() {
        // A. Parse the current document into a queryable XML DOM
        const rawXml = new XMLSerializer().serializeToString(document);
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(rawXml, "text/xml");
        
        // Target the <url> tags
        const urlNodes = xmlDoc.getElementsByTagName("url");

        // B. Define the XHTML Namespace for our new UI
        const htmlNS = "http://www.w3.org/1999/xhtml";
        const newHTML = document.createElementNS(htmlNS, "html");
        const newHead = document.createElementNS(htmlNS, "head");
        const newBody = document.createElementNS(htmlNS, "body");

        // C. Light Mode CSS
        const style = document.createElementNS(htmlNS, "style");
        style.textContent = `
            body { 
                font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif; 
                background: #fdfdfd; 
                color: #24292e; 
                margin: 0; 
                padding: 40px; 
                line-height: 1.5;
            }
            .container { max-width: 1200px; margin: 0 auto; }
            h1 { font-size: 24px; font-weight: 600; color: #000; margin-bottom: 20px; }
            table { 
                width: 100%; 
                border-collapse: collapse; 
                background: #fff; 
                border: 1px solid #e1e4e8; 
                border-radius: 6px;
                overflow: hidden;
            }
            th { 
                background: #f6f8fa; 
                padding: 12px 15px; 
                text-align: left; 
                border-bottom: 1px solid #e1e4e8;
                font-size: 14px;
                color: #586069;
            }
            td { 
                padding: 12px 15px; 
                border-bottom: 1px solid #e1e4e8; 
                font-size: 13px; 
                vertical-align: top; 
                word-break: break-all; 
            }
            tr:hover { background-color: #f6f8fa; }
            .url-link { color: #0366d6; text-decoration: none; font-weight: 500; }
            .url-link:hover { text-decoration: underline; }
            .lang-pill { 
                display: inline-block; 
                background: #eff3f6; 
                border: 1px solid #d1d5da; 
                padding: 2px 8px; 
                border-radius: 12px; 
                font-size: 11px; 
                margin: 2px; 
                white-space: nowrap;
            }
            .lang-code { font-weight: bold; color: #444; margin-right: 4px; }
            .meta-val { font-family: monospace; color: #6a737d; }
        `;
        newHead.appendChild(style);

        // D. Create the Table Structure
        const container = document.createElementNS(htmlNS, "div");
        container.setAttribute("class", "container");
        
        const h1 = document.createElementNS(htmlNS, "h1");
        h1.textContent = "Sitemap Content Audit";
        container.appendChild(h1);

        const table = document.createElementNS(htmlNS, "table");
        table.innerHTML = `
            <thead>
                <tr>
                    <th>URL (Location)</th>
                    <th>Hreflang Alternates</th>
                    <th>Priority</th>
                    <th>Last Modified</th>
                </tr>
            </thead>
            <tbody id="table-body"></tbody>
        `;
        container.appendChild(table);
        newBody.appendChild(container);

        const tbody = table.querySelector("#table-body");

        // E. Loop through URLs and build rows
        Array.from(urlNodes).forEach(node => {
            const tr = document.createElementNS(htmlNS, "tr");

            // 1. Get Location
            const loc = node.getElementsByTagName("loc")[0]?.textContent || "";

            // 2. Get Hreflangs (using wildcard namespace for xhtml:link)
            const links = Array.from(node.getElementsByTagNameNS("*", "link"));
            const langHtml = links.map(link => {
                const lang = link.getAttribute("hreflang");
                const href = link.getAttribute("href");
                return lang ? `<span class="lang-pill"><span class="lang-code">${lang}</span>${href}</span>` : "";
            }).join("");

            // 3. Get Priority
            const priority = node.getElementsByTagName("priority")[0]?.textContent || "-";

            // 4. Get Lastmod
            const lastmod = node.getElementsByTagName("lastmod")[0]?.textContent || "-";

            tr.innerHTML = `
                <td><a class="url-link" href="${loc}" target="_blank">${loc}</a></td>
                <td>${langHtml || '<span style="color:#999">N/A</span>'}</td>
                <td class="meta-val" style="text-align:center">${priority}</td>
                <td class="meta-val">${lastmod}</td>
            `;
            tbody.appendChild(tr);
        });

        // F. The Atomic Swap - Replace XML tree with our Table UI
        newHTML.appendChild(newHead);
        newHTML.appendChild(newBody);
        document.replaceChild(newHTML, document.documentElement);
        document.title = "Sitemap Table";
    }
})();