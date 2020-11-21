export class Person{
    constructor(firstName, lastName, age, car, isWorking){
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.car = car;
        this.isWorking = isWorking;
    }

    getName(){
        console.log(`First name: ${this.firstName}, Last name: ${this.lastName}`);
    }
    getAge(){
        console.log(`Age: ${this.age}`);
    }
    getCar(){
        console.log(`Car: ${this.car}`);
    }
    hasJob(){
        if(this.isWorking)
            console.log(`${this.firstName} ${this.lastName} is working`);
        else
        console.log(`${this.firstName} ${this.lastName} is not working`);
    }
}