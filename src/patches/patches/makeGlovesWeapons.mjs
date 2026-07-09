// GLOVE LIST

const gloves = [
    {
        item: "melvorD:Barbarian_Gloves", attackType: "melee", wepStats:
            [{ key: 'attackSpeed', value: 2200 }], specialAttacks: ["WTM:BigSmash"]
    },
    {
        item: "melvorF:Bobs_Gloves", attackType: "melee", wepStats:
            [{ key: 'attackSpeed', value: 2200 }], modifiers: {
                "seedDropConversionChance": 50,
                "foodPreservationChance": 25
            }
        
    },
    {
        item: "melvorD:Bronze_Gloves", attackType: "melee", wepStats:
            [{ key: 'attackSpeed', value: 2200 }, { key: 'meleeStrengthBonus', value: 10 }, { key: 'stabAttackBonus', value: 10 }, { key: 'slashAttackBonus', value: 10 }, { key: 'blockAttackBonus', value: 10 }, { key: 'meleeDefenceBonus', value: 10 }, { key: 'rangedDefenceBonus', value: 13 }, { key: 'magicDefenceBonus', value: 8 }, { key: 'damageReduction', value: 1 },]
    },
    {
        item: "melvorD:Iron_Gloves", attackType: "melee", wepStats:
            [{ key: 'attackSpeed', value: 2200 }, { key: 'meleeStrengthBonus', value: 11 }, { key: 'stabAttackBonus', value: 11 }, { key: 'slashAttackBonus', value: 11 }, { key: 'blockAttackBonus', value: 11 }, { key: 'meleeDefenceBonus', value: 11 }, { key: 'rangedDefenceBonus', value: 14 }, { key: 'magicDefenceBonus', value: 8 }, { key: 'damageReduction', value: 2 },]
    },
    {
        item: "melvorD:Steel_Gloves", attackType: "melee", wepStats:
            [{ key: 'attackSpeed', value: 2200 }, { key: 'meleeStrengthBonus', value: 13 }, { key: 'stabAttackBonus', value: 13 }, { key: 'slashAttackBonus', value: 13 }, { key: 'blockAttackBonus', value: 13 }, { key: 'meleeDefenceBonus', value: 13 }, { key: 'rangedDefenceBonus', value: 16 }, { key: 'magicDefenceBonus', value: 10 }, { key: 'damageReduction', value: 3 },]
    },
    {
        item: "melvorAoD:Crystal_Gloves", attackType: "melee", wepStats:
            [{ key: 'attackSpeed', value: 2200 }, { key: 'meleeStrengthBonus', value: 17 }, { key: 'stabAttackBonus', value: 17 }, { key: 'slashAttackBonus', value: 17 }, { key: 'blockAttackBonus', value: 17 }, { key: 'meleeDefenceBonus', value: 17 }, { key: 'rangedDefenceBonus', value: 21 }, { key: 'magicDefenceBonus', value: 13 }, { key: 'damageReduction', value: 4 },], specialAttacks: ["WTM:CrystalStrike"]
    },
    {
        item: "melvorD:Mithril_Gloves", attackType: "melee", wepStats:
            [{ key: 'attackSpeed', value: 2200 }, { key: 'meleeStrengthBonus', value: 17 }, { key: 'stabAttackBonus', value: 17 }, { key: 'slashAttackBonus', value: 17 }, { key: 'blockAttackBonus', value: 17 }, { key: 'meleeDefenceBonus', value: 17 }, { key: 'rangedDefenceBonus', value: 21 }, { key: 'magicDefenceBonus', value: 13 }, { key: 'damageReduction', value: 4 },]
    },
    {
        item: "melvorF:Desert_Wrappings", attackType: "melee", wepStats:
            [{ key: 'attackSpeed', value: 2200 }, { key: 'meleeStrengthBonus', value: 17 }, { key: 'stabAttackBonus', value: 17 }, { key: 'slashAttackBonus', value: 17 }, { key: 'blockAttackBonus', value: 17 }, { key: 'meleeDefenceBonus', value: 17 }, { key: 'rangedDefenceBonus', value: 21 }, { key: 'magicDefenceBonus', value: 13 }, { key: 'damageReduction', value: 4 },], modifiers: {
                "autoEatEfficiency": 30,
                "hitpointRegeneration": 100
            }
        
    },
    {
        item: "melvorF:Elementalist_Gloves", attackType: "magic", wepStats:
            [{ key: 'attackSpeed', value: 2200 }, { key: 'magicDamageBonus', value: 20 }, { key: 'magicAttackBonus', value: 20 }, { key: 'magicDefenceBonus', value: 20 }, { key: 'damageReduction', value: 4 },], combatEffects: [
                {
                    "appliesWhen": "HitByAttack",
                    "chance": 3.3,
                    "tableID": "melvorF:ElementalEffect"
                },
                {
                    "appliesWhen": "HitWithAttack",
                    "chance": 3.3,
                    "tableID": "melvorF:ElementalEffect"
                },
                {
                    "appliesWhen": "StartOfFight",
                    "chance": 3.3,
                    "tableID": "melvorF:ElementalEffect"
                }
            ]
    },
    {
        item: "melvorD:Adamant_Gloves", attackType: "melee", wepStats:
            [{ key: 'attackSpeed', value: 2200 }, { key: 'meleeStrengthBonus', value: 24 }, { key: 'stabAttackBonus', value: 24 }, { key: 'slashAttackBonus', value: 24 }, { key: 'blockAttackBonus', value: 24 }, { key: 'meleeDefenceBonus', value: 24 }, { key: 'rangedDefenceBonus', value: 30 }, { key: 'magicDefenceBonus', value: 18 }, { key: 'damageReduction', value: 5 },]
    },
    {
        item: "melvorAoD:Biting_Gloves", attackType: "melee", wepStats:
            [{ key: 'attackSpeed', value: 2200 }, { key: 'meleeStrengthBonus', value: 28 }, { key: 'stabAttackBonus', value: 28 }, { key: 'slashAttackBonus', value: 28 }, { key: 'blockAttackBonus', value: 28 }, { key: 'meleeDefenceBonus', value: 28 }, { key: 'rangedDefenceBonus', value: 34 }, { key: 'magicDefenceBonus', value: 20 }, { key: 'damageReduction', value: 5 },], specialAttacks: ["melvorAoD:BleedingBite "]
    },
    {
        item: "melvorD:Rune_Gloves", attackType: "melee", wepStats:
            [{ key: 'attackSpeed', value: 2200 }, { key: 'meleeStrengthBonus', value: 36 }, { key: 'stabAttackBonus', value: 36 }, { key: 'slashAttackBonus', value: 36 }, { key: 'blockAttackBonus', value: 36 }, { key: 'meleeDefenceBonus', value: 36 }, { key: 'rangedDefenceBonus', value: 45 }, { key: 'magicDefenceBonus', value: 27 }, { key: 'damageReduction', value: 6 },]
    },
    {
        item: "melvorF:Paladin_Gloves", attackType: "melee", wepStats:
            [{ key: 'attackSpeed', value: 2200 }, { key: 'meleeStrengthBonus', value: 43 }, { key: 'stabAttackBonus', value: 43 }, { key: 'slashAttackBonus', value: 43 }, { key: 'blockAttackBonus', value: 43 }, { key: 'meleeDefenceBonus', value: 43 }, { key: 'rangedDefenceBonus', value: 54 }, { key: 'magicDefenceBonus', value: 32 }, { key: 'damageReduction', value: 6 },], modifiers: {

                "flatResistanceWithActivePrayer": [
                    {
                        "damageTypeID": "melvorD:Normal",
                        "value": 1
                    }
                ],
                "damageTakenAddedAsPrayerPoints": 0.1

            }
        
    },
    {
        item: "melvorAoD:Bulky_Gloves", attackType: "melee", wepStats:
            [{ key: 'attackSpeed', value: 2600 }, { key: 'meleeStrengthBonus', value: 80 }, { key: 'stabAttackBonus', value: 80 }, { key: 'slashAttackBonus', value: 80 }, { key: 'blockAttackBonus', value: 80 }], specialAttacks: ["melvorF:DualAttack"]
    },
    {
        item: "melvorD:Dragon_Gloves", attackType: "melee", wepStats:
            [{ key: 'attackSpeed', value: 2200 }, { key: 'meleeStrengthBonus', value: 58 }, { key: 'stabAttackBonus', value: 58 }, { key: 'slashAttackBonus', value: 58 }, { key: 'blockAttackBonus', value: 58 }, { key: 'meleeDefenceBonus', value: 58 }, { key: 'rangedDefenceBonus', value: 73 }, { key: 'magicDefenceBonus', value: 44 }, { key: 'damageReduction', value: 7 },]
    },
    {
        item: "melvorAoD:Pure_Crystal_Gloves", attackType: "melee", wepStats:
            [{ key: 'attackSpeed', value: 2200 }, { key: 'meleeStrengthBonus', value: 58 }, { key: 'stabAttackBonus', value: 58 }, { key: 'slashAttackBonus', value: 58 }, { key: 'blockAttackBonus', value: 58 }, { key: 'meleeDefenceBonus', value: 58 }, { key: 'rangedDefenceBonus', value: 73 }, { key: 'magicDefenceBonus', value: 44 }, { key: 'damageReduction', value: 7 },], specialAttacks: ["WTM:Shatterstrikes"]
    },

    {
        item: "melvorF:Aeris_God_Gloves", attackType: "melee", wepStats:
            [{ key: 'attackSpeed', value: 2000 }, { key: 'meleeStrengthBonus', value: 75 }, { key: 'stabAttackBonus', value: 75 }, { key: 'slashAttackBonus', value: 75 }, { key: 'blockAttackBonus', value: 75 }, { key: 'meleeDefenceBonus', value: 60 }, { key: 'rangedDefenceBonus', value: 80 }, { key: 'magicDefenceBonus', value: 100 }, { key: 'damageReduction', value: 11 },], specialAttacks: ["WTM:CycloneFist"]
    },
    {
        item: "melvorF:Poison_Virulence_Gloves", attackType: "melee", wepStats:
            [{ key: 'attackSpeed', value: 2000 }, { key: 'meleeStrengthBonus', value: 80 }, { key: 'stabAttackBonus', value: 80 }, { key: 'slashAttackBonus', value: 80 }, { key: 'blockAttackBonus', value: 80 }, { key: 'meleeDefenceBonus', value: 65 }, { key: 'rangedDefenceBonus', value: 85 }, { key: 'magicDefenceBonus', value: 110 }, { key: 'damageReduction', value: 12 },], specialAttacks: ["WTM:ToxicNeedleFlurry"]
    },
    {
        item: "melvorF:Glacia_God_Gloves", attackType: "melee", wepStats:
            [{ key: 'attackSpeed', value: 2200 }, { key: 'meleeStrengthBonus', value: 75 }, { key: 'stabAttackBonus', value: 75 }, { key: 'slashAttackBonus', value: 75 }, { key: 'blockAttackBonus', value: 75 }, { key: 'meleeDefenceBonus', value: 100 }, { key: 'rangedDefenceBonus', value: 60 }, { key: 'magicDefenceBonus', value: 80 }, { key: 'damageReduction', value: 11 },], specialAttacks: ["WTM:FistOfTheWinterWinds"]
    },
    {
        item: "melvorF:Burning_Madness_Gloves", attackType: "melee", wepStats:
            [{ key: 'attackSpeed', value: 2200 }, { key: 'meleeStrengthBonus', value: 80 }, { key: 'stabAttackBonus', value: 80 }, { key: 'slashAttackBonus', value: 80 }, { key: 'blockAttackBonus', value: 80 }, { key: 'meleeDefenceBonus', value: 110 }, { key: 'rangedDefenceBonus', value: 65 }, { key: 'magicDefenceBonus', value: 85 }, { key: 'damageReduction', value: 12 },], specialAttacks: ["WTM:LichsMadness"]
    },
    {
        item: "melvorF:Terran_God_Gloves", attackType: "melee", wepStats:
            [{ key: 'attackSpeed', value: 2300 }, { key: 'meleeStrengthBonus', value: 93 }, { key: 'stabAttackBonus', value: 93 }, { key: 'slashAttackBonus', value: 93 }, { key: 'blockAttackBonus', value: 93 }, { key: 'meleeDefenceBonus', value: 116 }, { key: 'rangedDefenceBonus', value: 145 }, { key: 'magicDefenceBonus', value: 87 }, { key: 'damageReduction', value: 13 },], specialAttacks: ["WTM:Stonewall"]
    },
    {
        item: "melvorF:Spiked_Shell_Gloves", attackType: "melee", wepStats:
            [{ key: 'attackSpeed', value: 2300 }, { key: 'meleeStrengthBonus', value: 98 }, { key: 'stabAttackBonus', value: 98 }, { key: 'slashAttackBonus', value: 98 }, { key: 'blockAttackBonus', value: 98 }, { key: 'meleeDefenceBonus', value: 139 }, { key: 'rangedDefenceBonus', value: 174 }, { key: 'magicDefenceBonus', value: 104 }, { key: 'damageReduction', value: 14 },], specialAttacks: ["WTM:SpikedCarapace"]
    },
    {
        item: "melvorF:Ragnar_God_Gloves", attackType: "melee", wepStats:
            [{ key: 'attackSpeed', value: 2200 }, { key: 'meleeStrengthBonus', value: 104 }, { key: 'stabAttackBonus', value: 104 }, { key: 'slashAttackBonus', value: 104 }, { key: 'blockAttackBonus', value: 104 }, { key: 'meleeDefenceBonus', value: 99 }, { key: 'rangedDefenceBonus', value: 124 }, { key: 'magicDefenceBonus', value: 74 }, { key: 'damageReduction', value: 10 },], specialAttacks: ["WTM:BarrageOfFlamingDeath"]
    },
    {
        item: "melvorF:Relentless_Fury_Gloves", attackType: "melee", wepStats:
            [{ key: 'attackSpeed', value: 2200 }, { key: 'meleeStrengthBonus', value: 115 }, { key: 'stabAttackBonus', value: 115 }, { key: 'slashAttackBonus', value: 115 }, { key: 'blockAttackBonus', value: 115 }, { key: 'meleeDefenceBonus', value: 102 }, { key: 'rangedDefenceBonus', value: 128 }, { key: 'magicDefenceBonus', value: 77 }, { key: 'damageReduction', value: 11 },], specialAttacks: ["WTM:RelentlessFury"]
    },
    {
        item: "melvorAoD:Eradicating_Gloves", attackType: "magic", wepStats:
            [{ key: 'attackSpeed', value: 2200 }, { key: 'meleeStrengthBonus', value: 125 }, { key: 'stabAttackBonus', value: 125 }, { key: 'slashAttackBonus', value: 125 }, { key: 'blockAttackBonus', value: 115 }, { key: 'meleeDefenceBonus', value: 145 }, { key: 'rangedDefenceBonus', value: 115 }, { key: 'magicDefenceBonus', value: 125 }, { key: 'damageReduction', value: 13 },], specialAttacks: ["WTM:Eradication"]
    },
    {
        item: "melvorTotH:Corundum_Gloves", attackType: "melee", wepStats:
            [{ key: 'attackSpeed', value: 2200 }, { key: 'meleeStrengthBonus', value: 140 }, { key: 'stabAttackBonus', value: 140 }, { key: 'slashAttackBonus', value: 140 }, { key: 'blockAttackBonus', value: 140 }, { key: 'meleeDefenceBonus', value: 140 }, { key: 'rangedDefenceBonus', value: 160 }, { key: 'magicDefenceBonus', value: 120 }, { key: 'damageReduction', value: 15 },], specialAttacks: ["melvorTotH:CorundumWounds"], overrideSpecialChances: [20]
    },
    {
        item: "melvorTotH:Augite_Gloves", attackType: "melee", wepStats:
            [{ key: 'attackSpeed', value: 2200 }, { key: 'meleeStrengthBonus', value: 139 }, { key: 'stabAttackBonus', value: 139 }, { key: 'slashAttackBonus', value: 139 }, { key: 'blockAttackBonus', value: 139 }, { key: 'meleeDefenceBonus', value: 139 }, { key: 'rangedDefenceBonus', value: 174 }, { key: 'magicDefenceBonus', value: 104 }, { key: 'damageReduction', value: 16 },], specialAttacks: ["melvorTotH:AugiteCrystallization"], overrideSpecialChances: [20]
    },
    {
        item: "melvorTotH:Divinite_Gloves", attackType: "melee", wepStats:
            [{ key: 'attackSpeed', value: 2200 }, { key: 'meleeStrengthBonus', value: 167 }, { key: 'stabAttackBonus', value: 167 }, { key: 'slashAttackBonus', value: 167 }, { key: 'blockAttackBonus', value: 167 }, { key: 'meleeDefenceBonus', value: 167 }, { key: 'rangedDefenceBonus', value: 209 }, { key: 'magicDefenceBonus', value: 125 }, { key: 'damageReduction', value: 17 },], specialAttacks: ["melvorTotH:DivineBreaker"], overrideSpecialChances: [20]
    },
    {
        item: "melvorTotH:Gauntlets_of_Rage", attackType: "melee", wepStats:
            [{ key: 'attackSpeed', value: 2200 }, { key: 'meleeStrengthBonus', value: 180 }, { key: 'stabAttackBonus', value: 180 }, { key: 'slashAttackBonus', value: 180 }, { key: 'blockAttackBonus', value: 180 }, { key: 'meleeDefenceBonus', value: 90 }, { key: 'rangedDefenceBonus', value: 100 }, { key: 'magicDefenceBonus', value: 50 }, { key: 'damageReduction', value: 10 },], modifiers: {

                "WTM:maxHitBasedOnMissingHitpoints": 1,
                "WTM:critChanceBasedOnMissingHitpoints": 1

            }
        
    },
    {
        item: "melvorTotH:Vorloran_Protector_Gloves", attackType: "melee", wepStats:
            [{ key: 'attackSpeed', value: 2200 }, { key: 'meleeStrengthBonus', value: 200 }, { key: 'stabAttackBonus', value: 200 }, { key: 'slashAttackBonus', value: 200 }, { key: 'blockAttackBonus', value: 200 }, { key: 'meleeDefenceBonus', value: 200 }, { key: 'rangedDefenceBonus', value: 250 }, { key: 'magicDefenceBonus', value: 150 }, { key: 'damageReduction', value: 20 },], modifiers: {
                "lifesteal": 15,
                "bleedLifesteal": 50,
                "effectIgnoreChance": [
                    {
                        "effectGroupID": "melvorD:StunLike",
                        "value": 10
                    },
                    {
                        "effectGroupID": "melvorD:BleedDOT",
                        "value": 10
                    }
                ]

            },
        
        enemyModifiers: {
            "resistance": [
                {
                    "damageTypeID": "melvorD:Normal",
                    "value": -4
                }
            ]
        }
        
    },
    {
        item: "melvorTotH:Vorloran_Devastator_Gloves", attackType: "melee", wepStats:
            [{ key: 'attackSpeed', value: 2200 }, { key: 'meleeStrengthBonus', value: 200 }, { key: 'stabAttackBonus', value: 200 }, { key: 'slashAttackBonus', value: 200 }, { key: 'blockAttackBonus', value: 200 }, { key: 'meleeDefenceBonus', value: 250 }, { key: 'rangedDefenceBonus', value: 150 }, { key: 'magicDefenceBonus', value: 200 }, { key: 'damageReduction', value: 20 }], modifiers: {
                "lifesteal": 25,
                "burnLifesteal": 250,
                "effectIgnoreChance": [
                    {
                        "effectGroupID": "melvorD:BurnDOT",
                        "value": 10
                    },
                    {
                        "effectGroupID": "melvorD:Slow",
                        "value": 10
                    }
                ]

            },
        
        enemyModifiers: {
            "resistance": [
                {
                    "damageTypeID": "melvorD:Normal",
                    "value": -4
                }
            ]
        },
        combatEffects: [
            {
                "appliesWhen": "HitWithAttack",
                "tableID": "melvorF:ElementalEffect",
                "chance": 10
            }
        ]
    },
    {
        item: "melvorTotH:Vorloran_Watcher_Gloves", attackType: "melee", wepStats:
            [{ key: 'attackSpeed', value: 2200 }, { key: 'meleeStrengthBonus', value: 200 }, { key: 'stabAttackBonus', value: 200 }, { key: 'slashAttackBonus', value: 200 }, { key: 'blockAttackBonus', value: 200 }, { key: 'meleeDefenceBonus', value: 150 }, { key: 'rangedDefenceBonus', value: 200 }, { key: 'magicDefenceBonus', value: 250 }, { key: 'damageReduction', value: 20 },], modifiers: {
                "lifesteal": 25,
                "poisonLifesteal": 250,
                "effectIgnoreChance": [
                    {
                        "effectGroupID": "melvorD:PoisonDOT",
                        "value": 10
                    },
                    {
                        "effectGroupID": "melvorD:DeadlyPoisonDOT",
                        "value": 10
                    }
                ]

            },
        
        enemyModifiers: {
            "resistance": [
                {
                    "damageTypeID": "melvorD:Normal",
                    "value": -4
                }
            ]
        }
        ,
        combatEffects: [
            {
                "appliesWhen": "HitWithAttack",
                "effectID": "melvorTotH:Assassin"
            },
            {
                "appliesWhen": "HitWithAttack",
                "effectID": "melvorD:Poison",
                "chance": 10
            }
        ]
    }

    //and so on and so forth
    //Right now the glove is set as a material to HandToHand in the data.json, so all the metal gloves will be added
    //To add any other gloves add it there
    //I guess we haven't decided how many or which gloves to make into equippable weapons, but there's 103 gloves in game which would be 1/3rd of all ingame weapons so we can't do all of them
    //It's your choice which gloves the handtohand type gets, melee is obvious but I'd also think if we used vambraces (as melee weapons) it would fit thematically
    //Also put in some misc skilling gloves and some magic gloves to use to fill out special and artefact respectively, thanks
    // (I could have used a script to approximate stats for all of them but you said this is your favorite part so have fun)
]




