import { useNavigate } from 'react-router';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div
            data-tauri-drag-region
            role="alert"
            className="flex flex-col items-center justify-center w-full h-full p-4 rounded-lg"
        >
            <p className="m-3 text-sm font-semibold uppercase text-ink-faint">Error: 404</p>
            <h1 className="text-4xl font-bold">You chose nothingness.</h1>
            <div className="flex flex-row space-x-2">
                <button onClick={() => navigate(-1)}>
                    Go Back
                </button>
            </div>
        </div>
    );
}