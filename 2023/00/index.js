console.log("Day 00 (test) of Advent of Code 2023!");
console.log("(actually day 01 2022)");

const input = await Bun.file("input.txt").text();

console.log(input
    .split("\n\n")
    .map((monke) => monke
        .split("\n")
        .reduce((acc, val) => Number(acc) + Number(val), 0))
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, val) => acc + val, 0)
);