// CODE
export function makeGlovesWeapons() {
    const reqD = game.items.getObjectByID("melvorD:Iron_Dagger").equipRequirements[0];
    const wepSlot = game.equipmentSlots.getObjectByID("melvorD:Weapon");
    gloves.forEach(upgradeset => {
        const item = game.items.getObjectByID(upgradeset.item);
        if (item == undefined) return;
        item.damageType = game.normalDamage;
        item.equipRequirements.push(reqD);
        item.validSlots.unshift(wepSlot);
        item.equipRequirements.level = 5;
        item.SpecWeaponStats = [];
        upgradeset.wepStats.forEach(wepStat => {
            if (wepStat.key == 'attackSpeed')
                item.attackSpeed = wepStat.value / 1000;
            if (wepStat.key == 'resistance')
                wepStat.damageType = game.damageTypes.getObjectByID("melvorD:Normal")

            item.SpecWeaponStats.push(wepStat)



        })
        if (upgradeset.specialAttacks) // All of our specialAttacks are 1 element so let's hope that they stay like that
        {
            const atk = game.specialAttacks.getObjectByID(upgradeset.specialAttacks[0]);
            if (atk)
                item.specialAttacks = [atk];
            if (upgradeset.overrideSpecialChances)
                item.overrideSpecialChances = upgradeset.overrideSpecialChances
        }
        item.SpecWeaponMods = new StatObject(upgradeset, game, item._localID);

    })
    // Too lazy for smarti nitialization so we just flush the regqueue after we create it, sorry not sorryZ
    for (let i = 0; i < game.softDataRegQueue.length; i++) {
        const { data, object, where } = game.softDataRegQueue[i];
        try {
            object.registerSoftDependencies(data, game);
        }
        catch (e) {
            if (where !== undefined) {
                throw new Error(`Error registering soft data dependency in ${where}: ${e}`);
            }
            throw e;
        }
    }
    this.softDataRegQueue = [];

    game.combat.computeAllStats();

}

