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

            this.applyCombatEffect(ourEffect, this, { type: "Attack" }, undefined)
            target.applyCombatEffect(theirEffect, this, { type: "Attack" }, undefined)
        }
    });
}

function genfunniAttack(remType){
ourEfe
}