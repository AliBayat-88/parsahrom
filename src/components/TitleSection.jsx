
export const TitleSection = ({
                               title = "محصولات",
                               align = "center",
                             }) => {
  const isCenter = align === "center";

  return (
      <div
          className={`flex flex-col gap-y-2 mb-4 font-irancell_semibold ${
              isCenter ? "items-center text-center" : "items-start text-right"
          }`}
      >
        <div className="flex items-center gap-x-3">
          <h2 className="text-xl md:text-2xl text-slate-800 dark:text-slate-100 tracking-tight">
            {title}
          </h2>
        </div>

      </div>
  );
};