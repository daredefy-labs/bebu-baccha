// ==================== 1. SECURITY & ANTI-INSPECT ====================
document.addEventListener('contextmenu', event => event.preventDefault());
document.onkeydown = function (e) {
    if (e.keyCode == 123) return false;
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) return false;
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) return false;
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) return false;
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) return false;
};

// ==================== 2. FIREBASE ARCHITECTURE ====================
const firebaseConfig = {
    apiKey: "AIzaSyC7WXSZw0LEcRgkNEq0biY7IwCQVmvKBWY",
    authDomain: "sachin-shubhi.firebaseapp.com",
    databaseURL: "https://sachin-shubhi-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "sachin-shubhi",
    storageBucket: "sachin-shubhi.firebasestorage.app"
};

if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }
const db = firebase.database();

let currentProfile = localStorage.getItem("current_love_user") || null;
let currentPeer = currentProfile === "Sachin" ? "Shubhi" : "Sachin";

const nicknamesDataset = [
    "Gullu Mullu 💕🦢", "My Love 💖🦢", "Pyari Cutiee 🥰💖", "My Happiness 💐👩‍❤️‍👨", "Environment 🌸😍",
    "My Chocobar 💛💝", "My Lifeline 💑🐣", "My Heart 🦢💖", "Meri Rasguliii 💛💫", "My love 🌈💗",
    "Shubhi bebu 🍇🤍", "Meri Babu 🍬💚", "Shubhi Singh 🍫🧚‍", "Meri Pyari 🎀🧝‍", "My Wifeyy🏡👰‍♀️",
    "My Lady🏍👩‍💼", "My Queen 🌺👸", "My Baccha 💐👩‍❤️‍👨", "Meri Ladoo 🦋💃", "Sweetheart 💞👩", "janeman 👰🥰",
    "Meri Fuljadhi 🙌❤️", "Gulabjamun 🤗🎊", "Mine Bebu 🦚🍥", "My Cutie 😍🥰", "Cutie Pie 🤲💝",
    "Meri Swittu 🤗🎀", "Mere sacchu 💐👩‍❤️‍👨", "Meri Bebu 🤍🦢", "My Baby 💝🌼", "Rashbharrrriii 💖😍", "Jane Jahaa 🤫🐣",
    "Jane Jiger ❤️🥰", "hot Chocolate 💋💕", "Meri Apsara 💍👑", " Mera Hero 💐👩‍❤️‍👨", "Shubhi Meena 🎀💐", "Eleget Lady🌹🎀",
    "Spicey Jaan 🥳💞", "Meri Hotty 💐🎀", "Meri Rani 👩‍❤️‍👨💓", "Meri Morni 🦚💕", "Sonababu 🎀🌷",
    "TheOnlyOne🔒🥰", "Laddo Rani 🎀🔥", "Hotty Bebu 🥰🔥",
];

