import { XCircle } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

type Trigger = 'click' | 'hover';
type Position = 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface Props {
    children: React.ReactNode;
    content: React.ReactNode | string;
    trigger?: Trigger;
    autoclose?: boolean;
    autoCloseTimer?: number
    showCloseIcon?: boolean;
    position?: Position;
}

const GAP = 8;     // separación entre trigger y tooltip
const MARGIN = 12; // margen mínimo contra los bordes de la ventana

// Calcula top/left (position: fixed) a partir del rect del trigger y del tooltip
function getCoords(pos: Position, t: DOMRect, tip: DOMRect) {
    const centerX = t.left + t.width / 2 - tip.width / 2;
    const centerY = t.top + t.height / 2 - tip.height / 2;
    const above = t.top - tip.height - GAP;
    const below = t.bottom + GAP;

    const map: Record<Position, { top: number; left: number }> = {
        top: { top: above, left: centerX },
        bottom: { top: below, left: centerX },
        left: { top: centerY, left: t.left - tip.width - GAP },
        right: { top: centerY, left: t.right + GAP },
        'top-left': { top: above, left: t.left },
        'top-right': { top: above, left: t.right - tip.width },
        'bottom-left': { top: below, left: t.left },
        'bottom-right': { top: below, left: t.right - tip.width },
    };

    return map[pos];
}

export default function Tooltip({ children, content, trigger = "hover", position = 'top', autoclose = false, autoCloseTimer = 2500, showCloseIcon = true }: Props) {

    const containerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });

    // POSICIÓN: se calcula antes del paint para evitar "parpadeo"
    useLayoutEffect(() => {
        if (!isOpen || !containerRef.current || !tooltipRef.current) return;

        const t = containerRef.current.getBoundingClientRect();
        const tip = tooltipRef.current.getBoundingClientRect();

        // Auto-flip vertical / horizontal si no cabe
        let pos = position;
        if (pos.startsWith('top') && t.top - tip.height - GAP < MARGIN) pos = pos.replace('top', 'bottom') as Position;
        else if (pos.startsWith('bottom') && t.bottom + tip.height + GAP > window.innerHeight - MARGIN) pos = pos.replace('bottom', 'top') as Position;
        else if (pos === 'left' && t.left - tip.width - GAP < MARGIN) pos = 'right';
        else if (pos === 'right' && t.right + tip.width + GAP > window.innerWidth - MARGIN) pos = 'left';

        const { top, left } = getCoords(pos, t, tip);

        // Mantener siempre dentro de la pantalla
        setCoords({
            top: Math.max(MARGIN, Math.min(top, window.innerHeight - tip.height - MARGIN)),
            left: Math.max(MARGIN, Math.min(left, window.innerWidth - tip.width - MARGIN)),
        });
    }, [isOpen, position]);

    // EVENTOS: cerrar al hacer scroll/resize y (en modo click) al hacer click fuera
    useEffect(() => {
        if (!isOpen) return;

        const close = () => setIsOpen(false);
        const onClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;
            if (!containerRef.current?.contains(target) && !tooltipRef.current?.contains(target)) close();
        };

        window.addEventListener('scroll', close, true);
        window.addEventListener('resize', close);
        if (trigger === 'click') document.addEventListener('mousedown', onClickOutside);

        // Autocierre
        const timer = autoclose ? setTimeout(close, autoCloseTimer) : undefined;

        return () => {
            window.removeEventListener('scroll', close, true);
            window.removeEventListener('resize', close);
            document.removeEventListener('mousedown', onClickOutside);
            if (timer) clearTimeout(timer);
        };
    }, [isOpen, trigger, autoclose]);

    const hoverProps = trigger === 'hover'
        ? { onMouseEnter: () => setIsOpen(true), onMouseLeave: () => setIsOpen(false) }
        : {};

    return (
        <div className="relative inline-flex w-fit" {...hoverProps}>
            {isOpen && (
                <div
                    ref={tooltipRef}
                    style={{ top: coords.top, left: coords.left }}
                    className="fixed z-9999 w-max max-w-64 p-2 rounded-md bg-surface border border-slate-700 shadow-xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    {showCloseIcon && trigger == 'click' && (
                        <div className="flex justify-end mb-1.5">
                            <button type="button" onClick={() => setIsOpen(false)} className="text-error">
                                <XCircle className="size-4" />
                            </button>
                        </div>
                    )}

                    {typeof content === 'string'
                        ? <p className="p-2 text-sm font-medium text-foreground">{content}</p>
                        : content}
                </div>
            )}

            <div
                ref={containerRef}
                onClick={trigger === 'click' ? (e) => {
                    e.stopPropagation();
                    setIsOpen(prev => !prev);
                } : undefined}
                className={trigger === 'click' ? 'cursor-pointer' : ''}
            >
                {children}
            </div>
        </div>
    );
}




