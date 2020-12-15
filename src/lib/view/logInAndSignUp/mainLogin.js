import { templateLogIn } from "./templateLogIn.js";
import { templateSignUp } from "./templateSignUp";

export const domSignUp = () => {
    const signUpForm = document.querySelector('#signUpForm');
    signUpForm.addEventListener('submit', (e) =>
     e.preventDefault();

      const fullName = document.querySelector('#fullName');
      const userName = document.querySelector('#userNameSignUp');
      const email = document.querySelector('#emailSignUp');
      const password = document.querySelector('#passwordSignUp');
      console.log(password, email)
);
}
