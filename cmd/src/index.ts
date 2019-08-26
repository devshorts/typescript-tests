import {app} from "server/dist/src/app";

app({http_bin: "https://httpbin.org/json"}).run()
