let parts = (await Bun.file("input.txt").text()).split("\n\n")

let formated = {
    seeds: parts[0].substring(7).split(" ").map(num => Number(num)),
    maps: []
};

formated.seeds = formated.seeds.map((seed, index) => {
    if (index % 2 == 0) {
        return {
            inclusiveMin: seed,
            exclusiveMax: seed + formated.seeds[index + 1] - 1,
        };
    }

    return 0;
})
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

let cont = true;

for (let i = 0; cont; i++) {
    let out = i;

    for (let n = formated.maps.length - 1; n >= 0; n--) {
        out = reverse_mapsie(out, formated.maps[n].maps);
    }

    formated.seeds.forEach(seed => {
        if (out >= seed.inclusiveMin && out < seed.exclusiveMax) {
            console.log(i);
            cont = false;
        }
    })
}


function reverse_mapsie(number, maps) {
    let out = number;
    
    maps.forEach(map => {
        if (number >= map.destination && number < map.destination + map.range) {
            out = number - (map.destination - map.source);
        }
    });
    
    return out;
}

function mapsie(number, maps) {
    let out = number;
    
    maps.forEach(map => {
        if (number >= map.source && number < map.source + map.range) {
            out = number + (map.destination - map.source);
        }
    });
    
    return out;
}