
function addEffecttoWeaponList(AttackMap) {
    for (const weapon of AttackMap.weapons) {
        addAttacktoWeapons(weapon, AttackMap.attack)
    }
}
// Because copying the attack and changing things sucks because of java copying and reference stuff.
function addAttacktoWeapons(weapon, attack) {
    const leftover = weapon.specialAttacks.reduce((acc, a) => acc - a.defaultChance, 100)
    if (leftover < attack.defaultChance) { // we assume the weapon has special attacks for this case to even happen
        const toChop = (attack.defaultChance - leftover) / weapon.specialAttacks.length;
        if (weapon.overrideSpecialChances !== undefined)
            weapon.originalOverride = weapon.overrideSpecialChances;
        weapon.overrideSpecialChances = makearrayforweaponattacks(weapon, toChop);
        weapon.overrideSpecialChances.push(attack.defaultChance);
    }
    else if (weapon.overrideSpecialChances) {
        {
            weapon.originalOverride = weapon.overrideSpecialChances;
            weapon.overrideSpecialChances.push(attack.defaultChance);
        }
    }
    weapon.specialAttacks.push(attack);
}

function makearrayforweaponattacks(weapon, toChop) {
    const numberofshit = Math.max(weapon.specialAttacks.length, weapon.overrideSpecialChances?.length || 0)
    let ihatethisshitarray = [];
    for (let i = 0; i < numberofshit; i++) {
        ihatethisshitarray[i] = (weapon.overrideSpecialChances && weapon.overrideSpecialChances[i]) ? weapon.overrideSpecialChances[i] : weapon.specialAttacks[i].defaultChance;
        ihatethisshitarray[i] -= toChop;
    }
    return ihatethisshitarray;
}
function fuckassResetFunc(attack) {
    for (let item of game.items.weapons.allObjects) { // Really annoying reset function for the case of a weapon with enough space for the normal attack chance but not enough for the increased attack chance
        if (item.specialAttacks.length == 0 || !item.specialAttacks.includes(attack) ||
            ((!item.overrideSpecialChances || item.overrideSpecialChances.length < item.specialAttacks.length) && item.specialAttacks.reduce((acc, a) => acc - a.defaultChance, 100) >= 0))
            continue;
        item.specialAttacks = item.specialAttacks.filter(spattack => spattack !== attack);
        if (item.originalOverride) item.overrideSpecialChances = item.originalOverride;
        else if (item.overrideSpecialChances) item.overrideSpecialChances = item.specialAttacks.map(spattack => spattack.defaultChance)
        addAttacktoWeapons(item, attack);
    }

}

export function addSpecialAttack() {
    if(this.specAttack)
        addEffecttoWeaponList({weapons:this.type.allWeapons, attack:this.specAttack})

}


const SPECIAL_MOD3_VALUE = 5;



export function increaseSpecialAttackChance() {
    let toadd = 0;

    const ourAttacks = game.weaponMasteries.allObjects.flatMap(w => w.levels.filter(t=> t.specAttack).map(t=>t.specAttack));

    if (this._localID == "Special4") {
        toadd += SPECIAL_MOD3_VALUE;
    }
    for (let attack of ourAttacks.values()) {
        attack.defaultChance += toadd;
        fuckassResetFunc(attack);
    }

}