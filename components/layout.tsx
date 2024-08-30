import React from 'react';
import Navbar from '@/components/navbar';

import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import CssBaseline from '@mui/material/CssBaseline';

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ 
    children 
}:{
    children: React.ReactNode
}) {
    return (
        <React.Fragment>
            <CssBaseline />
            <Navbar />

            <main className={`${styles.main} ${inter.className} bg-white`}>
                { children }
            </main>
        </React.Fragment>
    )
}