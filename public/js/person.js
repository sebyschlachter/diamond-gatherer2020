export class Person {
    constructor(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }
    getName() {
        console.log(`First name: ${this.firstName}, Last name: ${this.lastName}`);
    }
    getAge() {
        console.log(`Age: ${this.age}`);
    }
    showDetails() {
        console.log(`First name: ${this.firstName}, Last name: ${this.lastName}, Age: ${this.age}`);
    }
    showExperience() {
        if (this.age > 30)
            console.log(`First name: ${this.firstName} Last name: ${this.lastName} is not younger anymore`);
        else
            console.log(`${this.firstName} ${this.lastName} is very young`);
    }
}