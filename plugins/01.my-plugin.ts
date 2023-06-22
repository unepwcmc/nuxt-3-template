export default defineNuxtPlugin((/* nuxtApp */) => {
  return {
    provide: {
      greetings: (msg: string) => `Hello ${msg}!`,
      provideRandomNumber: () => {
        /* We can access composable function in plugin vice versa */
        const randomNumber = giveRandomNum();
        return `Number is: ${randomNumber.value}`;
      },
    },
  };
});
