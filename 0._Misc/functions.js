function myFirstFunction() {
    return "Hello World!";
}

function sayHiLater(fn) {
    setTimeout(() => {
        fn();
    }, 5000)
      
}

sayHiLater(() => console.log("Hi"));
sayHiLater(() => console.log("Hello"));

const poke = (name) => {
    console.log(`Wake up, ${name}!`);
}

const logLater = (fn, ...param) => {
    setTimeout(() => {
        console.log(fn(...param))
    }, 5000)
} 

doLater(name => `Lick ${name}`, "Donald Duck");