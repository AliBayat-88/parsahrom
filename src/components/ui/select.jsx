import * as React from "react";
import { Select as SelectPrimitive } from "@base-ui/react/select";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, CheckIcon, ChevronUpIcon } from "lucide-react";

const Select = SelectPrimitive.Root;

function SelectGroup({ className, ...props }) {
    return (
        <SelectPrimitive.Group
            data-slot="select-group"
            className={cn("scroll-my-1 p-1", className)}
            {...props}
        />
    );
}

function SelectValue({ className, ...props }) {
    return (
        <SelectPrimitive.Value
            data-slot="select-value"
            className={cn("flex flex-1 text-right", className)}
            {...props}
        />
    );
}

function SelectTrigger({ className, size = "default", children, ...props }) {
    return (
        <SelectPrimitive.Trigger
            data-slot="select-trigger"
            data-size={size}
            className={cn(
                "flex w-full items-center justify-between gap-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 py-2 pr-3 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none select-none",
                "focus-visible:border-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500/20",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "data-placeholder:text-slate-400 dark:data-placeholder:text-slate-500",
                "data-[size=default]:h-9 data-[size=sm]:h-7",
                className
            )}
            {...props}
        >
            {children}
            <SelectPrimitive.Icon
                render={
                    <ChevronDownIcon className="pointer-events-none size-4 text-slate-400 dark:text-slate-500 shrink-0 transition-transform duration-200 [[data-popup-open]_&]:rotate-180" />
                }
            />
        </SelectPrimitive.Trigger>
    );
}

const SelectContent = React.forwardRef(
    (
        {
            className,
            children,
            side = "bottom",
            sideOffset = 6,
            align = "start",
            alignOffset = 0,
            alignItemToAnchor = false,
            ...props
        },
        ref
    ) => (
        <SelectPrimitive.Portal>
            <SelectPrimitive.Positioner
                side={side}
                sideOffset={sideOffset}
                align={align}
                alignOffset={alignOffset}
                alignItemToAnchor={alignItemToAnchor}
                alignItemWithTrigger={false}
                className="z-50"
            >
                <SelectPrimitive.Popup
                    ref={ref}
                    className={cn(
                        "max-h-60 overflow-y-auto rounded-xl border border-slate-200 bg-white p-1 text-slate-900 shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100",
                        "w-[var(--anchor-width)] min-w-[var(--anchor-width)]",
                        "outline-none",
                        "transition-[opacity,transform] duration-150 ease-out",
                        "data-[starting-style]:opacity-0 data-[starting-style]:scale-95",
                        "data-[ending-style]:opacity-0 data-[ending-style]:scale-95",
                        className
                    )}
                    {...props}
                >
                    {children}
                </SelectPrimitive.Popup>
            </SelectPrimitive.Positioner>
        </SelectPrimitive.Portal>
    )
);

SelectContent.displayName = "SelectContent";

function SelectLabel({ className, ...props }) {
    return (
        <SelectPrimitive.GroupLabel
            data-slot="select-label"
            className={cn("px-2 py-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400", className)}
            {...props}
        />
    );
}

function SelectItem({ className, children, ...props }) {
    return (
        <SelectPrimitive.Item
            data-slot="select-item"
            className={cn(
                "relative flex w-full cursor-pointer items-center justify-between rounded-lg py-2 pr-3 pl-8 text-sm text-right outline-none select-none transition-colors",
                "text-slate-700 dark:text-slate-300",
                "data-[highlighted]:bg-slate-100 dark:data-[highlighted]:bg-slate-800 data-[highlighted]:text-slate-900 dark:data-[highlighted]:text-slate-100",
                "data-[disabled]:pointer-events-none data-[disabled]:opacity-40",
                className
            )}
            {...props}
        >
            <SelectPrimitive.ItemText className="flex flex-1 items-center gap-2 whitespace-nowrap font-medium">
                {children}
            </SelectPrimitive.ItemText>

            <SelectPrimitive.ItemIndicator
                render={
                    <span className="pointer-events-none absolute left-2.5 flex size-4 items-center justify-center text-emerald-600 dark:text-emerald-400">
            <CheckIcon className="size-4 stroke-[2.5] stroke-emerald-600" />
          </span>
                }
            />
        </SelectPrimitive.Item>
    );
}

function SelectSeparator({ className, ...props }) {
    return (
        <SelectPrimitive.Separator
            data-slot="select-separator"
            className={cn("pointer-events-none -mx-1 my-1 h-px bg-slate-200 dark:bg-slate-800", className)}
            {...props}
        />
    );
}

function SelectScrollUpArrow({ className, ...props }) {
    return (
        <SelectPrimitive.ScrollUpArrow
            data-slot="select-scroll-up-button"
            className={cn(
                "top-0 z-10 flex w-full cursor-default items-center justify-center bg-white dark:bg-slate-900 py-1",
                className
            )}
            {...props}
        >
            <ChevronUpIcon className="size-4 text-slate-400" />
        </SelectPrimitive.ScrollUpArrow>
    );
}

function SelectScrollDownArrow({ className, ...props }) {
    return (
        <SelectPrimitive.ScrollDownArrow
            data-slot="select-scroll-down-button"
            className={cn(
                "bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-white dark:bg-slate-900 py-1",
                className
            )}
            {...props}
        >
            <ChevronDownIcon className="size-4 text-slate-400" />
        </SelectPrimitive.ScrollDownArrow>
    );
}

export {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectScrollDownArrow as SelectScrollDownButton,
    SelectScrollUpArrow as SelectScrollUpButton,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
};
