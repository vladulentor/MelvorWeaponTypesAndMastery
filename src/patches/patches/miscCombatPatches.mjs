Player.prototype.unavoidableSummonAttack = function () {
    const event = new PlayerSummonAttackEvent();
    const targetImmune = this.target.isImmuneTo(this) || this.stats.summoningMaxHit === 0;
    if (this.manager.areaRequirementsMet
        &&
        !targetImmune) {
        const isBarrier = this.target.isBarrierActive;
        let damage = rollInteger(1, this.stats.summoningMaxHit);
        damage = this.modifySummonAttackDamage(damage, isBarrier);
        damage = this.clampSummonAttackDamage(damage, this.target);
        this.target.damage(damage, 'SummonAttack');
        const lifesteal = Math.floor((this.modifiers.summoningAttackLifesteal / 100) * damage);
        if (lifesteal > 0)
            this.heal(lifesteal);
        if (damage > 0)
            this.rewardForSummonDamage(damage, isBarrier);
        event.damage = damage;
    }
    else {
        this.target.fireMissSplash(targetImmune);
        event.missed = true;
    }
    event.interval = this.timers.summon.maxTicks * TICK_INTERVAL;
    this._events.emit('summonAttack', event);
    this.startSummonAttack();

}

const buffList = game.combatEffects.allObjects.filter(buff => buff.effectGroups.some(group => group == game.combatEffectGroups.getObjectByID("melvorD:Buff")));
export function miscCombatPatches({ patch }) {
    patch(Player, 'getSlotAttacks').replace(function (_, slot) { // HYPER grimy patch just to get this fucking mod out the door
        if (slot.item.SpecWeaponStats && slot.slot._localID == "Gloves")
            return []
        return slot.item.specialAttacks;
    })

    patch(PlayerModifierTable, 'getAmmoPreservationChance').replace(function () {
        let chance = this.bypassAmmoPreservationChance;
        chance += this.ammoPreservationChance;
        let maxPreserve = 80 + game.modifiers.getValue("WTM:ammoPreservationCap", ModifierQuery.EMPTY)
        return clampValue(chance, 0, maxPreserve);
    })
    patch(PlayerModifierTable, 'getCritChance').after(function (ret, type) {
        let r2 = ret;
        let mod1 = this.getValue("WTM:critChance10000Acc", ModifierQuery.EMPTY);
        let mod2 = this.getValue("WTM:critChance25Stealth", ModifierQuery.EMPTY);
        if (mod1)
            r2 += mod1 * Math.floor(game.combat.player.stats._accuracy / 10000);
        if (mod2)
            r2 += mod2 * Math.floor(this.thievingStealth / 25)
        return r2
    });

    patch(Character, "modifyAttackDamage").replace(function (_, target, attack, damage, applyReduction = true) {
        if (target.isBarrierActive || this.modifiers.disableAttackDamage > 0)
            return 0; //No damage if there is a barrier or modifier.
        // Apply Damage Modifiers
        damage = this.applyDamageModifiers(target, damage);
        if (attack.isDragonbreath)
            damage *= 1 + target.modifiers.dragonBreathDamage / 100;
        const redred = this.modifiers.getValue("WTM:critDRPierce", ModifierQuery.EMPTY) || 0 * attack.hasJustCrit;
        // Apply Target Damage Reduction
        damage *= 1 - Math.max(0, (target.stats.getResistance(this.damageType) - redred) / 100);
        return Math.floor(damage);

    });


    patch(Player, "attack").after(function (dam, target, attack) {
        if (rollPercentage(this.game.modifiers.getValue("WTM:blessingChance", ModifierQuery.EMPTY))) {
            for (let w = 0; w < 3; w++)
                this.applyCombatEffect(changeEffectPotency(buffList[Math.floor(Math.random() * buffList.length)], 3), this, { type: "Attack", WTMSpecial: true }, undefined);

        }
    });

    patch(Player, "attack").after(function (dam, target, attack) {

        let count = attack.summonFollowAttacks || 0 + this.game.modifiers.getValue("WTM:ExtraSummonHits", ModifierQuery.EMPTY);
        if (count) {
            const player = this;
            setTimeout(() => {

                while (count > 0 && player.stats.canSummonAttack) {
                    player.unavoidableSummonAttack();
                    count--;
                }
            }, 150);
        }

        if (attack.id == "WTM:PandorasSpark") {
            const funnyNum1 = Math.floor(Math.random() * game.combatEffects.allObjects.length);
            const funnyNum2 = Math.floor(Math.random() * game.combatEffects.allObjects.length)
            const ourEffect = game.combatEffects.allObjects[funnyNum1];
            const theirEffect = game.combatEffects.allObjects[funnyNum2];
            const potenc = this.game.modifiers.getValue("WTM:ExtraPotencyEffects", ModifierQuery.EMPTY)
            changeEffectPotency(ourEffect, potenc);
            changeEffectPotency(theirEffect, potenc);
            this.applyCombatEffect(ourEffect, this, { type: "Attack", WTMSpecial: true }, undefined)
            target.applyCombatEffect(theirEffect, this, { type: "Attack", WTMSpecial: true }, undefined)
        }
    });
    patch(Character, "removeCombatEffect").before(function (effect) {
        const activeEffect = this.activeEffects.get(effect);

        if (activeEffect?.WTMmutated) { //Edwin crashed here so more defensive coding 
            changeEffectPotency(activeEffect, false)
            activeEffect.WTMmutated = undefined;
        }
    });
    patch(Player, "onMagicAttackFailure").after(function (o) {
        this.attackInterrupted = true;
    });
    patch(Monster, "corruptedMedia").get(function (originalFn) {
        const abysMan = this.namespace === 'melvorItA';
        if (!abysMan) {
            return this.media;
        }
        return originalFn();
    });
    patch(EffectRenderer, "addEffectIcon").after(function (_, activeEffect, turnText, tooltipContent, media) {
        if (activeEffect.source.WTMSpecial) {
            this.icons.get(activeEffect).number.classList.add("construction-victory");
        }
    });

}
const nmbrKeys = ['maxPercent', 'minPercent', 'maxValue', 'minValue'];

function changeEffectPotency(effect, potC) {
    if (effect.damageGroups) {
        Object.values(effect.damageGroups).forEach(group => {
            for (const dam of group.damage) {
                for (const a of nmbrKeys) {
                    if (dam[a] !== undefined) {
                        if (!potC && dam._origValues && dam._origValues[a] !== undefined) {
                            dam[a] = dam._origValues[a];
                        }
                        else if (potC) {
                            if (!dam._origValues) dam._origValues = {};
                            dam._origValues[a] = dam[a];
                            dam[a] = dam[a] * potC;
                        }
                    }
                }
                if (!potC)
                    delete dam._origValues;
            }
        })
    }
    if (effect.statGroups) {
        Object.values(effect.statGroups).forEach(group => {
            for (const mod of group?.modifiers || []) {
                if (mod.origV && !potC) { mod.value = mod.origV; mod.origV = null; }
                else {
                    mod.origV = mod.value;
                    mod.value = mod.value * potC
                }
            }
            for (const combt of group?.combatEffects || []) { changeEffectPotency(combt.effect, potC) }


        })
    }
    effect.WTMmutated = true;
}