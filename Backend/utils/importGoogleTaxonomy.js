const fs = require("fs");
const path = require("path");
const GoogleCategory = require("../models/GoogleCategory");

async function importGoogleTaxonomyIfEmpty() {
  const count = await GoogleCategory.countDocuments();
  if (count > 0) {
    console.log("Google taxonomy already exists, skipping import");
    return;
  }
  console.log("Importing Google taxonomy...");
  const filePath = path.join(__dirname, "../taxonomy.txt");
  const lines = fs.readFileSync(filePath, "utf-8").split("\n").filter(Boolean);
  const map = {};
  for (const line of lines) {
    const pathPart = line.trim();
    const google_id = null;
    const parts = pathPart.trim().split(" > ");
    let parent = null;
    for (let i = 0; i < parts.length; i++) {
      const fullPath = parts.slice(0, i + 1).join(" > ");
      if (!map[fullPath]) {
        const doc = await GoogleCategory.create({
          google_id: i === parts.length - 1 ? google_id : null,
          name: parts[i],
          full_path: fullPath,
          parent_id: parent ? parent._id : null,
        });
        map[fullPath] = doc;
      }
      parent = map[fullPath];
    }
  }
  console.log("Google taxonomy import completed");
}

module.exports = importGoogleTaxonomyIfEmpty;
