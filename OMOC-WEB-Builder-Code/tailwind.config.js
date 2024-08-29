/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'blue':'#0094FF',
        'bgcolor':"#F2F2F2",
        'textcolor':"#757575",
      },
      backgroundImage: theme => ({
        'gradient-to-45': 
            'linear-gradient(45deg, #ffed4a, #ff3860)',
        'gradient-to-135': 
            'linear-gradient(290deg, #ffed4a, #ff3860)',
      })
    },
  },
  plugins: [],
};
