interface IMaskitoElementState {
  value: string;
}

export const masks = {
  account: {
    mask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/],
  },
  agency: {
    mask: [/\d/, /\d/, /\d/, /\d/],
  },
  zipCode: {
    mask: [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  },
  state: {
    mask: [/[a-zA-Z]/, /[a-zA-Z]/]
  },
  phoneMask: {
    mask: ["(", /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/],
  },
  cpfMask: {
    mask: [/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/],
  },
  cnpjMask: {
    mask: [/\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/],
  },
  fullNameMask: {
    mask: /^[A-Za-zÀ-ÖØ-öø-ÿ"\-][A-Za-zÀ-ÖØ-öø-ÿ"\-\s]*$/
  },
  dateMask: {
    mask: [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/],
  },
  emailMask: {
    mask: /^[a-zA-Z0-9._%+-@]*$/
  },
  cardNumberMask: {
    mask: [/\d/, /\d/, /\d/, /\d/, " ", /\d/, /\d/, /\d/, /\d/, " ", /\d/, /\d/, /\d/, /\d/, " ", /\d/, /\d/, /\d/, /\d/],
  },
  cardExpirationDateMask: {
    mask: [/\d/, /\d/, "/", /\d/, /\d/],
  },
  cardCVVMask: {
    mask: [/\d/, /\d/, /\d/],
  },
  onlyNumbersMask: {
    mask: Array(50).fill(/\d/)
  },
  rgMask: {
    mask: [/\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/],
  },
  cnhMask: {
    mask: [/[0-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
  },
  boletoMask: {
    mask: [
      /\d/, /\d/, /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, /\d/, /\d/,
      " ", /\d/, /\d/, /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, /\d/, /\d/, /\d/,
      " ", /\d/, /\d/, /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, /\d/, /\d/, /\d/,
      " ", /\d/,
      " ", /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/
    ]
  },
  cpfAndCnpjMask: {
    mask: (elementState: IMaskitoElementState) => {
      const value = elementState.value.replace(/\D/g, "");
      const cpfMask = [/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/];
      const cnpjMask = [/\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/];
      return value.length <= 11 ? cpfMask : cnpjMask;
    }
  },
  revenueCodeMask: {
    mask: [/\d/, /\d/, /\d/, /\d/]
  },
  monthAndYearMask: {
    mask: [/\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]
  }
};
