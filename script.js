// Language support
const translations = {
    en: {
        nav: {
            products: 'Products',
            business: 'Business',
            pricing: 'Pricing',
            about: 'About',
            login: 'Log in',
            signup: 'Sign up'
        },
        hero: {
            title: 'Send money abroad. The cheap, fast way.',
            subtitle: 'Join over 16 million people who get the real exchange rate. We\'re up to 8x cheaper than banks.'
        },
        calculator: {
            amount: 'Amount',
            balance: 'Balance',
            youReceive: 'You receive',
            midMarketRate: 'Mid-market rate',
            ourFee: 'Our fee',
            total: 'Total',
            continue: 'Continue',
            searchCurrency: 'Search currency',
            swap: 'Swap currencies'
        },
        features: {
            realRate: {
                title: 'Always the real exchange rate',
                description: 'Get the rate you see on Google, never more'
            },
            cheaper: {
                title: 'Up to 8x cheaper',
                description: 'Send more and save with our low fees'
            },
            fast: {
                title: 'Fast transfers',
                description: '80% of transfers arrive in minutes'
            }
        },
        whatsapp: {
            title: 'Currency Exchange Request',
            from: 'From',
            to: 'To',
            exchangeRate: 'Exchange Rate',
            fee: 'Fee',
            total: 'Total',
            processRequest: 'Please process this exchange.',
            invalidAmount: 'Please enter a valid amount'
        }
    },
    fa: {
        nav: {
            products: 'محصولات',
            business: 'کسب و کار',
            pricing: 'قیمت‌گذاری',
            about: 'درباره ما',
            login: 'ورود',
            signup: 'ثبت نام'
        },
        hero: {
            title: 'ارسال پول به خارج از کشور. روشی ارزان و سریع.',
            subtitle: 'به بیش از 16 میلیون نفری بپیوندید که نرخ واقعی ارز را دریافت می‌کنند. ما تا 8 برابر ارزان‌تر از بانک‌ها هستیم.'
        },
        calculator: {
            amount: 'مبلغ',
            balance: 'موجودی',
            youReceive: 'دریافت می‌کنید',
            midMarketRate: 'نرخ میانگین بازار',
            ourFee: 'کارمزد ما',
            total: 'مجموع',
            continue: 'ادامه',
            searchCurrency: 'جستجوی ارز',
            swap: 'تبدیل ارزها'
        },
        features: {
            realRate: {
                title: 'همیشه نرخ واقعی تبدیل',
                description: 'نرخی که در گوگل می‌بینید را دریافت کنید، نه بیشتر'
            },
            cheaper: {
                title: 'تا 8 برابر ارزان‌تر',
                description: 'بیشتر ارسال کنید و با کارمزدهای پایین ما صرفه‌جویی کنید'
            },
            fast: {
                title: 'انتقالات سریع',
                description: '80 درصد انتقالات در عرض چند دقیقه انجام می‌شود'
            }
        },
        whatsapp: {
            title: 'درخواست تبدیل ارز',
            from: 'از',
            to: 'به',
            exchangeRate: 'نرخ تبدیل',
            fee: 'کارمزد',
            total: 'مجموع',
            processRequest: 'لطفا این تبدیل را انجام دهید.',
            invalidAmount: 'لطفا مبلغ معتبری وارد کنید'
        }
    }
};

// Currency data with flags
const currencies = {
    en: [
        { code: 'AED', name: 'UAE Dirham', countryCode: 'AE', symbol: 'د.إ' },
        { code: 'TOM', name: 'Iranian Toman', countryCode: 'IR', symbol: 'تومان' },
        { code: 'PKR', name: 'Pakistani Rupee', countryCode: 'PK', symbol: '₨' },
        { code: 'CNY', name: 'Chinese Yuan', countryCode: 'CN', symbol: '¥' },
        { code: 'EUR', name: 'Euro', countryCode: 'EU', symbol: '€' },
    ],
    fa: [
        { code: 'AED', name: 'درهم امارات', countryCode: 'AE', symbol: 'د.إ' },
        { code: 'TOM', name: 'تومان ایرانی', countryCode: 'IR', symbol: 'تومان' },
        { code: 'PKR', name: 'روپیه پاکستان', countryCode: 'PK', symbol: '₨' },
        { code: 'CNY', name: 'یوان چین', countryCode: 'CN', symbol: '¥' },
        { code: 'EUR', name: 'یورو', countryCode: 'EU', symbol: '€' },
    ]
};

