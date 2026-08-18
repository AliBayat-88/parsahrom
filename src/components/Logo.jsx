import {Link} from "react-router";

export const Logo = () => {
    return (
        <Link to="/" className="flex gap-x-2 items-center group">
            {/* ابعاد تصویر و لوگو همگام شدند */}
            <img src="/logo/logo.png" alt="پارس اهرم" className="w-8 h-8 sm:w-9 sm:h-9 object-contain" />
            <h1 className="font-moshreq_bold dark:text-white text-slate-900 text-xl sm:text-2xl leading-none">
                پارس‌اهرم
            </h1>
        </Link>
    );
};