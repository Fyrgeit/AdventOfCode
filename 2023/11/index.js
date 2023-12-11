const input = (await Bun.file("input.txt").text()).split("\n");
let width = input[0].length;
let height = input.length;

let gals = [];

input.forEach((line, y) => {
    [...line].forEach((char, x) => {
        if (char === "#") {
            gals.push({
                x: x,
                y: y
            });
        }
    });
});

const num = 999999;

for (let x = 0; x < width; x++) {
    if (!gals.some(g => g.x === x)) {
        console.log("Empty column at: " + x);
        
            gals.forEach(g => {
            if (g.x > x) {
                g.x += num;
            }
        });
        
        width += num;
        x += num;
    }
}

for (let y = 0; y < height; y++) {
    if (!gals.some(g => g.y === y)) {
        console.log("Empty row at: " + y);
        
            gals.forEach(g => {
            if (g.y > y) {
                g.y += num;
            }
        });
        
        height += num;
        y += num;
    }
}

let sum = 0;

for (let i = 0; i < gals.length; i++) {
    for (let n = i + 1; n < gals.length; n++) {
        sum += Math.abs(gals[i].x - gals[n].x) + Math.abs(gals[i].y - gals[n].y);
    }
}

console.log(sum);