const timelineDataset = [
    { time: "15 September 2000", title: "Sachin's (Baccha) Birthday 🎂", desc: "Is duniya me mera aana tabhi safal hua jab khuda ne meri kismat ko aage jaakar tumse jod diya.Meri zindagi ki shuruwat aapse hi hoti hai." },
    { time: "12 July 2003", title: "Shubhi's (Bebu) Birthday 🎂", desc: "Zindagi ka sabsé khoobsurat din, kyunki aaj ke din meri poori duniya, meri khushi, aur meri wifey ne is dharti par kadam rakha tha." },
    { time: "28 October 2025", title: "First Talk Online on Telegram 💬", desc: "Ek anjaan sa click aur wahan se shuru hua baaton ka silsila. Pata nahi tha ki Telegram par shuru hui ye chat ek din meri saanso ki zaroorat ban jayegi.", quote: "Pehli baar jab tumse baat hui, dil ko sukoon mil gaya..." },
    { time: "24 December 2025", title: "Baccha Propose Bebu 'Yes' 💍", desc: "Wo pal jab maine apne dil ki baat kahi aur aapne muskura kar 'Haan' kaha. Us din se lekar aaj tak, main poori tarah sirf aur sirf aapka ho chuka hoon.", quote: "Duniya ki sabsé badi khushi aapka haan kehna tha..." },
    { time: "26 December 2025", title: "First Private Day (Romantic) 🌹", desc: "Humare ishq ka wo pehla roohani aur romantic din. Jab duriyaan mit gayi thi aur sirf hum dono ki dhadkanein ek doosre se baatein kar rahi thi." },
    { time: "03 January 2026", title: "First Hot Talks 🔥", desc: "Ishq ka wo daur jahan humari baaton me shararat, deewanapan aur ek doosre ko paane ki shiddat sabse gahri ho gayi thi. laila aur majnu ki trh pagalpen tha." },
    { time: "12 July 2026", title: "Celebrating My Queen's Birthday 👑✨", desc: "Happy Birthday meri jaan, meri rasgulli, meri shubhi bebu! Aaj aapka janamdin hai aur sachin ka aapse ek wada hai—main aapse hamesha tutkar pyaar karunga aur aapki aankhon me kabhi aansu nahi aane dunga. Future plans me sirf aur sirf hum dono hain, hamesha ke liye ek sath!", quote: "Aap meri zindagi ka sabsé haseen tohfa ho bebu. I love you!" }
];

