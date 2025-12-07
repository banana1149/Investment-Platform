const CLIENT_DATABASE = {
    
    'Corey_113': 	{ password: 'CoreyDaGOAT113', name: 'Corey Crist', aum: 58794, ytd: 1.5, service_contact: '+1 (302) 250 8241', email: 'corey.crist@lammy.capital', cash_available: 5879 },
    'Solex_12': 	{ password: 'Solex2200', name: 'Abu Solomon', aum: 2200000, ytd: 2.1, service_contact: '+234 81 100 0002', email: 'abu.solomon@lammy.capital', cash_available: 44000 },
    'user3': 	{ password: 'pass3', name: 'Tunde Adebayo', aum: 1800000, ytd: -0.5, service_contact: '+234 81 100 0003', email: 'tunde.adebayo@lammy.capital', cash_available: 90000 },
    'user4': 	{ password: 'pass4', name: 'Fatima Musa', aum: 3500000, ytd: 3.0, service_contact: '+234 81 100 0004', email: 'fatima.musa@lammy.capital', cash_available: 175000 },
    'user5': 	{ password: 'pass5', name: 'Chinedu Eze', aum: 4100000, ytd: 0.8, service_contact: '+234 81 100 0005', email: 'chinedu.eze@lammy.capital', cash_available: 82000 },

    'user6': 	{ password: 'pass6', name: 'Amaka Obi', aum: 7800000, ytd: 5.5, service_contact: '+234 81 100 0006', email: 'amaka.obi@lammy.capital', cash_available: 234000 },
    'user7': 	{ password: 'pass7', name: 'Jide Kolade', aum: 8500000, ytd: 7.2, service_contact: '+234 81 100 0007', email: 'jide.kolade@lammy.capital', cash_available: 425000 },
    'user8': 	{ password: 'pass8', name: 'Zainab Idris', aum: 9200000, ytd: 4.8, service_contact: '+234 81 100 0008', email: 'zainab.idris@lammy.capital', cash_available: 184000 },
    'user9': 	{ password: 'pass9', name: 'Danjuma Gombe', aum: 6900000, ytd: 6.1, service_contact: '+234 81 100 0009', email: 'danjuma.gombe@lammy.capital', cash_available: 690000 },
    'user10': 	{ password: 'pass10', name: 'Adaora Nwosu', aum: 10100000, ytd: 7.9, service_contact: '+234 81 100 0010', email: 'adaora.nwosu@lammy.capital', cash_available: 505000 },

    'user11': 	{ password: 'pass11', name: 'Kenneth Ozo', aum: 15500000, ytd: 10.5, service_contact: '+234 81 100 0011', email: 'kenneth.ozo@lammy.capital', cash_available: 310000 },
    'user12': 	{ password: 'pass12', name: 'Sadiq Kabir', aum: 18900000, ytd: 9.8, service_contact: '+234 81 100 0012', email: 'sadiq.kabir@lammy.capital', cash_available: 945000 },
    'user13': 	{ password: 'pass13', name: 'Ibrahim Yaro', aum: 21200000, ytd: 11.2, service_contact: '+234 81 100 0013', email: 'ibrahim.yaro@lammy.capital', cash_available: 1060000 },
    'user14': 	{ password: 'pass14', name: 'Ebunoluwa Coker', aum: 25000000, ytd: 8.5, service_contact: '+234 81 100 0014', email: 'ebunoluwa.coker@lammy.capital', cash_available: 1250000 },
    'user15': 	{ password: 'pass15', name: 'Obinna Ibe', aum: 30000000, ytd: 12.0, service_contact: '+234 81 100 0015', email: 'obinna.ibe@lammy.capital', cash_available: 600000 },
    
    'user16': 	{ password: 'pass16', name: 'Aisha Aliyu', aum: 45000000, ytd: 15.1, service_contact: '+234 81 100 0016', email: 'aisha.aliyu@lammy.capital', cash_available: 900000 },
    'user17': 	{ password: 'pass17', name: 'David Jones', aum: 55000000, ytd: -2.3, service_contact: '+234 81 100 0017', email: 'david.jones@lammy.capital', cash_available: 5500000 },
    'user18': 	{ password: 'pass18', name: 'Precious Umeh', aum: 62000000, ytd: 1.0, service_contact: '+234 81 100 0018', email: 'precious.umeh@lammy.capital', cash_available: 1240000 },
    'user19': 	{ password: 'pass19', name: 'Emeka Nnadi', aum: 70000000, ytd: 20.0, service_contact: '+234 81 100 0019', email: 'emeka.nnadi@lammy.capital', cash_available: 7000000 },
    'user20': 	{ password: 'pass20', name: 'Zahra Omar', aum: 950000, ytd: 0.1, service_contact: '+234 81 100 0020', email: 'zahra.omar@lammy.capital', cash_available: 95000 }
};

function handleLogin(event) {
    event.preventDefault();
    
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginError = document.getElementById('loginError');
    const loginBtn = document.getElementById('loginBtn');

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    loginBtn.innerText = 'Verifying...';
    loginError.classList.add('hidden');
    setTimeout(() => {
        
        const client = CLIENT_DATABASE[username];

        if (client && client.password === password) {
            const clientData = {
                name: client.name,
                aum: client.aum,
                ytd: client.ytd,
                service_contact: client.service_contact,
                email: client.email,
                cash_available: client.cash_available
            };
            localStorage.setItem('clientData', JSON.stringify(clientData));
            window.location.href = 'dashboard.html';
        
        } else {
            loginError.classList.remove('hidden');
            loginBtn.innerText = 'Login Securely';
        }
    }, 1000); 
}
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    if (localStorage.getItem('clientData')) {
        window.location.href = 'dashboard.html';
    }
});
