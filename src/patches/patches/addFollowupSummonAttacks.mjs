export function addFollowupSummonAttacks({ patch }) { //hey you didnt capitalize up you idiot
    patch(Player, "attack").after(function (dam, target, attack) {
        if (attack && attack.summonFollowAttacks > 0) {
            const player = this;
            
            setTimeout(() => {
                let count = attack.summonFollowAttacks;
                
                while (count > 0) {
                    player.summonAttack();
                    count--;
                }
            }, 150); 
        }
    });
}