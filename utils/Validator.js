class Validator {
  static validateEmployees(employees) {
    const emails = new Set();
    for (const e of employees) {
      if (!e.Employee_EmailID || !e.Employee_Name) {
        throw new Error("Invalid employee data");
      }
      if (emails.has(e.Employee_EmailID)) {
        throw new Error("Duplicate employee email found");
      }
      emails.add(e.Employee_EmailID);
    }
  }
}

module.exports = Validator;
