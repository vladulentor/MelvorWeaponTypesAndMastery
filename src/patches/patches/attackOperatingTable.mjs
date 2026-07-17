export function attackOperatingTable({ patch }) {

    // I TAKE ABSOLUTELY NO RESPONSIBILITY FOR PATCHING THE ATTACK FUNCTION WITH REPLACE IT'S ALL EDWIN'S DOING HE FORCED IT HE FORCED MY HAND HE GAVE ME NO CHOICE
    patch(Character, "attack").replace(function (_, target, attack) {
        const targetImmune = target.isImmuneTo(this);
        let damage = 0;
        /** Percentage of current hitpoints to take as damage after the attack */
        let selfDamagePercent = 0;
        const attackEventData = {
            attacker: this,
            attack: attack,
            attackType: this.attackType,
            attackCount: this.attackCount,
            firstHit: false,
            isCritical: false,
        };
        const attackedEventData = {
            attack: attack,
            firstHit: false,
        };
        this._events.emit('preAttack', new CharacterAttackEvent('Pre', attackEventData));
        target._events.emit('beingAttacked', new CharacterAttackedEvent('Being', attackedEventData));
        // Apply Prehit Effects
        this.processEffectApplicators(attack.prehitEffects, { type: 'Attack' });
        if (!targetImmune) {
            // Apply Curse if character can do so
            if (this.canCurse && this.spellSelection.curse !== undefined) {
                this.castCurseSpell(this.spellSelection.curse);
            }
        }
        // Determine if attack hits
        const attackHit = !targetImmune && this.rollToHit(target, attack);
        if (attackHit) {
            // Calculate Damage
            // TODO_C - Confirm what modifiers work for what damage types
            damage = this.reduceDamage(attack.damage);
            damage += this.getFlatAttackDamageBonus(target);
            // Apply Critical Hit
            const crit = rollPercentage(this.modifiers.getCritChance(this.attackType));
            if (crit) {
                attackEventData.isCritical = true; /// CHANGE #1, WE ADD NEW CRIT MULT MODIFIERS
                const multiplier = 150 + this.modifiers.critMultiplier 
                + (this.modifiers.getValue("WTM:critMult25Stealth", ModifierQuery.EMPTY) * Math.floor((this.modifiers.thievingStealth/25) || 0)) 
                + (this.modifiers.getValue("WTM:critMult1000Acc", ModifierQuery.EMPTY) * Math.floor(this.stats._accuracy / 1000));
                damage *= multiplier / 100;
            }
            /// CHANGE #2, WE KEPT LAST ATTACK CRIT STATE INTO THE ATTACK (to smuggle it into functions and do more on-crit effects)
            attack.hasJustCrit = crit;
            const rawDamage = (attackEventData.rawDamage = attackedEventData.rawDamage = damage);
            attackEventData.firstHit = attackedEventData.firstHit = this.firstHit;
            const applyReduction = rollPercentage(this.modifiers.getValue("melvorD:ignoreResistanceWhenAttackingChance" /* ModifierIDs.ignoreResistanceWhenAttackingChance */, this.damageType.modQuery));
            damage = this.modifyAttackDamage(target, attack, damage, applyReduction);
            const flatLifesteal = this.getFlatLifestealBonus(target);
            // Apply Target Healing Effects. Applied before damage to prevent this blocking death
            let targetHealing = 0;
            targetHealing += (this.target.stats.maxHitpoints * this.target.modifiers.healingWhenHit) / 100;
            if (targetHealing > 0)
                this.target.heal(targetHealing);
            // Cap Damage at target hitpoints
            damage = this.clampDamageValue(damage, target);
            attackEventData.damage = attackedEventData.damage = damage;
            // Damage Target
            target.damage(damage, crit ? 'Crit' : 'Attack');
            // Heal from Lifesteal
            this.lifesteal(attack, damage, flatLifesteal);
            if (this.firstHit) {
                // Perform Reflect Damage
                let reflectDamage = (damage * target.modifiers.getReflectPercent()) / 100;
                reflectDamage += numberMultiplier * target.modifiers.getFlatReflectDamage();
                reflectDamage += rollInteger(0, numberMultiplier * target.modifiers.getRolledReflectDamage());
                reflectDamage += (rawDamage * target.modifiers.rawReflectDamage) / 100;
                reflectDamage = target.applyDamageModifiers(this, reflectDamage);
                reflectDamage *= 1 - target.stats.getResistance(this.damageType) / 100;
                reflectDamage = Math.floor(reflectDamage);
                reflectDamage = Math.min(reflectDamage, this.hitpoints - 1); // Cap at current hp - 1, to prevent death by reflect
                if (reflectDamage > 0)
                    this.damage(reflectDamage, 'Attack');
                // Perform Percent HP Damage
                const percentDamageCap = 1000 * numberMultiplier;
                let percentHPDamage = 0;
                percentHPDamage += Math.min(percentDamageCap, Math.floor((this.hitpoints * this.modifiers.currentHPDamageTakenOnAttack) / 100));
                percentHPDamage += Math.min(percentDamageCap, Math.floor((this.stats.maxHitpoints * this.modifiers.maxHPDamageTakenOnAttack) / 100));
                percentHPDamage *= 1 - this.stats.getResistance(this.damageType) / 100;
                percentHPDamage = Math.floor(percentHPDamage);
                percentHPDamage = Math.min(percentHPDamage, this.hitpoints);
                if (percentHPDamage > 0)
                    this.damage(percentHPDamage, 'Attack');
                // Perform flat barrier damage
                let dmgToBarrier = numberMultiplier * this.modifiers.flatBarrierDamage;
                dmgToBarrier = Math.min(dmgToBarrier, target.barrier);
                this.target.damageBarrier(dmgToBarrier, 'SummonAttack'); // Using SummonAttack here for the splash colour
            }
            // Perform Self HP Damage
            let selfHPDamageOnHit = 0;
            selfHPDamageOnHit += Math.floor(this.hitpoints * (this.modifiers.selfDamageOnHitBasedOnCurrentHitpoints / 100));
            selfHPDamageOnHit *= 1 - this.stats.getResistance(this.damageType) / 100;
            selfHPDamageOnHit = Math.floor(selfHPDamageOnHit);
            selfHPDamageOnHit = Math.min(selfHPDamageOnHit, this.hitpoints);
            if (selfHPDamageOnHit > 0)
                this.damage(selfHPDamageOnHit, 'Attack');
            // Add Buffered Regen
            target.bufferedRegen += Math.floor((damage * target.modifiers.regenPerDamageTaken) / 100);
            // Apply On Hit Effects
            this.processEffectApplicators(attack.onhitEffects, { type: 'Attack', damageDealt: attackEventData.rawDamage });
            this._events.emit('hitWithAttack', new CharacterAttackEvent('Hit', attackEventData));
            target._events.emit('hitByAttack', new CharacterAttackedEvent('Hit', attackedEventData));
            this.onHit();
            target.onBeingHit();
            this.firstHit = false;
        }
        else {
            this._events.emit('missedWithAttack', new CharacterAttackEvent('Miss', attackEventData));
            target._events.emit('evadedAttack', new CharacterAttackedEvent('Evaded', attackedEventData));
            target.fireMissSplash(targetImmune);
            this.onMiss();
            if (this.firstMiss)
                selfDamagePercent += this.modifiers.damageTakenPerMissedAttack;
            this.firstMiss = false;
        }
        if (this.attackCount === 0) {
            selfDamagePercent += this.modifiers.damageTakenPerAttack;
        }
        if (selfDamagePercent > 0) {
            const damageTaken = Math.floor((this.hitpoints * selfDamagePercent) / 100);
            if (damageTaken > 0)
                this.damage(damageTaken, 'Attack');
        }
        target.postAttack();
        this.attackCount++;
        if (attack.consumesEffect !== undefined) {
            let maxAttacks = attack.attackCount;
            const existingEffect = target.activeEffects.get(attack.consumesEffect.effect);
            if (existingEffect !== undefined) {
                maxAttacks += existingEffect.getParameter(attack.consumesEffect.paramName);
            }
            this.isAttacking = this.attackCount < maxAttacks;
            if (!this.isAttacking && existingEffect !== undefined) {
                target.removeCombatEffect(attack.consumesEffect.effect);
            }
        }
        else {
            this.isAttacking = this.attackCount < attack.attackCount;
        }
        const event = new CharacterAttackEvent('Post', attackEventData);
        event.interval = this.timers.act.maxTicks * TICK_INTERVAL;
        this._events.emit('attack', event);
        target._events.emit('wasAttacked', new CharacterAttackedEvent('Was', attackedEventData));
        if (this.attackInterrupted)
            this.isAttacking = false; // Stop multi-hit attacks if the character was interrupted
        return damage;
    })


}

