import { Person } from './person.js'

export class Employee extends Person {
    constructor(firstName, lastName, age, contractLength, jobTitle, isWorking) {
        super(firstName, lastName, age);
        this.contractLength = contractLength;
        this.jobTitle = jobTitle;
        this.isWorking = isWorking;
    }
    getContractLength() {
        console.log(`${this.firstName} ${this.lastName} has a ${this.contractLength} months contract length.`);
    }
    employeeTitle() {
        console.log(`${this.firstName} ${this.lastName} is an ${this.jobTitle} at our company`);
    }
    workStatus() {
        let isOrIsnt = this.isWorking ? '' : 'not';
        console.log(`${this.firstName} ${this.lastName} is ${isOrIsnt} working`);
    }
    showDetails() {
        console.log(`First name: ${this.firstName}, Last name: ${this.lastName}, Age: ${this.age}, Contract length: ${this.contractLength}, Job Title: ${this.jobTitle}`);
    }
    showExperience() {
        let hasOrhasnt = this.age > 30 ? 'more' : 'no';
        console.log(`${this.firstName} ${this.lastName} has ${hasOrhasnt} experience`);
    }
}