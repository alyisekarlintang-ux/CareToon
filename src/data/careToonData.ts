import { Language } from './translations';

export const MASCOT_IMAGES = {
  heroWaving: '/src/assets/images/pmik_mascot_hero_desk_1794847260478.jpg',
  clipboardGuide: '/src/assets/images/pmik_mascot_clipboard_1794847260091.jpg',
  thumbsUpSafety: '/src/assets/images/pmik_mascot_thumbs_up_1794847261362.jpg',
  footerGoodbye: '/src/assets/images/pmik_mascot_goodbye_1794847261239.jpg',
} as const;

export interface ServiceOverviewCard {
  id: string;
  targetId: string;
  index: string;
  title: string;
  description: string;
  accentBg: string;
  iconName: 'clipboard' | 'shield-card' | 'heart-safety';
}

const SERVICE_CARDS_BY_LANG: Record<Language, ServiceOverviewCard[]> = {
  en: [
    {
      id: 'admin-flow',
      targetId: 'administration-flow',
      index: '01',
      title: 'Administration Flow',
      description:
        'Follow every stop inside a Puskesmas—from taking your queue ticket at the entrance to picking up medicine at the pharmacy.',
      accentBg: 'bg-[#DCEBFA]',
      iconName: 'clipboard',
    },
    {
      id: 'jkn-flow',
      targetId: 'jkn-registration',
      index: '02',
      title: 'JKN Registration Flow',
      description:
        'Check which documents to bring, how BPJS Kesehatan verification works at the desk, and get answers to common coverage questions.',
      accentBg: 'bg-[#BFE8D6]',
      iconName: 'shield-card',
    },
    {
      id: 'k3-safety',
      targetId: 'safety-k3',
      index: '03',
      title: 'K3 Safety Guidelines',
      description:
        'Explore easy safety habits that protect patients and staff—covering hand hygiene, mask etiquette, waste bins, and emergency exits.',
      accentBg: 'bg-[#FFE5D6]',
      iconName: 'heart-safety',
    },
  ],
  id: [
    {
      id: 'admin-flow',
      targetId: 'administration-flow',
      index: '01',
      title: 'Alur Administrasi',
      description:
        'Ikuti setiap pos layanan di Puskesmas—mulai dari mengambil nomor antrean di pintu masuk hingga pengambilan obat di apotek.',
      accentBg: 'bg-[#DCEBFA]',
      iconName: 'clipboard',
    },
    {
      id: 'jkn-flow',
      targetId: 'jkn-registration',
      index: '02',
      title: 'Alur Pendaftaran JKN',
      description:
        'Cek dokumen yang perlu dibawa, cara verifikasi BPJS Kesehatan di loket, serta jawaban atas pertanyaan umum kepesertaan.',
      accentBg: 'bg-[#BFE8D6]',
      iconName: 'shield-card',
    },
    {
      id: 'k3-safety',
      targetId: 'safety-k3',
      index: '03',
      title: 'Panduan Keselamatan K3',
      description:
        'Pelajari kebiasaan aman yang melindungi pasien dan petugas—mulai dari cuci tangan, etika masker, tempat sampah, hingga jalur evakuasi.',
      accentBg: 'bg-[#FFE5D6]',
      iconName: 'heart-safety',
    },
  ],
};

export function getServiceOverviewCards(lang: Language): ServiceOverviewCard[] {
  return SERVICE_CARDS_BY_LANG[lang];
}

export interface AdminStep {
  stepNumber: number;
  shortTitle: string;
  fullTitle: string;
  estimatedTime: string;
  summary: string;
  details: string;
  whatYouNeed: string;
  mascotTip: string;
}

