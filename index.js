import express from "express";
import React from "react";
import { renderToNodeStream } from "react-dom/server";
import { ServerLocation } from "@reach/router";
import fs from "fs";
import App from "./src/App";

const PORT = process.env.PORT || 3000;

const html = fs.readFileSync("dist/index.html").toString();
const parts = html.split("Not Rendered");

const app = express();
app.disable('x-powered-by');
app.use("/dist", express.static("dist"));
app.use((req, res) => {
  res.write(parts[0]);

  const reactMarkup = (
    <ServerLocation url={req.url}>
      <App />
    </ServerLocation>
  );

  const stream = renderToNodeStream(reactMarkup);

  stream.pipe(
    res,
    { end: false }
  );

  stream.on("end", () => {
    res.write(parts[1]);
    res.end();
  });
});
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
  process.send ? process.send("ready") : f => f;
});

process.on("message", function(msg) {
  if (msg == "shutdown") {
    console.log("Closing all connections...");
    setTimeout(function() {
      console.log("Finished closing connections");
      process.exit(0);
    }, 1500);
  }
});