// Current language
let currentLang = localStorage.getItem('language') || 'en';

// Function to get flag image URL with fallback
function getFlagImageUrl(countryCode) {
    // Use flagicons.lipis.dev which is more reliable
    return `https://flagicons.lipis.dev/flags/4x3/${countryCode.toLowerCase()}.svg`;
}

// Fallback to emoji flags if images fail to load
const flagEmojis = {
    'AE': '🇦🇪',
    'IR': '🇮🇷',
    'PK': '🇵🇰',
    'CN': '🇨🇳',
    'EU': '🇪🇺'
};

// Get current currencies based on language
function getCurrencies() {
    return currencies[currentLang] || currencies.en;
}

// Translation function
function t(key) {
    const keys = key.split('.');
    let value = translations[currentLang];
    for (const k of keys) {
        value = value?.[k];
    }
    return value || key;
}

// Update all translations on page
function updateTranslations() {
    // Update HTML lang attribute and direction
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'fa' ? 'rtl' : 'ltr';
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = t(key);
    });
    
    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        element.placeholder = t(key);
    });
    
    // Update titles
    document.querySelectorAll('[data-i18n-title]').forEach(element => {
        const key = element.getAttribute('data-i18n-title');
        element.title = t(key);
    });
    
    // Update page title
    document.title = currentLang === 'fa' 
        ? 'ریال به روپیه - ارسال ارزان و سریع پول به خارج از کشور'
        : 'Riyal 2 Rupee - The cheap, fast way to send money abroad';
}

// Exchange rates - will be loaded from API
let exchangeRates = {
    AED: { 
        TOM: 11500,
        PKR: 76.25,
        CNY: 1.98,
        EUR: 0.25
    },
    TOM: { 
        AED: 0.000087,
        PKR: 0.0025,
        CNY: 0.00017,
        EUR: 0.000022
    },
    PKR: { 
        AED: 0.013,
        TOM: 400,
        CNY: 0.026,
        EUR: 0.0033
    },
    CNY: { 
        AED: 0.51,
        TOM: 5865,
        PKR: 38.46,
        EUR: 0.13
    },
    EUR: { 
        AED: 4.0,
        TOM: 46000,
        PKR: 303.05,
        CNY: 7.88
    },
};

// API endpoint (automatically detects if on Vercel or localhost)
const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000/api/rates'
    : '/api/rates';

// Fetch exchange rates from API
async function fetchExchangeRates() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        if (data.success && data.rates) {
            exchangeRates = data.rates;
            // Recalculate if there's already an amount entered
            if (fromAmount.value && parseFormattedNumber(fromAmount.value) > 0) {
                calculateExchange();
            }
        }
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        // Keep using default rates if API fails
    }
}

// Fetch rates every 30 seconds (initial fetch happens in initialization)
setInterval(fetchExchangeRates, 30000); // Update every 30 seconds

// Fee calculation (1% fee)
const FEE_PERCENTAGE = 0.01;

// Current selections
let fromCurrency = 'AED';
let toCurrency = 'EUR';
let activeSelector = null;

// DOM elements
const fromSelector = document.getElementById('from-selector');
const toSelector = document.getElementById('to-selector');
const fromFlag = document.getElementById('from-flag');
const toFlag = document.getElementById('to-flag');
const fromCode = document.getElementById('from-code');
const toCode = document.getElementById('to-code');
const fromAmount = document.getElementById('from-amount');
const toAmount = document.getElementById('to-amount');
const exchangeRate = document.getElementById('exchange-rate');
const feeAmount = document.getElementById('fee-amount');
const totalAmount = document.getElementById('total-amount');
const swapBtn = document.getElementById('swap-btn');
const exchangeBtn = document.getElementById('exchange-btn');
const currencyDropdown = document.getElementById('currency-dropdown');
const currencyList = document.getElementById('currency-list');
const currencySearch = document.getElementById('currency-search');

