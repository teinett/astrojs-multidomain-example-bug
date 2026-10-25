// Requests "/" from the running server once per configured host,
// with that host in the Host header, and prints the status and the body.
// Usage: node check-hosts.mjs [port] — the port defaults to 4321.
import http from "node:http";

const port = Number(process.argv[2] ?? 4321);
const hosts = ["pt.example.local", "www.example.local"];

for (const host of hosts) {
    const request = http.request(
        { host: "localhost", port: port, path: "/", headers: { Host: host } },
        (response) => {
            let body = "";
            response.on("data", (chunk) => {
                body += chunk;
            });
            response.on("end", () => {
                console.log(`${host} → ${response.statusCode} ${body.trim()}`);
            });
        },
    );
    request.end();
}
