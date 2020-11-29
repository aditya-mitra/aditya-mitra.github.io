import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import UnanimatedBox from './unanimatedBox';

import { landing as landingClass } from '@/styles/extras.module.css';
import { mouser } from '@/styles/header';

export default function Header() {

    const [AnimatedBox, setAnimatedBox] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            const animatedBox = dynamic(
                () => import('./animatedBox'),
                { loading: () => <UnanimatedBox /> }
            );
            setAnimatedBox(animatedBox);
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
                {AnimatedBox ?
                    <AnimatedBox /> : <UnanimatedBox />}
            </div>
        </>
    );
}