const bdayStoryHTML = `
    <div class="bday-wrapper">
        <div class="svg-header-icon">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx='30' cy='35' r='12' fill='#ff4b91' opacity='0.9'/>
                <path d='M30 47 Q32 58 27 68' stroke='#ffb6d9' stroke-width='1.5' fill='none'/>
                <circle cx='70' cy='32' r='11' fill='#d946ef' opacity='0.9'/>
                <path d='M70 43 Q68 54 73 65' stroke='#ffb6d9' stroke-width='1.5' fill='none'/>
                <rect x="38" y="65" width="24" height="12" rx="2" fill="#ffb6d9"/>
                <rect x="42" y="55" width="16" height="10" rx="1" fill="#ff69b4"/>
                <line x1="50" y1="55" x2="50" y2="48" stroke="#ffd700" stroke-width="2"/>
                <circle cx="50" cy="45" r="2" fill="#ff4500"/>
            </svg>
        </div>
        <h3>Happy Birthday, My Precious Shubhi! 🎂✨</h3>
        <div class="bday-subtitle">A Journey from a Telegram Study Group to the Deepest Corners of My Heart ❤️</div>
        <div class="story-section">
            <h4>✨ Chapter 1: Telegram Par Wo Pehli Mulaqat... 📖</h4>
            <p>Shubhi, aaj tumhaare janamdin ke is behad khaas aur paavan mauke par, main apne dil ke saare darwaaje khol kar tumse apne dil ki baat kehna chahta hoon. Mera dil sach mein bohot zyada bhara hua hai kyunki kaash tum dekh paati ki tum mere liye kya mayne rakhti ho. Sab kuch kitna aam shuru hua tha na? Ek chhota sa Telegram study group, jahan hum sirf padhai ke silsile mein mile the. Mujhe aaj bhi yaad hai wo shuruwaati din jab hamari baatein sirf padhai aur career ko lekar hua karti thi. Lekin kehte hain na ki jab kismat ko do dilon ko jodna hota hai, toh wo sabse anokhe raste chunti hai. Wo study group hamare liye sirf ek jariya tha, asli maksad toh hum dono ka ek doosre ke kareeb aana tha. 🌟✍️</p>
            <p>Us shuruwaati daur mein, jab hum dosto ki tarah baatein karte the, tabhi se mere dil mein tumhaare liye ek bohot hi alag aur izzat wali jagah banne lagi thi. Tumhari baatein, tumhara har ek cheez ko dekhne ka tarika, aur tumhari masoomiyat mujhe dheere-dheere tumhari taraf kheench rahi thi. Tumhe lagta hoga ki main bas ek casual friend tha, par sach toh ye hai ki main tumhaari har choti baat ko note karta tha. Mujhe tumhaara sath itna pasand aane laga tha ki main har waqt bas isi intezar mein rehta tha ki kab tumhara koi message aaye. Dosti ka wo daur hamari foundation tha, jahan humne ek doosre ko samjha aur jana. 🌸💬</p>
        </div>
        <div class="heart-divider">❤️❤️❤️</div>
        <div class="story-section">
            <h4>🤝 Chapter 2: Wo Waqt Jab Dil Ne Dil Ko Pehchana... ⏳</h4>
            <p>Waqt bit-ta gaya aur jaise-jaise humne ek sath zyada waqt guzarna shuru kiya, mujhe ehsaas hua ki tum mere liye sirf ek acchi dost nahi ho, balki tum meri zindagi ka wo hissa ban chuki ho jiske bina main adhoora hoon. Main shuru se hi tumhaare sath bohot sincere tha. Maine kabhi bhi hamare rishte ko kisi mazaak ya choti baat ki tarah nahi liya. Mere dil mein tumhaare liye jo feelings thin, wo ekdum pakki aur sachi thin. Jab hum dono ne ek doosre ke sath dher saari baatein share keen, apne dukh-sukh baante, tab mujhe tumhaari zindagi ke baare mein aur tumhein meri zindagi ke baare mein bohot kuch pata chala. 🥰🌻</p>
            <p>Ek sath waqt bitane ka sabse khoobsurat fayda ye hua ki hum dono ek doosre ki aadat ban gaye. Main jab bhi tumse baat karta tha, mujhe ek alag hi sukoon milta tha. Maine mehsoos kiya ki tumhari har baat mein ek sachai hai jo aaj ki duniya mein milna bohot mushkil hai. Hum dono ne padhai ke sath-sath zindagi ke har pehlu par baat ki, aur har beet te din ke sath hamari understanding itni solid ho gayi ki hum bina kahe bhi ek doosre ke mood ko samajhne lage. Wo waqt bohot anmol tha, jisne mujhe ye yakeen dilaya ki tum hi wo ladki ho jiske sath main apni poori zindagi bitana chahta hoon. 🔗❤️</p>
        </div>
        <div class="highlight-quote">
            "Telegram ke study group se shuru hua safar, ab meri har ek saans ka hissa ban chuka hai. Shubhi, tum meri dosti bhi ho aur mera pehla aur aakhri pyaar bhi! 🥰🦚"
        </div>
        <div class="story-section">
            <h4>🎉 Chapter 3: Lifetime Vows & Celebrations... ♾️</h4>
            <p>Mera har ek lamha, meri har ek koshish aur mera har ek sapna ab tumse shuru hokar tumhi par khatam hota hai. Maine aaj tumhaare is birthday ko special banane ke liye bhale hi bohot kuch kiya ho, lekin sach toh ye hai ki tumne meri zindagi mein aakar meri poori life ko hi ek celebration bana diya hai. Main tumse vaada karta hoon ki chahe zindagi mein koi bhi mod aaye, main humesha tumhaare sath utni hi sincerity aur imaandari ke sath khada rahunga jaise main Telegram group par hamari pehli baat ke waqt tha. Tumhaari khushi meri sabse badi priority hai, aur tumhaari muskaan meri duniya ki sabse pyari cheez hai. 😊💕</p>
            <p>Aaj tumhaare is janamdin par main bhagwan se bas yahi dua karta hoon ki tumhaare chehre par ye happiness humesha bani rahe. Hum dono ka ye sath jo dosti se shuru hokar pyaar tak pahuncha hai, wo shadi aur ek khoobsurat parivar tak jaye. Humesha yaad rakhna Shubhi, tumhaara ye partner tumse bepannah aur behad sacha pyaar karta hai. Tumhaare is din ko dher saare cake, balloons, aur hamari pyari yaadon ke sath main bohot zyada special banana chahta hoon. Happy Birthday once again, my heartbeat, my wifey, my everything! 🎂🥳👑💖</p>
        </div>
    </div>
`;

