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