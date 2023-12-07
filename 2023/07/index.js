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
            hand: hand
                .split(" ")[0]
                .split("")
                .map(card => corresponding[card]),
            type: null,
            bid: Number(hand.split(" ")[1])
        };
    });

console.log(hands
    .map(hand => {
        hand.type = {};

        hand.hand.forEach(card => {
            if (hand.type[card]) {
                hand.type[card]++;
            } else {
                hand.type[card] = 1;
            }
        });

        hand.type = Object
            .entries(hand.type)
            .map(x => x[1])
            .filter(x => x > 1);

        hand.type = getType(hand.type);

        return hand;
    })
    .map(hand => {
        let out = 0;

        for (let i = 0; i < 5; i++) {
            out += hand.hand[-i + 4] * (13 ** (i+1));
        }

        out += hand.type * (13 ** 6);

        hand.relativeScore = out;
        return hand;
    })
    .sort((a, b) => {
        return a.relativeScore - b.relativeScore;
    })
    .map((hand, index) => {
        let rank = index + 1;
        
        return rank * hand.bid;
    })
    .reduce((sum, val) => sum + val, 0)
);
        
function getType(typeArr) {
    if (typeArr.length === 0) {
        return 0; //High card
    }

    if (typeArr.length === 1) {
        if (typeArr[0] === 2) {
            return 1; //One pair
        }
        if (typeArr[0] === 3) {
            return 3; //Three of a kind
        }
        if (typeArr[0] === 4) {
            return 5; //Four of a kind
        }
        if (typeArr[0] === 5) {
            return 6; //Five of a kind
        }
    }

    if (typeArr.length === 2) {
        if (typeArr[0] === 2 && typeArr[1] === 2) {
            return 2; //Two pairs
        }
        if (typeArr[0] === 2 && typeArr[1] === 3 || typeArr[0] === 3 && typeArr[1] === 2) {
            return 4; //Full house
        }
    }

    return -1; //WHACK
}