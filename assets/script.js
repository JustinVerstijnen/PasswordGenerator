
const charset = {
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lower: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()-_=+[]{}|;:,.<>?/",
    similar: "il1Lo0O"
};

function generatePassword(options) {
    let chars = "";

    if (options.upper) chars += charset.upper;
    if (options.lower) chars += charset.lower;
    if (options.numbers) chars += charset.numbers;
    if (options.symbols) chars += charset.symbols;

    if (options.excludeSimilar) {
        chars = chars.split('').filter(c => !charset.similar.includes(c)).join('');
    }

    if (chars.length === 0) return "";

    let password = "";
    for (let i = 0; i < options.length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

document.addEventListener('DOMContentLoaded', () => {
    const modeRadios = document.querySelectorAll('input[name="mode"]');
    const customizeSection = document.getElementById('customize');
    const generateBtn = document.getElementById('generateBtn');
    const resultField = document.getElementById('result');

    modeRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            customizeSection.style.display = (radio.value === 'password') ? 'block' : 'none';
        });
    });

    generateBtn.addEventListener('click', () => {
        const mode = document.querySelector('input[name="mode"]:checked').value;

        if (mode === 'secret') {
            resultField.value = generatePassword({
                length: 60,
                upper: true,
                lower: true,
                numbers: true,
                symbols: true,
                excludeSimilar: false
            });
        } else {
            const length = parseInt(document.getElementById('length').value);
            resultField.value = generatePassword({
                length,
                upper: document.getElementById('uppercase').checked,
                lower: document.getElementById('lowercase').checked,
                numbers: document.getElementById('numbers').checked,
                symbols: document.getElementById('symbols').checked,
                excludeSimilar: document.getElementById('excludeSimilar').checked
            });
        }
    });
});