const ADMIN_STEPS_BY_LANG: Record<Language, AdminStep[]> = {
  en: [
    {
      stepNumber: 1,
      shortTitle: 'Arrive',
      fullTitle: '01. Arrive at the Puskesmas',
      estimatedTime: '2–3 min',
      summary: 'Enter through the main patient lobby and check in with the triage or greeter staff.',
      details:
        'When you arrive, take a moment to sanitize your hands at the entrance station. If you have fever, cough, or urgent symptoms, let the greeter know immediately so they can direct you to the priority or respiratory screening desk.',
      whatYouNeed: 'Face mask (if experiencing cough or flu symptoms) and your ID.',
      mascotTip:
        'Arrive 15 minutes before clinic hours open if you prefer shorter morning lines—registration usually opens at 07:30 AM!',
    },
    {
      stepNumber: 2,
      shortTitle: 'Queue Ticket',
      fullTitle: '02. Take Your Queue Number',
      estimatedTime: '1–2 min',
      summary: 'Collect a queue ticket at the kiosk or check in if you booked via Mobile JKN.',
      details:
        'Choose the right queue category at the ticket machine: General Patient, JKN/BPJS Member, or Priority Lane (seniors, pregnant mothers, and persons with disabilities). If you already booked an appointment online, scan your booking code at the kiosk.',
      whatYouNeed: 'Queue category choice or your Mobile JKN / online booking QR code.',
      mascotTip:
        'Listen for both the letter prefix and number—for example, "A-014" is for General Registration while "B-005" is Priority!',
    },
    {
      stepNumber: 3,
      shortTitle: 'Registration',
      fullTitle: '03. Front-Desk Registration',
      estimatedTime: '3–5 min',
      summary: 'Present your ID and JKN/BPJS card at the registration counter when your number is called.',
      details:
        'Our registration officer confirms your identity, updates your active phone number and address, and assigns you to the appropriate service unit (Poli Umum, Dental Clinic, Maternal & Child Health, or Lab). New patients fill out a quick general consent form.',
      whatYouNeed: 'National ID (KTP) or Child ID (KIA) and active JKN/BPJS card.',
      mascotTip:
        'Let me know right away if your phone number or home address changed—keeping your contact info accurate helps with follow-up reminders!',
    },
    {
      stepNumber: 4,
      shortTitle: 'Medical Records',
      fullTitle: '04. Medical Records (PMIK)',
      estimatedTime: '2–4 min',
      summary: 'PMIK staff retrieve or create your Electronic Medical Record (RME) securely.',
      details:
        'Medical Records & Health Information (PMIK) officers match your unique medical record number so the doctor can review your allergy notes, previous visits, and vital history before you even enter the exam room.',
      whatYouNeed: 'Patient clinic card (Kartu Berobat) if you have visited before.',
      mascotTip:
        'Your medical record is strictly confidential! Every visit adds safely to your health history so you never have to repeat past test details.',
    },
    {
      stepNumber: 5,
      shortTitle: 'Examination',
      fullTitle: '05. Nurse Screening & Doctor Exam',
      estimatedTime: '10–20 min',
      summary: 'Wait near your assigned clinic room for vital signs screening and consultation.',
      details:
        'A nurse first checks your blood pressure, temperature, height, and weight. Next, the doctor examines your symptoms, explains your condition clearly, orders lab checks if needed, and issues either an electronic prescription or a referral letter.',
      whatYouNeed: 'List of current medicines or allergies you want the doctor to know.',
      mascotTip:
        'Don’t hesitate to ask the doctor to repeat dosage instructions or write down warning signs—we want you to leave feeling confident.',
    },
    {
      stepNumber: 6,
      shortTitle: 'Pharmacy',
      fullTitle: '06. Pharmacy Pickup & Counseling',
      estimatedTime: '5–12 min',
      summary: 'Drop off or wait for your electronic prescription at the Puskesmas pharmacy counter.',
      details:
        'Most Puskesmas send prescriptions electronically directly from the exam room to the pharmacy. When the pharmacist calls your name, they confirm your date of birth and explain when and how to take each medicine safely.',
      whatYouNeed: 'Prescription queue slip (if provided) and your patient name confirmation.',
      mascotTip:
        'Double-check whether each medicine should be taken before or after meals before stepping away from the pharmacy window!',
    },
    {
      stepNumber: 7,
      shortTitle: 'Finish',
      fullTitle: '07. Payment Verification & Finish',
      estimatedTime: '2–3 min',
      summary: 'Complete cashier check-out (free for active JKN Faskes 1) or collect your referral.',
      details:
        'If you are an active JKN/BPJS member registered at this Puskesmas, standard outpatient services and prescribed medicines are covered at Rp 0. Non-JKN patients pay the regional tariff (Retribusi) at the cashier and receive an official receipt.',
      whatYouNeed: 'Cashier slip (for general patients) or stamped referral letter (if referred to a hospital).',
      mascotTip:
        'Before heading home, check your follow-up date and keep your receipt or referral copy safely in a folder. Wishing you a speedy recovery!',
    },
  ],
  id: [
    {
      stepNumber: 1,
      shortTitle: 'Datang',
      fullTitle: '01. Datang ke Puskesmas',
      estimatedTime: '2–3 mnt',
      summary: 'Masuk melalui lobi utama pasien dan lakukan skrining awal bersama petugas triase.',
      details:
        'Saat tiba, sempatkan membersihkan tangan menggunakan hand sanitizer di pintu masuk. Bila kamu mengalami demam, batuk, atau keluhan darurat, segera beri tahu petugas agar diarahkan ke meja skrining prioritas atau ruang tunggu khusus.',
      whatYouNeed: 'Masker (bila sedang batuk atau flu) dan kartu identitas.',
      mascotTip:
        'Datanglah 15 menit sebelum loket dibuka bila ingin antrean pagi lebih lengang—pendaftaran biasanya mulai pukul 07.30 WIB!',
    },
    {
      stepNumber: 2,
      shortTitle: 'Ambil Antrean',
      fullTitle: '02. Ambil Nomor Antrean',
      estimatedTime: '1–2 mnt',
      summary: 'Ambil nomor antrean di mesin tiket atau lakukan check-in bagi pengguna Mobile JKN.',
      details:
        'Pilih kategori antrean yang sesuai pada mesin: Pasien Umum, Peserta JKN/BPJS, atau Jalur Prioritas (lansia, ibu hamil, dan penyandang disabilitas). Jika sudah mendaftar online, cukup pindai kode booking pada anjungan mandiri.',
      whatYouNeed: 'Pilihan kategori antrean atau kode QR booking Mobile JKN.',
      mascotTip:
        'Perhatikan huruf dan angka pada tiketmu—misalnya "A-014" untuk Loket Umum/JKN dan "B-005" untuk Jalur Prioritas!',
    },
    {
      stepNumber: 3,
      shortTitle: 'Pendaftaran',
      fullTitle: '03. Pendaftaran di Loket',
      estimatedTime: '3–5 mnt',
      summary: 'Tunjukkan KTP dan kartu JKN/BPJS di meja pendaftaran saat nomormu dipanggil.',
      details:
        'Petugas pendaftaran memverifikasi identitas, memperbarui nomor ponsel serta alamat aktif, lalu mengarahkanmu ke poli tujuan (Poli Umum, Gigi, KIA/KB, atau Laboratorium). Pasien baru mengisi formulir persetujuan umum secara singkat.',
      whatYouNeed: 'KTP atau KIA (anak) asli dan kartu JKN/BPJS aktif.',
      mascotTip:
        'Beri tahu kami bila nomor HP atau alamatmu berubah agar pengingat kontrol dan informasi hasil lab tetap akurat!',
    },
    {
      stepNumber: 4,
      shortTitle: 'Rekam Medis',
      fullTitle: '04. Rekam Medis (PMIK)',
      estimatedTime: '2–4 mnt',
      summary: 'Petugas PMIK menyiapkan atau memperbarui Rekam Medis Elektronik (RME) kamu dengan aman.',
      details:
        'Petugas Perekam Medis dan Informasi Kesehatan (PMIK) mencocokkan nomor rekam medis unikmu agar dokter dapat melihat riwayat alergi, kunjungan sebelumnya, dan catatan kesehatan sebelum pemeriksaan dimulai.',
      whatYouNeed: 'Kartu Berobat pasien apabila sudah pernah berkunjung sebelumnya.',
      mascotTip:
        'Rekam medis kamu dijamin kerahasiaannya! Setiap kunjungan tercatat rapi sehingga kamu tidak perlu mengulang cerita riwayat sakit dari awal.',
    },
    {
      stepNumber: 5,
      shortTitle: 'Pemeriksaan',
      fullTitle: '05. Skrining Perawat & Pemeriksaan Dokter',
      estimatedTime: '10–20 mnt',
      summary: 'Tunggu di depan poli tujuan untuk pemeriksaan tanda vital dan konsultasi dokter.',
      details:
        'Perawat akan memeriksa tekanan darah, suhu tubuh, tinggi, serta berat badan terlebih dahulu. Setelah itu dokter memeriksa keluhanmu, menjelaskan kondisi secara jelas, meminta cek lab bila perlu, lalu menerbitkan resep elektronik atau surat rujukan.',
      whatYouNeed: 'Daftar obat yang sedang dikonsumsi atau riwayat alergi obat.',
      mascotTip:
        'Jangan ragu bertanya jika ada aturan dosis atau tanda bahaya yang belum jelas—kami ingin kamu pulang dengan tenang dan paham.',
    },
    {
      stepNumber: 6,
      shortTitle: 'Apotek',
      fullTitle: '06. Pengambilan Obat & Konseling Farmasi',
      estimatedTime: '5–12 mnt',
      summary: 'Tunggu panggilan resep elektronikmu di loket farmasi / apotek Puskesmas.',
      details:
        'Sebagian besar Puskesmas mengirim resep secara elektronik langsung dari ruang periksa ke apotek. Saat nama dipanggil, apoteker mencocokkan tanggal lahirmu dan menjelaskan cara minum serta penyimpanan obat dengan aman.',
      whatYouNeed: 'Nomor antrean obat (bila diberikan) dan konfirmasi nama/tanggal lahir.',
      mascotTip:
        'Pastikan kamu mengecek apakah obat diminum sebelum atau sesudah makan sebelum meninggalkan loket apotek!',
    },
    {
      stepNumber: 7,
      shortTitle: 'Selesai',
      fullTitle: '07. Penyelesaian Administrasi & Pulang',
      estimatedTime: '2–3 mnt',
      summary: 'Selesaikan verifikasi kasir (gratis untuk JKN Faskes 1 aktif) atau ambil surat rujukan.',
      details:
        'Bagi peserta JKN/BPJS aktif yang terdaftar di Puskesmas ini, layanan rawat jalan dasar dan obat resep ditanggung penuh Rp 0. Pasien umum membayar tarif retribusi daerah di kasir dan menerima kuitansi resmi.',
      whatYouNeed: 'Nota kasir (pasien umum) atau surat rujukan berstempel (bila dirujuk ke RS).',
      mascotTip:
        'Sebelum pulang, cek kembali jadwal kontrol dan simpan surat atau kuitansi di map khusus. Semoga lekas sembuh!',
    },
  ],
};

