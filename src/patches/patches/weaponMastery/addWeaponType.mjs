
export function addWeaponType(settings, namespaces) {

    // Yes I'm writing this out by hand and NOT using a .json fuck .json files!
    // Update the .json got hands and took my lunch money for saying that
    const setMap = new Map();
    for (const namespace of namespaces) {
        try {
            setMap.set(namespace, settings.get(namespace))
        }
        catch (e) {
            setMap.set(namespace, "full")

        }

    }
    for (const type of game.weaponMasteries.allObjects) {
        // Handle material-based weapons
        if (type.mat) {
            for (const mat of type.mat) {
                for (const material of type.kind) {
                    addClass(`${material}_${mat}`, type, 1, setMap, settings);
                }
            }
        }
        // Handle unique weapons
        if (type.uniq) {
            for (const uniq of type.uniq) {
                addClass(uniq.slice(0, -1), type, uniq.slice(-1), setMap);
            }
        }
    }
    // Set properties to weapoin objects.
    // instead of on weapoin objects we have to set it on eqiupment objects because of the gloves
    Object.defineProperty(EquipmentItem.prototype, 'timesAttacked', {
        get() {
            return game.stats.Items.get(this, ItemStats.TotalAttacks)
        }
    });
    Object.defineProperty(EquipmentItem.prototype, '_enemiesKilledTime', {
        get() {

            return game.stats.Items.get(this, ItemStats.EnemiesKilled) * 2 // the default respawn is 3 (seconds), we use 2 since fighting tougher enemies should give more xp
        }
    });

    Object.defineProperty(EquipmentItem.prototype, 'weaponXPCap', {
        get() {
            return this.uniqueness * 25000;
        }
    });

    Object.defineProperty(EquipmentItem.prototype, '_weaponXPSpeedMod', {
        get() {
            return 2.313  // Note, changed to look prettier. The math is the same as before... whatever the math was before.
        }
    });
    Object.defineProperty(EquipmentItem.prototype, 'weaponXPperSwing', { // These are UI values
        get() {
            return (this.attackSpeed * this._weaponXPSpeedMod + this.attackSpeed * this._weaponXPSpeedMod * this._weaponXPBonus / 100);
        }
    });
    Object.defineProperty(EquipmentItem.prototype, 'weaponXPperKill', {
        get() {
            return 4.6 + 4.6 * this._weaponXPBonus / 100 // This is a constant from 2 times our _weaponXPSpeedMod, remember to change when changing _weaponXPSpeedMod
        }
    });
    Object.defineProperty(EquipmentItem.prototype, '_weaponXP', {
        get() {
            const baseXP = (this.timesAttacked * this.attackSpeed + this._enemiesKilledTime) * this._weaponXPSpeedMod
            return Math.floor(baseXP + baseXP * this._weaponXPBonus / 100);
        }
    });
    Object.defineProperty(EquipmentItem.prototype, 'weaponXPCapped', {
        get() {

            return Math.min(this._weaponXP, this.weaponXPCap);
        }
    });

    Object.defineProperty(EquipmentItem.prototype, 'weaponXPPercentCapped', {
        get() {

            return Math.min(100, this._weaponXP / this.weaponXPCap * 100)
        }
    });
    Object.defineProperty(EquipmentItem.prototype, 'returnFakeSkillObj', {
        get() {

            if (!this._fakeSkillObj) {
                this._fakeSkillObj = { name: this.name, media: this.media, weap: 1 };
            }
            return this._fakeSkillObj;
        }
    });
    Object.defineProperty(EquipmentItem.prototype, 'masteryMaxed', {
        value: 0,
        writable: true,
        configurable: true,
    });

    Object.defineProperty(EquipmentItem.prototype, 'isMaxMastery', {
        get() {
            return this.uniqueness > 0 && (this._weaponXP >= this.weaponXPCap)
        }
    });

    Object.defineProperty(EquipmentItem.prototype, "_weaponXPBonus", {
        get: function () { return game.modifiers.getValue(`WTM:increaseWeaponXP`, ModifierQuery.EMPTY) + game.modifiers.getValue(`WTM:increaseWeaponXP${this.attackType}`, ModifierQuery.EMPTY); }
    });



}


function addClass(name, type, bonuniq = 1, namespaces, settings) {
    let item = null;
    let namespacef = null;
    for (const namespace of namespaces.keys()) {
        item = game.items.getObjectByID(`${namespace}:${name}`);
        if (item) { namespacef = namespace; break; }
    }
    if (item) {
        let set = namespaces.get(namespacef);
        let uniq = set === "no-xp" ? 0 : +bonuniq;
        if (set !== "none")
            addClassToItem(item, type, uniq);
    }

}
function addClassToItem(item, type, bonuniq = 1) {
    if (item.weaponType !== undefined) { console.error("Hey you DUNDERHEAD I'm the big red text telling you you tried to set an item to an item that already had one. Yeah this one: ", item.name); return; }
    item.weaponType = type;
    item.uniqueness = bonuniq;
    if(item.equipmentStats) //annoying ass defensive coding
    item.attackSpeed = item.equipmentStats[0].key === 'attackSpeed' ? item.equipmentStats[0].value / 1000 : 4;

    type.allWeapons.push(item);

}