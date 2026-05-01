// ADMIN PANEL HTML
const adminHTML = `
<div id="adminPanel" class="fixed inset-0 z-[100] glass flex items-center justify-center hidden p-6">
    <div class="bg-[#080808] border border-white/10 p-8 rounded-[2.5rem] w-full max-w-md shadow-2xl">
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-black uppercase">Admin Sync</h2>
            <button onclick="closeAdmin()">✖</button>
        </div>

        <input id="newCount" placeholder="Member Count" class="w-full mb-4 p-3 bg-black border">
        <textarea id="newAnnouncement" placeholder="Announcement" class="w-full mb-4 p-3 bg-black border"></textarea>

        <button onclick="saveAdminData()" class="bg-blue-600 w-full py-3 mb-2">SYNC</button>
        <button onclick="clearAnnouncement()" class="bg-red-600 w-full py-2">CLEAR</button>
    </div>
</div>
`;

// Inject into page
document.body.insertAdjacentHTML("beforeend", adminHTML);

// FUNCTIONS
function openAdmin() {
    if (prompt("Enter Admin Password:") === "admin00") {
        document.getElementById('adminPanel').classList.remove('hidden');
    } else alert("Wrong password");
}

function closeAdmin() {
    document.getElementById('adminPanel').classList.add('hidden');
}

const DB_URL = "https://devuncopy-default-rtdb.firebaseio.com/";

async function saveAdminData() {
    const count = document.getElementById('newCount').value;
    const msg = document.getElementById('newAnnouncement').value;

    if(count)
        await fetch(DB_URL + "/stats.json", {
            method: "PATCH",
            body: JSON.stringify({ memberCount: count + "+" })
        });

    if(msg)
        await fetch(DB_URL + "/announcement.json", {
            method: "PUT",
            body: JSON.stringify({ text: msg, active: true })
        });

    alert("Synced!");
    closeAdmin();
}

async function clearAnnouncement() {
    await fetch(DB_URL + "/announcement.json", {
        method: "PUT",
        body: JSON.stringify({ text: "", active: false })
    });

    alert("Cleared!");
    closeAdmin();
}
