// src/pages/admin/AdminLayout.tsx
import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

function Menu({ base, label }: { base: string; label: string }) {
    const navigate = useNavigate();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-full">{label}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => navigate(`/admin/${base}`)}>Display All</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate(`/admin/${base}/manage`)}>Manage</DropdownMenuItem>
                {base === 'products' && (
                    <DropdownMenuItem onClick={() => navigate(`/admin/products/create`)}>Create</DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

const AdminLayout: React.FC = () => {
    return (
        <Layout>
            <div className="container mx-auto px-4 py-6 space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="heading-display">Admin</h1>
                    <Link to="/" className="text-sm underline">← Back to site</Link>
                </div>

                <div className="flex flex-wrap gap-2">
                    <Menu base="products" label="Products" />
                    <Menu base="gems" label="Gems" />
                    <Menu base="categories" label="Categories" />
                    <Menu base="metals" label="Metals" />
                </div>

                <Outlet />
            </div>
        </Layout>
    );
};

export default AdminLayout;
