import {Link} from "react-router";


export const MenuList = ({MENU_ITEMS}) => {
    return (
        <ul className="font-irancell_semibold sm:flex text-primary dark:text-darkPrimary hidden items-center gap-x-1.5">
            {MENU_ITEMS.map((item) => (
                <li key={item.id}>
                    <Link
                        to={item.href}
                        className="flex dark:hover:text-white hover:text-slate-700 items-center gap-x-2 px-3 py-1.5 rounded-md cursor-pointer transition-all duration-200 border border-transparent hover:border-black/20 dark:hover:border-white/30 hover:border-b-transparent dark:hover:border-b-transparent hover:bg-black/5 dark:hover:bg-[#182133] group"
                    >
                        <div className="h-[24px] flex items-center justify-center">
                            {item.icon}
                        </div>
                        <span>{item.title}</span>
                    </Link>
                </li>
            ))}
        </ul>
    );
};