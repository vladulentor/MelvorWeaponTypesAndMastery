export function patchSkillNotif({ patch }) {
    patch(NotificationsManager, "createSkillXPNotification").replace(function (_, skill, quantity) {
        const notification = this.genericNotificationData;
        notification.media = skill.media;
        if (quantity < 1 && quantity > 0)
            notification.quantity = Number.parseFloat(quantity.toFixed(2));
        else
            notification.quantity = Math.floor(quantity);
        notification.text = skill.weap ? skill.name + ' ' + getLangString('MENU_TEXT_XP_HEADER') :
        isOnMobileLayout 
            ? getLangString('MENU_TEXT_XP_HEADER')
            : templateLangString('SKILL_NAME_SKILL_XP_NO_QTY', { skillName: skill.name });
        notification.isImportant = false;
        notification.isError = false;
        const skillNotification = this.newSkillXPNotification(skill);
        if (skillNotification !== undefined)
            this.addNotification(skillNotification, notification);

    })

}
