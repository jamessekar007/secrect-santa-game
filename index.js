const CsvService = require("./services/CsvService");
const AssignmentService = require("./services/AssignmentService");
const Validator = require("./utils/Validator");

(async () => {
  try {

    const currentYear = new Date().getFullYear();

    const previousYear = currentYear - 1;

    const PREVIOUS_PATH = "data/Secret-Santa-Result-"+previousYear+".csv";

    const CURRENT_PATH = "data/Secret-Santa-Result-"+currentYear+".csv";

    CsvService.ensurePreviousAssignmentsFile(PREVIOUS_PATH);

    const employees = await CsvService.readCsv("data/Employee-List.csv");
    const previous = await CsvService.readCsv(PREVIOUS_PATH);

    Validator.validateEmployees(employees);


    const assignmentService = new AssignmentService(employees, previous);
    const assignments = assignmentService.generateAssignments();

    const output = [];

    for (const [giver, receiver] of assignments.entries()) {
      output.push({
        Employee_Name: giver.Employee_Name,
        Employee_EmailID: giver.Employee_EmailID,
        Secret_Child_Name: receiver.Employee_Name,
        Secret_Child_EmailID: receiver.Employee_EmailID,
      });
    }

    CsvService.writeCsv(CURRENT_PATH, output);
    console.log("Secret Santa assignments generated successfully!");
  } catch (err) {
    console.error("Error:", err.message);
  }
})();
