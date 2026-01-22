const AssignmentService = require("../services/AssignmentService");

test("No employee gets themselves", () => {
  const employees = [
    { Employee_Name: "A", Employee_EmailID: "a@test.com" },
    { Employee_Name: "B", Employee_EmailID: "b@test.com" },
  ];

  const service = new AssignmentService(employees, []);
  const assignments = service.generateAssignments();

  for (const [giver, receiver] of assignments.entries()) {
    expect(giver.Employee_EmailID).not.toBe(receiver.Employee_EmailID);
  }
});
