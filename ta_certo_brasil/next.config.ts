import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async redirects() {
        return [
        {
            source: '/',
            destination: '/home',
            permanent: true, // Triggers a 308 permanent redirect
        },
        {
            source: '/views/login',
            destination: '/login',
            permanent: true,
        },
        {
            source: '/views/home',
            destination: '/home',
            permanent: true,
        },
        {
            source: '/views/input',
            destination: '/input',
            permanent: true,
        },
        {
            source: '/views/resposta',
            destination: '/resposta',
            permanent: true,
        },
        ];
    },
    async rewrites() {
        return [
        {
            source: '/login',
            destination: '/views/login',
        },
        {
            source: '/home',
            destination: '/views/home',
        },
        {
            source: '/input',
            destination: '/views/input',
        },
        {
            source: '/resposta',
            destination: '/views/resposta',
        },
        ];
    },
};

export default nextConfig;
