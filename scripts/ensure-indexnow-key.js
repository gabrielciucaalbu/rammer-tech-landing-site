const fs = require("fs");
const path = require("path");

const key = process.env.INDEXNOW_KEY;

if (key && /^[a-zA-Z0-9-]{8,128}$/.test(key)) {
  const filePath = path.join(process.cwd(), "public", `${key}.txt`);
  fs.writeFileSync(filePath, key, "utf8");
  console.log(`IndexNow: wrote ${key}.txt to public/`);
} else {
  console.log(
    "IndexNow: INDEXNOW_KEY not set or invalid, skipping key file generation"
  );
}
