import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import UnanimatedBox from './unanimatedBox';

import { landing as landingClass } from '@/styles/extras.module.css';

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

    return (
        <>
            <div className={landingClass}>
                {AnimatedBox ?
                    <AnimatedBox /> : <UnanimatedBox />}
            </div>
        </>
    );
}