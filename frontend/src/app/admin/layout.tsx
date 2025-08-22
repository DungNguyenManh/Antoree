import AdminHeader from "./component/header";
import AdminFooter from "./component/footer";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <AdminHeader />
            <main className="flex-1 max-w-5xl mx-auto w-full p-4">{children}</main>
            <AdminFooter />
        </div>
    );
}