const proposeStoryHTML = `
    <div class="bday-wrapper">
        <div class="svg-header-icon">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="45" r="18" fill="none" stroke="#ffd700" stroke-width="4"/>
                <rect x="45" y="20" width="10" height="10" fill="#b0e0e6" transform="rotate(45 50 25)"/>
                <path d="M50 40 C45 30, 35 30, 35 42 C35 52, 50 65, 50 65 C50 65, 65 52, 65 42 C65 30, 55 30, 50 40 Z" fill="#ff4b91"/>
            </svg>
        </div>
        <h3>Propose Anniversary Event Room 💍</h3>
        <div class="bday-subtitle">24 December: The Day When Destinies Got Interlocked Forever ❤️</div>
        <div class="story-section">
            <h4>🌹 The Golden Declaration - 24 December Ka Ikraar... 🏹</h4>
            <p>Shubhi, sach bataun toh main tumhein bohot pehle se hi pasand karta tha. Jab hum Telegram group par mile the aur dheere-dheere hamari dosti gehri ho rahi thi, tabhi se mere dil ne tumhein apna sab kuch maan liya tha. Mere dil mein tumhaare liye pyaar ka samandar bohot pehle hi umad chuka tha, lekin main bas us sahi, anmol lamhe ka intezar kar raha tha jahan main tumhein bata sakoon ki tum mere liye kya ho. 24 December ka wo din hamari zindagi ka sabsé bada aur sunhera din bana jab maine apni saari jhijhak aur darr ko chhodkar poori sincerity aur sachai ke sath tumhaare samne apne dil ka haal rakh diya tha.</p>
            
            <div class="highlight-quote">
                "Ek sacha pyaar kabhi waqt aur halaat ka mohtaj nahi hota. Mere dil ki har dhadkan me hamesha sirf aur sirf tumhara naam rahega bebu!" ❤️
            </div>

            <p>Wo pal jab maine tumse apne pyaar ka ikraar kiya, meri dhadkanein bohot tez thin. Maine hamesha hamare rishte ko bohot sanjeedgi se liya tha aur us din tumhaare 'Haan' kehne ne meri zindagi ko badal kar rakh diya. Wo dosti ka safar jo study group se shuru hua tha, us din ek bepannah sachhe pyaar ke bandhan mein badal gaya. Future plans mein ab sirf aur sirf hamara ek sath hona hi target hai. Will you lock paths with me forever and be mine for eternity? ❤️💍</p>
        </div>
    </div>
`;

const secureProfilesDataset = {
shubhi: {    "Name": "U2h1YmhpIFNpbmdoIChQcml5YW0vIFByaXlhKQ==",    "Caste Details": "R2VuZXJhbCwgUmFqcHV0LCBHb3V0cmE6IEJha2hzaA==",    "Parents": "TW90aGVyOiBBbnVqYSBTaW5naDsgRmF0aGVyOiBQYWRhbSBTaW5naA==",    "DOB Docs": "MTIgSnVseSAyMDAzIChhcyBwZXIgZG9jIDIwMDQp",    "Identity Mark": "QmxhY2sgTW9sZSBPbiBGYWNl",    "Education": "Q1NNVSBLYW5wdXIgTmVnYXIgVVA6IDg1JSwgMjAyNCwgUm9sbDogMjEwMjcwNTcwMTQ="}?
sachin: {    "Name": "U2FjaGluIE1lZW5h",    "Caste Details": "U1QsIE1lZW5hLCBHb3V0cmE6IEphcndhZA==",    "Parents": "TW90aGVyOiBSZWtoYSBNZWVuYSwgRmF0aGVyOiBLYWlsYXNoIENoYW5kIE1lZW5h",    "DOB Docs": "MTUgU2VwdGVtYmVyIDIwMDAgKGFzIHBlciBkb2MgMTIgSnVuZSAyMDAxKQ==",    "Identity Mark": "QmxhY2sgTW9sZSBPbiBGYWNl",    "Education": "UlJCTVUgQWx3YXIgUkogOiA3MCUgMjAyMiwgUm9sbCBObyAzMDU0MDM="}?

let galleryImagesList = [];
let currentLightboxIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
    compileStaticInterfaces();
    evaluateSessionGuard();
});

