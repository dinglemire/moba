// ==========================================
// 🛠️ ADD NEW MOTHERBOARDS HERE
// ==========================================
const database = [
    {
        id: "asrock-x870e",
        name: "ASRock X870E Nova WiFi",
        image: "src/images/asrock_nova.jpg", // Make sure this file exists or delete this line
        description: "Focus: Low Latency, No Bloat, Win10 Optimization.",
        sections: [
            {
                title: "⚡ CPU & Power",
                items: [
                    { name: "PBO (Precision Boost Overdrive)", value: "Advanced", desc: "Set Curve Optimizer to -20 (All Core) for efficiency." },
                    { name: "Global C-State Control", value: "Disabled", desc: "Prevents deep sleep, reduces micro-stutter." },
                    { name: "PSS Support", value: "Disabled", desc: "Disables Cool'n'Quiet / Frequency scaling." },
                    { name: "Power Supply Idle Control", value: "Typical Current Idle", desc: "Fixes PSU disconnects/crashes." }
                ]
            },
            {
                title: "🧠 Memory (DRAM)",
                items: [
                    { name: "DRAM Profile", value: "EXPO / XMP", desc: "Base speed profile." },
                    { name: "Memory Context Restore", value: "Disabled", desc: "Slower boot, but maximum stability." },
                    { name: "Power Down Mode", value: "Disabled", desc: "Keeps RAM active, reduces latency." },
                    { name: "DRAM Performance Mode", value: "Aggressive", desc: "Tightens secondary timings." }
                ]
            },
            {
                title: "🔒 Security & Boot",
                items: [
                    { name: "fTPM / Security Device", value: "Disabled", desc: "Removes TPM stuttering." },
                    { name: "Secure Boot", value: "Disabled", desc: "Faster boot, no key checks." },
                    { name: "CSM", value: "Disabled", desc: "Pure UEFI mode." },
                    { name: "Fast Boot", value: "Disabled", desc: "Ensures full hardware training." }
                ]
            },
            {
                title: "🎮 PCIe & Devices",
                items: [
                    { name: "Re-Size BAR", value: "Enabled", desc: "Critical for GPU performance." },
                    { name: "iGPU / Onboard GFX", value: "Disabled", desc: "Forces Dedicated GPU usage." },
                    { name: "HD Audio / Wi-Fi / BT", value: "Disabled", desc: "Disable if unused to save IRQ resources." }
                ]
            }
        ]
    },
    {
        id: "gigabyte-b650e",
        name: "Gigabyte B650E AORUS STEALTH",
        image: "src/images/gigabyte_stealth.jpg", // Make sure this file exists
        description: "Aorus Ice Optimization. Key locations: 'Tweaker' and 'Settings'.",
        sections: [
            {
                title: "⚡ Tweaker (CPU & RAM)",
                items: [
                    { name: "Extreme Memory Profile", value: "EXPO 1", desc: "Load RAM Timings." },
                    { name: "Precision Boost Overdrive", value: "Advanced", desc: "Go to Curve Optimizer -> All Cores -> Negative -> 20." },
                    { name: "Vcore SOC", value: "1.25V (Manual)", desc: "Gigabyte tends to push this high on Auto. Cap it." },
                    { name: "CPU Vcore Loadline Calibration", value: "Turbo", desc: "Helps maintain voltage under load." }
                ]
            },
            {
                title: "⚙️ Settings > IO Ports",
                items: [
                    { name: "Internal Graphics", value: "Disabled", desc: "Turn off the CPU's built-in GPU." },
                    { name: "Re-Size BAR Support", value: "Auto/Enabled", desc: "Required for modern GPUs." },
                    { name: "Above 4G Decoding", value: "Enabled", desc: "Required for Re-Size BAR." },
                    { name: "HD Audio Controller", value: "Disabled", desc: "Disable if using USB DAC/Audio interface." }
                ]
            },
            {
                title: "⚙️ Settings > Miscellaneous",
                items: [
                    { name: "Trusted Computing", value: "Disable Security Device", desc: "Disables TPM." },
                    { name: "TSME", value: "Disabled", desc: "Transparent Secure Memory Encryption." },
                    { name: "LEDs in System Power On", value: "Off", desc: "Dark mode." }
                ]
            },
            {
                title: "🔌 AMD CBS (Power)",
                items: [
                    { name: "Global C-state Control", value: "Disabled", desc: "Location: AMD CBS > CPU Common Options." },
                    { name: "Power Supply Idle Control", value: "Typical Current Idle", desc: "Prevents low-power crashes." },
                    { name: "IOMMU", value: "Disabled", desc: "Reduces virtualization overhead (unless using VMs)." }
                ]
            },
            {
                title: "🚀 Boot",
                items: [
                    { name: "Fast Boot", value: "Disabled / Ultra Fast", desc: "Disabled is safer. Ultra Fast skips USB init." },
                    { name: "CSM Support", value: "Disabled", desc: "Must be off for Re-Size BAR." },
                    { name: "Full Screen LOGO Show", value: "Disabled", desc: "See POST codes instead of Aorus Falcon." }
                ]
            }
        ]
    }
];

// ==========================================
// ⚙️ APP LOGIC (DO NOT TOUCH BELOW)
// ==========================================

const nav = document.getElementById('mobo-list');
const content = document.getElementById('content-area');

// 1. Render Buttons
function renderButtons() {
    nav.innerHTML = '';
    database.forEach(board => {
        const btn = document.createElement('button');
        btn.className = 'mobo-btn';
        btn.innerText = board.name;
        btn.onclick = () => loadBoard(board);
        nav.appendChild(btn);
    });
}

// 2. Load Board Content
function loadBoard(board) {
    // Highlight active button
    document.querySelectorAll('.mobo-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');

    let html = `
        <div class="mobo-header">
            <h1>${board.name}</h1>
            <p>${board.description}</p>
            ${board.image ? `<img src="${board.image}" class="mobo-img" onerror="this.style.display='none'">` : ''}
        </div>
    `;

    board.sections.forEach(section => {
        html += `
            <div class="category-block">
                <div class="category-title">${section.title}</div>
                <div>
        `;
        
        section.items.forEach(item => {
            html += `
                <div class="setting-row">
                    <div>
                        <div class="setting-name">${item.name}</div>
                        <div class="setting-desc">${item.desc}</div>
                    </div>
                    <div class="setting-value">${item.value}</div>
                </div>
            `;
        });

        html += `</div></div>`;
    });

    content.innerHTML = html;
}

// Initialize
renderButtons();