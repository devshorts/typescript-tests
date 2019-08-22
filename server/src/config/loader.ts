import * as path from "path";
import * as fs from 'fs'

interface Config {
    http_bin: string
}

export function load(key: string): Config {
    const jsonPath = path.join(__dirname, `${key}.json`);

    const jsonString = fs.readFileSync(jsonPath, 'utf8');

    return JSON.parse(jsonString);
}
