const nums = {
    "zeroneight": "018",
    "twoneight": "218",
    "sevenineight": "798",
    "eightwo": "82",
    "eighthree": "83",
    "zerone": "01",
    "twone": "21",
    "oneight": "18",
    "threeight": "38",
    "fiveight": "58",
    "nineight": "98",
    "sevenine": "79",
    "zero": "0",
    "one": "1",
    "two": "2",
    "three": "3",
    "four": "4",
    "five": "5",
    "six": "6",
    "seven": "7",
    "eight": "8",
    "nine": "9",
};

console.log((await Bun.file("input.txt").text())
    .split("\n")
    .map(x => {
        let out = x;

        
        for (let key in nums) {
            out = out.split(key).join(nums[key]);
        }

        return out;
    })
    .map(str => {
        let out = [];
        
        for (let i = 0; i < str.length; i++) {
            if ("0123456789".includes(str[i])) {
                out.push(str[i]);
            }
        }

        return Number(out[0] + out[out.length - 1]);
        return out;
    })
    .reduce((sum, val) => sum + val, 0)
);