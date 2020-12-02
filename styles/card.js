import css from "styled-jsx/css";

const allStyles = css`
.card {
  transform: scale(0.9);
  width: 95%;
  position: relative;
  max-width: 800px;
  margin: 2rem auto;
  background: #fff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 25px;
  border-radius: 25px;
  height: 400px;
  cursor: pointer;
  user-select: none;
}
.card.dark{
  filter: invert(1) hue-rotate(180deg);
}
@media screen and (max-width: 992px) {
  .card {
    margin: 1.5rem auto;
    max-width: 680px;
    height: 400px;
  }
}
@media screen and (max-width: 768px) {
  .card {
    min-height: 500px;
    height: auto;
    margin: 170px auto;
  }
}
@media screen and (max-height: 500px) and (min-width: 992px) {
  .card {
    height: 350px;
  }
}

.links {
  position: absolute;
  bottom: 2rem;
  width: 50%;

  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}
.dark .links{
  filter: invert(1) hue-rotate(180deg);
}
@media screen and (max-width: 768px) {
  .links {
    flex-direction: column;
    align-items: flex-start;
    left: 0;
  }
}

.stacks{
  position: absolute;
  bottom: 2rem;
  width: 40%;
  right: 1rem;

  font-family: "Concert One";
  font-size: 0.85rem;
  text-align: center;

  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto auto auto;
  grid-row-gap: 0.25rem;
  grid-column-gap: 0.25rem;
  justify-content: center;
  align-content: center;
  justify-items: center;
  align-items: center;
}
.dark .stacks{
  filter: invert(1) hue-rotate(180deg);
}
@media screen and (max-width: 768px) {
  .stacks {
    width: 75%;
    grid-row-gap: 0.5rem;
    bottom: 0.5rem;
    font-size: 0.75rem;
  }
}
@media screen and (max-width: 300px) {
  .stacks {
    width: 65%;
    grid-template-columns: auto auto;
    grid-row-gap: 0.25rem;
    bottom: 0.25rem;
  }
}

.bullets {
  position: absolute;
  right: 1.5rem;
  width: 1rem;
}

.sliders{
  position: absolute;
  height: 100%;
  bottom: 3rem;
}
@media screen and (max-width: 768px) {
  .sliders {
    bottom: 0;
    top: 2.5rem;
  }
}
`;

const itemStyles = css`
.wrapper{
    position: absolute;
}

.item {
  display: flex;
  align-items: center;
  flex-direction: row;
  visibility: hidden;
  opacity: 0;
}
.visible{
  opacity: 1;
  visibility: visible;
}
@media screen and (max-width: 768px) {
  .item {
    flex-direction: column;
  }
}

.content {
  padding-right: 25px;
}
.visible .content{
  animation-name: appearContent;
  animation-duration: 0.6s;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in;
}
@keyframes appearContent{
  0%{
    transform: translateX(200px);
    opacity: 0;
  }
  100%{
    transform: translateX(0);
    opacity: 1;
  }
}
@media screen and (max-width: 768px) {
  .content {
    margin-top: -130px;
    text-align: center;
    padding: 0 30px;
  }
  .visible .content{
      animation-duration: 0.75s;
  }
}
@media screen and (max-width: 576px) {
  .content {
    padding: 0;
  }
}

.imageContainer {
  width: 300px;
  flex-shrink: 0;
  height: 300px;
  background: #fc4a1a;

  box-shadow: 4px 13px 30px 1px rgba(252, 56, 56, 0.2);
  border-radius: 20px;
  overflow: hidden;
}
.visible .imageContainer{
  animation-name: appearImage;
  animation-duration: 0.6s;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in;
}
@keyframes appearImage{
  0%{
    transform: translateY(200px) translateX(-80px);
    opacity: 0;
  }
  100%{
    transform: translateY(0) translateX(-80px);
    opacity: 1;
  }
}

.imageContainer > img {
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 20px;

  color: transparent;
}
.imageContainer > img:after {
  content: " ";
  margin-left: 25%;
  margin-top: 50%;
}
@media screen and (max-width: 768px) {
  .imageContainer {
    transform: translateY(-50%);
    width: 90%;
  }
  .visible .imageContainer{
    animation-duration: 0.75s;
  }
  @keyframes appearImage{
  0%{
    transform: translateX(-200px) translateY(-50%);
  }
  100%{
   transform: translateX(0) translateY(-50%);
   width: 90%;
  }
}
}
@media screen and (max-width: 576px) {
  .imageContainer {
    width: 95%;
  }
}
@media screen and (max-height: 500px) and (min-width: 992px) {
  .imageContainer {
    height: 270px;
  }
}

.title {
  font-family: "Staatliches", cursive;
  font-size: 1.5rem;
  font-weight: 700;
  color: #0d0925;
  margin-bottom: 20px;
}
@media screen and (max-width: 576px) {
  .title {
    margin-bottom: 0;
  }
}

.description {
  font-family: "Concert One", cursive;
  color: #4e4a67;
  margin-bottom: 30px;
  line-height: 1.5em;
  width: 90%;
}
@media screen and (max-width: 576px){
  .description{
    width: 80%;
    margin-left: 10px;
    margin-right: -10px;
  }
}
`;

const bulletStyles = css`
.tap {
  position: relative;
  height: 25px;
  width: 15px;
  background: #cccccc;
  border-radius: 5px;
  display: inline-flex;
  margin: 0 3px;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
}
.tap.checked {
  background: #0ece47;
  height: 35px;
}
@media screen and (max-width: 600px) {
  .tap{
    width: 17.5px;
    height: 30px;
  }
  .tap.checked {
    background: #0ece47;
    height: 40px;
  }
}

input[type="radio"] {
  display: none !important;
}

`;

export { itemStyles, bulletStyles, allStyles };