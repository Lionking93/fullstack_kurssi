// Javascript training

console.log("Muuttujat")

const x = 1
let y = 5

console.log(x, y)
y += 10
console.log(x, y)
y = 'teksti'
console.log(x, y)
// x = 4

console.log("Taulukko")

const t = [1, -1, 3]

t.push(5) // Sisältöä voi muuttaa, vaikka taulukko määritelty constiksti!

console.log(t.length)
console.log(t[1])

t.forEach(value => {
    console.log(value)
})

console.log("Concat")

const t1 = [1, -1, 3]
const t2 = t1.concat(5)

console.log(t1)
console.log(t2)

console.log("Map")

const t3 = [1, 2, 3]
const m1 = t3.map(value => value * 2)
console.log(m1)
const m2 = t3.map(value => '<li>' + value + '</li>')
console.log(m2)
const t4 = [1, 2, 3, 4, 5]
const [first, second, third, ...rest] = t4
console.log("First: " + first + ", Second: " + second + 
    ", Third: " + third + ", Rest: " + rest)

console.log("Objects")

const leo = {
    sex: "Male",
    age: 25,
    greet: function() {
        console.log("Hello my sex is " + this.sex +
            " and I am " + this.age + " years old.")
    },
    doAddition: function(a, b) {
        console.log("Sum of", a, "and", b, "is", a + b)
    }
}

console.log(leo.sex)
console.log(leo["age"])

console.log("Functions")

const sum = (p1, p2) => {
    console.log(p1)
    console.log(p2)
    return p1 + p2
}

console.log("Sum of 2 + 4: ", sum(2, 4))

const squared = p => p * p
console.log("3 squared is ", squared(3))

console.log("Functions in object")

console.log(leo.greet())

leo.growOlder = function() {
    this.age += 1
}

leo.growOlder()

console.log(leo.greet())

leo.doAddition(2, 7)
const referenceToAddition = leo.doAddition

referenceToAddition(5, 8)

const referenceToGreet = leo.greet
referenceToGreet() // ei toimi koska this katoaa!

setTimeout(leo.greet, 1000) // this viitaa timeout olioon

setTimeout(leo.greet.bind(leo), 1000) // toimii koska greet sidottu leo-olioon

console.log("Classes")

class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }

    greet() {
        console.log("Hello my name is", this.name, "and I'm", this.age,
            "years old")
    }
}

const leo2 = new Person("leo", 25)
leo2.greet()