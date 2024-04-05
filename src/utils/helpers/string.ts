export const generateNumberCode = (digits: number) => {
  let code = "";

  for (let i = 0; i < digits; i++) {
    code += Math.floor(Math.random() * 10);
  }

  return code;
};

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const generateTextNumberCode = (digits: number) => {
  let code = "";

  for (let i = 0; i < digits; i++) {
    if (i % 2 === 0) {
      code += alphabet[Math.floor(Math.random() * alphabet.length)];
    } else {
      code += Math.floor(Math.random() * 10);
    }
  }

  return code;
};
