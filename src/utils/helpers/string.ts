export const generateNumberCode = (digits: number) => {
  let code = "";

  for (let i = 0; i < digits; i++) {
    code += Math.floor(Math.random() * 10);
  }

  return code;
};
