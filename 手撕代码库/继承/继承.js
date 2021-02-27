//1.原型继承
function Parent() {
    this.name = 'jack';
    this.nums = [1, 2, 3];
}
Parent.prototype = function getName() { }
function Child() {
    this.name = 'jacky';
}

Child.prototype = new Parent();
var C1 = new Child()
var C2 = new Child()
C1.nums.push(4);
console.log(C1, C2)

//2.构造函数式继承
function Parent(name, age) {
    this.name = name;
    this.age = age;
    this.setName = function () { }
}

Parent.prototype.setAge() = function () { }

function Child(name, age, money) {
    Parent.call(this, name, age)
    this.money = money
}

var C = new Child('jack', 20, 15000)
console.log(C.setName())
console.log(C.setAge())

//3.组合继承
function Person(name, age) {
    this.name = name,
        this.age = age,
        this.setAge = function () { }
}
Person.prototype.setAge = function () {
    console.log("111")
}
function Student(name, age, price) {
    Person.call(this, name, age)
    this.price = price
    this.setScore = function () { }
}

Student.prototype = new Person();
Student.prototype.constructor = Student;
var s1 = new Student('Tom', 20, 15000)
var s2 = new Student('Jack', 22, 14000)
//4.寄生式继承
//原型式继承
function createO(o) {
    function F() { }
    F.prototype = o;
    return new F();
}
//作为Object.create()实现

function createObj(o) {
    var clone = Object.create(o)
    clone.sayName = function () { }//拓展新方法
    return clone;
}
// 5.寄生组合继承
function Parent(name) {
    this.name = name
    this.sayName = function () {
        console.log(this.name)
    }
}

Parent.prototype.age = 20
Parent.ptototype.sayAge = function () {
    console.log(this.age)
}

function Child(name) {
    Parent.call(this, name)
}

Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;