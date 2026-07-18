const typeMap = { "ranged": "rangedDefenceBonus", "melee": "meleeDefenceBonus", "magic": "magicDefenceBonus" }; // annoying names for this stuff


const { loadModule } = mod.getContext(import.meta);

const { getRielkLangString } = await loadModule('src/language/translationManager.mjs');


function extractChances(player, target) {
    return [player.modifiers.getValue("WTM:unlockParry", target.damageType.modQuery) ?
        player.equipmentStats[typeMap[target.attackType]] :
        0, target.monster ? target.monster.combatLevel : 0]
}
function determineParry(player, target) {
    const [pDef, tL] = extractChances(player, target);
    return pDef > 0 ? rollPercentage(((pDef * 2) / (pDef * 2 + tL)) * 100) : false;
}
function calculateChanceOfParryPerAttempt(player, target) {
    const [pDef, tL] = extractChances(player, target);
    if (pDef <= 0) return 0;
    return Math.max(0, (pDef * 2) / (pDef * 2 + tL) * 100); // please god let there be no combat level 0 enemies please god let there be no combat level 0 enemies please god please
}


export function addParry({ patch }) { // unfortunately we have to put logic in the ui function for missing.
    SplashManager.splashClasses.deflect = 'deflectSplash';
    const orig_fireMissSplash = Player.prototype.fireMissSplash;

    Player.prototype.fireMissSplash = function (targetImmune) {
        if (targetImmune) {
            return orig_fireMissSplash.call(this, targetImmune);
        }

        this.justDodged = determineParry(this, this.target);

        if (this.justDodged) {
            const text = getRielkLangString("WTM_PARRY");
            this.splashManager.add({
                source: "deflect",
                amount: 0,
                text,
                xOffset: this.hitpointsPercent,
            });
            this.renderQueue.damageSplash = true;
            // THIS IS THE HIT BACK NUMBER
            this.target.damage(this.stats.minHit, "Attack");


            // We don't call orig here because we handled the splash
        } else {

            // Fall back to the original function for a normal miss
            orig_fireMissSplash.call(this, targetImmune);
        }
    };
    patch(PlayerStatsElement, "setStats").after(function (_, player, game) {
        this.critMultiplier.textContent = formatPercent(150 + player.modifiers.critMultiplier 
                + (player.modifiers.getValue("WTM:critMult25Stealth", ModifierQuery.EMPTY) * Math.floor((player.modifiers.thievingStealth /25) || 0)) 
                + (player.modifiers.getValue("WTM:critMult10000Acc", ModifierQuery.EMPTY) * Math.floor(player.stats._accuracy / 10000)));

        if (!this.parryD) {
            this.parryD = createElement('div', {});
            this.parryD.innerHTML = `
    <span>${getRielkLangString("WTM_PARRY_CHANCE")}</span>
    <span>
        <span id="parry-chance-display">0%</span>
    </span>`;
            this.accuracyRating.parentElement.after(this.parryD);
            this.parryChance = this.parryD.querySelector('#parry-chance-display');
        }
        if (player.target && player.target !== player) {
            this.parryChance.textContent = formatPercent(calculateChanceOfParryPerAttempt(player, player.target), 0);
        }
        else
            this.parryChance.textContent = "-"


        if (!this.stealthElem) {
            this.stealthElem = createElement('div', {});
            this.stealthElem.innerHTML = `
    <span>${getLangString("STEALTH")}</span>
    <span>
        <span id="stealth-chance-display">0</span>
    </span>`;
            this.accuracyRating.parentElement.after(this.stealthElem);
            this.stealthChance = this.stealthElem.querySelector('#stealth-chance-display');

            this.stealthChance.textContent = player.modifiers.thievingStealth;

        } else
            this.stealthChance.textContent = player.modifiers.thievingStealth;

        this.stealthElem.classList.toggle("d-none", !game.modifiers.getValue("WTM:critChance25Stealth", ModifierQuery.ANY_DAMAGETYPE));
        this.parryD.classList.toggle("d-none", !game.modifiers.getValue("WTM:unlockParry", ModifierQuery.ANY_DAMAGETYPE));

    });
    //TO DO, add parry chance in thing
    /*
    patch(Player, "damage").replace(function(orig, amount, source, thieving){
        if(thieving) orig(amount, source, thieving); // threshold doesn't work in thieving
        const iSt = typeMap[this.target.attackType];
        const dt = this.modifiers.getValue("rielkConstruction:damagethreshold", this.target.damageType.modQuery)
        if(dt && dt * this.equipmentStats[iSt] >= amount){

            //Code for deflecting and stuff
        }
        else orig(amount, source, thieving);
    })*/
}