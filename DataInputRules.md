# Weapon Mastery Data Format

Short write-up on how to input ''Weapon Mastery'' data.
---

## Overview

Weapon Masteries (Weapon Types, but their internal name is Weapon Masteries, it's confusing I know)

A mastery consists of:
- Basic metadata (id, name, media)
- List of Weapons that it is a type for
- 5 progression levels
- Weapon-specific modifiers (`wepModifiers`)

---

## Weapon Type Structure

```json
{
  "id": "example_Type",
  "name": "Example Type",
  "flavorText":"There once was an example",
  "stupidName":"Alternative Example Type name",
  "stupidFlavorText":"Funny Example-related Joke",
  "media": "assets/media/example.png",
  "mediaCol": "assets/media/exampleCol.svg",
  "extraLangStrings":{"en":{"EXAMPLE_TYPE_TITLE":"Example"}, "de":{"EXAMPLE_TYPE_TITLE":"Beispiel"}},
  "mat": ["exampleItemLine"],
  "type": "example",
  "kind": "example",
  "uniq": ["Example_Item1", "Example_Another_Item3"],
  "wepModifiers": {},
  "isPerWepMod":false,
    "specAttack3":"ExampleAttack",
  "levels": [
    {
      "id": "example_mastery1",
      /*level data*/
    },
    {
      "id": "example_mastery2",
      /*level data*/
    },
    {
      "id": "example_mastery3",
      /*level data*/
    },
    {
      "id": "example_mastery4",
      /*level data*/
    },
    {
      "id": "example_mastery5",
      /*level data*/
    }
  ]
}
````

---
 (Also all of them are in Agility's Skill Data, this is for technical reasons)

## Fields

### `id`

* Unique identifier for the mastery

---

### `name`

* Display name of the mastery (Note, we'll be using lang-strings for this later, but now it's just all English)

---

### `stupidName` (optional)

* Alternative display name for 'stupid-mode'. Defaults to `name` if not present.

---

### `flavorText` (optional)

* Introductory text to be shown under the weapon type in the Combat Menu, will default to a missing text message if not present.

---

### `stupidFlavorText` (optional)

* Alternative display flavor text for 'stupid-mode'. Defaults to `flavorText` if not present.

---

### `extraLangStrings` (optional)

* Object. Contains language-code-to-translate-language-strings objects. If present, the appropriate lang-strings will be added to WTM's Translation manager and be used to translate custom lang-strings defined outside the WTM mod.

---


### `mat` (optional)

* Name of crafted series of weapons that belong in this category (e.g. "Scimitars"), requires `kind` field to work.

### `kind` (optional)

* Material list from which the crafted series of weapons is made (e.g. "Bronze", "Iron" etc.), requires the `mat` field to work. Has 3 default values of "melee", "ranged", and "magic". But can accept any array of strings.

### `uniq` (optional)

* List of items that belong to the weapon mastery. Written as an array of strings that are composed of the item's local ID and uniqueness.

---

### `media`

* Image used for the type
* Should be a **black outline icon**

---

### `mediaCol`

* Alternative image used for the type
* Should be a colored icon of the same picture as `media`

---

### `type`

* Type that weapon should be placed under in the Weapon menu. Has 3 accepted values of "melee", "ranged", or "magic".

---

### `specAttack3`

* Namsepaced-id of a special attack that will be added to any level with the `addSpecialAttack` changeFunc.

---

### `wepModifiers`

* A **StatObject**
* Applies to the player based on mastering individual weapons of that type. By default a wepModifier will be applied permanently for every mastered weapon of the type.

---

### `isPerWepMod` (optional)

* Boolean, defautls to false. If true, changes the display and behaviour of the `wepModifiers` StatObject to apply only when a corresponding mastered weapon is equipped..

---

### `levels`

* Array of 5 level structures
* Each level unlocks the defined bonuses when achieved

#### Level Structure

```json
{
  "name":"example_Mastery1",
  "id":"example_Mastery1",
  "uiMods":{},
  "overwriteTypeIcons":[],
  "order": ["m", "c"],
  "tooltips":{
    "1":"EXAMPLE_HTML_STRING"},
  "modifiers": {},
  "enemyModifiers": {},
  "conditionalModifiers": [],
  "changeFunc":"exampleFunc",
  "shiny": true
}
```

#### Supported Properties

* `statObject`
Any modifiers, enemymodifiers, conditionalModifiers are supported.

* `uiMods` (optional)
A `statObject` to be displayed and used for display purposes instead of the base `statObject`, if present becomes the base of truth for all display-related properties.

* `overwriteTypeIcons` (optional)
An array of 1-(representing a per-Type) and 0-(representing a global) modifier type icons. If present will replace the auto-generated type icons. Almost always used along with a `uiMods` property to write conditionalModifiers as normal modifier objects.

* `order` (optional)
An array of strings. If present will overwrite the default modifier ordering. Will look to the first corresponding modifier (in order present on the .json) to display first.

| String    | Modifier |
| -------- | ------ |
| "m"   | modifier    |
| "c" | conditionalModifier  |
| "e" | combatEffect  |
| "y" | enemyModifier  |


* `tooltip` (optional)
An object with indexed strings, if present will performa a string-lookup to the string and append it to a tooltip to the right of the inexed modifier (in the order displayed) 

* `shiny` (optional)

  * Changes the visual style of the level


| State    | Normal | Shiny           |
| -------- | ------ | --------------- |
| Locked   | Red    | Washed-out gold |
| Unlocked | Green  | Blood orange    |

* `changeFunc` (optional)
  * Used to make modifiers that do cool stuff like add attacks, kind of hard to set up. Has to be the name of a function as defined in the `patchRegistry` file. Will execute that function on level Up or load. Creates no text so a fake modifier has to be used to explain the effect. 

---

# Adding weapons to an existing WeaponMastery object.
A weapon Mastery Modification can be used to add new individual weapons, crafted weapon series, or crafted weapon series materials. Included in the 'modifications' field of a .json file.
```json
{
"id":"ExampleNamespace:Example",
"mat": ["Example"],
"kind": ["ExampleMaterial"],
"uniq": ["Example_Item2", "Example_Item0"],
}
```
 (All of them are still in Agility's Skill Data in Modifications)

## Fields

### `id`
* The namespaced id of the weapon modified weapon mastery

### `mat` (optional)

* The added crafted weapon series' names to be added to the modified weapon mastery

### `kind` (optional)

* The added crafted weapon series' materials to be added to the modified weapon mastery

### `uniq` (optional)

* List of items that are to be added to the modified weapon mastery. Written as an array of strings that are composed of the item's local ID and uniqueness.

## P.S. Using WeaponType and Weapon Conditional Modifiers.
Most of a type's level modifiers should be conditionalModifiers scoped to their own weaponType, the weapon conditionalModifier is what the system creates if `isPerWepMod` is active. These conditionalModifiers can be used anywhere a StatObject is accepted.
### Weapon Type
```json
                  "conditionalModifiers": [
                    {
                      "condition": {
                        "type": "WeaponType",
                        "weaponType": "exampleType"
                      },
                      "modifiers": {
                      },
                      "description": "Example_Condition"
                    }
                  ]

```
### Weapon
```json
                  "conditionalModifiers": [
                    {
                      "condition": {
                        "type": "Weapon",
                        "weapon": "exampleWeaponLocalID"
                      },
                      "modifiers": {
                      },
                      "description": "Example_Condition"
                    }
                  ]

```
