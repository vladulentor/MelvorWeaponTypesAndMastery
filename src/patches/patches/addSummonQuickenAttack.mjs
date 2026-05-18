export function addSummonQuickenAttack({ patch }) {
    patch(Player, "summonAttack").before(function () {
        const quick = this.game.modifiers.getValue("WTM:SummonQuickenAct", ModifierQuery.EMPTY);
        if (quick)
            if (this.timers.act && this.timers.act.isActive) {
                const ticksToSkip = quick / TICK_INTERVAL;
                this.timers.act._ticksLeft = Math.max(5, this.timers.act._ticksLeft -ticksToSkip);
                game.combat.player.renderQueue.attackBar = true;
            }
    });
}