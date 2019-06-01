const Employee = require("./employee");

module.exports = class minimalProjectManagementSystem {
    constructor() {
        this.employeeList = [];
    }

    newEmployee(firstName, lastName, supervisor) {
        try {
            if (supervisor instanceof Employee || supervisor == null) {
                let newEmp = new Employee(firstName, lastName, supervisor);
                this.employeeList.push(newEmp);
                return newEmp;
            } else
                throw "Supervisor should be in type of Employee or null!";
        } catch (error) {
            console.log(error)
        }
    }

    displayEmployees() {
        console.log(JSON.stringify(this.employeeList, 0, 2))

        return this.employeeList;
    }

    deleteProject(projectToBeDeleted) {
        try {
            this.employeeList.map(employee => employee.deleteProject(projectToBeDeleted));
        } catch (error) {
            console.log("No such project!");
        }
    }

    deleteTask(taskToBeDeleted) {
        this.employeeList.map(employee => employee.projects.map(project => project.deleteTask(taskToBeDeleted)));
    }

    updateDuration(taskToBeChanged, newDuration) {
        this.employeeList.map(employee => employee.projects.map(project => project.updateDuration(taskToBeChanged, newDuration)));
    }

    displayTasksForProject(project) {
        // console.log(JSON.stringify(
        //     this.employeeList.map(employee => employee.projects.filter(p => p == project))
        //     .filter(e => e.length > 0)[0][0].tasks, 0, 2))

        return this.employeeList.map(employee => employee.projects.filter(p => p == project))
            .filter(e => e.length > 0)[0][0].task;

    }

    totalDaysNeeded(projectList) {
        // console.log(projectList.map(project => project.endDate - project.startDate).reduce((total, num) => total + num))

        return projectList.map(project => project.endDate - project.startDate)
            .reduce((total, num) => total + num);
    }
}