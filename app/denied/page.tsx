// pages/denied.tsx
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Denied() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md text-center">
                <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
                <p className="text-gray-700 mb-6">
                    You do not have the required access level to view this page.
                </p>
                <Button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    <Link href="/">
                        Go back to Home
                    </Link>
                </Button>
            </div>
        </div>
    );
}
