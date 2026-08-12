import {Chevron} from "./Chevron.jsx";

export const MobileMenu = ({ isOpen, menuItems }) => {
    return (
        <div className={`absolute top-[100%] right-0 left-0 w-full z-40 bg-white/95 border-2 dark:bg-slate-800 dark:border-slate-700 rounded-md backdrop-blur-md shadow-lg border-b border-slate-200/80 dark:border-slate-800/80 sm:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen ? "max-h-[400px] opacity-100 py-4" : "max-h-0 opacity-0 py-0"
        }`}>
                <ul className="font-irancell_semibold flex  flex-col gap-y-1 px-3">
                    {menuItems.map((item) => (
                        <li className="flex justify-between dark:child:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-md items-center" key={item.id}>
                            <a
                                href="#"
                                className="flex items-center gap-x-3 px-4 py-3 rounded-lg text-primary dark:text-darkPrimary  transition-colors group"
                            >
                                <div className="h-[24px] w-[24px] flex items-center justify-center">
                                    {item.icon}
                                </div>
                                <span className="text-base">{item.title}</span>
                            </a>
                            <div>
                                <Chevron/>
                            </div>
                        </li>
                    ))}
                </ul>
        </div>
    );
};