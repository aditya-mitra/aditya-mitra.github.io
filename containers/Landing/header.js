import { useState, useEffect } from 'react';

import unanimatedHeader from './unanimatedHeader';

import { landing as landingClass } from '@/styles/extras.module.css';
import { mouser } from '@/styles/header';

export default function Header() {

    const [isMounted, setMounted] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setMounted(true);
        }, 2000);
    }, []);

    const mouseTrans =
        <>
            <style jsx>
                {mouser}
            </style>
            <div className="mouser">
                <div className="scrollball" />
            </div>
        </>;


    return (
        <>
            <div className={landingClass}>
                {unanimatedHeader}
            </div>
        </>
    );
}