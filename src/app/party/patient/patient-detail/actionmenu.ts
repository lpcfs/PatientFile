import { menu } from "../../../services/menu.model";

export const ACTIONMENU: menu[] =
[
    { icon: "star", name: "Nieuwe puppy", action: "NEW_PUPPY", description: "Nieuwe puppy maken", link: null }
]

export const SHORTCUTMENU: menu[] =
[
    { icon: "menu", name: "Overzicht", action: null, description: "Overzicht van puppies", link: "patienten/overzicht" }
]