// Format number with commas
function formatNumber(num, currencyCode = null) {
    // For Toman (very large numbers), don't show decimals
    if (currencyCode === 'TOM') {
        return Math.round(num).toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
    }
    return num.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// Parse formatted number
function parseFormattedNumber(str) {
    return parseFloat(str.replace(/,/g, '')) || 0;
}

// Get currency symbol
function getCurrencySymbol(code) {
    const currencyListData = getCurrencies();
    const currency = currencyListData.find(c => c.code === code);
    return currency ? currency.symbol : '';
}

// Update currency display
function updateCurrencyDisplay(selector, flagElement, code, currencyCode) {
    const currencyListData = getCurrencies();
    const currency = currencyListData.find(c => c.code === currencyCode);
    if (currency) {
        // Update flag image with error fallback
        const img = document.createElement('img');
        img.src = getFlagImageUrl(currency.countryCode);
        img.alt = `${currency.name} flag`;
        img.className = 'flag-img';
        img.onerror = function() {
            // Fallback to emoji if image fails to load
            this.style.display = 'none';
            flagElement.innerHTML = `<span class="flag-emoji">${flagEmojis[currency.countryCode] || '🏳️'}</span>`;
        };
        flagElement.innerHTML = '';
        flagElement.appendChild(img);
        code.textContent = currencyCode;
    }
}

// Calculate exchange
function calculateExchange() {
    const amount = parseFormattedNumber(fromAmount.value);
    if (amount === 0 || isNaN(amount)) {
        toAmount.value = '0.00';
        feeAmount.textContent = '$0.00';
        totalAmount.textContent = '$0.00';
        return;
    }

    let rate = 1;
    if (fromCurrency !== toCurrency) {
        rate = exchangeRates[fromCurrency]?.[toCurrency] || (1 / exchangeRates[toCurrency]?.[fromCurrency]);
    }

    const fee = amount * FEE_PERCENTAGE;
    const total = amount + fee;
    const converted = amount * rate;

    // Update display
    toAmount.value = formatNumber(converted, toCurrency);
    
    const fromSymbol = getCurrencySymbol(fromCurrency);
    feeAmount.textContent = `${fromSymbol}${formatNumber(fee, fromCurrency)}`;
    totalAmount.textContent = `${fromSymbol}${formatNumber(total, fromCurrency)}`;
    
    // Update rate display (format rate based on currency)
    let rateDisplay = rate;
    if (toCurrency === 'TOM' || fromCurrency === 'TOM') {
        rateDisplay = rate.toFixed(0);
    } else {
        rateDisplay = rate.toFixed(4);
    }
    exchangeRate.textContent = `1 ${fromCurrency} = ${rateDisplay} ${toCurrency}`;
}

// Populate currency dropdown
function populateCurrencyList(filter = '') {
    currencyList.innerHTML = '';
    const currencyListData = getCurrencies();
    const filtered = currencyListData.filter(c => 
        c.code.toLowerCase().includes(filter.toLowerCase()) ||
        c.name.toLowerCase().includes(filter.toLowerCase())
    );

    filtered.forEach(currency => {
        const option = document.createElement('div');
        option.className = 'currency-option';
        if (currency.code === (activeSelector === 'from' ? fromCurrency : toCurrency)) {
            option.classList.add('selected');
        }
        
        const flagImg = document.createElement('img');
        flagImg.src = getFlagImageUrl(currency.countryCode);
        flagImg.alt = `${currency.name} flag`;
        flagImg.className = 'flag-img';
        flagImg.onerror = function() {
            this.style.display = 'none';
            const emoji = document.createElement('span');
            emoji.className = 'flag-emoji';
            emoji.textContent = flagEmojis[currency.countryCode] || '🏳️';
            this.parentElement.replaceChild(emoji, this);
        };
        
        const flagSpan = document.createElement('span');
        flagSpan.className = 'currency-option-flag';
        flagSpan.appendChild(flagImg);
        
        const infoDiv = document.createElement('div');
        infoDiv.className = 'currency-option-info';
        infoDiv.innerHTML = `
            <span class="currency-option-code">${currency.code}</span>
            <span class="currency-option-name">${currency.name}</span>
        `;
        
        option.appendChild(flagSpan);
        option.appendChild(infoDiv);
        
        option.addEventListener('click', () => {
            if (activeSelector === 'from') {
                fromCurrency = currency.code;
                updateCurrencyDisplay(fromSelector, fromFlag, fromCode, fromCurrency);
            } else {
                toCurrency = currency.code;
                updateCurrencyDisplay(toSelector, toFlag, toCode, toCurrency);
            }
            closeDropdown();
            calculateExchange();
        });
        
        currencyList.appendChild(option);
    });
}

// Open dropdown
function openDropdown(selector) {
    activeSelector = selector;
    currencyDropdown.classList.add('active');
    currencySearch.value = '';
    populateCurrencyList();
    currencySearch.focus();
}

// Close dropdown
function closeDropdown() {
    currencyDropdown.classList.remove('active');
    activeSelector = null;
}

// Event listeners
fromSelector.addEventListener('click', (e) => {
    e.stopPropagation();
    openDropdown('from');
});

toSelector.addEventListener('click', (e) => {
    e.stopPropagation();
    openDropdown('to');
});

swapBtn.addEventListener('click', () => {
    const temp = fromCurrency;
    fromCurrency = toCurrency;
    toCurrency = temp;
    
    updateCurrencyDisplay(fromSelector, fromFlag, fromCode, fromCurrency);
    updateCurrencyDisplay(toSelector, toFlag, toCode, toCurrency);
    
    const tempAmount = fromAmount.value;
    fromAmount.value = toAmount.value;
    toAmount.value = tempAmount;
    
    calculateExchange();
});

fromAmount.addEventListener('input', (e) => {
    let value = e.target.value.replace(/[^\d,.]/g, '');
    const parts = value.split('.');
    if (parts.length > 2) {
        value = parts[0] + '.' + parts.slice(1).join('');
    }
    e.target.value = value;
    calculateExchange();
});

currencySearch.addEventListener('input', (e) => {
    populateCurrencyList(e.target.value);
});

// Close dropdown on outside click
document.addEventListener('click', (e) => {
    if (!currencyDropdown.contains(e.target) && 
        !fromSelector.contains(e.target) && 
        !toSelector.contains(e.target)) {
        closeDropdown();
    }
});

// Close dropdown on Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeDropdown();
    }
});

