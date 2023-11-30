const formated = (await Bun.file("test.txt").text())
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

let widths = formated
    .map(el => {
        let w = el.br - Math.abs(el.cy - 10);
        return {
            start: el.cx - w,
            end: el.cx + w
        };
    })
    .filter(el => el.start <= el.end);

console.dir(widths);

for (let i = 0; i < 100; i++) {
    //console.log(i + "===================");
    let arrcpy = JSON.parse(JSON.stringify(widths));
    widths = [];
    
    arrcpy.forEach(pair => {
        collapse(widths, pair);
        //console.log(widths.length);
    });
}

console.log(widths);
console.log(widths
    .map(w => {return w.end - w.start + 1})
    .reduce((sum, val) => sum + val, 0)
);

function collapse(pairSum, newPair) {
    let added = false;
    
    pairSum.every(oldPair => {
        let overlap = getOverlap(oldPair, newPair);

        if (overlap) {
            oldPair.start = newPair.start;
            oldPair.end = newPair.end;
            //console.log("Merged");
            added = true;
            return false;
        } else {
            return true;
        }
    });
    
    if (!added) {
        pairSum.push(newPair);
        //console.log("Added");
    }
}

function getOverlap(pair1, pair2) {
    if (
        pair1.end + 1 > pair2.start - 1 &&
        pair2.end + 1 > pair1.start - 1
        ) {
        return {
            start: pair1.start < pair2.start ? pair1.start : pair2.start,
            end: pair1.end > pair2.end ? pair1.end : pair2.end
        };
    }

    return false;
}

/* const constraints = {
    min: formated.map(x => x.cx - x.br).sort((a, b) => a - b)[0],
    max: formated.map(x => x.cx + x.br).sort((a, b) => b - a)[0]
};

let arr = new Array(constraints.max - constraints.min);

console.log(arr.length); */