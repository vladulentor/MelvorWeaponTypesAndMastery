// this was too hard to make so i made a class
export class PlayerSpellShield {
    constructor(player) {
        this.player = player;
        this.shield = null;
        this.active = false;
        this.everInit = false;
        this.onBarrierActFunc = [];
        this.onBarrierInactFunc = [];
    }
    get barrierPercent() {
        return 100 * this.hp / this.maxHP;
    }
    get runePercent() {
        return 100 * this.runesN / this.runeCost;
    }
    get renderQueue() {
        return this.player.renderQueue.barrer;
    }
    changeShield(shield, unlocked) {
        if (this.shield === shield || (!this.active && !unlocked)) return;
        this.reset();
        if (shield.runeCost && unlocked) {
        
            this.addShield(shield);
        }
    }
    addShield(shield) {
        this.active = true;
        this.shield = shield;
        this.runeCost = shield.runeCost;
        this.hpForm = shield.barrierHP;
        if (shield.onEffects) {
            this.onBarrierActFunc.push(() => { this.addBarrierBonus(shield.onEffects) });
            this.onBarrierInactFunc.push(() => { this.removeBarrierBonus(shield.onEffects) });
        }
        if (shield.breakAttack) {
            this.onBarrierInactFunc.push(() => { this.performAttack(shield.breakAttack) });
        }
    }


    reset() {
        this.shield = null;
        this.shActive = false;
        this.active = false;
        this.runesN = 0;
        this.maxHP = 0;
        this.hpForm = null;
        this.hp = 0;
        this.runeCost = 0;
        this.onBarrierActFunc = [];
        this.onBarrierInactFunc = [];
    }
    addRunes(run) {
        if (this.active)
            this._addRunes(run);
    }
    _addRunes(run) {
        this.runesN = Math.min(this.runesN + run, this.runeCost);
        this.checkRunes();
        this.renderQueue = true;
    }
    checkRunes() {
        if (this.runesN >= this.runeCost) {
            this.addBarrier()
            this.runesN = 0;
        }
    }
    damageBarrier(dam) {
        if (this.active && this.shActive)
            return this._damageBarrier(dam);
        return 0;
    }
    _damageBarrier(dam) {
        const damaged = Math.min(this.hp, dam)
        const oldHP = this.hp
        this.hp = this.hp - dam;
        if (this.hp <= 0) {
            this.removeBarrier();
        }
        this.player._events.emit('barrierChanged', new BarrierChangedEvent(oldHP, this.maxHP, this.hp, this.maxHP));
        this.renderQueue = true;
        return damaged;
    }
    removeBarrier() {
        this.onBarrierInactFunc.forEach(f => f());
        this.shActive = false;
        this.hp = 0;
        this.runesN = 0; // maybe not always true;
    }
    addBarrier() {
        this.addBarrierHP();
        this.onBarrierActFunc.forEach(f => f());
    }
    addBarrierHP() {
        let hpToSet = null;
        switch (this.hpForm.type) {
            case "fixed":
                hpToSet = this.hpForm.value;
                break;
            case "roll":
                hpToSet = Math.floor(Math.random() * (this.hpForm.maxRoll - this.hpForm.minRoll + 1)) + this.hpForm.minRoll;
                break;
            default:
                throw new Error(`Undefined hpBarrier value on offhand: ${this.shield.item}`);
        }
        this.player.setBarrier(hpToSet);
        this.maxHP = hpToSet;
        this.hp = hpToSet;

    }
    addBarrierBonus(func) {

    }
    removeBarrierBonus(func) {
        //code
    }
    performAttack(attack) {
        if (this.player.inCombat)
            this.player.attack(this.player.target, attack);
        //code
    }
    addDmgSplash(dam) {
        this.player.splashManager.add({
            source: "summonAttack",
            amount: -dam,
            xOffset: this.barrierPercent
        })
    }
    renderBarrier() {
        if (!this.player.renderQueue.barrier) return;
        if (this.active) {
            this.player.statElements.barrierContainer.forEach((elem) => elem.classList.remove('invisible'));
            this.player.statElements.barrierThing.forEach((elem) => elem.classList.remove('d-none'));
            this.barrierBar.className = "progress-bar active progress-height-6";

            if (!this.shActive) {
                const text = formatNumber(this.runesN);
                this.player.statElements.barrier.forEach((elem) => (elem.textContent = text));
                const barrierRatio = `${this.runePercent}%`;
                this.player.statElements.barrierBar.forEach((elem) => (elem.style.width = barrierRatio));
                this.player.statElements.barrierImg.forEach((elem) => (elem.src = `https://cdn2-main.melvor.net/assets/media/skills/combat/barrier.png`));

            }
            else {
                const text = formatNumber(this.hp);
                this.player.statElements.barrier.forEach((elem) => (elem.textContent = text));
                const barrierRatio = `${this.barrierPercent}%`;
                this.player.statElements.barrierBar.forEach((elem) => (elem.style.width = barrierRatio));
                this.player.statElements.barrierImg.forEach((elem) => (elem.src = `https://cdn2-main.melvor.net/assets/media/skills/combat/barrier.png`));


            }

        }
        else {
            this.player.statElements.barrierContainer.forEach((elem) => elem.classList.add('invisible'));
            this.player.statElements.barrierThing.forEach((elem) => elem.classList.add('d-none'));
        }
        this.player.renderQueue.barrier = false;

    }

