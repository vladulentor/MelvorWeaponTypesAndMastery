const MeleeMaterial = ["Bronze", "Iron", "Steel", "Mithril", "Crystal", "Adamant", "Rune", "Unholy", "Dragon", "Pure_Crystal", "Corundum", "Augite", "Divine", "Meteorite", "Abyssium", "Brumite", "Gloomite", "Witherite", "Netherite"];
const RangedMaterial = ["Normal", "Oak", "Willow", "Crystal", "Maple", "Yew", "Unholy", "Magic", "Redwood", "Pure_Crystal", "Elderwood", "Revenant", "Carrion", "Twisted", "Plagueroot", "Shadebark", "Crumbletain", "Whisperwillow"];
const MagicMaterial = ["Air", "Water", "Earth", "Fire", "Crystal", "Unholy", "Mystic", "Pure_Crystal", "Poison", "Infernal", "Despair", "Lightning", "Archaic", "Meteorite", "Calamity", "Abyssal", "Brume", "Gloom", "Wither", "Nether", "Desolation", "Cataclysm"];

// Yes I'm writing this out by hand and NOT using a .json fuck .json files!
const Greatswords = {
    clas: "Greatswords", kind: MeleeMaterial, mat: ["2H_Sword"], uniq: [
        "Aeris_Godsword3",
        "Aranite_2H_Blade1",
        "Basic_2H_Sword",
        "Black_2H_Sword3",
        "Blighted_2H_Hook_Sword3",
        "Cursed_2H_Sword2",
        "Darksteel_2H_SWord2",
        "Ice_2h_Sword2",
        "Familiar_2H_Sword3",
        "Glacia_Godsword3",
        "Open_Wounds_Greatsword2",
        "Ragnar_Godsword3",
        "Sanguine_Blade3",
        "Terran_Godsword3",
        "Ultima_Godsword4"
    ]
};

const StraightSwords = {
    clas: "StraightSwords", kind: MeleeMaterial, mat: ["Sword"], uniq: [
        "Ice_Sword2",
        "Black_Sword3",
        "Strange_Sword4",
        "FrostSpark_1H_Sword3",
        "Lightning_Strike_1H_Sword2",
        "Spectral_Ice_Sword2",
        "Agile_Wings_Rapier2",
        "Crystal_Twin_Blades1",
        "Sunset_Rapier2",
        "Witherstab_Rapier3"

    ]
};

const CurvedSwords = {
    clas: "CurvedSwords", kind: MeleeMaterial, mat: ["Scimitar"], uniq: [
        "Ancient_Sword3",
        "Ghost_Scimitar3",
        "Pirate_Captains_Sword2",
        "Tidal_Edge3",
        "Desert_Sabre1"
    ]
};

const Daggers = {
    clas: "Daggers", kind: MeleeMaterial, mat: ["Dagger"], uniq: [
        "Ice_Dagger2",
        "Darksteel_Dagger1",
        "Lacerating_Dagger2",
        "Poisoned_Dagger2",
        "Sacrificial_Dagger3",
        "Shadow_Dagger1"
    ]
};

const Axes = {
    clas: "Axes", kind: MeleeMaterial, mat: ["2H_Axe", "Battleaxe"], uniq: [
        "Big_Ron2",
        "Ethereal_Greataxe2",
        "Ice_Battleaxe2",
        "War_Axe1"
    ]
};

const Polearms = {
    clas: "Polearms", kind: MeleeMaterial, mat: ["2H_Spear", "Spear"], uniq: [
        "Blighting_Polearm2",
        "Elerine_Spear2",
        "Hasty_Trident3",
        "Hollow_Reaper_Scythe3",
        "Royal_Toxins_Spear2",
        "Twin_Exiles3",
        "Warberd3"
    ]
};

const Blunts = {
    clas: "Blunts", kind: MeleeMaterial, mat: ["2H_Hammer", "Hammer"], uniq: [
        "Granite_Mace3",
        "Heated_Fury_2H_Hammer2",
        "Magical_Broomstick3",
        "Miolite_Sceptre3",
        "Rune_Mallet3",
        "Stone_Hammer2",
        "Water_Sceptre3"
    ]
};

