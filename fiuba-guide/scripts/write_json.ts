import fs from "node:fs";
import { JSDOM } from "jsdom";

enum FloorId {
    P1 = "P1",
    P2 = "P2",
    P3 = "P3",
    P4 = "P4",
}

type FloorData = {
    id: string;
    displayName: string;
    searchTerms: string[];
}

function floorIdToOriginPath(floor: FloorId) {
    return `public/floorplans/svg/${floor}.svg`;
}

function floorIdToDestPath(floor: FloorId) {
    return `src/assets/${floor}.json`;
}

function writeJsonForFloor(originPath: string, destPath: string, matcher: (label: string) => boolean) {
    const svgData = fs.readFileSync(originPath, 'utf8');
    const dom = new JSDOM(svgData, { contentType: "image/svg+xml" });

    const elements = dom.window.document.getElementsByTagName("*");
    let out: FloorData[] = [];
    for (const element of elements) {
        const id = element.getAttribute("inkscape:label");
        if (!id) {
            continue;
        }

        if (matcher(id)) {
            out.push({
                id: id,
                displayName: id,
                searchTerms: [id],
            });
        }
    }

    fs.writeFileSync(destPath, JSON.stringify(out, null, 2));
}

function isNumber(label: string) {
    return !isNaN(parseInt(label));
}

function isRoom(label: string) {
    if (isNumber(label)) {
        return true;
    }
    return label.startsWith("L")
}

for (const floor of Object.values(FloorId)) {
    console.log(`Processing floor ${floor}`);

    try {
        writeJsonForFloor(floorIdToOriginPath(floor), floorIdToDestPath(floor), isRoom);
    } catch (e) {
        console.error(`Error processing floor ${floor}: ${e}`);
        continue;
    }
    console.log(`Finished processing floor ${floor}`);
}
