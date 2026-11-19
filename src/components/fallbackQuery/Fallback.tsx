import { RefreshCcw } from 'lucide-react';
import { useEffect, useState } from 'react';
// import { useState, useEffect } from 'react';

interface Props {
    id: string;
    children: React.ReactNode;
    noDataPlaceholder?: string | React.ReactNode;
    isError: boolean | Error | null;
    isLoading: boolean;
    errorMsg?: string;
    data?: unknown | null;
    loadingClassName?: string; // de preferencia mandar solo el height y width
    errorClassName?: string; // de preferencia mandar solo el height y width
    onRetry?: () => void; // para refetch
}


export default function Fallback({ id, children, isError, isLoading, data, errorMsg, loadingClassName, errorClassName, noDataPlaceholder, onRetry }: Props) {

    const [dataInfo, setDataInfo] = useState(data);
    const loadingStyles = loadingClassName ? loadingClassName : `min-h-20 w-full`;
    const errorStyles = errorClassName ? errorClassName : `min-h-10 w-full `;

    const noDataEva = <T,>(data: T) => {
        let isNull = false;
        if (
            (Array.isArray(data) && data.length === 0) ||
            (typeof data === 'object' && data !== null && Object.keys(data).length === 0) ||
            !data
        ) {
            isNull = true;
        }

        return isNull;
    }

    useEffect(() => {
        setDataInfo(data);
    }, [data]);

    return (
        <>
            <section id={id}>
                {
                    isLoading && !isError && (
                        <div className={`${loadingStyles} flex items-center justify-center`} >
                            <div className='loader'></div>
                        </div>)
                }

                {
                    !isLoading && isError && (
                        <div className={`${errorStyles} flex flex-col items-center justify-center`} >
                            <figure className='w-25 h-25 overflow-hidden'>
                                <img
                                    src="/images/error.png"
                                    alt="Error"
                                    className='object-cover rounded-full '
                                    width={100}
                                    height={100}
                                />
                            </figure>
                            <p className='text-center text-error mt-4'>¡Ups!</p>
                            <h2 className="text-lg font-bold text-theme-light-gray">
                                {errorMsg ? errorMsg : "No se pudo cargar la información"}
                            </h2>
                            {
                                onRetry && (
                                    <div className="mt-5 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/60 text-xs font-medium transition-all">
                                        <RefreshCcw className="w-4 h-4" />
                                        <button onClick={onRetry}> Intentar nuevamente</button>
                                    </div>
                                )
                            }
                        </div>)
                }

                {
                    !isLoading && !isError && !noDataEva(dataInfo) && <>{children}</>
                }

                {
                    !isLoading && !isError && noDataEva(dataInfo) && noDataPlaceholder && <>{noDataPlaceholder}</>
                }

            </section>

        </>
    )
}