class Employee {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  equals(other) {
    return this.email === other.email;
  }
}

module.exports = Employee;
