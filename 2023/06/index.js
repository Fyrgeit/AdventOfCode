const testRaces = { time: 71530, dist: 940200 };

const races = { time: 55999793, dist: 401148522741405 };

let race = races;
let out = [];

for (let i = 1; i < race.time; i++) {
    let holdTime = i;
    let goTime = race.time - i;
    
    let dist = goTime * holdTime;
    out.push(dist);
}
    
console.log(out.filter(dist => dist > race.dist).length);