function evaluateSessionGuard() {
    if (localStorage.getItem("love_logged_in") === "true" && currentProfile) {
        document.getElementById("mainNavbar").style.display = "flex";
        document.getElementById("sessionLabel").innerText = `👤 Connected: ${currentProfile}`;
        initiatePresenceEngine();
        initiateChatEngine();

        let savedView = localStorage.getItem("last_active_tab") || "home";
        switchView(savedView);
    } else {
        handleLogoutCleanEffects();
    }
}

function switchView(viewId) {
    if (localStorage.getItem("love_logged_in") !== "true" && viewId !== 'landing') {
        switchView('landing'); return;
    }
    document.querySelectorAll("main > section").forEach(section => { section.className = "view-hidden"; });
    const target = document.getElementById(`view-${viewId}`);
    if (target) { target.className = "view-active"; }

    document.querySelectorAll(".nav-btn").forEach(btn => btn.classList.remove("active"));
    const activeNavBtn = document.getElementById(`nav-${viewId}`);
    if (activeNavBtn) activeNavBtn.classList.add("active");

    if (viewId !== 'landing') localStorage.setItem("last_active_tab", viewId);
}

function openModal(id) { document.getElementById(id).classList.add("open"); }
function closeModal(id) { document.getElementById(id).classList.remove("open"); }

// WEBP GALLERY
function buildGallery() {
    const galContainer = document.getElementById("galleryContainer");
    if (!galContainer) return;
    galContainer.innerHTML = "";
    galleryImagesList = [];

    for (let i = 1; i <= 56; i++) {
        let imgName = `img${i}.webp`;
        galleryImagesList.push(imgName);
        galContainer.innerHTML += `<img src="${imgName}" class="gallery-img" onclick="openLightbox(${i - 1})" onerror="this.src='https://api.dicebear.com/7.x/adventurer/svg?seed=Mem${i}'" alt="Memory ${i}">`;
    }
}

function openLightbox(index) {
    currentLightboxIndex = index;
    const boxImg = document.getElementById("lightboxImg");
    boxImg.src = galleryImagesList[currentLightboxIndex];
    boxImg.onerror = function () { this.src = `https://api.dicebear.com/7.x/adventurer/svg?seed=Mem${currentLightboxIndex + 1}`; };
    openModal("lightboxModal");
}
function changeLightbox(step) {
    currentLightboxIndex += step;
    if (currentLightboxIndex < 0) currentLightboxIndex = 55;
    if (currentLightboxIndex >= 56) currentLightboxIndex = 0;
    const boxImg = document.getElementById("lightboxImg");
    boxImg.src = galleryImagesList[currentLightboxIndex];
}

