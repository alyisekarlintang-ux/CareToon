export type Language = 'en' | 'id';

export interface UiTranslations {
  pageTitle: string;
  nav: {
    home: string;
    admin: string;
    jkn: string;
    safety: string;
    videos: string;
    contact: string;
    openMenu: string;
    closeMenu: string;
  };
  languageSwitch: {
    label: string;
    english: string;
    indonesian: string;
  };
  hero: {
    kicker: string;
    headline: string;
    subtitle: string;
    startBtn: string;
    watchBtn: string;
    mascotAlt: string;
    mascotName: string;
    mascotRole: string;
    learnMore: string;
  };
  admin: {
    kicker: string;
    title: string;
    subtitle: string;
    tabListLabel: string;
    stepOf: string;
    typicalTime: string;
    helpfulToPrepare: string;
    previous: string;
    next: string;
    mascotTipTitle: string;
    mascotAlt: string;
  };
  jkn: {
    kicker: string;
    title: string;
    subtitle: string;
    checklistTitle: string;
    checklistProgress: string;
    checklistHint: string;
    readyBanner: string;
    pendingBanner: string;
    requiredLabel: string;
    optionalLabel: string;
    faqTitle: string;
    faqSubtitle: string;
  };
  safety: {
    kicker: string;
    title: string;
    subtitle: string;
    openCard: string;
    modalKicker: string;
    closeModalLabel: string;
    doTitle: string;
    avoidTitle: string;
    mascotTipTitle: string;
    mascotAlt: string;
    prevTopic: string;
    nextTopic: string;
  };
  videos: {
    kicker: string;
    title: string;
    subtitle: string;
    autoplayOn: string;
    autoplayOff: string;
    upNextIn: string;
    cancel: string;
    playNow: string;
    playOverlayLabel: string;
    seekLabel: string;
    play: string;
    pause: string;
    next: string;
    restartLabel: string;
    captions: string;
    toggleCaptionsLabel: string;
    enableAudioLabel: string;
    muteAudioLabel: string;
    nowPlaying: string;
    episodeLabel: string;
    playlistTitle: string;
    videoCountSuffix: string;
    progressTipPrefix: string;
    progressTipSuffix: string;
    addVideoBtn: string;
    addFormTitle: string;
    videoTitleLabel: string;
    videoTitlePlaceholder: string;
    youtubeUrlLabel: string;
    youtubeUrlPlaceholder: string;
    categoryLabel: string;
    categoryPlaceholder: string;
    saveVideoBtn: string;
    cancelAddBtn: string;
    invalidYoutubeUrl: string;
    missingTitle: string;
    customBadge: string;
    removeCustomLabel: string;
    youtubeSourceLabel: string;
    editVideoLabel: string;
    replaceFormTitle: string;
    videoUrlOrYoutubeLabel: string;
    videoUrlOrYoutubePlaceholder: string;
    uploadFileLabel: string;
    saveReplaceBtn: string;
    resetPlaylistBtn: string;
    localVideoLabel: string;
    invalidMediaSource: string;
  };
  subscribe: {
    title: string;
    subtitle: string;
    emailLabel: string;
    placeholder: string;
    button: string;
    invalidEmail: string;
    successPrefix: string;
    successSuffix: string;
    addAnother: string;
  };
  footer: {
    description: string;
    deskTitle: string;
    address: string;
    hoursLine1: string;
    hoursLine2: string;
    mascotAlt: string;
    goodbyeNote: string;
    copyright: string;
    linkAdmin: string;
    linkJkn: string;
    linkSafety: string;
    backToTop: string;
    youtubeLabel: string;
    instagramLabel: string;
    facebookLabel: string;
  };
  mascotFallbackRole: string;
}

