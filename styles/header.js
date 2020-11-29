import css from "styled-jsx/css";

export const headerBoxStyes = css`
.landing {
  width: 100%;
  height: 100vh;
  background-color: black;
  background-size: cover;

  position: relative;
}
.box {
  position: absolute;
  top: 47%;
  left: 50%;
  bottom: 2rem;
  transform: translateX(-50%) translateY(-50%); /* scale up when device viewport decreases */
  padding: 3rem;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 100%;
  height: 100%;
}

.wrapper{
  width: auto;
  display: flex;
  justify-content: center;
}

.box svg {
  width: auto;
  height: auto;
  background-size: cover;
}

#word-mitra{
  margin-top: 2rem;
}

.ball {
  fill: orange;
}
`;

export const mouser = css`
.mouser {
  position: absolute;
  bottom: 5rem;
  transform: scale(0.55);
  transition: all 1s ease-in;

  width: 3px;
  padding: 10px 15px;
  height: 35px;
  border: 2px solid #fff;
  border-radius: 25px;
  opacity: 0.75;
  box-sizing: content-box;
}
@media screen and (max-width:768px){
  .mouser {
    bottom: 3rem;
  }
}
.mouser .scrollball {
  width: 3px;
  height: 10px;
  border-radius: 25%;
  background-color: #fff;

  animation-name: mouserScroll;
  animation-duration: 3s;
  animation-timing-function: cubic-bezier(.15,.41,.69,.94);
  animation-iteration-count: infinite;
}
@keyframes mouserScroll {
  0% {
    opacity: 0;
  }
  10% {
    transform: translateY(0); opacity: 1;
  }
  100% {
    transform: translateY(15px); opacity: 0;
  }
}
`