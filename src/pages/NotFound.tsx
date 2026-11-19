import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
            <span className="text-8xl font-black text-primary tracking-widest">
                404
            </span>

            <h1 className="mt-4 text-2xl font-bold text-foreground">
                Dimensión no encontrada
            </h1>

            <p className="mt-2 text-sm text-muted max-w-md">
                Parece que esta coordenada del multiverso no existe o fue destruida por Rick.
            </p>

            <Link
                to="/"
                className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface hover:bg-surface-hover text-primary border border-slate-700 hover:border-primary text-sm font-medium transition-all"
            >
                <Home className="w-4 h-4 text-accent" />
                <span>Volver al inicio</span>
            </Link>
        </div>
    );
};

export default NotFound;
