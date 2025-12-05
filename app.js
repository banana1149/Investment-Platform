
const CLIENT_DATABASE = {
    
    'Corey_113':   { password: 'CoreyDaGOAT113', name: 'Corey Crist', aum: 58794, ytd: 1.5, service_contact: '+1 (302) 250 8241' },
    'user2':   { password: 'pass2', name: 'Ngozi Okoro', aum: 2200000, ytd: 2.1, service_contact: '+234 81 100 0002' },
    'user3':   { password: 'pass3', name: 'Tunde Adebayo', aum: 1800000, ytd: -0.5, service_contact: '+234 81 100 0003' },
    'user4':   { password: 'pass4', name: 'Fatima Musa', aum: 3500000, ytd: 3.0, service_contact: '+234 81 100 0004' },
    'user5':   { password: 'pass5', name: 'Chinedu Eze', aum: 4100000, ytd: 0.8, service_contact: '+234 81 100 0005' },

    
    'user6':   { password: 'pass6', name: 'Amaka Obi', aum: 7800000, ytd: 5.5, service_contact: '+234 81 100 0006' },
    'user7':   { password: 'pass7', name: 'Jide Kolade', aum: 8500000, ytd: 7.2, service_contact: '+234 81 100 0007' },
    'user8':   { password: 'pass8', name: 'Zainab Idris', aum: 9200000, ytd: 4.8, service_contact: '+234 81 100 0008' },
    'user9':   { password: 'pass9', name: 'Danjuma Gombe', aum: 6900000, ytd: 6.1, service_contact: '+234 81 100 0009' },
    'user10':  { password: 'pass10', name: 'Adaora Nwosu', aum: 10100000, ytd: 7.9, service_contact: '+234 81 100 0010' },

    
    'user11':  { password: 'pass11', name: 'Kenneth Ozo', aum: 15500000, ytd: 10.5, service_contact: '+234 81 100 0011' },
    'user12':  { password: 'pass12', name: 'Sadiq Kabir', aum: 18900000, ytd: 9.8, service_contact: '+234 81 100 0012' },
    'user13':  { password: 'pass13', name: 'Ibrahim Yaro', aum: 21200000, ytd: 11.2, service_contact: '+234 81 100 0013' },
    'user14':  { password: 'pass14', name: 'Ebunoluwa Coker', aum: 25000000, ytd: 8.5, service_contact: '+234 81 100 0014' },
    'user15':  { password: 'pass15', name: 'Obinna Ibe', aum: 30000000, ytd: 12.0, service_contact: '+234 81 100 0015' },
    
    
    'user16':  { password: 'pass16', name: 'Aisha Aliyu', aum: 45000000, ytd: 15.1, service_contact: '+234 81 100 0016' },
    'user17':  { password: 'pass17', name: 'David Jones', aum: 55000000, ytd: -2.3, service_contact: '+234 81 100 0017' },
    'user18':  { password: 'pass18', name: 'Precious Umeh', aum: 62000000, ytd: 1.0, service_contact: '+234 81 100 0018' },
    'user19':  { password: 'pass19', name: 'Emeka Nnadi', aum: 70000000, ytd: 20.0, service_contact: '+234 81 100 0019' },
    'user20':  { password: 'pass20', name: 'Zahra Omar', aum: 950000, ytd: 0.1, service_contact: '+234 81 100 0020' }
};

/**
 * Handles the login form submission.
 * @param {Event} event 
 */
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
                service_contact: client.service_contact
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