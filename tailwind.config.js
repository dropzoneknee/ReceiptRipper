/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      colors: {
        primary: "#4f54b8",
      },

      height: {
        "1/10": "10%",
        "1.5/10": "15%",
        "2/10": "20%",
        "3/10": "30%",
        "4/10": "40%",
        "5/10": "50%",
        "6/10": "60%",
        "7/10": "70%",
        "8/10": "80%",
        "9/10": "90%",
      },

      spacing: {
        mega: "200rem",
      },

      minWidth: {
        scroll: "6rem",
      },

      boxShadow: {
        blur: "0 0 5px 10px white",
      },

      backgroundColor: {
        modal: "rgba(100,100,100,0.5)",
      },
    },
  },
  plugins: [],
};