// Exchange button - Send WhatsApp message
exchangeBtn.addEventListener('click', () => {
    const amount = parseFormattedNumber(fromAmount.value);
    if (amount <= 0) {
        alert(t('whatsapp.invalidAmount'));
        return;
    }
    
    const toAmountValue = parseFormattedNumber(toAmount.value);
    const fee = amount * FEE_PERCENTAGE;
    const total = amount + fee;
    
    // Calculate current exchange rate for message
    let rate = 1;
    if (fromCurrency !== toCurrency) {
        rate = exchangeRates[fromCurrency]?.[toCurrency] || (1 / exchangeRates[toCurrency]?.[fromCurrency]);
    }
    let rateDisplay = rate;
    if (toCurrency === 'TOM' || fromCurrency === 'TOM') {
        rateDisplay = rate.toFixed(0);
    } else {
        rateDisplay = rate.toFixed(4);
    }
    
    // Format the message in current language
    const currencyListData = getCurrencies();
    const fromCurrencyData = currencyListData.find(c => c.code === fromCurrency);
    const toCurrencyData = currencyListData.find(c => c.code === toCurrency);
    
    const message = `💱 ${t('whatsapp.title')}

${t('whatsapp.from')}: ${formatNumber(amount, fromCurrency)} ${fromCurrency} (${fromCurrencyData.name})
${t('whatsapp.to')}: ${formatNumber(toAmountValue, toCurrency)} ${toCurrency} (${toCurrencyData.name})

${t('whatsapp.exchangeRate')}: 1 ${fromCurrency} = ${rateDisplay} ${toCurrency}
${t('whatsapp.fee')}: ${getCurrencySymbol(fromCurrency)}${formatNumber(fee, fromCurrency)}
${t('whatsapp.total')}: ${getCurrencySymbol(fromCurrency)}${formatNumber(total, fromCurrency)}

${t('whatsapp.processRequest')}`;
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Open WhatsApp with pre-filled message
    const whatsappUrl = `https://wa.me/989300446376?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
});

// Language switcher
const langSwitcher = document.getElementById('lang-switcher');
langSwitcher.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'fa' : 'en';
    localStorage.setItem('language', currentLang);
    updateTranslations();
    // Re-populate currency list if dropdown is open
    if (currencyDropdown.classList.contains('active')) {
        populateCurrencyList(currencySearch.value);
    }
    // Recalculate and update display
    calculateExchange();
});

// Initialize
updateTranslations();
updateCurrencyDisplay(fromSelector, fromFlag, fromCode, fromCurrency);
updateCurrencyDisplay(toSelector, toFlag, toCode, toCurrency);

// Initialize after rates are loaded
fetchExchangeRates().then(() => {
    calculateExchange();
});