// UPDATED LOGIN PASSWORDS LOGIC
function handleLogin() {
    const u = btoa(document.getElementById('uid').value.trim());
    const p = btoa(document.getElementById('pwd').value.trim());

    let userMatched = null;
    // Sachin ID: sachin.ss | Pass: baccha@15
    if (u === "c2FjaGluLnNz" && p === "YmFjY2hhQDE1") userMatched = "Sachin";
    // Shubhi ID: shubhi.ss | Pass: bebu@12
    else if (u === "c2h1YmhpLnNz" && p === "YmVidUAxMg==") userMatched = "Shubhi";

    if (userMatched) {
        localStorage.setItem("love_logged_in", "true");
        localStorage.setItem("current_love_user", userMatched);
        localStorage.setItem("last_active_tab", "home");
        currentProfile = userMatched;
        currentPeer = userMatched === "Sachin" ? "Shubhi" : "Sachin";
        document.getElementById('err').style.display = 'none';
        closeModal('loginModal');
        document.getElementById('uid').value = ""; document.getElementById('pwd').value = "";
        evaluateSessionGuard();
    } else { document.getElementById('err').style.display = 'block'; }
}

function handleLogout() {
    if (confirm("Bebu/Baccha, kya aap sach me sign out karna chahte ho? 🥺")) {
        if (currentProfile) db.ref(`presence/${currentProfile}`).set({ status: "offline", last_seen: getCurrentTimeLabel() });
        handleLogoutCleanEffects();
    }
}

function handleLogoutCleanEffects() {
    localStorage.removeItem("love_logged_in");
    localStorage.removeItem("current_love_user");
    localStorage.removeItem("last_active_tab");
    currentProfile = null; currentPeer = null;
    document.getElementById("mainNavbar").style.display = "none";
    switchView("landing");
}

function initiatePresenceEngine() {
    const myPresenceRef = db.ref(`presence/${currentProfile}`);
    db.ref('.info/connected').on('value', snapshot => {
        if (snapshot.val() === false) return;
        myPresenceRef.child('status').set('online');
        myPresenceRef.child('status').onDisconnect().set('offline');
        myPresenceRef.child('last_seen').onDisconnect().set(getCurrentTimeLabel());
    });

    const trackPresence = (target) => {
        db.ref(`presence/${target}`).on('value', snapshot => {
            const data = snapshot.val() || {};
            const stateEl = document.getElementById(`stateLabel-${target}`);
            const seenEl = document.getElementById(`seenLabel-${target}`);
            if (!stateEl || !seenEl) return;
            if (data.status === 'online') {
                stateEl.innerHTML = `<span class="online-dot"></span><span style="color:#22c55e;">Online</span>`; seenEl.innerText = "";
            } else {
                stateEl.innerHTML = `<span class="offline-dot"></span>Offline`;
                seenEl.innerText = data.last_seen ? `Seen: ${data.last_seen}` : "";
            }
        });
    };
    trackPresence("Sachin"); trackPresence("Shubhi");
}

function openProfileEditModal() {
    db.ref(`editable_profiles/${currentProfile}`).once("value", snap => {
        const data = snap.val() || {};
        document.getElementById("modalBioInput").value = data.bio || "Love Hub...";
        document.getElementById("modalMoodSelect").value = data.mood || "🥰 Happy & Loving";
        openModal("profileEditModal");
    });
}

function saveProfileChanges() {
    const bio = document.getElementById("modalBioInput").value.trim();
    const mood = document.getElementById("modalMoodSelect").value;
    if (!bio) return alert("Bio empty nahi chhod sakte bebu!");
    db.ref(`editable_profiles/${currentProfile}`).update({ bio: bio, mood: mood }, () => { closeModal("profileEditModal"); });
}

function inspectUserBio(targetUser) {
    db.ref(`editable_profiles/${targetUser}`).once("value", snap => {
        const data = snap.val() || {};
        document.getElementById("inspectDp").src = targetUser === "Sachin" ? "sachin.webp" : "shubhi.webp";
        document.getElementById("inspectName").innerText = targetUser === "Sachin" ? "Sachin Meena" : "Shubhi Singh";
        document.getElementById("inspectMood").innerText = `Mood: ${data.mood || "🥰 Happy & Loving"}`;
        document.getElementById("inspectBio").innerText = data.bio || "No custom bio configured yet.";
        openModal("inspectProfileModal");
    });
}