export const UI_TRANSLATIONS: Record<Language, UiTranslations> = {
  en: {
    pageTitle: 'Care-Toon: Your Friendly Guide to Puskesmas Services',
    nav: {
      home: 'Home',
      admin: 'Administration Flow',
      jkn: 'JKN Registration',
      safety: 'Safety (K3)',
      videos: 'Videos',
      contact: 'Contact',
      openMenu: 'Open navigation menu',
      closeMenu: 'Close navigation menu',
    },
    languageSwitch: {
      label: 'Language',
      english: 'English',
      indonesian: 'Bahasa Indonesia',
    },
    hero: {
      kicker: 'Indonesian Public Health Center Guide · PMIK Care Companion',
      headline: 'Care-Toon: Your Friendly Guide to Puskesmas Services',
      subtitle:
        'Visiting a local health center should feel simple, calm, and welcoming. Follow our cheerful registration officer through every step—from taking a queue number and verifying JKN coverage to staying safe inside the clinic.',
      startBtn: 'Start Learning',
      watchBtn: 'Watch Videos',
      mascotAlt:
        'Friendly Care-Toon PMIK registration officer with short brown hair, blue eyes, white collar, blue uniform with white cross emblem, and green PMIK lanyard badge waving cheerfully at the Puskesmas front desk',
      mascotName: 'PMIK Officer · Care-Toon Front Desk',
      mascotRole: 'Medical Records & Patient Guide',
      learnMore: 'Learn more',
    },
    admin: {
      kicker: 'Step-by-Step Patient Journey · 7 Easy Stops',
      title: 'Puskesmas Administration Flow',
      subtitle:
        'Click any stop along the timeline below to see what happens at each counter and read a helpful tip from our PMIK officer.',
      tabListLabel: 'Puskesmas administration steps',
      stepOf: 'Step {current} of {total}',
      typicalTime: 'Typical time: {time}',
      helpfulToPrepare: 'Helpful to prepare:',
      previous: 'Previous',
      next: 'Next Step',
      mascotTipTitle: 'PMIK Front-Desk Tip',
      mascotAlt: 'Care-Toon PMIK mascot holding a yellow clipboard and pointing to helpful advice',
    },
    jkn: {
      kicker: 'National Health Insurance Guide · BPJS Kesehatan',
      title: 'JKN Registration Flow',
      subtitle:
        'Using your JKN / BPJS Kesehatan membership at a Puskesmas takes just five quick steps. Verify your documents below before visiting the desk.',
      checklistTitle: 'Documents You Need',
      checklistProgress: '{done} / {total} checked',
      checklistHint: 'Tap each item as you pack your folder to verify readiness for registration.',
      readyBanner: 'Core ID and JKN documents are checked — you are ready for the desk!',
      pendingBanner: 'Check off both required ID and JKN items before heading to the counter.',
      requiredLabel: 'Required',
      optionalLabel: 'Optional / If needed',
      faqTitle: 'JKN & BPJS Frequently Asked Questions',
      faqSubtitle:
        'Quick answers about Faskes Tingkat 1 rules, Mobile JKN cards, and hospital referrals.',
    },
    safety: {
      kicker: 'Occupational Health & Safety · Click Any Icon',
      title: 'K3 Safety Guidelines',
      subtitle:
        'Safe habits protect every patient, visitor, and healthcare worker inside the clinic. Click any safety topic below to open our illustrated safety card.',
      openCard: 'Open safety card →',
      modalKicker: 'K3 Safety Guideline',
      closeModalLabel: 'Close safety guideline card',
      doTitle: 'Recommended Habits',
      avoidTitle: 'Please Avoid',
      mascotTipTitle: 'PMIK Safety Tip',
      mascotAlt: 'Care-Toon PMIK mascot giving an encouraging thumbs-up for K3 safety',
      prevTopic: 'Previous Topic',
      nextTopic: 'Next Topic',
    },
    videos: {
      kicker: 'Animated Video Guides · 5-Part Playlist',
      title: 'Watch & Learn with Care-Toon',
      subtitle:
        'Watch our short cartoon explainers on clinic registration, JKN, safety, and patient etiquette. Videos advance automatically to the next episode.',
      autoplayOn: 'Autoplay Next: On',
      autoplayOff: 'Autoplay Next: Off',
      upNextIn: 'Up Next in {sec}s',
      cancel: 'Cancel',
      playNow: 'Play Now',
      playOverlayLabel: 'Play current explainer video',
      seekLabel: 'Seek video timeline',
      play: 'Play',
      pause: 'Pause',
      next: 'Next',
      restartLabel: 'Restart video',
      captions: 'Captions',
      toggleCaptionsLabel: 'Toggle captions',
      enableAudioLabel: 'Enable audio chimes',
      muteAudioLabel: 'Mute audio chimes',
      nowPlaying: 'Now Playing',
      episodeLabel: 'Episode {current} of {total}',
      playlistTitle: 'Video Playlist',
      videoCountSuffix: 'videos',
      progressTipPrefix: 'Tip: Progress',
      progressTipSuffix:
        '% complete — click any thumbnail to switch episodes or let Autoplay Next advance automatically.',
      addVideoBtn: 'Add YouTube Video',
      addFormTitle: 'Add Your Own YouTube Video',
      videoTitleLabel: 'Video Title',
      videoTitlePlaceholder: 'e.g., How to Use Mobile JKN at Our Puskesmas',
      youtubeUrlLabel: 'YouTube Link or Video ID',
      youtubeUrlPlaceholder: 'https://www.youtube.com/watch?v=... or https://youtu.be/...',
      categoryLabel: 'Category (Optional)',
      categoryPlaceholder: 'e.g., My Clinic Video',
      saveVideoBtn: 'Add to Playlist',
      cancelAddBtn: 'Cancel',
      invalidYoutubeUrl: 'Please enter a valid YouTube URL (youtube.com or youtu.be) or 11-character ID.',
      missingTitle: 'Please enter a title for your video.',
      customBadge: 'Custom Video',
      removeCustomLabel: 'Remove custom video',
      youtubeSourceLabel: 'YouTube Player',
      editVideoLabel: 'Replace with your video',
      replaceFormTitle: 'Replace Playlist Video',
      videoUrlOrYoutubeLabel: 'YouTube Link or MP4 Video URL',
      videoUrlOrYoutubePlaceholder: 'https://www.youtube.com/watch?v=... or /videos/my-video.mp4',
      uploadFileLabel: 'Or choose a video file from your device',
      saveReplaceBtn: 'Save Video',
      resetPlaylistBtn: 'Reset',
      localVideoLabel: 'Your Video Player',
      invalidMediaSource: 'Enter a valid YouTube link, MP4/WebM URL, or pick a video file.',
    },
    subscribe: {
      title: 'Get Health Tips & Service Updates',
      subtitle:
        'Receive monthly immunization schedules, JKN policy reminders, and friendly seasonal wellness guides straight to your inbox.',
      emailLabel: 'Email address',
      placeholder: 'Enter your email address',
      button: 'Subscribe',
      invalidEmail: 'Please enter a valid email address (for example, name@example.com).',
      successPrefix: 'Thank you!',
      successSuffix: 'is subscribed to Care-Toon community updates.',
      addAnother: 'Add another',
    },
    footer: {
      description:
        'An illustrated community health education project helping families navigate Indonesian Puskesmas services with confidence and clarity.',
      deskTitle: 'Puskesmas Information Desk',
      address: 'Jl. Kesehatan Masyarakat No. 12, Kecamatan Harapan Sehat, Indonesia',
      hoursLine1: 'Mon – Thu: 07:30 – 14:30 WIB',
      hoursLine2: 'Fri – Sat: 07:30 – 12:00 WIB · UGD 24 Hours',
      mascotAlt: 'Care-Toon PMIK mascot waving goodbye warmly',
      goodbyeNote: 'Stay healthy and see you at the desk!',
      copyright: '© {year} Care-Toon Public Health Guide. All rights reserved.',
      linkAdmin: 'Administration',
      linkJkn: 'JKN Guide',
      linkSafety: 'K3 Safety',
      backToTop: 'Back to top',
      youtubeLabel: 'Watch Care-Toon educational videos',
      instagramLabel: 'Care-Toon Instagram page',
      facebookLabel: 'Care-Toon Facebook community',
    },
    mascotFallbackRole: 'Care-Toon PMIK Officer',
  },
  id: {
    pageTitle: 'Care-Toon: Panduan Ramah Layanan Puskesmas',
    nav: {
      home: 'Beranda',
      admin: 'Alur Administrasi',
      jkn: 'Pendaftaran JKN',
      safety: 'Keselamatan (K3)',
      videos: 'Video',
      contact: 'Kontak',
      openMenu: 'Buka menu navigasi',
      closeMenu: 'Tutup menu navigasi',
    },
    languageSwitch: {
      label: 'Bahasa',
      english: 'English',
      indonesian: 'Bahasa Indonesia',
    },
    hero: {
      kicker: 'Panduan Pusat Kesehatan Masyarakat · Sahabat Layanan PMIK',
      headline: 'Care-Toon: Panduan Ramah Layanan Puskesmas',
      subtitle:
        'Berkunjung ke Puskesmas kini terasa mudah, tenang, dan ramah. Ikuti petugas pendaftaran kami di setiap langkah—mulai dari mengambil nomor antrean, verifikasi kepesertaan JKN, hingga menjaga keselamatan selama di klinik.',
      startBtn: 'Mulai Belajar',
      watchBtn: 'Tonton Video',
      mascotAlt:
        'Maskot petugas PMIK Care-Toon berambut cokelat pendek, mata biru, kerah putih, seragam biru dengan palang putih, dan kalung kartu PMIK melambai ramah di meja pendaftaran Puskesmas',
      mascotName: 'Petugas PMIK · Meja Pendaftaran Care-Toon',
      mascotRole: 'Rekam Medis & Informasi Kesehatan',
      learnMore: 'Pelajari lebih lanjut',
    },
    admin: {
      kicker: 'Perjalanan Pasien Langkah demi Langkah · 7 Tahap Mudah',
      title: 'Alur Administrasi Puskesmas',
      subtitle:
        'Klik setiap tahap pada linimasa di bawah untuk melihat proses di masing-masing loket dan membaca tips ramah dari petugas PMIK kami.',
      tabListLabel: 'Tahapan administrasi Puskesmas',
      stepOf: 'Langkah {current} dari {total}',
      typicalTime: 'Perkiraan waktu: {time}',
      helpfulToPrepare: 'Perlu disiapkan:',
      previous: 'Sebelumnya',
      next: 'Langkah Berikutnya',
      mascotTipTitle: 'Tips Loket Petugas PMIK',
      mascotAlt: 'Maskot PMIK Care-Toon memegang papan klip kuning sambil menunjuk panduan',
    },
    jkn: {
      kicker: 'Panduan Jaminan Kesehatan Nasional · BPJS Kesehatan',
      title: 'Alur Pendaftaran JKN',
      subtitle:
        'Menggunakan kepesertaan JKN / BPJS Kesehatan di Puskesmas cukup dengan lima langkah cepat. Periksa kelengkapan dokumenmu di bawah ini sebelum menuju loket.',
      checklistTitle: 'Dokumen yang Perlu Disiapkan',
      checklistProgress: '{done} / {total} dicentang',
      checklistHint:
        'Centang setiap dokumen saat menyiapkan map agar proses pendaftaran berjalan lebih cepat.',
      readyBanner: 'KTP dan kartu JKN wajib sudah siap — kamu siap menuju loket pendaftaran!',
      pendingBanner: 'Pastikan dokumen wajib KTP dan JKN sudah dicentang sebelum ke loket.',
      requiredLabel: 'Wajib',
      optionalLabel: 'Opsional / Bila perlu',
      faqTitle: 'Pertanyaan Umum JKN & BPJS',
      faqSubtitle:
        'Jawaban singkat seputar aturan Faskes Tingkat 1, kartu Mobile JKN, dan rujukan rumah sakit.',
    },
    safety: {
      kicker: 'Kesehatan & Keselamatan Kerja · Klik Ikon',
      title: 'Panduan Keselamatan K3',
      subtitle:
        'Kebiasaan aman melindungi setiap pasien, pengunjung, dan tenaga kesehatan di Puskesmas. Klik topik keselamatan di bawah untuk membuka kartu panduan bergambar.',
      openCard: 'Buka kartu K3 →',
      modalKicker: 'Panduan Keselamatan K3',
      closeModalLabel: 'Tutup kartu panduan keselamatan',
      doTitle: 'Kebiasaan yang Dianjurkan',
      avoidTitle: 'Hal yang Perlu Dihindari',
      mascotTipTitle: 'Tips Keselamatan K3 PMIK',
      mascotAlt: 'Maskot PMIK Care-Toon mengacungkan jempol untuk keselamatan K3',
      prevTopic: 'Topik Sebelumnya',
      nextTopic: 'Topik Berikutnya',
    },
    videos: {
      kicker: 'Video Edukasi Animasi · Daftar Putar 5 Episode',
      title: 'Tonton & Belajar Bersama Care-Toon',
      subtitle:
        'Simak video animasi singkat tentang pendaftaran klinik, JKN, keselamatan K3, dan etika pasien. Video akan otomatis berlanjut ke episode berikutnya.',
      autoplayOn: 'Putar Otomatis: Aktif',
      autoplayOff: 'Putar Otomatis: Nonaktif',
      upNextIn: 'Berikutnya dalam {sec} dtk',
      cancel: 'Batal',
      playNow: 'Putar Sekarang',
      playOverlayLabel: 'Putar video edukasi saat ini',
      seekLabel: 'Geser lini waktu video',
      play: 'Putar',
      pause: 'Jeda',
      next: 'Berikutnya',
      restartLabel: 'Ulangi video dari awal',
      captions: 'Teks',
      toggleCaptionsLabel: 'Tampilkan atau sembunyikan teks',
      enableAudioLabel: 'Aktifkan nada transisi audio',
      muteAudioLabel: 'Bisukan nada transisi audio',
      nowPlaying: 'Sedang Diputar',
      episodeLabel: 'Episode {current} dari {total}',
      playlistTitle: 'Daftar Putar Video',
      videoCountSuffix: 'video',
      progressTipPrefix: 'Info: Progres',
      progressTipSuffix:
        '% selesai — klik gambar episode mana saja untuk berpindah atau biarkan Putar Otomatis melanjutkan.',
      addVideoBtn: 'Tambah Video YouTube',
      addFormTitle: 'Tambahkan Video YouTube Kamu Sendiri',
      videoTitleLabel: 'Judul Video',
      videoTitlePlaceholder: 'Contoh: Cara Daftar Antrean Mobile JKN di Puskesmas',
      youtubeUrlLabel: 'Link YouTube atau ID Video',
      youtubeUrlPlaceholder: 'https://www.youtube.com/watch?v=... atau https://youtu.be/...',
      categoryLabel: 'Kategori (Opsional)',
      categoryPlaceholder: 'Contoh: Video Buatan Sendiri',
      saveVideoBtn: 'Tambahkan ke Daftar',
      cancelAddBtn: 'Batal',
      invalidYoutubeUrl: 'Mohon masukkan link YouTube yang valid (youtube.com / youtu.be) atau ID 11 karakter.',
      missingTitle: 'Mohon isi judul video kamu.',
      customBadge: 'Video Kamu',
      removeCustomLabel: 'Hapus video tambahan',
      youtubeSourceLabel: 'Pemutar YouTube',
      editVideoLabel: 'Ganti dengan videomu',
      replaceFormTitle: 'Ganti Video di Daftar Putar',
      videoUrlOrYoutubeLabel: 'Link YouTube atau URL Video MP4',
      videoUrlOrYoutubePlaceholder: 'https://www.youtube.com/watch?v=... atau /videos/video.mp4',
      uploadFileLabel: 'Atau pilih file video dari perangkatmu',
      saveReplaceBtn: 'Simpan Video',
      resetPlaylistBtn: 'Reset',
      localVideoLabel: 'Pemutar Video Kamu',
      invalidMediaSource: 'Masukkan link YouTube, URL MP4/WebM yang valid, atau pilih file video.',
    },
    subscribe: {
      title: 'Dapatkan Tips Kesehatan & Info Layanan',
      subtitle:
        'Terima jadwal imunisasi bulanan, pengingat layanan JKN, serta panduan hidup sehat langsung ke email kamu.',
      emailLabel: 'Alamat email',
      placeholder: 'Masukkan alamat email kamu',
      button: 'Berlangganan',
      invalidEmail: 'Mohon masukkan alamat email yang valid (contoh: nama@email.com).',
      successPrefix: 'Terima kasih!',
      successSuffix: 'telah terdaftar untuk menerima pembaruan komunitas Care-Toon.',
      addAnother: 'Daftarkan email lain',
    },
    footer: {
      description:
        'Inisiatif edukasi kesehatan masyarakat bergaya kartun untuk membantu keluarga memahami layanan Puskesmas Indonesia dengan nyaman dan jelas.',
      deskTitle: 'Meja Informasi Puskesmas',
      address: 'Jl. Kesehatan Masyarakat No. 12, Kecamatan Harapan Sehat, Indonesia',
      hoursLine1: 'Senin – Kamis: 07.30 – 14.30 WIB',
      hoursLine2: 'Jumat – Sabtu: 07.30 – 12.00 WIB · UGD 24 Jam',
      mascotAlt: 'Maskot PMIK Care-Toon melambai perpisahan dengan hangat',
      goodbyeNote: 'Jaga kesehatan dan sampai jumpa di loket!',
      copyright: '© {year} Care-Toon Panduan Kesehatan Masyarakat. Hak cipta dilindungi.',
      linkAdmin: 'Administrasi',
      linkJkn: 'Panduan JKN',
      linkSafety: 'Keselamatan K3',
      backToTop: 'Kembali ke atas',
      youtubeLabel: 'Tonton video edukasi Care-Toon',
      instagramLabel: 'Halaman Instagram Care-Toon',
      facebookLabel: 'Komunitas Facebook Care-Toon',
    },
    mascotFallbackRole: 'Petugas PMIK Care-Toon',
  },
};
