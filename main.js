// Tanggal dan waktu sekarang
const updateTanggalWaktu = () => {
    const sekarang = new Date();

    const namaBulan = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    const hari = String(sekarang.getDate()).padStart(2, "0");
    const bulan = namaBulan[sekarang.getMonth()];
    const tahun = sekarang.getFullYear();

    document.getElementById('tanggal').textContent = `${hari} ${bulan} ${tahun}`;

    const waktu = sekarang.toLocaleTimeString("id-ID");
    document.getElementById('waktu').textContent = `${waktu}`;

};

updateTanggalWaktu();
setInterval(updateTanggalWaktu, 1000);

// Deklarasi variabel
const tanggal = document.querySelector('#tanggal-todo');
const prioritas = document.querySelector('#prioritas');
const todo = document.querySelector('#todo');

const simpan = document.querySelector('#simpan');
const batal = document.querySelector('#batal');

const hapusSemuaTodo = document.querySelector('.tab-hapus');
const daftarTodo = document.querySelector('#daftar-todo');
const daftarSelesai = document.querySelector('#daftar-selesai');

const grupTab = document.querySelectorAll('.tab');
const kontenTab = document.querySelectorAll('.konten-tab');

// Menambah todo
let counter = 1;
simpan.addEventListener('click', () => {
    if (!tanggal.value || !prioritas.value || !todo.value) {
        alert('isi terlebih dahulu');
    } else {
        const todoBaru = document.createElement('li');
        todoBaru.classList.add('item-todo');
        let todoId = 'todo-baru-' + counter;
        todoBaru.id = todoId;
        counter++;

        let warnaPrioritas;
        if (prioritas.value === 'tinggi') {
            warnaPrioritas = 'green';
        } else if (prioritas.value === 'sedang') {
            warnaPrioritas = 'yellow';
        } else {
            warnaPrioritas = 'red';
        }

        todoBaru.innerHTML =
            `<div class='item-todo-1'>
                <input type='checkbox' class='todo-selesai'>
            </div>
            <div class='item-todo-2'>${tanggal.value} </div>
            <div class='item-todo-3'><i class='fa fa-circle' style='font-size: 10px; color: ${warnaPrioritas}'></i> ${todo.value}</div>
            <div class='item-todo-4'>
                <i id='hapus-todo' class='fa fa-trash'></i>
            </div>`;
        daftarTodo.appendChild(todoBaru);

        const cloneTodo = todoBaru.cloneNode(true);
        daftarSelesai.appendChild(cloneTodo);
        cloneTodo.style.display = 'none'

        tanggal.value = '';
        prioritas.value = '';
        todo.value = '';
    }
});

batal.addEventListener('click', () => {
    tanggal.value = '';
    prioritas.value = '';
    todo.value = '';
});


// Menghapus todo dan todo selesai
daftarTodo.addEventListener('click', (e) => {
    let daftarSelesaiId = document.querySelector(`#daftar-selesai  #${e.target.parentElement.parentElement.id}`);

    if (e.target.matches('#hapus-todo')) {
        e.target.parentElement.parentElement.remove();
        daftarSelesaiId.remove();
    }

    if (e.target.matches('.todo-selesai')) {
        if (e.target.checked) {
            e.target.parentElement.nextElementSibling.nextElementSibling.style.textDecoration = 'line-through';
            daftarSelesaiId.style.display = 'flex';
            daftarSelesaiId.children[0].children[0].checked = true;
            daftarSelesaiId.children[2].style.textDecoration = 'line-through';
        } else {
            e.target.parentElement.nextElementSibling.nextElementSibling.style.textDecoration = 'none';
            daftarSelesaiId.style.display = 'none';
            daftarSelesaiId.children[2].style.textDecoration = 'none';
        }
    }
});

daftarSelesai.addEventListener('click', (e) => {
    let daftarTodoId = document.querySelector(`#daftar-todo  #${e.target.parentElement.parentElement.id}`)
    if (e.target.matches('#hapus-todo')) {
        e.target.parentElement.parentElement.remove();
        daftarTodoId.remove();
    }

    if (e.target.matches('.todo-selesai')) {
        if (e.target.checked) {
            e.target.parentElement.parentElement.style.display = 'flex';
        } else {
            e.target.parentElement.parentElement.style.display = 'none';
            daftarTodoId.children[0].children[0].checked = false;
            daftarTodoId.children[2].style.textDecoration = 'none';
        }
    }
});

// Menghapus semua todo
hapusSemuaTodo.addEventListener('click', () => {
    daftarTodo.replaceChildren();
    daftarSelesai.replaceChildren();
});

// Pindah tab
grupTab.forEach((tab) => {
    tab.addEventListener('click', (e) => {
        grupTab.forEach((e) => {
            e.classList.remove('aktif');
        });
        e.target.classList.add('aktif');

        kontenTab.forEach((e) => {
            e.classList.remove('aktif');
        });
        const target = e.target.getAttribute('data-target');
        document.getElementById(target).classList.add('aktif');
    });
});