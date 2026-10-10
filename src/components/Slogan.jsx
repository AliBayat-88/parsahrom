import Typewriter from "typewriter-effect";

export const Slogan = () => {
    return (
        <div className="text-2xl sm:text-3xl font-irancell_semibold text-center">
            <Typewriter
                onInit={(typewriter) => {
                    typewriter
                        .changeDelay(50)
                        .typeString("پیش از آنکه راهکار بسازیم،<br/>مسئله را با دسی‌بلِ مهندسی می‌شنویم.")
                        .callFunction((state) => {
                            if (state.elements.cursor) {
                                state.elements.cursor.style.display = 'none';
                            }
                        })
                        .start();
                }}
            />
        </div>
    );
};