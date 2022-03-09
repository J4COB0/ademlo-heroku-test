const array = [1,2,5,3,4,3,4,4,-19,20,20,20,20];

let biggerNum = array[0];
for (let i = 1; i < array.length-1; i++) {
    if (biggerNum < array[i]) {
        biggerNum = array[i];
    };
}

const result = array.filter(element => biggerNum === element).length;
console.log(result);
