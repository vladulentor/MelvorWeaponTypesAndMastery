const namespaces = () => Array.from(game.registeredNamespaces.registeredNamespaces.keys());

export function addWeaponType(ctx) {
    ctx.onModsLoaded(async (ctx) => {
        // Yes I'm writing this out by hand and NOT using a .json fuck .json files!
        // Update the .json got hands and took my lunch money for saying that

        for (const type of game.weaponMasteries.allObjects) {
            // Handle material-based weapons
            if (type.mat) {
                for (const mat of type.mat) {
                    for (const material of type.kind) {
                        addClass(`${material}_${mat}`, type, 1);
                    }
                }
            }
            // Handle unique weapons
            if (type.uniq) {
                for (const uniq of type.uniq) {
                    addClass(uniq.slice(0, -1), type, uniq.slice(-1));
                }
            }
        }
        // Set properties to weapoin objects.
        Object.defineProperty(WeaponItem.prototype, 'timesAttacked', {
            get() {
                return game.stats.Items.get(this, ItemStats.TotalAttacks)
            }
        });
        Object.defineProperty(WeaponItem.prototype, '_enemiesKilledTime', {
            get() {

                return game.stats.Items.get(this, ItemStats.EnemiesKilled) * 2 // the default respawn is 3 (seconds), we use 2 since fighting tougher enemies should give more xp
            }
        });

        Object.defineProperty(WeaponItem.prototype, 'weaponXPCap', {
            get() {
                return this.uniqueness * 25000;
            }
        });

        Object.defineProperty(WeaponItem.prototype, '_weaponXPSpeedMod', {
            get() {
                return 2.313  // Note, changed to look prettier. The math is the same as before... whatever the math was before.
            }
        });
        Object.defineProperty(WeaponItem.prototype, 'weaponXPperSwing', { // These are UI values
            get() {
                return (this.attackSpeed * this._weaponXPSpeedMod + this.attackSpeed * this._weaponXPSpeedMod * this._weaponXPBonus / 100);
            }
        });
        Object.defineProperty(WeaponItem.prototype, 'weaponXPperKill', {
            get() {
                return 4.6 + 4.6 * this._weaponXPBonus / 100 // This is a constant from 2 times our _weaponXPSpeedMod, remember to change when changing _weaponXPSpeedMod
            }
        });
        Object.defineProperty(WeaponItem.prototype, '_weaponXP', {
            get() {
                const baseXP = (this.timesAttacked * this.attackSpeed + this._enemiesKilledTime) * this._weaponXPSpeedMod
                return Math.floor(baseXP + baseXP * this._weaponXPBonus / 100);
            }
        });
        Object.defineProperty(WeaponItem.prototype, 'weaponXPCapped', {
            get() {

                return Math.min(this._weaponXP, this.weaponXPCap);
            }
        });

        Object.defineProperty(WeaponItem.prototype, 'weaponXPPercentCapped', {
            get() {

                return Math.min(100, this._weaponXP / this.weaponXPCap * 100)
            }
        });
        Object.defineProperty(WeaponItem.prototype, 'returnFakeSkillObj', {
            get() {

                if (!this._fakeSkillObj) {
                    this._fakeSkillObj = { name: this.name, media: this.media, weap: 1 };
                }
                return this._fakeSkillObj;
            }
        });
        Object.defineProperty(WeaponItem.prototype, 'masteryMaxed', {
            value: 0,
            writable: true,
            configurable: true,
        });

        Object.defineProperty(WeaponItem.prototype, 'isMaxMastery', {
            get() {
                return this.uniqueness > 0 && (this._weaponXP >= this.weaponXPCap)
            }
        });

        Object.defineProperty(WeaponItem.prototype, "_weaponXPBonus", {
            get: function () { return game.modifiers.getValue(`WTM:increaseWeaponXP${this.attackType}`, ModifierQuery.EMPTY); }
        });


        ctx.patch(WeaponItem, "applyDataModification").after(function (_, modData, game) {
            if (itemData.weaponType) {
                const type = game.weaponMasteries.getObjectByID(itemData.weaponType);
                if (itemData.uniqueness) this.uniqueness = itemData.uniqueness;
                addClassToItem(this, type, this.uniqueness);
            }
        });

    });
}


function addClass(name, type, bonuniq = 1) {
    let item = -1;
    let namespacef = null;
    for (const namespace of namespaces()) {
        item = game.items.getObjectByID(`${namespace}:${name}`);
        if (item) { namespacef = namespace; break; }
    }
    if (item) {
        bonuniq = namespacef === "melvorItA" ? 0 : bonuniq;
        addClassToItem(item, type, bonuniq);
    }
  
}
function addClassToItem(item, type, bonuniq = 1) {
    if(item.weaponType !== undefined) {console.error("Hey you DUNDERHEAD I'm the big red text telling you you tried to set an item to an item that already had one. Yeah this one: ", item.name); return;}
    item.weaponType = type;
    item.uniqueness = bonuniq;
    item.attackSpeed = item.equipmentStats[0].key === 'attackSpeed' ? item.equipmentStats[0].value / 1000 : 4;

    type.allWeapons.push(item);

}