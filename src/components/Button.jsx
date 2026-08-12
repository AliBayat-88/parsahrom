
export const Button = ({title}) => {
  return (
      <button
          type="button"
          className="inline-flex items-center  gap-x-1 px-2 sm:px-2.5 py-1 sm:py-2 rounded-lg text-[8px] sm:text-[10px] text-slate-700 dark:text-slate-200 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 active:scale-95 transition-all cursor-pointer"
      >
          <span>{title}</span>
          <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="sm:w-3 w-2 h-2 sm:h-3 rotate-180 group-hover/btn:-translate-x-0.5 transition-transform"
          >
              <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
          </svg>
      </button>
  );
};