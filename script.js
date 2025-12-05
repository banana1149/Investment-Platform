let clientData = null;
const WITHDRAWAL_LIMIT = 1; 
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
});

function randomSeed(a) {
    return function() {
        a = (a + 0x9e3779b9 + (a << 6) + (a >> 2)) & 0xFFFFFFFF;
        return (a % 100000) / 100000;
    }
}

/**
 
 * @param {number} aum 
 */
function renderHoldings(aum) {
    const holdingsBody = document.getElementById('holdingsTableBody');
    holdingsBody.innerHTML = ''; 

    const allocation = [
        { name: 'Global Equity Fund (LGEF)', weight: 0.50, change: 0.85 },
        { name: 'Fixed Income (LFI)', weight: 0.25, change: -0.12 },
        { name: 'Alternative Investments', weight: 0.224, change: 0.40 },
        { name: 'Cash & Equivalents', weight: 0.026, change: 0.00 }
    ];

    allocation.forEach(asset => {
        const value = aum * asset.weight;
        const changeColor = asset.change > 0 ? 'text-green-400' : (asset.change < 0 ? 'text-red-400' : 'text-slate-400');
        const changeText = asset.change === 0 ? '0.00%' : (asset.change > 0 ? `+${asset.change.toFixed(2)}%` : `${asset.change.toFixed(2)}%`);
        
        const row = `
            <tr class="hover:bg-brand-navy transition-colors">
                <td class="px-6 py-4 whitespace-nowrap font-medium text-white">${asset.name}</td>
                <td class="px-6 py-4 whitespace-nowrap text-right">${formatter.format(value)}</td>
                <td class="px-6 py-4 whitespace-nowrap text-right">${(asset.weight * 100).toFixed(1)}%</td>
                <td class="px-6 py-4 whitespace-nowrap text-right ${changeColor}">${changeText}</td>
            </tr>
        `;
        holdingsBody.innerHTML += row;
    });
}

/**
 * @param {number} ytd 
 */
function setRiskProfile(ytd) {
    const profileDisplay = document.getElementById('riskProfileDisplay');
    const pointer = document.getElementById('riskPointer');
    let profile = '';
    let position = 0; 

    if (ytd <= 2) {
        profile = 'Conservative';
        position = 10;
        pointer.style.backgroundColor = '#10b981';
    } else if (ytd <= 8) {
        profile = 'Balanced';
        position = 50;
        pointer.style.backgroundColor = '#fcd34d';
    } else {
        profile = 'Growth Focused';
        position = 90;
        pointer.style.backgroundColor = '#ef4444';
    }

    profileDisplay.innerText = profile;
    pointer.style.left = `${position}%`;
    pointer.style.transform = 'translateX(-50%)'; 
}

/**
 * @param {string} clientName 
 * @param {number} aum 
 */
function generateMockTransactions(clientName, aum) {
    const transactionsTableBody = document.getElementById('transactionsTableBody');
    transactionsTableBody.innerHTML = ''; 

    let seed = clientName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const rng = randomSeed(seed); 

    const types = ['Deposit', 'Withdrawal', 'Fee Payment', 'Investment Buy'];
    const statuses = ['Completed', 'Completed', 'Pending', 'Failed'];
    const baseAmount = aum * 0.001; 

    const numTransactions = Math.floor(rng() * 3) + 4;
    const today = new Date('2025-12-05'); 
    for (let i = 0; i < numTransactions; i++) {
        
        const amount = Math.floor(baseAmount * (rng() * 5 + 1)) * 100;
        const type = types[Math.floor(rng() * types.length)];
        const status = statuses[Math.floor(rng() * statuses.length)];
        
      
        const daysAgo = Math.floor(rng() * 60) + 1;
        const transDate = new Date(today);
        transDate.setDate(today.getDate() - daysAgo);
        const dateString = transDate.toISOString().substring(0, 10); // YYYY-MM-DD
        
        let typeColor = 'text-slate-300';
        let statusColor = 'text-slate-400';
        
        if (type === 'Deposit' || type === 'Investment Buy') {
            typeColor = 'text-green-400';
        } else if (type === 'Withdrawal' || type === 'Fee Payment') {
            typeColor = 'text-red-400';
        }

        if (status === 'Completed') {
            statusColor = 'text-green-400';
        } else if (status === 'Pending') {
            statusColor = 'text-yellow-400';
        } else if (status === 'Failed') {
            statusColor = 'text-red-400';
        }

        const row = `
            <tr class="hover:bg-brand-navy transition-colors">
                <td class="px-6 py-3 whitespace-nowrap">${dateString}</td>
                <td class="px-6 py-3 whitespace-nowrap ${typeColor}">${type}</td>
                <td class="px-6 py-3 whitespace-nowrap text-right ${typeColor}">${(type === 'Deposit' ? '' : '-')}${formatter.format(amount)}</td>
                <td class="px-6 py-3 whitespace-nowrap ${statusColor}">${status}</td>
            </tr>
        `;
        transactionsTableBody.innerHTML += row;
    }
}

