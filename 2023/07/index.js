const corresponding = {
    "2": 0,
    "3": 1,
    "4": 2,
    "5": 3,
    "6": 4,
    "7": 5,
    "8": 6,
    "9": 7,
    "T": 8,
    "J": 9,
    "Q": 10,
    "K": 11,
    "A": 12,
};

let hands = (await Bun.file("input.txt").text())
    .split("\n")
    .map(hand => {
        return {
            hand: hand.split(" ")[0].split("").map(card => corresponding[card]),
            type: null,
            bid: Number(hand.split(" ")[1])
        };
    });

console.log(hands);