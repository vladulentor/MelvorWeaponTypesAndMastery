const CHANCE_BARRIER = 35;
const BARRIER_MAX_HP = 50;
const BARRIER_MIN_HP = 15;
export function addPlayerBarrier({ patch }) {
    const ourPl = game.combat.player;
    ourPl.hasBarrier = true; // replace this with an arrowfunc to the effect.
    ourPl.maxBarrierPercent = 100;
    ourPl.setBarrier(500);
    patch(Player, "damage").before(function (amount, source) {
        //  if(this.barrier)
    });
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
        return Math.min(damage, target.hitpoints);
    }); // Again, why so many checks for this? Shouldn't summon damage go through this whole thing too? This is sketchy

    //Some botches for the splash manager:
    patch(Player, "damageBarrier").replace(function (orig, amount, source) {
        const am = Math.min(this.barrier, amount);
        const leftover = amount - this.barrier;
        if (am > 0)
         orig(am, "SummonAttack");
        if (leftover > 0) // This is some super simple logic and idk if like, combat is that simple... welp
            this.damage(leftover, source);
    });


    patch(Player, "renderBarrier").replace(function () {
        if (this.statElements.barrierBar.length == 0) initBarrier(this);
        if (this.isBarrierActive) {

            const text = formatNumber(this.barrier);
            this.statElements.barrier.forEach((elem) => (elem.textContent = text));
            const barrierRatio = `${Math.floor((this.barrier / this.stats.maxBarrier) * 100)}%`;
            this.statElements.barrierBar.forEach((elem) => (elem.style.width = barrierRatio));
            this.statElements.barrierContainer.forEach((elem) => elem.classList.remove('invisible'));
            this.statElements.barrierThing.forEach((elem) => elem.classList.remove('d-none'));

        }
        else {
            this.statElements.barrierContainer.forEach((elem) => elem.classList.add('invisible'));
            this.statElements.barrierThing.forEach((elem) => elem.classList.add('d-none'));
        }
        this.renderQueue.barrier = false;
    });
}

function initBarrier(player) {
    // HP bar stuff

    const parent = player.statElements.hitpointsBar[0].parentElement.parentElement.parentElement;
    const barrierCont = parent.children[0]; // apparently it was already here, god fuck why did i waste my time making it
    barrierCont.children[0].classList.add("progress-bar", "progress-height-6")
    barrierCont.children[0].style.width = "100%";
    barrierCont.children[0].style.height = "6px"; //look man the class doesn't work idgaf


    const barrierBar = barrierCont.children[0].children[0];
    barrierBar.classList.remove("progress");
    barrierBar.className = "progress-bar active bg-info progress-height-6";
    barrierBar.style.height = "6px";
    player.statElements.barrierBar = [barrierBar];
    player.statElements.barrierContainer = [barrierCont];



    const barloc = player.statElements.hitpoints[0].parentElement.parentElement.parentElement;

    const barrtext = document.createElement("div");
    barrtext.classList.add("d-none");
    barrtext.innerHTML = `
  <span class="font-w700 align-middle">
    <img class="skill-icon-xs mr-1 ml-2"
         data-src="assets/media/skills/hitpoints/hitpoints.png"
         src="https://cdn2-main.melvor.net/assets/media/skills/combat/barrier.png">

    <span id="barrier-current">428</span>
    <span class="font-size-xs font-w400 d-none">/</span>
    <span class="font-size-xs font-w400 d-none" id="barrier-max">820</span>
  </span>
`;
    const maxBar = barrtext.querySelector("#barrier-max");
    const curbar = barrtext.querySelector("#barrier-current");
    barloc.insertBefore(barrtext, barloc.children[1]);
    player.statElements.barrier = [curbar];
    player.statElements.barrierThing = [barrtext];
    //todo the other bars in the other things
}