function showWithdrawalModal() {
    document.getElementById('withdrawalForm').reset(); 
    document.getElementById('withdrawalSuccess').classList.add('hidden');
    document.getElementById('withdrawalForm').classList.remove('hidden');
    document.getElementById('withdrawalModal').classList.remove('hidden');
    document.getElementById('withdrawalModal').classList.add('flex');
    
    // Ensure error modal is closed
    closeModal('withdrawalErrorModal');
}

/**
 * @param {string} id 
 */
function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

/**
.
 * @param {Event} event - The form submission event.
 */
function handleWithdrawal(event) {
    event.preventDefault();
    
    const amountInput = document.getElementById('withdrawalAmount');
    const amount = parseFloat(amountInput.value);
    
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid withdrawal amount.");
        return;
    }

    document.getElementById('withdrawBtn').innerText = 'Processing...';
    document.getElementById('withdrawBtn').disabled = true;
    

    setTimeout(() => {
        closeModal('withdrawalModal');
    }, 500);


    setTimeout(() => {
        
        
        if (amount > WITHDRAWAL_LIMIT) {
            document.getElementById('serviceContactDisplay').innerText = clientData.service_contact;
            document.getElementById('errorAmountDisplay').innerText = formatter.format(amount);
            
            document.getElementById('withdrawalErrorModal').classList.remove('hidden');
            document.getElementById('withdrawalErrorModal').classList.add('flex');

            console.warn(`SECURITY PROTOCOL: Withdrawal request for $${amount.toLocaleString()} logged. Client must contact service officer regarding the 10% service fee.`);
        } else {
        
            showWithdrawalModal(); 
            document.getElementById('withdrawalForm').classList.add('hidden');
            document.getElementById('successAmount').innerText = formatter.format(amount);
            document.getElementById('withdrawalSuccess').classList.remove('hidden');
            
            console.log(`MOCK TRANSACTION: Client ${clientData.name} requested tiny withdrawal of ${formatter.format(amount)}.`);
        }
        
      
        document.getElementById('withdrawBtn').innerText = 'Confirm Request';
        document.getElementById('withdrawBtn').disabled = false;

    }, 1500); 
}

function logout() {
    localStorage.removeItem('clientData');
    alert("You have been securely logged out.");

    window.location.href = 'index.html'; 
}

document.addEventListener('DOMContentLoaded', () => {
    const clientDataString = localStorage.getItem('clientData');
    
    if (!clientDataString) {
    
        window.location.href = 'index.html';
        return;
    }

    try {
        clientData = JSON.parse(clientDataString);

        document.getElementById('welcomeMessage').innerText = `Welcome, ${clientData.name.split(' ')[0]}!`;
        document.getElementById('clientNameDisplay').innerText = clientData.name;

        
        document.getElementById('totalAUMDisplay').innerText = formatter.format(clientData.aum);
        
        const ytdElement = document.getElementById('ytdReturnDisplay');
        ytdElement.innerText = `${clientData.ytd.toFixed(2)}%`;

        const changeElement = document.getElementById('ytdChangeDisplay');
        const changeColor = clientData.ytd > 0 ? 'text-green-400' : 'text-red-400';
        const changeSign = clientData.ytd > 0 ? '+' : '';
        changeElement.className = `text-sm ${changeColor} ml-2`;
        changeElement.innerText = `${changeSign}${clientData.ytd.toFixed(1)}%`;
        
       
        setRiskProfile(clientData.ytd);

        
        renderHoldings(clientData.aum);
        
       
        generateMockTransactions(clientData.name, clientData.aum);


    } catch (e) {
        console.error("Error parsing client data:", e);
        
        window.location.href = 'index.html'; 
    }
});