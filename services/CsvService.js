const fs = require("fs");
const csv = require("csv-parser");
const { Parser } = require("json2csv");

class CsvService {
  static readCsv(path) {
    return new Promise((resolve, reject) => {
      if (!fs.existsSync(path)) {
        return resolve([]); // Return empty data if file doesn't exist
      }

      const results = [];
      fs.createReadStream(path)
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", () => resolve(results))
        .on("error", reject);
    });
  }

  static writeCsv(path, data, fields = null) {
    const parser = new Parser({ fields });
    const csvData = parser.parse(data);
    fs.writeFileSync(path, csvData);
  }

  static ensurePreviousAssignmentsFile(path) {
    if (!fs.existsSync(path)) {
      const headers = [
        "Employee_Name",
        "Employee_EmailID",
        "Secret_Child_Name",
        "Secret_Child_EmailID",
      ];

      const parser = new Parser({ fields: headers });
      const emptyCsv = parser.parse([]);

      fs.mkdirSync(require("path").dirname(path), { recursive: true });
      fs.writeFileSync(path, emptyCsv);
    }
  }
}

module.exports = CsvService;
