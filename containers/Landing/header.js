import { memo, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import UnanimatedBox from './unanimatedBox';

import { header as headerClass } from '@/styles/containers.module.css';

export default memo(function Header() {

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
        <div className={headerClass}>
            {AnimatedBox ?
                <AnimatedBox /> : <UnanimatedBox />}
        </div>
    );
});