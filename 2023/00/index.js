console.log("Day 00 (test) of Advent of Code 2023!");
console.log("(actually day 01 2022)");

Bun
    .file("input.txt")
    .text()
    .then(text => console.log(
        text
            .split("\n\n")
            .map(monke => monke
                .split("\n")
                .reduce((acc, val) => Number(acc) + Number(val), 0))
            .sort((a, b) => b - a)
            .slice(0, 3)
            .reduce((acc, val) => acc + val, 0)
    ));