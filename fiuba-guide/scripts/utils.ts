import fs from "fs";

export enum FloorId {
  P1 = "P1",
  P2 = "P2",
  P3 = "P3",
  P4 = "P4",
}

export async function backUpFiles(originPath: string, destPath: string) {
  try {
    await fs.promises.stat(destPath);
  } catch {
    await fs.promises.mkdir(destPath, { recursive: true });
  }
  (await fs.promises.readdir(originPath)).map(async (path) => {
    if (!(await fs.promises.stat(`${originPath}/${path}`)).isDirectory()) {
      await fs.promises.copyFile(`${originPath}/${path}`, `${destPath}/${path}.bak`);
    }
  });
}

export const originPath = process.env.ORIGIN_PATH || "public/floorplans/svg";
export const destPath = process.env.DEST_PATH || "public/floorplans/svg";

export const backUpDir = process.env.BACKUP_DIR || "public/floorplans/svg/backup";
