import css from "styled-jsx/css";

export default css`
.navbar {
    color: white;
    font-size: 2rem;

    z-index: 99;
    width: 100%;
    height: 2.2rem;
    border-radius: 0;

    position: sticky;
    top: 0;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;

    animation-name: mount;
    animation-duration: 1.5s;
    animation-fill-mode: forwards;
    animation-delay: 1.5s;
}
@keyframes mount{
    0%{
        bottom: 0;
    }
    100%{
        bottom: 0.4rem;
    }
}
`;