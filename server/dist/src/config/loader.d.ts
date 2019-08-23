export interface Config {
    http_bin: string;
}
export declare function load(configRoot: string | undefined, env: string | undefined): Config;
