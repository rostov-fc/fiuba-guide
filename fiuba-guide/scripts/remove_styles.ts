import fs from "node:fs";
import { JSDOM } from "jsdom";
import { backUpDir, backUpFiles, destPath, FloorId, originPath } from "./utils";

/*
rect,
path {
    display: inline;
    opacity: 1;
    mix-blend-mode: normal;
    fill: var(--tertiary-color);
    stroke: #292929;
    stroke-width: 0.3;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 5;
    stroke-dasharray: none;
}
*/
const globalStyle = {
    display: "inline",
    opacity: "1",
    mixBlendMode: "normal",
    fill: "var(--tertiary-color)",
    stroke: "#292929",
    strokeWidth: "0.3",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeMiterlimit: "5",
    strokeDasharray: "none",
}

// Set a global style equal to the style of the element at the specified position
function addGlobalStyle(dom: JSDOM, elementPos: number = 0) {
    const svg = dom.window.document.querySelector("svg");
    const styleElement = dom.window.document.createElement("style");

    const elements = dom.window.document.querySelectorAll("g *");
    const styleValue = [...elements[elementPos].attributes]
        .find(attr => attr.name === "style")?.value;

    styleElement.textContent = `* {${styleValue}}`;
    svg?.appendChild(styleElement);
}

async function removeAttribute(originPath: string, destPath: string, attribute: string) {
    const svgData = await fs.promises.readFile(originPath, 'utf8');
    const dom = new JSDOM(svgData, { contentType: "image/svg+xml" });
    // We add a global style so that it is somewhat visible if it is opened in an svg viewer
    // But this is not used in the app
    addGlobalStyle(dom);

    const elements = dom.window.document.getElementsByTagName("*");

    for (const element of elements) {
        element.removeAttribute(attribute);
    }

    await fs.promises.writeFile(destPath, dom.serialize());
}

backUpFiles(`${originPath}`, `${backUpDir}/remove_styles`);

for (const floor of Object.values(FloorId)) {
    console.log(`Processing floor ${floor}`);

    try {
        await removeAttribute(`${originPath}/${floor}.svg`, `${destPath}/${floor}.svg`, "style");
    } catch (e) {
        console.error(`Error processing floor ${floor}: ${e}`);
        continue;
    }
    console.log(`Finished processing floor ${floor}`);
}