document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const catImage = document.getElementById('cat-image');
    const title = document.getElementById('title');
    const message = document.getElementById('message');
    const buttonsContainer = document.querySelector('.buttons');

    // Fungsi untuk membuat tombol "Tidak" lari
    const moveNoButton = () => {
        // Ubah posisi menjadi fixed agar bisa bebas bergerak di seluruh layar
        noBtn.style.position = 'fixed';
        
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const btnWidth = noBtn.offsetWidth;
        const btnHeight = noBtn.offsetHeight;

        // Hitung posisi acak baru (diberi padding agar tidak terlalu ke pinggir)
        const padding = 20;
        const randomX = Math.max(padding, Math.floor(Math.random() * (windowWidth - btnWidth - padding)));
        const randomY = Math.max(padding, Math.floor(Math.random() * (windowHeight - btnHeight - padding)));

        // Terapkan posisi baru
        noBtn.style.left = `${randomX}px`;
        noBtn.style.top = `${randomY}px`;
        
        // Sedikit animasi rotasi untuk efek lucu
        const randomRotation = Math.floor(Math.random() * 40) - 20; // -20deg to 20deg
        noBtn.style.transform = `rotate(${randomRotation}deg)`;
    };

    // Desktop: Pindah saat di-hover
    noBtn.addEventListener('mouseover', moveNoButton);
    
    // Mobile: Pindah saat disentuh
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Mencegah klik terjadi
        moveNoButton();
    });
    
    // Mencegah klik di mobile jika entah bagaimana berhasil diklik
    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        moveNoButton();
    });

    // Handle klik tombol "Iya"
    yesBtn.addEventListener('click', () => {
        // Rentetan pertanyaan (semi ngeselin yang lucu) menggunakan SweetAlert2
        Swal.fire({
            title: 'Eh, tunggu dulu...',
            text: 'Ini beneran dimaafin?',
            icon: 'question',
            confirmButtonText: 'Iya beneran',
            confirmButtonColor: '#ff85a2',
            allowOutsideClick: false
        }).then((result) => {
            if (result.isConfirmed) {
                let runCount = 0;
                Swal.fire({
                    title: 'Seriusan nih?',
                    text: 'Nggak kepaksa kan maafinnya?',
                    icon: 'warning',
                    confirmButtonText: 'Enggak kok',
                    confirmButtonColor: '#ff85a2',
                    allowOutsideClick: false,
                    didOpen: () => {
                        const confirmBtn = Swal.getConfirmButton();
                        confirmBtn.style.transition = 'transform 0.2s ease';
                        
                        const dodge = (e) => {
                            if (runCount < 2) {
                                e.preventDefault(); // Cegah klik
                                // Pindah ke posisi acak (lompat)
                                const x = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 80) + 40); 
                                const y = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 60) + 30);
                                confirmBtn.style.transform = `translate(${x}px, ${y}px)`;
                                runCount++;
                                
                                // Jika sudah lari 2 kali, kembalikan posisi ke tengah agak pelan biar gampang diklik
                                if (runCount === 2) {
                                    setTimeout(() => {
                                        confirmBtn.style.transform = 'translate(0px, 0px)';
                                    }, 800);
                                }
                            }
                        };
                        
                        confirmBtn.addEventListener('mouseover', dodge);
                        confirmBtn.addEventListener('touchstart', dodge, {passive: false});
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: 'Janji ya?',
                            text: 'Beneran udah gak marah lagi kan?',
                            icon: 'info',
                            confirmButtonText: 'Iya bawel',
                            confirmButtonColor: '#ff85a2',
                            allowOutsideClick: false
                        }).then((result) => {
                            if (result.isConfirmed) {
                                showSuccessState();
                            }
                        });
                    }
                });
            }
        });
    });

    // Fungsi untuk menampilkan halaman sukses dan confetti
    const showSuccessState = () => {
        // Update gambar dan teks
        catImage.src = 'assets/happy_cat.png';
        catImage.style.animation = 'float 1.5s ease-in-out infinite'; // Lebih cepat melayang karena senang
        
        title.textContent = 'Yaaayyy! Makasih Qorina! 🎉';
        message.innerHTML = 'Makasih banget ya udah maafin.<br>Aku janji nggak bakal ngulangin kesalahan yang sama lagi. 😻✨';
        
        // Sembunyikan tombol
        buttonsContainer.style.display = 'none';
        
        // Hapus posisi fixed dari noBtn agar tidak mengganggu layout
        noBtn.style.display = 'none';
        
        // Jalankan animasi confetti
        const duration = 5 * 1000;
        const end = Date.now() + duration;

        (function frame() {
            // Sisi Kiri
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#ff85a2', '#a0c4ff', '#ffffff', '#ffd166']
            });
            // Sisi Kanan
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#ff85a2', '#a0c4ff', '#ffffff', '#ffd166']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    };
});
