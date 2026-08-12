    import {Logo} from "./Logo.jsx";
    import {MenuList} from "./MenuList.jsx";
    import {ToggleMode} from "./ToggleMode.jsx";
    import {HamburgerMenu} from "./HamburgerMenu.jsx";
    import {useState} from "react";
    import {MobileMenu} from "./MobileMenu.jsx";
    import {MENU_ITEMS} from "../constants/Header.jsx";

    export const Header = () => {
        const [isHambergarOpen, setIsHambergarOpen] = useState(false);

        return (
            <header className="flex justify-between items-center py-4 pb-2.5 relative border-b border-slate-300/70 dark:border-slate-800/60">
                <HamburgerMenu isOpen={isHambergarOpen} setIsOpen={setIsHambergarOpen} />
                <MobileMenu isOpen={isHambergarOpen} setIsOpen={setIsHambergarOpen} menuItems={MENU_ITEMS} />

                <Logo />
                <MenuList MENU_ITEMS={MENU_ITEMS} />
                <ToggleMode />
            </header>
        );
    };