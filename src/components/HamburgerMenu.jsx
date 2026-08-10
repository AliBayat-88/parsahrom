
export const HamburgerMenu = ({ isOpen, setIsOpen }) => {
    return (
        <label className="cursor-pointer inline-block select-none sm:hidden">
            <input
                type="checkbox"
                checked={isOpen}
                onChange={(e) => setIsOpen(e.target.checked)}
                className="hidden group "
            />
            <svg
                viewBox="0 0 32 32"
                className={`h-10 text-primary dark:text-darkPrimary transition-transform duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    isOpen ? "-rotate-45" : ""
                }`}
            >
                <path
                    d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                    className={`fill-none stroke-primary dark:stroke-darkPrimary stroke-[3] [stroke-linecap:round] [stroke-linejoin:round] transition-[stroke-dasharray,stroke-dashoffset] duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                        isOpen
                            ? "[stroke-dasharray:20_300] [stroke-dashoffset:-32.42px]"
                            : "[stroke-dasharray:12_63]"
                    }`}
                />
                <path
                    d="M7 16 27 16"
                    className="fill-none stroke-primary dark:stroke-darkPrimary stroke-[3] [stroke-linecap:round] [stroke-linejoin:round] transition-[stroke-dasharray,stroke-dashoffset] duration-600 ease-[cubic-bezier(0.4,0,0.2,1)]"
                />
            </svg>
        </label>
    );
};