import fs from "node:fs";
import { JSDOM } from "jsdom";
import { backUpDir, backUpFiles, destPath, FloorId, originPath } from "./utils";

async function addCustomProperty(originPath: string, destPath: string, originalProperty: string, customProperty: string) {
    const svgData = await fs.promises.readFile(originPath, 'utf8');
    const dom = new JSDOM(svgData, { contentType: "image/svg+xml" });

    const elements = dom.window.document.getElementsByTagName("*");
    for (const element of elements) {
        const attr = element.getAttribute(originalProperty);
        if (!attr) {
            continue;
        }

        element.setAttribute(customProperty, attr);
    }

    await fs.promises.writeFile(destPath, dom.serialize());
}

await backUpFiles(`${originPath}`, `${backUpDir}/custom_label`);

for (const floor of Object.values(FloorId)) {
    console.log(`Processing floor ${floor}`);

    try {
        await addCustomProperty(`${originPath}/${floor}.svg`, `${destPath}/${floor}.svg`, "id", "label");
    } catch (e) {
        console.error(`Error processing floor ${floor}: ${e}`);
        continue;
    }
    console.log(`Finished processing floor ${floor}`);
}