const HandToHand = {
    clas: "HandToHand", kind: MeleeMaterial, uniq: [
        "Ancient_Claw2",
        "Blighted_Claw3",
        "Dragon_Claw2",
        "Infernal_Claw3",
        "Rune_Claw2",
        "Silent_Surge_Crossblade4"
    ]
};

const Crossbows = {
    clas: "Crossbows", kind: MeleeMaterial, mat: ["Crossbow"], uniq: [
        "Ancient_Crossbow3",
        "Confetti_Crossbow2",
        "Feather_Storm_Crossbow3",
        "Ghost_Blunderbow3",
        "Granite_Crossbow3",
        "Poison_Crossbow2",
        "Shockwave3",
        "Slayer_Crossbow2",
        "Stinging_Silence_Crossbow3",
        "Torrential_Blast_Crossbow3",
        "Toxic_Blast_Crossbow2",
        "Voidburst_Barrage_Crossbow3",
        "Witherslinger_Crossbow3"
    ]
};

const HeavyBows = {
    clas: "HeavyBows", kind: RangedMaterial, mat: ["Longbow"], uniq: [
        "Ancient_Hunting_Bow3",
        "Ancient_Longbow3",
        "Blighted_Feather_Bow3",
        "Cursed_Longbow1",
        "Ethereal_Longbow3",
        "Elerine_Longbow2",
        "Engulfing_Vortex_Longbow4",
        "Familiar_Longbow3",
        "Golden_Bow3",
        "Hollow_Nightmare_Bow3",
        "Ice_Longbow2",
        "Malevolent_Blight_Longbow2",
        "Old_Hunting_Bow2",
        "Stormsnap3",
        "Thorned_Power_Bow2"
    ]
};

const LightBows = {
    clas: "LightBows", kind: RangedMaterial, mat: ["Shortbow"], uniq: [
        "Basic_Shortbow1",
        "Desert_Shortbow2",
        "Ice_Shortbow2",
        "Lacerating_Shortbow2",
        "Poisoned_Shortbow3"
    ]
};

const ThrownShort = {
    clas: "ThrownShort", kind: MeleeMaterial, mat: ["Throwing_Knife"], uniq: [
        "Ancient_Throwing_Knife3",
        "Shadow_Throwing_Knife3"
    ]
};

const ThrownLong = {
    clas: "ThrownLong", kind: MeleeMaterial, mat: ["Javelin"], uniq: [
        "Ancient_Javelin3"
    ]
};

const Artifacts = {
    clas: "Artifacts", kind: MagicMaterial, uniq: [
        "Magic_Flute6",
        "Powered_Red_Crystal3",
        "Trickery_Mirror3"
    ]
};

const Staves = {
    clas: "Staves", kind: MagicMaterial, mat: ["Staff", "Battlestaff", "Staff of"], uniq: [
        "Basic_Staff1",
        "Blazing_Shadow_Staff3",
        "Blight_Burst_Staff2",
        "Blighted_Staff3",
        "Cloudburst_Staff3",
        "Cursed_Staff1",
        "Ethereal_Staff3",
        "Familiar_Staff2",
        "Hollow_Doom_Staff3",
        "Lacerating_Staff2",
        "Lich_Staff3",
        "Lightning_Coil_2H_Staff3",
        "Mudball_Staff2",
        "Natures_Call_Staff2",
        "Natures_Wrath_Staff3",
        "Rotten_Staff3",
        "Water_Pulse_Staff3"
    ]
};

const Wands = {
    clas: "Wands", kind: MagicMaterial, mat: ["Imbued", "Wand"], uniq: [
        "Foresight_Wand3",
        "Ocean_Song3",
        "Shadow_Wand3",
        "Silent_Tangle_Wand3",
        "Slicing_Maelstrom_Wand3",
        "Soul_Taker_Wand2",
        "Toxic_Fumes_Wand1",
        "Voidfire_Cascade_Wand3",
        "Witherbind_Wand3"
    ]
};

