import { Search } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
    title: string;
    subtitle?: string;
    goTo?: string;
}

const EmptyData = ({ title = '', subtitle = '', goTo = '' }: Props) => {

    return (
        <>

            <div className="flex flex-col items-center justify-center my-12 text-center">
                <figure className="w-30 h-30 mb-3 opacity-90 transition-transform duration-300 hover:scale-105">
                    <img
                        loading="lazy"
                        src="/images/empty.png"
                        alt="Sin favoritos"
                        className="w-full h-full object-contain drop-shadow-[0_0_12px_rgba(151,206,76,0.3)]"
                    />
                </figure>
                <h3 className="text-accent text-2xl font-semibold">{title}</h3>
                {
                    subtitle && (
                        <p className="text-muted text-xs mt-1 max-w-xs">
                            {subtitle}
                        </p>
                    )
                }
                {
                    goTo && (
                        <div className="mt-5 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/60 text-xs font-medium transition-all">
                            <Search className="w-4 h-4" />
                            <Link to={goTo}> Explorar</Link>
                        </div>
                    )
                }
            </div>
        </>
    );
}

export default EmptyData;