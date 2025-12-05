tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            },
            colors: {
                brand: {
                    dark: '#020617',   
                    navy: '#0f172a',    
                    surface: '#1e293b', 
                    gold: '#d4af37'      
                }
            },
            animation: {
                'shine': 'shine 1.5s infinite',
            },
            keyframes: {
                shine: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                }
            }
        }
    }
}