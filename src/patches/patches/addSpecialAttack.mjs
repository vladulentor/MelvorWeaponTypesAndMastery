function addEffecttoWeapons(AttackMap) {
    for (const [key, value] of game.items.registeredObjects) {
        if (value instanceof WeaponItem) {
            AttackMap.forEach(Attack => {
                if (Attack.name == value.attackType)
                    addAttacktoWeapons(value, Attack.attack);
            })

        }
    }
}
function addEffecttoWeaponList(AttackMap) {
    for (const weapon of AttackMap.weapons) {
        addAttacktoWeapons(weapon, AttackMap.attack)
    }
}
// Because copying the attack and changing things sucks because of java copying and reference stuff.
function addAttacktoWeapons(weapon, attack) {
    const leftover = weapon.specialAttacks.reduce((acc, a) => acc - a.defaultChance, 100)
    if (leftover == 0) return; // no space.
    if (leftover < attack.defaultChance) { // we assume the weapon has special attacks for this case to even happen
        if (weapon.overrideSpecialChances == undefined) {
            weapon.overrideSpecialChances = weapon.specialAttacks.map((attack) => { return attack.defaultChance })
        }
        weapon.overrideSpecialChances.push(leftover);
    }
    weapon.specialAttacks.push(attack);
}


function fuckassResetFunc(attack) {
    for (let item of game.items.weapons.allObjects) { // Really annoying reset function for the case of a weapon with enough space for the normal attack chance but not enough for the increased attack chance
        if (item.specialAttacks.length == 0 || !item.specialAttacks.includes(attack) || ((!item.overrideSpecialChances || item.overrideSpecialChances.length < item.specialAttacks.length) && item.specialAttacks.reduce((acc, a) => acc - a.defaultChance, 100) >= 0)) continue;
        item.specialAttacks = item.specialAttacks.filter(spattack => spattack !== attack);
        if (item.overrideSpecialChances.length > item.specialAttacks.length) item.overrideSpecialChances.pop();
        addAttacktoWeapons(item, attack);
    }

}

export function addSpecialAttack() {


    if (this._localID == "Greatswords3") {
        const attack = game.specialAttacks.getObjectSafe('WTM:Counterattack');
        const weapMap = { weapons: this.type.allWeapons, attack: attack };
        addEffecttoWeaponList(weapMap);
    }

    if (this._localID == "StraightSwords3") {
        const attack = game.specialAttacks.getObjectSafe('WTM:SlashGashMaim');
        const weapMap = { weapons: this.type.allWeapons, attack: attack };
        addEffecttoWeaponList(weapMap);
    }

    if (this._localID == "CurvedSwords3") {
        const attack = game.specialAttacks.getObjectSafe('WTM:ForcefulSweep');
        const weapMap = { weapons: this.type.allWeapons, attack: attack };
        addEffecttoWeaponList(weapMap);
    }

    if (this._localID == "Daggers3") {
        const attack = game.specialAttacks.getObjectSafe('WTM:Heartseeker');
        const weapMap = { weapons: this.type.allWeapons, attack: attack };
        addEffecttoWeaponList(weapMap);
    }

    if (this._localID == "Axes3") {
        const attack = game.specialAttacks.getObjectSafe('WTM:Warcry');
        const weapMap = { weapons: this.type.allWeapons, attack: attack };
        addEffecttoWeaponList(weapMap);
    }

    if (this._localID == "Polearms3") {
        const attack = game.specialAttacks.getObjectSafe('WTM:WhirlingManoeuvre');
        const weapMap = { weapons: this.type.allWeapons, attack: attack };
        addEffecttoWeaponList(weapMap);
    }
}



// Note, this looks cleaner than it actually is, I built it to batch increase special attack from different sources, then I remember the function can't get called that way.
const SPECIAL_MOD3_VALUE = 5;



export function increaseSpecialAttackChance() {
    let toadd = 0;

    const ourAttacks = game.specialAttacks.namespaceMaps.get("WTM"); // Yes right now it only works with WTM's special attacks, I'll get a better way of finding them later.

    if (this._localID == "Special3") {
        toadd += SPECIAL_MOD3_VALUE;
    }


    for (let attack of ourAttacks.values()) {
        attack.defaultChance += toadd;
        fuckassResetFunc(attack);
    }

}