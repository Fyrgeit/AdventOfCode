const originalWins = (await Bun.file("input.txt").text())
    .split("\n")
    .map(card => card
        .substring(10)
        .split(" | ")
        .map(part => {
            let out = [];

            for (let i = 0; i < part.length; i += 3) {
                out.push(Number(part.substring(i, i + 2).trimStart()))
            }

            return out;
        })
    )
    .map(card => {
        return {
            winning: card[0],
            my: card[1]
        };
    })
    .map(card => card.my.filter(num => card.winning.includes(num)).length);

let copyWins = Array(originalWins.length).fill(1);

originalWins.forEach((wins, index) => {
    for (let i = 0; i < wins; i++) {
        copyWins[i + index + 1] += copyWins[index];
    }
})

console.log(originalWins);
console.log(copyWins.reduce((sum, val) => sum + val, 0));