const Special = {
    clas: "Special", kind: MeleeMaterial, mat: ["Special"], uniq: [
        "Abyssal_Hourglass_Inverted4",
        "Abyssal_Hourglass_Upright4",
        "Abyssal_Scythe2",
        "Almighty_Lute4",
        "Ancient_Scythe4",
        "Archaeologists_Whip5",
        "Bobs_Lost_Rake4",
        "Bobs_Rake5",
        "Chefs_Spoon4",
        "Chisel4",
        "Enhanced_Spyglass5",
        "Fear_Hunter_Whip3",
        "Fishing_Net5",
        "Grappling_Hook4",
        "Old_Fancy_Quill5",
        "Old_Spyglass5",
        "Old_Wooden_Ladle5",
        "Potion_Stirrer4",
        "Silentsnap_Crab_Claw2",
        "Slingshot2",
        "Sturdy_Fancy_Quill4",
        "Void_Vortex_Whip3"
    ]
};

const namespaces = ["melvorD", "melvorF", "melvorAoD", "melvorTotH", "melvorItA", "rielkConstruction"];

export function addWeaponType(ctx) { 
    for (const type of [Greatswords, StraightSwords, CurvedSwords, Daggers, Axes, Polearms, Blunts, HandToHand, Crossbows, HeavyBows, LightBows, ThrownShort, ThrownLong, Artifacts, Staves, Wands, Special]) {
        // Handle material-based weapons
        type.clas = game.weaponMasteries.getObject("WTM", type.clas);
        if (type.mat) {
            for (const mat of type.mat) {
                for (const material of type.kind) {
                    addClass(`${material}_${mat}`, type.clas, 1);
                }
            }
        }

        // Handle unique weapons
        if (type.uniq) {
            for (const uniq of type.uniq) {
                addClass(uniq.slice(0, -1), type.clas, uniq.slice(-1));
            }
        }
    }
    // Set properties to weapoin objects.
    Object.defineProperty(WeaponItem.prototype, 'timesAttacked', {
        get() {
            return game.stats.Items.get(this, ItemStats.TotalAttacks)
        }
    });
    Object.defineProperty(WeaponItem.prototype, 'weaponXPCap', {
        get() {
            return this.uniqueness * 5000;
        }
    });
    Object.defineProperty(WeaponItem.prototype, '_weaponXP', {
        get() {
            const baseXP = (this.timesAttacked * this.attackSpeed + this._enemiesKilledTime) * 0.4626  // Magic number, balanced so you will get 833 xp per hour, so 6 hours for stock, 12 for unusual and 18 for distinct weapons before modifiers.
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
      Object.defineProperty(WeaponItem.prototype, '_enemiesKilledTime', {
        get() {

            return  game.stats.Items.get(this, ItemStats.EnemiesKilled) * 3 // using the default enemy respawn interval of 3 seconds, faster interval is faster xp get 
        }
    });
    Object.defineProperty(WeaponItem.prototype, 'masteryMaxed', {
        value: 0,
        writable: true,
        configurable: true,
    });

    Object.defineProperty(WeaponItem.prototype, 'isMaxMastery', {
        get() {

            return game.stats.Items.get(this, ItemStats.TotalAttacks)
        }
    });

    Object.defineProperty(WeaponItem.prototype, "_weaponXPBonus", {
        get: function () { return game.modifiers.getValue(`rielkConstruction:increaseWeaponXP${this.attackType}`, ModifierQuery.EMPTY); }
    });


    ctx.patch(WeaponItem, "applyDataModification").after(function (_, modData, game) {
        if (itemData.weaponType) {
            const type = game.weaponMasteries.getObjectByID(itemData.weaponType);
            if (itemData.uniqueness) this.uniqueness = itemData.uniqueness;
            addClassToItem(this, type, this.uniqueness);
        }
    });

    ctx.onModsLoaded(() => {
    });
}


function addClass(name, type, bonuniq = 1) {
    let item = -1;
    let namespacef = null;
    for (const namespace of namespaces) {
        item = game.items.getObjectByID(`${namespace}:${name}`);
        if (item) { namespacef = namespace; break; }
    }
    if (item) {
        bonuniq = namespacef === namespacef === "melvorItA" ? 0 : bonuniq;
        addClassToItem(item, type, bonuniq);
    }
    else {
        console.log("Not found:", name);
    }
}
function addClassToItem(item, type, bonuniq = 1) {
    item.weaponType = type;
    item.uniqueness = bonuniq
    item.attackSpeed = item.equipmentStats[0].key === 'attackSpeed' ? item.equipmentStats[0].value / 1000 : 4;

    type.allWeapons.push(item);
    if (type.isPerWepMod)
        type.makeWeaponConditional(item);

}