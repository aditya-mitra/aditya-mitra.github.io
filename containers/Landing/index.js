import Header from './header';
import Navbar from './navbar';

import styles from '@/styles/landing';

export default function LandingIndex() {
    return (
        <>
            <span id="pageLanding" style={{ visibility: "hidden" }} />
            <style jsx>
                {styles}
            </style>
            <div className="landingHeader">
                <Header />
                <Navbar />
            </div>
        </>
    );
}