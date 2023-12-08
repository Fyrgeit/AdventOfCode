const text = (await Bun.file("input.txt").text()).split("\n")

const input = text[0].split("");
const nodeArr = text.slice(2).map(node => {
    return {
        from: node.slice(0, 3),
        to: node.slice(7, -1).split(", ")
    };
});

const nodeObj = {};

nodeArr.forEach(node => {
    nodeObj[node.from] = node.to;
});

let currentArr = nodeArr.map(node => node.from).filter(node => node[2] === "A");
let roundCounts = [];

currentArr.forEach(current => {
    let cont = true;
    let roundCounter = 0;
    
    while (cont) {
        roundCounter++;
        input.forEach(input => {
            if (input === "L") {
                current = nodeObj[current][0];
            } else if (input === "R") {
                current = nodeObj[current][1];
            } else {
                throw "what";
            }
            
            if (current[2] === "Z") {
                cont = false;
                return;
            }
        });
    }

    roundCounts.push(roundCounter);
});

console.log(currentArr);
console.log(roundCounts);
console.log(input.length * 68337144929); //<== LCM av roundCounts
//console.log(nodeObj);
//console.log(input);