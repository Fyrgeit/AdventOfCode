let parts = (await Bun.file("input.txt").text()).split("\n\n")

let formated = {
    seeds: parts[0].substring(7).split(" ").map(num => Number(num)),
    maps: []
};

formated.seeds = formated.seeds.map((seed, index) => {
    console.log(index + ": " + seed)

    if (index % 2 == 0) {
        let out = [seed];

        for (let i = 1; i < formated.seeds[index + 1]; i++) {
            out.push(seed + i)
        }

        return out;
    }

    return 0;
})
.flat(Infinity)
.filter(s => s != 0);

console.log(formated.seeds);

parts.forEach((part, index) => {
    if (index == 0) return;

    formated.maps.push({
        source: part.split(" map:\n")[0].split("-to-")[0],
        destination: part.split(" map:\n")[0].split("-to-")[1],
        maps: part.split(" map:\n")[1].split("\n").map(row => {
            return {
                destination: Number(row.split(" ")[0]),
                source: Number(row.split(" ")[1]),
                range: Number(row.split(" ")[2]),
            }
        })
    });
});

let transformed = [];

formated.seeds.forEach(seed => {
    let out = seed;

    formated.maps.forEach(level => {
        out = mapsie(out, level.maps);
    });

    transformed.push(out);
});

console.log(Math.min(...transformed));

function mapsie(number, maps) {
    let out = number;
    
    maps.forEach(map => {
        if (number >= map.source && number < map.source + map.range) {
            out = number + (map.destination - map.source);
        }
    });
    
    return out;
}