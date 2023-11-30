const formated = (await Bun.file("input.txt").text())
    .split("\n")
    .map(line => line
        .split("Sensor at ")[1]
        .split(": closest beacon is at ")
        .join(", ")
        .split(", ")
        .map(x => Number(x.split("=")[1]))
    )
    .map(line => {
        return {
            sx: line[0],
            sy: line[1],
            bx: line[2],
            by: line[3]
        }
    })
    .map(line => {
        return {
            cx: line.sx,
            cy: line.sy,
            br: Math.abs(line.sx - line.bx) + Math.abs(line.sy - line.by)
        }
    });

const widths = formated
    .map(el => {
        let w = el.br - Math.abs(el.cy - 2000000);
        return {
            start: el.cx - w,
            end: el.cx + w
        };
    })
    .filter(el => el.start <= el.end);

console.dir(widths);

/* const constraints = {
    min: formated.map(x => x.cx - x.br).sort((a, b) => a - b)[0],
    max: formated.map(x => x.cx + x.br).sort((a, b) => b - a)[0]
};

let arr = new Array(constraints.max - constraints.min);

console.log(arr.length); */