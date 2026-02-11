// ==UserScript==
// @name         AMC Showtimes Alert
// @namespace    https://charles-helper
// @version      1.0
// @description  Show next 7 days showtimes with detailed logging and subsection support, formatted
// @author       CharlesW1
// @match        https://www.amctheatres.com/movies/*/showtimes*
// @grant        GM_xmlhttpRequest
// @connect      amctheatres.com
// @updateURL    https://raw.githubusercontent.com/CharlesW1/AMC-Showtimes-Tampermonkey/main/amc-showtimes.user.js
// @downloadURL  https://raw.githubusercontent.com/CharlesW1/AMC-Showtimes-Tampermonkey/main/amc-showtimes.user.js
// ==/UserScript==

(function () {
    const DAYS = 14;

    function formatDate(dt) {
        return dt.toISOString().split("T")[0];
    }

    function humanDate(dt) {
        return dt.toLocaleDateString(undefined, {
            weekday: "short",
            month: "short",
            day: "numeric"
        });
    }

    function getMovieNameFromUrl() {
        const pathParts = window.location.pathname.split("/");
        const moviePart = pathParts[2] || "Movie";
        const nameParts = moviePart.split("-");
        if (/\d+$/.test(nameParts[nameParts.length - 1])) nameParts.pop();
        return nameParts.join(" ").replace(/\b\w/g, l => l.toUpperCase());
    }

    function mapTheatreLabel(theatreParam) {
        if (!theatreParam) return "";
        const words = theatreParam.split("-");
        const parts = [];
        for (let i = 0; i < words.length; i++) {
            const word = words[i].toLowerCase();
            if (word === "amc") parts.push("AMC");
            else if (word === "dine") {
                parts.push("DINE-IN");
                if (words[i + 1] && words[i + 1].toLowerCase() === "in") i++;
            } else parts.push(word.charAt(0).toUpperCase() + word.slice(1));
        }
        return "Showtimes at " + parts.join(" ");
    }

    function fetchHTML(url) {
        console.log(`Sending request to: ${url}`);
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: "GET",
                url,
                onload: res => resolve(res.responseText),
                onerror: reject
            });
        });
    }

    function formatDateLocal(dt) {
        const y = dt.getFullYear();
        const m = (dt.getMonth() + 1).toString().padStart(2, '0');
        const d = dt.getDate().toString().padStart(2, '0');
        return `${y}-${m}-${d}`;
    }


    async function run() {
        const url = new URL(window.location.href);

        // Grab the theatre select element
        const theatreSelect = document.querySelector('select[name="theatre"]');

        // Use the URL parameter if available, otherwise fallback to the first option in the select
        let theatreParam = new URLSearchParams(window.location.search).get("theatre")
        || theatreSelect?.options[0]?.value;

        if (!theatreParam) {
            console.error("No theatre found in URL or select options.");
            return;
        }


        let startDateStr = url.searchParams.get("date") || formatDateLocal(new Date());

        // Parse YYYY-MM-DD into local Date to avoid UTC offset issues
        const startDateParts = startDateStr.split("-").map(Number);
        const startDate = new Date(startDateParts[0], startDateParts[1] - 1, startDateParts[2]);


        if (!theatreParam) {
            console.log("Theatre parameter missing in URL.");
            console.error("This page must include ?theatre=<theatre-code>");
            return;
        }

        const movieTitle = getMovieNameFromUrl();
        const targetLabel = mapTheatreLabel(theatreParam);
        const base = url.origin + url.pathname;

        const dates = [];
        const requests = [];
        for (let i = 0; i < DAYS; i++) {
            const d = new Date(startDate);
            d.setDate(startDate.getDate() + i);
            const dateStr = formatDate(d);
            dates.push(d);
            requests.push(fetchHTML(`${base}?date=${dateStr}&theatre=${theatreParam}`));
        }

        try {
            const htmls = await Promise.all(requests);
            const results = htmls.map((html, idx) => {
                const doc = new DOMParser().parseFromString(html, "text/html");
                const block = [...doc.querySelectorAll('div[role="group"]')]
                    .find(div => div.getAttribute("aria-label") === targetLabel);

                console.log(`URL: ${base}?date=${formatDate(dates[idx])}&theatre=${theatreParam}`);
                console.log(`Target label: "${targetLabel}"`);

                if (!block) {
                    console.log(`${humanDate(dates[idx])}: Showtimes section not found\n`);
                    return `${humanDate(dates[idx])}: Showtimes section not found\n`;
                }

                const subsectionItems = [...block.querySelectorAll('li[role="listitem"]')];
                const subsectionResults = subsectionItems.map(li => {
                    const titleSpan = li.querySelector('h3 div span:first-child');
                    const subsectionTitle = titleSpan ? titleSpan.textContent.trim() : "Unknown";

                    const times = [...li.querySelectorAll('ul[aria-label="Showtime Group Results"] a')]
                        .map(a => a.childNodes[0]?.textContent?.trim())
                        .filter(Boolean)
                        .map(t => t.toUpperCase());

                    return `* ${subsectionTitle}: ${times.length ? times.join(", ") : "No showtimes"}`;
                });

                return `${humanDate(dates[idx])}:\n${subsectionResults.join("\n")}\n`;
            });

            console.log(`\n=== ${movieTitle} @ ${targetLabel} ===\n${results.join("\n")}`);
            console.log("Finished fetching all showtimes.");
        } catch (e) {
            console.error("Error fetching showtimes:", e);
        }
    }

    run();
})();
