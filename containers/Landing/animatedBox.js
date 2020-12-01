import { memo, useEffect, useRef } from 'react';

import animateWord from './animationControllers';
import { headerBoxStyes } from '@/styles/header';

export default memo(function animatedBox() {

    const wordAditya = useRef(null);
    const wordMitra = useRef(null);

    useEffect(() => {
        animateWord(wordAditya.current);
        animateWord(wordMitra.current);
    }, []);

    return (
        <>
            <style jsx>
                {headerBoxStyes}
            </style>
            <div className="box">
                <div className="wrapper">
                    <svg
                        viewBox="0 0 855 184"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="xMinYMin meet"
                        id="word-aditya"
                        ref={wordAditya}
                    >
                        <path
                            d="M0.000976562 184L72.751 0.5H73.251L146.001 184H140.501L114.751 118.25H31.001L5.00098 184H0.000976562ZM33.001 113.75H112.751L73.001 12.75L33.001 113.75Z"
                            fill="white"
                            className="curve curve-1"
                        />
                        <path
                            d="M191.247 184V8.5H231.497C248.164 8.5 262.414 11.1667 274.247 16.5C286.08 21.8333 295.664 28.9167 302.997 37.75C310.497 46.4167 315.914 55.9167 319.247 66.25C322.747 76.4167 324.497 86.5 324.497 96.5C324.497 109.833 322.164 121.917 317.497 132.75C312.997 143.417 306.747 152.583 298.747 160.25C290.914 167.917 281.914 173.833 271.747 178C261.58 182 250.914 184 239.747 184H191.247ZM196.247 179.25H237.497C248.664 179.25 259.164 177.333 268.997 173.5C278.997 169.667 287.747 164.167 295.247 157C302.747 149.667 308.664 140.917 312.997 130.75C317.33 120.583 319.497 109.083 319.497 96.25C319.497 86.75 317.83 77.1667 314.497 67.5C311.33 57.6667 306.164 48.6667 298.997 40.5C291.997 32.3333 282.83 25.8333 271.497 21C260.164 16 246.497 13.5 230.497 13.5H196.247V179.25Z"
                            fill="white"
                            className="curve curve-2"
                        />
                        <path
                            d="M372.644 8.5H377.644V184H372.644V8.5Z"
                            fill="white"
                            className="curve curve-3"
                        />
                        <path
                            d="M422.097 8.5H536.097V13.25H481.597V184H476.597V13.25H422.097V8.5Z"
                            fill="white"
                            className="curve curve-4"
                        />
                        <path
                            d="M629.146 118.75L563.396 8.5H569.396L631.896 113.25L693.896 8.5H699.646L634.146 118.75V184H629.146V118.75Z"
                            fill="white"
                            className="curve curve-5"
                        />
                        <path
                            d="M708.253 184L781.003 0.5H781.503L854.253 184H848.753L823.003 118.25H739.253L713.253 184H708.253ZM741.253 113.75H821.003L781.253 12.75L741.253 113.75Z"
                            fill="white"
                            className="curve curve-6"
                        />
                        <circle r="7.5" cy="0" cx="0" className="ball ball-1" />
                        <circle r="7.5" cy="0" cx="0" className="ball ball-2" />
                        <circle r="7.5" cy="0" cx="0" className="ball ball-3" />
                        <circle r="7.5" cy="0" cx="0" className="ball ball-4" />
                        <circle r="7.5" cy="0" cx="0" className="ball ball-5" />
                        <circle r="7.5" cy="0" cx="0" className="ball ball-6" />
                    </svg>
                </div>

                <div className="wrapper">
                    <svg
                        viewBox="0 0 719 184"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="xMinYMin meet"
                        id="word-mitra"
                        ref={wordMitra}
                    >
                        <path
                            d="M0.158203 184V5.5H0.408203L82.1582 122L164.158 5.5H164.408V184H159.408V20.75L82.4082 129H81.9082L5.1582 21V184H0.158203Z"
                            fill="white"
                            className="curve curve-1"
                        />
                        <path
                            d="M223.547 8.5H228.547V184H223.547V8.5Z"
                            fill="white"
                            className="curve curve-2"
                        />
                        <path
                            d="M273 8.5H387V13.25H332.5V184H327.5V13.25H273V8.5Z"
                            fill="white"
                            className="curve curve-3"
                        />
                        <path
                            d="M467.799 8.5C472.799 8.5 478.215 9.33333 484.049 11C490.049 12.6667 495.632 15.3333 500.799 19C506.132 22.6667 510.465 27.5 513.799 33.5C517.132 39.3333 518.799 46.5833 518.799 55.25C518.799 65.0833 516.382 74.3333 511.549 83C506.715 91.5 498.632 97.6667 487.299 101.5L537.049 184H531.299L482.299 102.75C476.965 104.083 471.049 104.75 464.549 104.75H436.799V184H431.799V8.5H467.799ZM463.799 100C473.799 100 481.965 98.6667 488.299 96C494.799 93.3333 499.882 89.8333 503.549 85.5C507.215 81.1667 509.799 76.4167 511.299 71.25C512.965 65.9167 513.799 60.6667 513.799 55.5C513.799 47.1667 511.715 39.8333 507.549 33.5C503.382 27.1667 497.799 22.25 490.799 18.75C483.965 15.0833 476.382 13.25 468.049 13.25H436.799V100H463.799Z"
                            fill="white"
                            className="curve curve-4"
                        />
                        <path
                            d="M572.096 184L644.846 0.5H645.346L718.096 184H712.596L686.846 118.25H603.096L577.096 184H572.096ZM605.096 113.75H684.846L645.096 12.75L605.096 113.75Z"
                            fill="white"
                            className="curve curve-5"
                        />
                        <circle r="7.5" cy="0" cx="0" className="ball ball-1" />
                        <circle r="7.5" cy="0" cx="0" className="ball ball-2" />
                        <circle r="7.5" cy="0" cx="0" className="ball ball-3" />
                        <circle r="7.5" cy="0" cx="0" className="ball ball-4" />
                        <circle r="7.5" cy="0" cx="0" className="ball ball-5" />
                    </svg>
                </div>
            </div>
        </>
    );
});