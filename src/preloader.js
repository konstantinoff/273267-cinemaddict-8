
const message = document.querySelector(`.preloader__message`);
const preloader = document.querySelector(`.preloader`);

export const onErrorPreloader = () => {
  message.innerHTML = ` Something went wrong while loading movies. Check your connection or try again later`;
};
export const removePreloader = () => {
  preloader.classList.add(`visually-hidden`);
};