export function getAdminFlowSteps(lang: Language): AdminStep[] {
  return ADMIN_STEPS_BY_LANG[lang];
}

export interface JknStep {
  step: number;
  title: string;
  description: string;
}

const JKN_STEPS_BY_LANG: Record<Language, JknStep[]> = {
  en: [
    {
      step: 1,
      title: 'Prepare JKN Card & ID',
      description: 'Have your physical JKN/BPJS card (or Mobile JKN app) and KTP/KK ready before queuing.',
    },
    {
      step: 2,
      title: 'Go to Registration Desk',
      description: 'Take a JKN queue ticket or check in via your Mobile JKN online registration barcode.',
    },
    {
      step: 3,
      title: 'Verify Membership Data',
      description: 'Staff verify active status and confirm this Puskesmas is listed as your Faskes Tingkat 1.',
    },
    {
      step: 4,
      title: 'Receive Clinic Queue',
      description: 'Get your destination room name (e.g., Poli Umum or Dental) and clinic queue number.',
    },
    {
      step: 5,
      title: 'Receive Health Service',
      description: 'Consult with the nurse and doctor, then collect covered medication at the pharmacy.',
    },
  ],
  id: [
    {
      step: 1,
      title: 'Siapkan Kartu JKN & KTP',
      description: 'Siapkan kartu fisik JKN/BPJS (atau aplikasi Mobile JKN) beserta KTP/KK sebelum antre.',
    },
    {
      step: 2,
      title: 'Menuju Loket Pendaftaran',
      description: 'Ambil tiket antrean JKN atau pindai kode antrean online dari aplikasi Mobile JKN.',
    },
    {
      step: 3,
      title: 'Verifikasi Data Peserta',
      description: 'Petugas mengecek status keaktifan dan memastikan Puskesmas ini terdaftar sebagai Faskes Tingkat 1.',
    },
    {
      step: 4,
      title: 'Terima Nomor Antrean Poli',
      description: 'Dapatkan nama poli tujuan (misalnya Poli Umum atau Gigi) beserta nomor urut pemeriksaan.',
    },
    {
      step: 5,
      title: 'Terima Layanan Kesehatan',
      description: 'Ikuti pemeriksaan perawat dan dokter, lalu ambil obat yang ditanggung di bagian farmasi.',
    },
  ],
};

export function getJknFlowSteps(lang: Language): JknStep[] {
  return JKN_STEPS_BY_LANG[lang];
}

export interface ChecklistDoc {
  id: string;
  label: string;
  detail: string;
  required: boolean;
}

const JKN_CHECKLIST_BY_LANG: Record<Language, ChecklistDoc[]> = {
  en: [
    {
      id: 'jkn-card',
      label: 'Active JKN / BPJS Kesehatan Card (Physical or Mobile JKN)',
      detail: 'Digital cards inside the official Mobile JKN app are accepted at all Puskesmas counters.',
      required: true,
    },
    {
      id: 'ktp',
      label: 'Original National ID (KTP) or Child ID (KIA)',
      detail: 'Used by PMIK officers to match your NIK with your national health record.',
      required: true,
    },
    {
      id: 'kk',
      label: 'Family Card (Kartu Keluarga / KK) Copy',
      detail: 'Helpful when registering children or newborns who do not yet have a KIA card.',
      required: false,
    },
    {
      id: 'mobile-booking',
      label: 'Mobile JKN Antrean Online Code (If booked ahead)',
      detail: 'Shows your confirmed arrival window so you can check in faster at the kiosk.',
      required: false,
    },
    {
      id: 'referral',
      label: 'Control Letter / Hospital Counter-Referral (If applicable)',
      detail: 'Bring your PRB (Program Rujuk Balik) or follow-up note if continuing chronic care.',
      required: false,
    },
  ],
  id: [
    {
      id: 'jkn-card',
      label: 'Kartu JKN / BPJS Kesehatan Aktif (Fisik atau Mobile JKN)',
      detail: 'Kartu digital pada aplikasi resmi Mobile JKN diterima di seluruh loket Puskesmas.',
      required: true,
    },
    {
      id: 'ktp',
      label: 'KTP Asli atau Kartu Identitas Anak (KIA)',
      detail: 'Digunakan petugas PMIK untuk mencocokkan NIK dengan rekam medis nasionalmu.',
      required: true,
    },
    {
      id: 'kk',
      label: 'Salinan Kartu Keluarga (KK)',
      detail: 'Membantu saat mendaftarkan anak atau bayi baru lahir yang belum memiliki kartu KIA.',
      required: false,
    },
    {
      id: 'mobile-booking',
      label: 'Kode Antrean Online Mobile JKN (Jika daftar dari rumah)',
      detail: 'Mempercepat proses check-in di mesin anjungan sesuai jam kedatangan yang dipilih.',
      required: false,
    },
    {
      id: 'referral',
      label: 'Surat Kontrol / Rujuk Balik Rumah Sakit (Bila ada)',
      detail: 'Bawa surat PRB (Program Rujuk Balik) atau catatan kontrol bila melanjutkan terapi rutin.',
      required: false,
    },
  ],
};

