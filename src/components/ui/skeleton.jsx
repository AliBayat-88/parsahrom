import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }) {
    return (
        <div
            data-slot="skeleton"
            className={cn("bg-slate-200/80 dark:bg-slate-800/80 animate-pulse rounded-xl", className)}
            {...props}
        />
    );
}

export { Skeleton };
