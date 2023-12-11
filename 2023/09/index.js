let input = (await Bun.file("input.txt").text())
    .split("\n")
    .map(line => [
        line.split(" ").map(n => Number(n))
    ]);

console.log(input
    .map(line => {
        let n = 0;
        while (line[line.length - 1].some(n => n !== 0)) {
            let out = [];

            for (let i = 0; i < line[n].length - 1; i++) {
                out.push(line[n][i + 1] - line[n][i])
            }

            line.push(out);
            n++;
        }

        return line;
    })
    .map(line => {
        for (let level = line.length - 2; level >= 0; level--) {
            let topLine = line[level];
            let bottomLine = line[level + 1];

            topLine.splice(0, 0, topLine[0] - bottomLine[0])
        }
        
        return line;
    })
    .map(line => {
        return line[0][0];
    })
    .reduce((sum, val) => sum + val, 0)
);