import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeft, ChevronsRight, EllipsisIcon } from "lucide-react";
import { useEffect, useState } from "react";

export interface PropsPagination {
    hasPrev: boolean;
    hasNext: boolean;
    page: number;
    pages: number;
    onPageChange: (page: number) => void; // retorna la págnia siguiente o anterior
}

const chevronClass = 'p-1 rounded-lg bg-surface hover:bg-surface-hover text-primary disabled:opacity-40 disabled:cursor-not-allowed border border-slate-700 text-sm font-medium transition-all';

const Paginator = ({
    hasNext = false,
    hasPrev = false,
    page = 1,
    pages = 0,
    onPageChange }: PropsPagination) => {

    const [buttons, setButtons] = useState<Array<string | number>>([]);

    const makeButtons = (cPage: number) => {

        let leftSide = [cPage, cPage + 1];
        let rightSide = [pages - 1, pages];

        if (cPage == pages - 1) { //41
            leftSide = [pages - 3, pages - 2];
        }
        if (cPage == pages - 2) { // 40
            leftSide = [cPage - 1, cPage]
        }
        if (cPage == pages) { //42
            leftSide = [pages - 3, pages - 2];
        }

        setButtons([...leftSide, 'ellipse', ...rightSide]);

    }

    useEffect(() => {
        makeButtons(page);
    }, [page]);

    return (
        <div key={page + 'key-div'} className="flex items-center justify-center gap-4">
            {/* NAVEGACIÓN HACÍA ATRÁS */}
            {
                hasPrev && (
                    <div>
                        <button
                            onClick={() => onPageChange(1)}
                            className={`${chevronClass} `}
                        >
                            <ChevronsLeft className="w-5 h-5" />
                        </button>

                        <button
                            disabled={!hasPrev}
                            onClick={() => onPageChange(page - 1)}
                            className={`${chevronClass} `}
                        >
                            <ChevronLeftIcon className="w-5 h-5" />
                        </button>
                    </div>
                )
            }
            {
                buttons.map(bPage =>

                    bPage === 'ellipse'
                        ? <span key={bPage + page.toString()} className=" text-muted">
                            <EllipsisIcon className="mt-2" />
                        </span>
                        : <button
                            key={bPage + 'button'}
                            onClick={() => onPageChange(Number(bPage))}
                            className={`w-6 h-6 rounded-md hover:bg-muted  transition-all duration-300 font-bold text-xs text-surface ${bPage == page ? 'bg-secondary border border-primary ' : 'bg-foreground '}`}>
                            {bPage}
                        </button>

                )
            }


            {/* NAVEGACIÓN HACÍA ADELANTE */}
            {
                hasNext && (
                    <div>

                        <button
                            disabled={!hasNext}
                            onClick={() => onPageChange(page + 1)}
                            className={`${chevronClass} `}
                        >
                            <ChevronRightIcon className="w-5 h-5" />
                        </button>
                        <button
                            disabled={!hasNext}
                            onClick={() => onPageChange(42)}
                            className={`${chevronClass} `}
                        >
                            <ChevronsRight className="w-5 h-5" />
                        </button>
                    </div>
                )
            }
        </div>
    );
};
export default Paginator;