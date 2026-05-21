const { loadModule } = mod.getContext(import.meta);

const { templateRielkLangStringWithNodes, templateRielkLangString, getRielkLangString } = await loadModule('src/language/translationManager.mjs');
const { deleteEverything } = await loadModule('src/patches/patches/weaponMastery/deleteEverything.mjs');


export function firstTimePopup(ctx, noTime = 1) {
    Swal.fire({
        title: getRielkLangString('MENU_OVERTITLE'),
        html: `
        <div id="swal-content">
                    <p class="font-w800 construction-victory font-size-md text-combat-smoke"style="margin-bottom:1.3rem">${getRielkLangString('MENU_TOOLTIP_INTRO0')}</p>
            <p class="font-w600 font-size-sm text-combat-smoke"style="margin-bottom:0.1rem">${getRielkLangString('MENU_TOOLTIP_INTRO1')}</p>
   <p class="font-w600 font-size-sm text-combat-smoke" style="margin-bottom:0rem">${getRielkLangString('MENU_TOOLTIP_INTRO2')}</p>
   <p class="font-w300 font-size-xs text-combat-smoke"style="margin-bottom:0.5">${getRielkLangString('MENU_TOOLTIP_INTRO3')}</p>
        </div>
    `,
        imageUrl: ctx.getResourceUrl('assets/banner.png'),
        imageWidth: 128,
        imageHeight: 128,
        imageAlt: getRielkLangString('MENU_OVERTITLE'),
        showConfirmButton: false,
        showCancelButton: false,
        showDenyButton: false,
        allowOutsideClick: false,
        customClass: {
            container: 'swal-fuck-you'
        },
        didOpen: () => {
            const container = Swal.getHtmlContainer().querySelector('#swal-content');
            if (noTime) {
                const countdownFUCK = document.createElement('div');
                countdownFUCK.id = 'countdown';
                countdownFUCK.style.fontWeight = 'bold';
                countdownFUCK.style.margin = '10px 0';
                countdownFUCK.textContent = '5';
                container.appendChild(countdownFUCK);

                let timeLeft = 5;
                const timer = setInterval(() => {
                    timeLeft--;
                    if (timeLeft > 0) {
                        countdownFUCK.textContent = timeLeft;
                    } else {
                        clearInterval(timer); // I hate this shit
                        countdownFUCK.remove();
                        Swal.update({
                            showConfirmButton: true,
                            showDenyButton: true,
                            confirmButtonText: getRielkLangString('MENU_POPUP_AGREE'),
                            confirmButtonColor: '#30c78d',
                            denyButtonText: getRielkLangString('MENU_POPUP_GODELETE'),
                            denyButtonColor: '#e5ae67'
                        });
                    }
                }, 1000);
            }
            else {
                Swal.update({
                    showConfirmButton: true,
                    showDenyButton: true,
                    confirmButtonText: getRielkLangString('MENU_POPUP_AGREE'),
                    confirmButtonColor: '#30c78d',
                    denyButtonText: getRielkLangString('MENU_POPUP_GODELETE'),
                    denyButtonColor: '#e5ae67'
                });

            }

        }
    }).then((result) => {
        if (result.isDenied) {
            deleteEverything(ctx, firstTimePopup)
        }
    });
}