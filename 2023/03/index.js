const arr = (await Bun.file("input.txt").text())
    .split("\n")
    .map(line => line.split(""));

let numbers = [];

arr.forEach((line, y) => {
    let prevWasLetter = false;
    let tempString = [];
    let tempCoords;
    
    line.forEach((char, x) => {
        if ("0123456789".includes(char)) {
            if (!prevWasLetter) {
                tempCoords = {x: x, y: y};
            }
            tempString.push(char);
            prevWasLetter = true;
        } else {
            if (prevWasLetter) {
                numbers.push({
                    numStr: tempString,
                    x: tempCoords.x,
                    y: tempCoords.y,
                    symbol: null
                });
                tempString = [];
                prevWasLetter = false;
            }
        }
    });
    
    if (prevWasLetter) {
        numbers.push({
            numStr: tempString,
            x: tempCoords.x,
            y: tempCoords.y,
            symbol: null
        });
        tempString = [];
        prevWasLetter = false;
    }
});

let gears = [];

arr.forEach((line, y) => {
    line.forEach((char, x) => {
        if (char === "*") {
            gears.push({x: x, y: y, adjNums: []});
        }
    });
});

numbers = numbers
    .filter(number => {
        let validString = false;

        for (let n = 0; n < number.numStr.length; n++) {
            for (let ry = -1; ry <= 1; ry++) {
                for (let rx = -1; rx <= 1; rx++) {
                    let x = number.x + rx + n;
                    let y = number.y + ry;

                    if (x >= 0 && y >= 0 && x < arr[0].length && y < arr.length) {
                        //good
                        let char = arr[y][x];

                        if (!("0123456789.".includes(char))) {
                            validString = true;
                            number.symbol = {
                                char: char,
                                x: x,
                                y: y
                            };
                        }
                    }
                } 
            }
        }

        return validString;
    })
    .filter(number => number.symbol.char === "*");

numbers.forEach(number => {
    number.numStr = Number(number.numStr.join(""));
});

gears.forEach(gear => {
    numbers.forEach(number => {
        if (gear.x == number.symbol.x && gear.y == number.symbol.y) {
            gear.adjNums.push(number.numStr);
        }
    });
});

console.log(gears
    .filter(gear => gear.adjNums.length == 2)
    .map(gear => gear.adjNums[0] * gear.adjNums[1])
    .reduce((acc, val) => acc + val, 0)
);