type LoginFormProps = {
    email: string;
    password: string;
    error: string;
    loading: boolean;
    onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
};

export default function LoginForm({
    email,
    password,
    error,
    loading,
    onEmailChange,
    onPasswordChange,
    onSubmit,
}: LoginFormProps) {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-6 text-blue-700">Đăng nhập</h1>
                <form className="flex flex-col gap-4 w-full" onSubmit={onSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        className="border p-2 rounded focus:outline-blue-400 placeholder:text-gray-500"
                        value={email}
                        onChange={onEmailChange}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="border p-2 rounded focus:outline-blue-400 placeholder:text-gray-500"
                        value={password}
                        onChange={onPasswordChange}
                        required
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white p-2 rounded font-semibold hover:bg-blue-700 transition disabled:opacity-60"
                        disabled={loading}
                    >
                        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                    </button>
                </form>
                {error && <div className="text-red-600 mt-4 text-center w-full">{error}</div>}
            </div>
        </main>
    );
}
