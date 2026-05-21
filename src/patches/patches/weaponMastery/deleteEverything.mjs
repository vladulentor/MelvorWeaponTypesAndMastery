const { loadModule } = mod.getContext(import.meta);

const { templateRielkLangStringWithNodes, templateRielkLangString, getRielkLangString } = await loadModule('src/language/translationManager.mjs');

export function deleteEverything(ctx, callback) {
    Swal.fire({
        title: getRielkLangString("MENU_WARNING"),
        html: `
        <div id="swal-content">
        
            <p class="font-w600 font-size-md text-combat-smoke"style="margin-bottom:0rem">${getRielkLangString('MENU_WARNING1')}</p>
                  <p class="font-w300 font-size-sm text-combat-smoke " style="margin-bottom:0.5rem">${getRielkLangString('MENU_WARNING15')}</p>
   <p class="font-w900 font-size-md text-combat-smoke text-danger" style="margin-bottom:0rem">${getRielkLangString('MENU_WARNING2')}</p>
      <p class="font-w300 font-size-sm text-combat-smoke " style="margin-bottom:0.5rem">${getRielkLangString('MENU_WARNING3')}</p>

        </div>
    `,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#e56767',
        confirmButtonText: getRielkLangString('MENU_POPUP_DELETEFINAL'),
        cancelButtonText: getRielkLangString('MENU_POPUP_BACK'),
        customClass: {
            container: 'swal-reverse-buttons'
        }
    }).then((secondResult) => {
        if (secondResult.isConfirmed) {
            ctx.characterStorage.setItem('popupSeen', true);
            deleteThatShit();
        } else {
            if (callback)
                callback(ctx, 0); //BRING THAT FUCKER BACK
        }
    });
}

function deleteThatShit() {
    // the fun part
    for (const type of game.weaponMasteries.allObjects)
        for (const wp of type.allWeapons) {
            const st = game.stats.Items.statsMap.get(wp)
            if (st) {
                st.remove(ItemStats.EnemiesKilled)
                st.remove(ItemStats.TotalAttacks)

            }
        }
    saveData();
    window.location.reload();

} 