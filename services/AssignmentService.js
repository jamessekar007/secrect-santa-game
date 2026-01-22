class AssignmentService {
  constructor(employees, previousAssignments = []) {
    this.employees = employees;
    this.previousMap = new Map();

    previousAssignments.forEach((p) => {
      this.previousMap.set(p.Employee_EmailID, p.Secret_Child_EmailID);
    });
  }

  generateAssignments() {
    const givers = [...this.employees];
    let receivers = [...this.employees];

    const assignments = new Map();

    for (const giver of givers) {
      const validReceivers = receivers.filter((r) =>
        r.Employee_EmailID !== giver.Employee_EmailID &&
        this.previousMap.get(giver.Employee_EmailID) !== r.Employee_EmailID
      );

      if (validReceivers.length === 0) {
        // Restart assignment if stuck
        return this.generateAssignments();
      }

      const selected =
        validReceivers[Math.floor(Math.random() * validReceivers.length)];

      assignments.set(giver, selected);
      receivers = receivers.filter((r) => r !== selected);
    }

    return assignments;
  }
}

module.exports = AssignmentService;