export function getJknDocumentsChecklist(lang: Language): ChecklistDoc[] {
  return JKN_CHECKLIST_BY_LANG[lang];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const JKN_FAQS_BY_LANG: Record<Language, FaqItem[]> = {
  en: [
    {
      id: 'faq-1',
      question: 'Can I use JKN if this Puskesmas is not my registered Faskes Tingkat 1?',
      answer:
        'Yes, in two situations: (1) Emergency medical conditions are covered at any nearest Puskesmas or hospital, and (2) If you are temporarily out of town, you can receive outpatient care up to 3 times per month at another Puskesmas with an active JKN card.',
    },
    {
      id: 'faq-2',
      question: 'Do I have to bring a printed photocopy of my BPJS card and KTP?',
      answer:
        'Not anymore at most digitized Puskesmas! Showing your original KTP (or NIK) and the digital card inside the Mobile JKN app is enough for verification.',
    },
    {
      id: 'faq-3',
      question: 'What happens if my JKN membership status shows inactive?',
      answer:
        'You can still receive immediate medical care as a general (non-JKN) patient under standard regional tariffs, while our desk guides you on how to reactivate contributions via the Mobile JKN app or PANDAWA WhatsApp service.',
    },
    {
      id: 'faq-4',
      question: 'How do I get a hospital referral using JKN?',
      answer:
        'JKN follows a tiered care system. The Puskesmas doctor will examine you first and issue an electronic referral (Rujukan Online) to a partner hospital only if specialist care or advanced diagnostics are medically indicated.',
    },
  ],
  id: [
    {
      id: 'faq-1',
      question: 'Bisakah memakai JKN jika Puskesmas ini bukan Faskes Tingkat 1 saya?',
      answer:
        'Bisa dalam dua kondisi: (1) Kondisi gawat darurat ditanggung di Puskesmas atau rumah sakit terdekat mana pun, dan (2) Saat sedang berada di luar domisili sementara, peserta aktif berhak mendapat layanan rawat jalan maksimal 3 kali per bulan di Puskesmas lain.',
    },
    {
      id: 'faq-2',
      question: 'Apakah saya harus membawa fotokopi kartu BPJS dan KTP?',
      answer:
        'Di sebagian besar Puskesmas digital kini tidak perlu lagi! Cukup tunjukkan KTP asli (atau NIK) serta kartu digital di aplikasi Mobile JKN untuk verifikasi di loket.',
    },
    {
      id: 'faq-3',
      question: 'Bagaimana jika status kepesertaan JKN saya ternyata nonaktif?',
      answer:
        'Kamu tetap dapat dilayani segera sebagai pasien umum sesuai tarif retribusi daerah, sementara petugas loket membantu menjelaskan cara pengaktifan kembali melalui Mobile JKN atau layanan WhatsApp PANDAWA.',
    },
    {
      id: 'faq-4',
      question: 'Bagaimana alur mendapatkan rujukan rumah sakit dengan JKN?',
      answer:
        'JKN menerapkan layanan berjenjang. Dokter Puskesmas akan memeriksa kondisi kamu terlebih dahulu dan menerbitkan Rujukan Online ke rumah sakit mitra hanya bila terdapat indikasi medis yang membutuhkan dokter spesialis.',
    },
  ],
};

export function getJknFaqs(lang: Language): FaqItem[] {
  return JKN_FAQS_BY_LANG[lang];
}

export interface SafetyGuideline {
  id: string;
  title: string;
  shortTag: string;
  iconName: 'hand-wash' | 'mask' | 'trash' | 'exit' | 'walk-safe' | 'shield-alert';
  accentClass: string;
  headline: string;
  explanation: string;
  doItems: string[];
  avoidItems: string[];
  mascotTip: string;
}

const K3_BY_LANG: Record<Language, SafetyGuideline[]> = {
  en: [
    {
      id: 'hand-hygiene',
      title: 'Hand Hygiene',
      shortTag: '5-step wash & sanitizer',
      iconName: 'hand-wash',
      accentClass: 'bg-[#DCEBFA] text-[#1F3A70]',
      headline: 'Keep Hands Clean Before & After Care',
      explanation:
        'Washing hands with soap or using alcohol-based hand rub for at least 20 seconds stops germs from spreading across waiting chairs, door handles, and registration counters.',
      doItems: [
        'Use hand sanitizer at the entrance, outside exam rooms, and after pharmacy pickup.',
        'Rub palms, backs of hands, between fingers, and thumbs thoroughly.',
      ],
      avoidItems: [
        'Avoid touching your eyes, nose, or mouth right after handling shared pens or queue tickets.',
      ],
      mascotTip:
        'Spot the blue hand-sanitizer dispensers next to every registration window—a quick 20-second rub keeps everyone safer!',
    },
    {
      id: 'mask-etiquette',
      title: 'Mask & Cough Etiquette',
      shortTag: 'Protect shared breathing air',
      iconName: 'mask',
      accentClass: 'bg-[#BFE8D6] text-[#1F3A70]',
      headline: 'Wear a Mask When Having Respiratory Symptoms',
      explanation:
        'If you have a cough, sore throat, fever, or runny nose, wearing a snug mask over your nose and mouth protects babies, seniors, and pregnant patients sitting nearby.',
      doItems: [
        'Ask the registration desk if you forgot a mask—complimentary masks are often available.',
        'Cover sneezes with your inner elbow or a tissue, then discard the tissue immediately.',
      ],
      avoidItems: [
        'Do not pull your mask down below your chin while speaking at the registration desk.',
      ],
      mascotTip:
        'If you feel feverish or have a persistent cough, let our front desk know right away so we can seat you in a well-ventilated zone.',
    },
    {
      id: 'waste-disposal',
      title: 'Waste Disposal Bins',
      shortTag: 'Color-coded bin sorting',
      iconName: 'trash',
      accentClass: 'bg-[#FFE8A3] text-[#1F3A70]',
      headline: 'Sort Trash Correctly Between General & Infectious Bins',
      explanation:
        'Puskesmas separate everyday wrappers from infectious medical waste to protect janitorial staff, patients, and the surrounding community environment.',
      doItems: [
        'Use Green/Black bins for food wrappers, water bottles, and clean paper receipts.',
        'Use Yellow bins (lined with yellow bags) only for used masks, bandages, or soiled tissues.',
      ],
      avoidItems: ['Never open or reach inside a red safety box or yellow infectious bin.'],
      mascotTip:
        'Remember the simple rule: Yellow is for medical/mask waste, and Green/Black is for everyday clean trash!',
    },
    {
      id: 'emergency-exits',
      title: 'Emergency Exits',
      shortTag: 'Green signs & assembly points',
      iconName: 'exit',
      accentClass: 'bg-[#BFE8D6] text-[#1F3A70]',
      headline: 'Know the Nearest Exit & Assembly Point',
      explanation:
        'Every Puskesmas hallway displays illuminated green exit signs ("JALUR EVAKUASI") leading outdoors to an open Assembly Point ("TITIK KUMPUL") for earthquakes or fire alarms.',
      doItems: [
        'Notice the nearest green exit arrow when sitting in the waiting area.',
        'Follow staff instructions calmly and walk—never run—toward the outdoor Assembly Point.',
      ],
      avoidItems: ['Never block emergency exit doors or fire extinguishers with strollers or bags.'],
      mascotTip:
        'In case of an earthquake, duck, cover your head, and hold on until shaking stops before walking out via the green exit route.',
    },
    {
      id: 'safe-movement',
      title: 'Safe Facility Movement',
      shortTag: 'Ramps, rails & wet floors',
      iconName: 'walk-safe',
      accentClass: 'bg-[#FFE5D6] text-[#1F3A70]',
      headline: 'Watch for Yellow Wet-Floor Cones & Use Handrails',
      explanation:
        'Clinic floors are mopped frequently with disinfectant for hygiene. Paying attention to floor cones, ramps, and corridor handrails prevents slips and trips.',
      doItems: [
        'Use wheelchair ramps and corridor handrails when walking with elderly relatives or children.',
        'Walk around areas marked with yellow "Caution: Wet Floor" signs.',
      ],
      avoidItems: ['Do not let young children run in clinic hallways or climb on waiting-room chairs.'],
      mascotTip:
        'Need a wheelchair or walking support from the parking area? Ask our security or front-desk team—we keep wheelchairs ready at the door!',
    },
    {
      id: 'waiting-etiquette',
      title: 'Priority & Zone Safety',
      shortTag: 'Respectful waiting zones',
      iconName: 'shield-alert',
      accentClass: 'bg-[#DCEBFA] text-[#1F3A70]',
      headline: 'Respect Priority Seating & Restricted Clinical Areas',
      explanation:
        'Clear patient zones keep infectious areas separated from healthy checkups (such as baby immunizations and prenatal visits) and keep corridors clear for stretchers.',
      doItems: [
        'Keep marked priority seats available for pregnant mothers, seniors, and patients in pain.',
        'Wait outside restricted lab, x-ray, or sterile treatment doors until a staff member invites you in.',
      ],
      avoidItems: ['Avoid crowding right around exam room doors so nurses can move equipment safely.'],
      mascotTip:
        'Healthy baby clinics and general sick clinics are often scheduled in separate zones—check the wall signs or ask me anytime!',
    },
  ],
  id: [
    {
      id: 'hand-hygiene',
      title: 'Kebersihan Tangan',
      shortTag: 'Cuci tangan & hand sanitizer',
      iconName: 'hand-wash',
      accentClass: 'bg-[#DCEBFA] text-[#1F3A70]',
      headline: 'Jaga Kebersihan Tangan Sebelum & Sesudah Layanan',
      explanation:
        'Mencuci tangan dengan sabun atau cairan berbasis alkohol minimal 20 detik membantu memutus penyebaran kuman dari kursi tunggu, gagang pintu, dan meja loket.',
      doItems: [
        'Gunakan hand sanitizer di pintu masuk, depan ruang poli, dan setelah mengambil obat di apotek.',
        'Gosok telapak tangan, punggung tangan, sela jari, dan ibu jari secara merata.',
      ],
      avoidItems: [
        'Hindari menyentuh mata, hidung, atau mulut sesaat setelah memegang pulpen bersama atau kertas antrean.',
      ],
      mascotTip:
        'Cari dispenser hand sanitizer biru di dekat setiap jendela loket—20 detik menggosok tangan membuat semua lebih aman!',
    },
    {
      id: 'mask-etiquette',
      title: 'Etika Masker & Batuk',
      shortTag: 'Lindungi udara ruang tunggu',
      iconName: 'mask',
      accentClass: 'bg-[#BFE8D6] text-[#1F3A70]',
      headline: 'Gunakan Masker Saat Mengalami Gejala Pernapasan',
      explanation:
        'Jika kamu batuk, sakit tenggorokan, demam, atau pilek, memakai masker menutup hidung dan mulut melindungi bayi, lansia, serta ibu hamil di sekitarmu.',
      doItems: [
        'Minta masker ke petugas pendaftaran bila lupa membawa—stok masker darurat biasanya tersedia.',
        'Tutup bersin dengan siku bagian dalam atau tisu, lalu segera buang tisu ke tempat sampah.',
      ],
      avoidItems: [
        'Jangan menurunkan masker ke dagu saat berbicara dengan petugas di loket pendaftaran.',
      ],
      mascotTip:
        'Bila merasa demam atau batuk berat, langsung beri tahu petugas depan agar kami arahkan ke ruang tunggu berventilasi baik.',
    },
    {
      id: 'waste-disposal',
      title: 'Pemilahan Sampah',
      shortTag: 'Tempat sampah berkode warna',
      iconName: 'trash',
      accentClass: 'bg-[#FFE8A3] text-[#1F3A70]',
      headline: 'Pisahkan Sampah Umum dan Sampah Medis Infeksius',
      explanation:
        'Puskesmas memisahkan bungkus makanan biasa dari limbah medis infeksius demi menjaga keselamatan petugas kebersihan, pasien, serta lingkungan sekitar.',
      doItems: [
        'Gunakan tempat sampah Hijau/Hitam untuk bungkus makanan, botol minum, dan kertas bersih.',
        'Gunakan tempat sampah Kuning khusus untuk masker bekas, perban, atau tisu kotor.',
      ],
      avoidItems: ['Jangan pernah membuka atau merogoh kotak safety box merah maupun tempat sampah kuning.'],
      mascotTip:
        'Ingat aturan mudahnya: Kuning untuk limbah medis/masker, dan Hijau/Hitam untuk sampah bersih sehari-hari!',
    },
    {
      id: 'emergency-exits',
      title: 'Jalur Evakuasi Darurat',
      shortTag: 'Rambu hijau & titik kumpul',
      iconName: 'exit',
      accentClass: 'bg-[#BFE8D6] text-[#1F3A70]',
      headline: 'Kenali Pintu Keluar Terdekat & Titik Kumpul',
      explanation:
        'Setiap lorong Puskesmas dilengkapi papan penunjuk hijau bertuliskan "JALUR EVAKUASI" yang mengarah keluar menuju area terbuka "TITIK KUMPUL" saat terjadi gempa atau kebakaran.',
      doItems: [
        'Perhatikan arah panah jalur evakuasi hijau terdekat saat duduk di ruang tunggu.',
        'Ikuti arahan petugas dengan tenang dan berjalan cepat—jangan berlari—menuju Titik Kumpul.',
      ],
      avoidItems: ['Jangan menghalangi pintu darurat atau alat pemadam api (APAR) dengan kereta bayi atau tas.'],
      mascotTip:
        'Saat terjadi gempa bumi, merunduk, lindungi kepala, dan bertahanlah sampai guncangan berhenti sebelum berjalan keluar lewat jalur hijau.',
    },
    {
      id: 'safe-movement',
      title: 'Berjalan Aman di Klinik',
      shortTag: 'Ram, pegangan & lantai licin',
      iconName: 'walk-safe',
      accentClass: 'bg-[#FFE5D6] text-[#1F3A70]',
      headline: 'Waspadai Tanda Lantai Licin & Gunakan Pegangan Tangan',
      explanation:
        'Lantai klinik rutin dipel dengan disinfektan agar tetap higienis. Memperhatikan kerucut peringatan kuning, ram kursi roda, dan pegangan koridor mencegah risiko terpeleset.',
      doItems: [
        'Gunakan jalur landai (ram) dan pegangan dinding saat mendampingi lansia atau anak kecil.',
        'Hindari melintas di area yang sedang dipasang kerucut kuning "Awas Lantai Licin".',
      ],
      avoidItems: ['Jangan biarkan anak-anak berlarian di lorong klinik atau memanjat kursi tunggu.'],
      mascotTip:
        'Butuh kursi roda atau bantuan berjalan dari area parkir? Hubungi petugas keamanan atau loket—kursi roda selalu siap di pintu masuk!',
    },
    {
      id: 'waiting-etiquette',
      title: 'Zona Prioritas & Area Steril',
      shortTag: 'Ketertiban ruang tunggu',
      iconName: 'shield-alert',
      accentClass: 'bg-[#DCEBFA] text-[#1F3A70]',
      headline: 'Hormati Kursi Prioritas & Area Terbatas Medis',
      explanation:
        'Pembagian zona pasien menjaga area pemeriksaan sehat (seperti imunisasi bayi dan pemeriksaan ibu hamil) terpisah dari keluhan menular serta menjaga lorong tetap lapang.',
      doItems: [
        'Berikan kursi bertanda prioritas bagi ibu hamil, lansia, dan pasien yang kesakitan.',
        'Tunggu di luar pintu laboratorium, ruang tindakan steril, atau radiologi hingga dipanggil petugas.',
      ],
      avoidItems: ['Hindari berkerumun tepat di depan pintu ruang periksa agar perawat leluasa membawa alat medis.'],
      mascotTip:
        'Layanan imunisasi anak sehat dan poli umum sering dijadwalkan di zona terpisah—cek papan penunjuk dinding atau tanya saya kapan saja!',
    },
  ],
};

export function getK3SafetyGuidelines(lang: Language): SafetyGuideline[] {
  return K3_BY_LANG[lang];
}

export interface VideoSceneCue {
  timeStart: number;
  title: string;
  caption: string;
  visualType:
    | 'welcome'
    | 'ticket'
    | 'desk'
    | 'doctor'
    | 'pharmacy'
    | 'jkn'
    | 'safety'
    | 'etiquette'
    | 'faq';
}

export interface EducationalVideo {
  id: string;
  title: string;
  category: string;
  /**
   * Paste your own YouTube video link here, for example:
   * 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' or 'https://youtu.be/dQw4w9WgXcQ'
   */
  youtubeUrl?: string;
  /**
   * Or paste a direct MP4/WebM video file path (e.g. '/videos/my-video.mp4')
   */
  videoUrl?: string;
  durationSeconds: number;
  durationLabel: string;
  summary: string;
  accentColor: string;
  scenes: VideoSceneCue[];
}

export function extractYouTubeId(input?: string): string | null {
  if (!input) return null;
  const trimmed = input.trim();
  if (!trimmed) return null;

  // Direct 11-character YouTube video ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  try {
    const parsed = new URL(trimmed);
    const host = parsed.hostname.replace(/^www\./, '');

    if (host === 'youtu.be') {
      const id = parsed.pathname.split('/').filter(Boolean)[0];
      return id && /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
    }

    if (
      host === 'youtube.com' ||
      host === 'm.youtube.com' ||
      host === 'youtube-nocookie.com'
    ) {
      const vParam = parsed.searchParams.get('v');
      if (vParam && /^[a-zA-Z0-9_-]{11}$/.test(vParam)) {
        return vParam;
      }

      const segments = parsed.pathname.split('/').filter(Boolean);
      if (
        segments.length >= 2 &&
        (segments[0] === 'embed' || segments[0] === 'shorts' || segments[0] === 'live')
      ) {
        const id = segments[1];
        return id && /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
      }
    }
  } catch {
    return null;
  }

  return null;
}

