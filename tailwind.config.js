/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}" ,
    "./node_modules/flowbite/**/*.js" 

  ],
  theme: {
    extend: {
      colors:
      {
        'main-red':'#FF2020' 
      }
  
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

