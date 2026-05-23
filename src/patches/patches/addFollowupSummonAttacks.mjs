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

export function addFollowupSummonAttacks({ patch }) { //hey you didnt capitalize up you idiot
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
        if (attack.id == "WTM:SparkOfMystery") {
            const funnyNum1 = Math.floor(Math.random() * game.combatEffects.allObjects.length);
            const funnyNum2 = Math.floor(Math.random() * game.combatEffects.allObjects.length)
            const ourEffect = game.combatEffects.allObjects[funnyNum1];
            const theirEffect = game.combatEffects.allObjects[funnyNum2];
            changeEffectPotency(ourEffect, this.game.modifiers.getValue("WTM:ExtraPotencyEffects", ModifierQuery.EMPTY));
            changeEffectPotency(theirEffect, this.game.modifiers.getValue("WTM:ExtraPotencyEffects", ModifierQuery.EMPTY));
            this.applyCombatEffect(ourEffect, this, { type: "Attack" }, undefined)
            target.applyCombatEffect(theirEffect, this, { type: "Attack" }, undefined)
        }
    });
    patch(Character, "removeCombatEffect").before(function (effect) {
        const activeEffect = this.activeEffects.get(effect);

        if (activeEffect.WTMmutated) {
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
        return o();
    });
}
const nmbrKeys = ['maxPercent', 'minPercent', 'maxValue', 'minValue'];
function addSecTimer(effect, timer){
    effect.parameters[WTMTurns] = timer;
    effect.behaviours.push(new ModifyParameterBehaviour)
}
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