    initBarrier() {
        // HP bar stuff

        const parent = this.player.statElements.hitpointsBar[0].parentElement.parentElement.parentElement;
        const barrierCont = parent.children[0]; // apparently it was already here, god fuck why did i waste my time making it
        barrierCont.children[0].classList.add("progress-bar", "progress-height-6")
        barrierCont.children[0].style.width = "100%";
        barrierCont.children[0].style.height = "6px"; //look man the class doesn't work idgaf


        this.barrierBar = barrierCont.children[0].children[0];
        this.barrierBar.classList.remove("progress");
        this.barrierBar.className = "progress-bar active progress-height-6";
        this.barrierBar.style.height = "6px";
        this.player.statElements.barrierBar = [this.barrierBar];
        this.player.statElements.barrierContainer = [barrierCont];



        const barloc = this.player.statElements.hitpoints[0].parentElement.parentElement.parentElement;

        const barrtext = document.createElement("div");
        barrtext.classList.add("d-none");
        barrtext.innerHTML = `
  <span class="font-w700 align-middle">
    <img id="bar-img" class="skill-icon-xs mr-1 ml-2"
         data-src="assets/media/skills/hitpoints/hitpoints.png"
         src="https://cdn2-main.melvor.net/assets/media/skills/combat/barrier.png">

    <span id="barrier-current">428</span>
    <span class="font-size-xs font-w400 d-none">/</span>
    <span class="font-size-xs font-w400 d-none" id="barrier-max">820</span>
  </span>
`;
        const maxBar = barrtext.querySelector("#barrier-max");
        const curbar = barrtext.querySelector("#barrier-current");
        const barImg = barrtext.querySelector("#bar-img");

        barloc.insertBefore(barrtext, barloc.children[1]);
        this.player.statElements.barrier = [curbar];
        this.player.statElements.barrierMax = [maxBar];
        this.player.statElements.barrierImg = [barImg];
        this.player.statElements.barrierThing = [barrtext];
        //todo the other bars in the other things
        this.barrierInit = true;
    }
}
export function addPlayerBarrier({ patch }) {
    const ourPl = game.combat.player;
    ourPl.spellShield = new PlayerSpellShield(ourPl);

    Object.defineProperty(ourPl, 'barrier', {
        get: function () {
            return this.spellShield.hp
        },
        set: function (value) {
            this.spellShield.hp = value;
            this.renderQueue.barrier = true;

        },
        configurable: true
    });
    Object.defineProperty(ourPl, 'hasBarrier', {
        get: function () { return this.spellShield.shActive; }
    });
    ourPl.maxBarrierPercent = 100;


    patch(Player, "damage").before(function (amount, source) {

    });
    patch(Player, "renderEquipment").after(function (_) {
        if(!this.spellShield.barrierInit)this.spellShield.initBarrier();
    })
    patch(Player, "attack").after(function (_, target, attack) {
        if (this.game.modifiers.getValue("WTM:addSpellBarrier", ModifierQuery.EMPTY)) {
            if (this.canAurora && this.spellSelection.aurora !== undefined) {
                let offtypeCost = 0.5;
                const shToAdd = Math.floor(this.spellSelection.aurora.runesRequired.forEach(a => this.shieldCharge += a.quantity * offtypeCost));
                this.spellShield.addRunes(shToAdd);
            }
        }
    })

    patch(Player, "canDamageBarrier").replace(function (_, source) {
        return true;
    })

    patch(Enemy, "modifyAttackDamage").replace(function (_, target, attack, damage, applyReduction = true) {

        if (this.modifiers.disableAttackDamage > 0)
            return 0; //No damage if there is a barrier or modifier.
        // Apply Damage Modifiers
        damage = this.applyDamageModifiers(target, damage);
        if (attack.isDragonbreath)
            damage *= 1 + target.modifiers.dragonBreathDamage / 100;
        // Apply Target Damage Reduction
        damage *= 1 - target.stats.getResistance(this.damageType) / 100;
        return Math.floor(damage);

    }); // have to do this to make enemies hit into barriers
    patch(Enemy, "clampDamageValue").replace(function (_, damage, target) {
        return Math.min(damage, target.hitpoints + target.barrier);
    }); // Again, why so many checks for this? Shouldn't summon damage go through this whole thing too? This is sketchy

    //Some botches for the splash manager:
    patch(Player, "damageBarrier").replace(function (orig, amount, source) {
        const damg = this.spellShield.damageBarrier(amount);
        const leftover = amount - damg;
        if (leftover <= 0)
            this.spellShield.addDmgSplash(amount);
        else  // This is some super simple logic and idk if like, combat is that simple... welp
            this.damage(leftover, source);
    });


    patch(Player, "renderBarrier").replace(function () {
        this.spellShield.renderBarrier();
    });
}

