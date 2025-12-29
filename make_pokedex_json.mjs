import { writeFile } from 'node:fs/promises';

function titlecase(name) {
    const parts = name.split('-');
    const exceptions = { mr: 'Mr', mime: 'Mime', jr: 'Jr', farfetchd: "Farfetch'd", type: 'Type', null: 'Null', flabebe: 'Flabébé', nidoran: 'Nidoran', 'wo-chien': 'Wo-Chien', 'chien-pao': 'Chien-Pao', 'ting-lu': 'Ting-Lu', 'chi-yu': 'Chi-Yu', };

    if (name === 'nidoran-f') return 'Nidoran♀';
    if (name === 'nidoran-m') return 'Nidoran♂';
    const titledParts = parts.map(p => exceptions[p] ?? (p.charAt(0).toUpperCase() + p.slice(1)));
    let candidate = titledParts.join(' ');
    const fixes = { 'Porygon Z': 'Porygon-Z', 'Ho Oh': 'Ho-Oh', 'Mime Jr': 'Mime Jr.', 'Mr Mime': 'Mr. Mime', 'Mr Rime': 'Mr. Rime', 'FlabeBe': 'Flabébé', 'Type Null': 'Type: Null', 'Hakamo O': 'Hakamo-o', 'Kommo O': 'Kommo-o', 'Jangmo O': 'Jangmo-o', 'Farfetchd': "Farfetch'd", 'Sirfetchd': 'Sirfetch’d', };
    return fixes[candidate] ?? candidate;
}

async function fetchAllSpeciesNames() {
    const resp = await fetch('https://pokeapi.co/api/v2/pokemon-species?limit=20000');
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const data = await resp.json();
    const names = data.results.map(r => titlecase(r.name));
    // Sort stable by lowercase
    return [...new Set(names)].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
}

async function main() {
    const names = await fetchAllSpeciesNames();
    const out = { count: names.length, names };
    await writeFile('pokedex_base_names.json', JSON.stringify(out, null, 2), { encoding: 'utf-8' });
    console.log(`Wrote pokedex_base_names.json with ${names.length} base Pokémon names.`);
}

main().catch(err => { console.error(err); process.exit(1); });