function initiateChatEngine() {
    const peerTypingRef = db.ref(`typing/${currentPeer}`);
    peerTypingRef.on("value", snapshot => {
        const el = document.getElementById("typingTag");
        if (el) el.innerText = snapshot.val() ? `${currentPeer} is typing... 💕` : "";
    });

    db.ref("global_chats").off();
    db.ref("global_chats").on("child_added", snapshot => {
        const data = snapshot.val();
        const scroller = document.getElementById('scroller');
        if (!scroller) return;
        const div = document.createElement('div');
        div.classList.add('msg', data.user === currentProfile ? 'me' : 'you');
        div.innerHTML = `<strong>${data.user}:</strong> ${data.text} <span style="font-size:9px; opacity:0.8; display:block; text-align:right; margin-top:4px;">${data.time}</span>`;
        scroller.appendChild(div);
        scroller.scrollTop = scroller.scrollHeight;
    });
}

let typingTimeout;
function handleTyping() {
    if (!currentProfile) return;
    db.ref(`typing/${currentProfile}`).set(true);
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => { if (currentProfile) db.ref(`typing/${currentProfile}`).set(false); }, 2000);
}

function dispatch() {
    const box = document.getElementById('msgText');
    if (!box || !box.value.trim()) return;
    db.ref("global_chats").push({ user: currentProfile, text: box.value.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });
    box.value = ""; db.ref(`typing/${currentProfile}`).set(false);
}

function compileStaticInterfaces() {
    const nickBox = document.getElementById("nicknamesContainer");
    if (nickBox) nicknamesDataset.forEach(n => { nickBox.innerHTML += `<div>${n}</div>`; });

    const timeBox = document.getElementById("timelineContainer");
    if (timeBox) {
        timelineDataset.forEach(node => {
            timeBox.innerHTML += `<div class="node"><span class="time-lbl">${node.time}</span><h4>${node.title}</h4><p>${node.desc}</p>${node.quote ? `<span class="love-quote">"${node.quote}"</span>` : ''}</div>`;
        });
    }

    const drawSecureProfile = (targetId, set) => {
        const el = document.getElementById(targetId); if (!el) return;
        for (let k in set) { el.innerHTML += `<div class="row"><span class="lbl">${k}</span><span class="val">${atob(set[k])}</span></div>`; }
    };
    drawSecureProfile("shubhiTarget", secureProfilesDataset.shubhi);
    drawSecureProfile("sachinTarget", secureProfilesDataset.sachin);
    buildGallery();
}

function switchSpaceTab(id) {
    document.getElementById("tab-bd").style.display = id === "bd" ? "block" : "none";
    document.getElementById("tab-pr").style.display = id === "pr" ? "block" : "none";
    document.getElementById("tabBtn-bd").className = id === "bd" ? "tab-btn active" : "tab-btn";
    document.getElementById("tabBtn-pr").className = id === "pr" ? "tab-btn active" : "tab-btn";
}

function getCurrentTimeLabel() { return new Date().toLocaleString([], { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' }); }




// Database se data render karo
db.ref("global_chats").on("child_added", (snapshot) => {
    const data = snapshot.val();
    const scroller = document.getElementById('scroller');
    const isMe = data.user === localStorage.getItem("current_love_user");
    
    let msgDiv = document.createElement("div");
    msgDiv.className = `msg ${isMe ? 'me' : 'you'}`;
    msgDiv.innerHTML = `<strong>${data.user}:</strong><p style="margin:5px 0;">${data.text}</p>`;
    
    scroller.appendChild(msgDiv);
    scroller.scrollTop = scroller.scrollHeight;
});

// Message bhejne ka logic
function dispatch() {
    const textInput = document.getElementById('msgText');
    if(!textInput.value) return;

    db.ref("global_chats").push({
        user: localStorage.getItem("current_love_user") || "Sachin",
        text: textInput.value,
        time: new Date().toLocaleTimeString()
    });

    textInput.value = "";
}
