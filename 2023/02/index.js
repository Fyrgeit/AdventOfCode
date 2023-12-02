console.log((await Bun.file("input.txt").text())
    .split("\n")
    .map(line => {
        return {
            i: Number(line.split(":")[0].slice(5)),
            turns: line.split(": ")[1]
            .split("; ")
            .map(x => {
                return x
                .split(", ")
                .map(n => {
                    return {
                        color: n.split(" ")[1],
                        count: Number(n.split(" ")[0]),
                    }
                })
            })
        }
    })
    .map(game => {
        let mins = {
            "red": 0,
            "green": 0,
            "blue": 0
        }

        game.turns.forEach(turn => {
            turn.forEach(cube => {
                if (cube.count > mins[cube.color]) {
                    mins[cube.color] = cube.count;
                }
            })
        })

        return mins["red"] * mins["green"] * mins["blue"];
    })
    .reduce((acc, val) => acc+val, 0)
);