export function birthOfMonk2(ctx) { // Wanna see a fucking botch
    const gloveSlot = game.equipmentSlots.getObjectByID("melvorD:Gloves")
    gloves.forEach(upgradeset => {
        const item = game.items.getObjectByID(upgradeset.item);
        if (item == undefined) return;
        item.occupiesSlots.push(gloveSlot);
        item.attackType = upgradeset.attackType;
    })
    ctx.patch(EquipmentItem, 'fitsInSlot').after(function (ret, slotID) {
        if (!ret && slotID == "melvorD:Weapon" && gloves.some(glove => glove.item == this.id))
            return true;
        //else return normally
    })
    // have to change the behaviour when an item occupies the same slot it's being equipped to, sorry
    ctx.patch(Equipment, "equipItem").replace(function (_, itemToEquip, slot, quantity) {
        const slotsToUnequip = this.getSlotsToUnequip(itemToEquip, slot);
        // Set the slots to unequip to empty
        slotsToUnequip.forEach((unequipType) => {
            this.unequipItem(unequipType);
        });
        this.itemSlotMap.set(itemToEquip, slot);
        if (itemToEquip.consumesChargesOn !== undefined)
            this.itemChargeUsers.add(this.equippedItems[slot.id]);
        // Set the new slots to be occupied
        this.equippedItems[slot.id].setEquipped(itemToEquip, quantity, itemToEquip.occupiesSlots);
        itemToEquip.occupiesSlots.forEach((occupied) => { if (occupied !== slot) this.equippedItems[occupied.id].setOccupied(itemToEquip, slot) });

    })
    /* ctx.patch(EquipmentItem, 'occupiesSlot').after(function (ret, slotID) {
         if (!ret && slotID == "melvorD:Gloves" && gloves.some(glove => glove.item == this.id))
             return true;
     });*/
}