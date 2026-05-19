export function makeWeaponsOffhand() {
    const shsl = game.equipmentSlots.getObjectByID("melvorD:Shield");
    for (const weapon of this.type.allWeapons) {
        weapon.occupiesSlots = weapon.occupiesSlots.filter(slot => slot !== shsl);
        if (!weapon.validSlots.includes(shsl))
            weapon.validSlots.push(shsl);
    }
}

// TODO: Make skill boosts work with this, should be easy, here's the agi code from slash so its' here
/*
 let obstacle = 0 // Define the obstacle
// Create the icon for all skills
skillBoosts.data.skills.forEach(skill => {
let obstacleMods = skillBoosts.getItemMods(obstacle),
    isPositive = skillBoosts.hasModifiers(skill, obstacleMods),
    realms = isPositive.realms.length > 0 ? isPositive : skillBoosts.hasModifiers(skill, obstacleMods, obstacle, true);

if (realms.realms.length > 0) {
    let icon = skillBoosts.createIcon(obstacle, realms.modifiers, realms.realms, skill, isPositive.realms.length > 0 ? 2 : 3, 'Obstacle');
    // Sort the new icon into the proper place
    let icons = skillBoosts.data.menus.get(skill.id).iconContainers[2].childNodes;
    let index = [...icons].findIndex(icon => icon.item.category > obstacle.category);
    icons.item(index).before(icon);
}
});
*/