/**
 * GUIDE TO ADDING YOUR OWN YOUTUBE VIDEOS IN CODE:
 * Fill in `youtubeUrl` on any item below (for both `en` and `id`, or add a new object to the array).
 * Example: youtubeUrl: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID'
 */
const VIDEOS_BY_LANG: Record<Language, EducationalVideo[]> = {
  en: [
    {
      id: 'vid-admin',
      title: 'Administration Flow: Arrival to Pharmacy',
      category: 'Service Guide',
      youtubeUrl: '',
      videoUrl: '',
      durationSeconds: 24,
      durationLabel: '00:24',
      summary: 'Watch how a typical Puskesmas visit moves smoothly across 7 easy stops.',
      accentColor: '#2F5FB3',
      scenes: [
        {
          timeStart: 0,
          title: 'Step 1–2: Arrive & Take Queue Ticket',
          caption:
            'Sanitize your hands at the entrance and tap General, JKN, or Priority on the queue kiosk.',
          visualType: 'ticket',
        },
        {
          timeStart: 8,
          title: 'Step 3–4: Registration & PMIK Records',
          caption:
            'Show your KTP and JKN card at the desk while PMIK staff open your secure medical record.',
          visualType: 'desk',
        },
        {
          timeStart: 16,
          title: 'Step 5–7: Exam, Pharmacy & Finish',
          caption:
            'See the nurse and doctor, pick up explained medicines at Pharmacy, and head home safely.',
          visualType: 'pharmacy',
        },
      ],
    },
    {
      id: 'vid-jkn',
      title: 'JKN / BPJS Registration Made Simple',
      category: 'Insurance & ID',
      youtubeUrl: '',
      videoUrl: '',
      durationSeconds: 24,
      durationLabel: '00:24',
      summary: 'Everything you need for quick JKN verification at the front counter.',
      accentColor: '#1E7E63',
      scenes: [
        {
          timeStart: 0,
          title: 'Bring Digital or Physical JKN + KTP',
          caption:
            'Open your Mobile JKN app or keep your card ready alongside your National ID (KTP).',
          visualType: 'jkn',
        },
        {
          timeStart: 8,
          title: 'Confirm Active Status & Faskes 1',
          caption:
            'Staff verify your membership in seconds and assign you directly to your clinic room.',
          visualType: 'desk',
        },
        {
          timeStart: 16,
          title: 'Rp 0 Covered Primary Care',
          caption:
            'Enjoy consultation, basic labs, and prescribed medicine covered under active JKN.',
          visualType: 'doctor',
        },
      ],
    },
    {
      id: 'vid-k3',
      title: 'K3 Safety & Hygiene at Puskesmas',
      category: 'Safety (K3)',
      youtubeUrl: '',
      videoUrl: '',
      durationSeconds: 24,
      durationLabel: '00:24',
      summary: 'Simple safety rules: clean hands, proper masks, yellow bins, and green exit signs.',
      accentColor: '#D97706',
      scenes: [
        {
          timeStart: 0,
          title: 'Clean Hands & Respiratory Masks',
          caption:
            'Use sanitizer stations regularly and wear a mask if you have cough or fever symptoms.',
          visualType: 'safety',
        },
        {
          timeStart: 8,
          title: 'Sort Waste: Yellow vs. Green Bins',
          caption:
            'Drop used masks or tissues in yellow medical bins and clean wrappers in green bins.',
          visualType: 'safety',
        },
        {
          timeStart: 16,
          title: 'Watch Wet Floors & Green Exit Signs',
          caption:
            'Use corridor handrails, step carefully near yellow cones, and spot green evacuation signs.',
          visualType: 'welcome',
        },
      ],
    },
    {
      id: 'vid-etiquette',
      title: 'Patient Etiquette & Respectful Care',
      category: 'Community',
      youtubeUrl: '',
      videoUrl: '',
      durationSeconds: 21,
      durationLabel: '00:21',
      summary: 'How small acts of patience and courtesy make clinic visits calmer for all.',
      accentColor: '#2F5FB3',
      scenes: [
        {
          timeStart: 0,
          title: 'Share Priority Seating Thoughtfully',
          caption:
            'Reserve front-row seats for pregnant mothers, older adults, and patients with urgent pain.',
          visualType: 'etiquette',
        },
        {
          timeStart: 7,
          title: 'Keep Voices Soft & Phones Silent',
          caption:
            'A quiet waiting hall helps nurses call queue numbers clearly without confusion.',
          visualType: 'etiquette',
        },
        {
          timeStart: 14,
          title: 'Ask Questions Openly',
          caption:
            'Our doctors, pharmacists, and PMIK staff are always happy to clarify any instruction.',
          visualType: 'welcome',
        },
      ],
    },
    {
      id: 'vid-faq',
      title: 'Top Tips & Common Patient FAQs',
      category: 'Quick Tips',
      youtubeUrl: '',
      videoUrl: '',
      durationSeconds: 21,
      durationLabel: '00:21',
      summary: 'Answers to the top questions patients ask our PMIK front-desk team every morning.',
      accentColor: '#1F3A70',
      scenes: [
        {
          timeStart: 0,
          title: 'Best Time to Visit?',
          caption:
            'Morning clinics open early—use Mobile JKN Antrean Online to skip long registration queues.',
          visualType: 'faq',
        },
        {
          timeStart: 7,
          title: 'Visiting Out of Town?',
          caption:
            'Active JKN members can still visit another Puskesmas up to 3 times a month when traveling.',
          visualType: 'jkn',
        },
        {
          timeStart: 14,
          title: 'Need a Hospital Referral?',
          caption:
            'Your Puskesmas doctor issues an electronic referral whenever specialist treatment is needed.',
          visualType: 'doctor',
        },
      ],
    },
  ],
  id: [
    {
      id: 'vid-admin',
      title: 'Alur Administrasi: Dari Datang hingga Apotek',
      category: 'Panduan Layanan',
      youtubeUrl: '',
      videoUrl: '',
      durationSeconds: 24,
      durationLabel: '00:24',
      summary: 'Lihat perjalanan kunjungan pasien di Puskesmas melalui 7 tahap yang tertata rapi.',
      accentColor: '#2F5FB3',
      scenes: [
        {
          timeStart: 0,
          title: 'Tahap 1–2: Datang & Ambil Tiket',
          caption:
            'Bersihkan tangan di pintu masuk lalu pilih antrean Umum, JKN, atau Prioritas di mesin tiket.',
          visualType: 'ticket',
        },
        {
          timeStart: 8,
          title: 'Tahap 3–4: Loket & Rekam Medis PMIK',
          caption:
            'Tunjukkan KTP dan kartu JKN di meja loket sementara petugas PMIK menyiapkan rekam medismu.',
          visualType: 'desk',
        },
        {
          timeStart: 16,
          title: 'Tahap 5–7: Periksa, Apotek & Selesai',
          caption:
            'Temui perawat dan dokter, ambil obat beserta penjelasan apoteker, lalu pulang dengan tenang.',
          visualType: 'pharmacy',
        },
      ],
    },
    {
      id: 'vid-jkn',
      title: 'Pendaftaran JKN / BPJS Jadi Mudah',
      category: 'Jaminan & Identitas',
      youtubeUrl: '',
      videoUrl: '',
      durationSeconds: 24,
      durationLabel: '00:24',
      summary: 'Semua yang perlu kamu siapkan untuk verifikasi cepat peserta JKN di loket depan.',
      accentColor: '#1E7E63',
      scenes: [
        {
          timeStart: 0,
          title: 'Siapkan Kartu JKN Digital/Fisik + KTP',
          caption:
            'Buka aplikasi Mobile JKN atau siapkan kartu fisik bersama KTP asli milikmu.',
          visualType: 'jkn',
        },
        {
          timeStart: 8,
          title: 'Cek Status Aktif & Faskes 1',
          caption:
            'Petugas memverifikasi kepesertaan dalam hitungan detik dan mengarahkan ke ruang poli.',
          visualType: 'desk',
        },
        {
          timeStart: 16,
          title: 'Layanan Dasar Ditanggung Rp 0',
          caption:
            'Konsultasi, pemeriksaan lab dasar, dan obat resep ditanggung penuh bagi peserta JKN aktif.',
          visualType: 'doctor',
        },
      ],
    },
    {
      id: 'vid-k3',
      title: 'Keselamatan K3 & Kebersihan Puskesmas',
      category: 'Keselamatan (K3)',
      youtubeUrl: '',
      videoUrl: '',
      durationSeconds: 24,
      durationLabel: '00:24',
      summary: 'Aturan aman sederhana: tangan bersih, pakai masker, tong kuning, dan rambu keluar hijau.',
      accentColor: '#D97706',
      scenes: [
        {
          timeStart: 0,
          title: 'Tangan Bersih & Pakai Masker',
          caption:
            'Gunakan hand sanitizer secara berkala dan kenakan masker bila sedang batuk atau demam.',
          visualType: 'safety',
        },
        {
          timeStart: 8,
          title: 'Pilah Sampah: Tong Kuning vs Hijau',
          caption:
            'Buang masker atau tisu bekas ke tempat sampah kuning dan bungkus bersih ke tong hijau.',
          visualType: 'safety',
        },
        {
          timeStart: 16,
          title: 'Waspada Lantai Basah & Jalur Hijau',
          caption:
            'Gunakan pegangan lorong, berhati-hati di dekat kerucut kuning, dan kenali jalur evakuasi.',
          visualType: 'welcome',
        },
      ],
    },
    {
      id: 'vid-etiquette',
      title: 'Etika Pasien & Budaya Saling Menghargai',
      category: 'Komunitas',
      youtubeUrl: '',
      videoUrl: '',
      durationSeconds: 21,
      durationLabel: '00:21',
      summary: 'Bagaimana sikap sabar dan saling peduli membuat suasana ruang tunggu lebih nyaman.',
      accentColor: '#2F5FB3',
      scenes: [
        {
          timeStart: 0,
          title: 'Dahulukan Kursi Prioritas',
          caption:
            'Berikan kursi baris depan untuk ibu hamil, lansia, dan pasien dengan nyeri berat.',
          visualType: 'etiquette',
        },
        {
          timeStart: 7,
          title: 'Jaga Suara Tenang & Ponsel Senyap',
          caption:
            'Ruang tunggu yang tenang membantu perawat memanggil nomor antrean dengan jelas.',
          visualType: 'etiquette',
        },
        {
          timeStart: 14,
          title: 'Jangan Ragu Bertanya',
          caption:
            'Dokter, apoteker, dan petugas PMIK kami selalu siap menjelaskan ulang setiap petunjuk.',
          visualType: 'welcome',
        },
      ],
    },
    {
      id: 'vid-faq',
      title: 'Tips Cepat & Tanya Jawab Umum Pasien',
      category: 'Tips Singkat',
      youtubeUrl: '',
      videoUrl: '',
      durationSeconds: 21,
      durationLabel: '00:21',
      summary: 'Jawaban atas pertanyaan yang paling sering diajukan pasien di meja loket PMIK.',
      accentColor: '#1F3A70',
      scenes: [
        {
          timeStart: 0,
          title: 'Kapan Waktu Terbaik Berkunjung?',
          caption:
            'Poli pagi buka sejak awal—gunakan Antrean Online Mobile JKN agar tidak antre lama di loket.',
          visualType: 'faq',
        },
        {
          timeStart: 7,
          title: 'Sedang Berada di Luar Kota?',
          caption:
            'Peserta JKN aktif tetap bisa berobat di Puskesmas luar domisili hingga 3 kali sebulan.',
          visualType: 'jkn',
        },
        {
          timeStart: 14,
          title: 'Butuh Rujukan Rumah Sakit?',
          caption:
            'Dokter Puskesmas menerbitkan rujukan elektronik apabila pemeriksaan lanjutan dibutuhkan.',
          visualType: 'doctor',
        },
      ],
    },
  ],
};

export function getVideoPlaylist(lang: Language): EducationalVideo[] {
  return VIDEOS_BY_LANG[lang];
}
