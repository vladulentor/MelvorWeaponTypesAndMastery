export function patchAccuracyRating({patch}){

    patch(Character, "modifyAccuracy").after(function(modified, acc){
        const exac = this.game.modifiers.getValue('WTM:accuracyRatingPer1000Evasion', ModifierQuery.EMPTY)
        if(exac)
        {const totalevmod = Math.floor(exac * Object.values(this.stats.evasion).reduce((sum, val) => sum + val, 0) / 1000) / 100; // 0.01 per 1000, so 100000
           return modified * (1+totalevmod)
        }
    });
}