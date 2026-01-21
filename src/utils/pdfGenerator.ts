import { jsPDF } from 'jspdf';
import { FormData } from '@/types/chat';

const getCurrentDate = () => {
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  const date = new Date();
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

const generateNomorSurat = () => {
  const now = new Date();
  return `${Math.floor(Math.random() * 999).toString().padStart(3, '0')}/PTM63.R5/FBIT/Q/${now.getFullYear()}`;
};

export const generatePDF = (formData: FormData): void => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const marginLeft = 25;
  const marginRight = 25;
  
  // ==========================================
  // HEADER (KOP SURAT) - BERLAKU UNTUK SEMUA
  // ==========================================
  doc.addImage('logo-ump.png', 'PNG', 20, 7, 25, 24); // Pastikan logo ada di folder public

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('UNIVERSITAS MUHAMMADIYAH PALANGKARAYA', 50, 15);
  doc.setFontSize(12);
  doc.text('FAKULTAS BAHASA, ILMU PENGETAHUAN DAN TEKNOLOGI', 50, 21);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('Jl. RTA Milono KM 1,5 Palangka Raya., Kalimantan Tengah 73111., Telp/Fax. (0536) 3238259', 50, 26);
  doc.text('e-mail : fbitumpalankaraya@gmail.com', 50, 30);

  doc.setLineWidth(0.8);
  doc.line(20, 33, pageWidth - 20, 33); // Garis pembatas kop

  let yPos = 50;
  const nomorSurat = generateNomorSurat();

  // Logika Pemilihan Jenis Surat
  switch (formData.documentType) {
    case 'surat-keterangan-aktif':
      generateSuratKeteranganAktif(doc, formData, yPos, pageWidth, marginLeft, nomorSurat);
      break;
    case 'surat-izin-penelitian':
      generateSuratIzinPenelitian(doc, formData, yPos, pageWidth, marginLeft, nomorSurat);
      break;
    case 'surat-keterangan-lulus':
      generateSuratKeteranganLulus(doc, formData, yPos, pageWidth, marginLeft, nomorSurat);
      break;
    case 'surat-pengantar-magang':
      generateSuratPengantarMagang(doc, formData, yPos, pageWidth, marginLeft, nomorSurat);
      break;
    case 'surat-rekomendasi':
      generateSuratRekomendasi(doc, formData, yPos, pageWidth, marginLeft, nomorSurat);
      break;
    case 'surat-cuti':
      generateSuratCuti(doc, formData, yPos, pageWidth, marginLeft, nomorSurat);
      break;
    case 'krs':
      generateKRS(doc, formData, yPos, pageWidth, marginLeft);
      return;
    default:
      generateSuratKeteranganAktif(doc, formData, yPos, pageWidth, marginLeft, nomorSurat);
  }

  // ==========================================
  // FOOTER (TANDA TANGAN) - BERLAKU UNTUK SEMUA
  // ==========================================
  const signatureY = 190;
  const rightColX = pageWidth - 25 - 50; 

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(`Palangkaraya, ${getCurrentDate()}`, rightColX + 25, signatureY, { align: 'center' });
  
  doc.setFont('helvetica', 'bold');
  doc.text('Dekan FBIT,', rightColX + 25, signatureY + 7, { align: 'center' });

  // Tanda Tangan Elektronik
  try {
    doc.addImage('TTD1.png', 'PNG', rightColX, signatureY + 10, 50, 25);
  } catch (e) {
    console.warn("Gambar TTD tidak ditemukan di folder public");
  }

  doc.setFont('helvetica', 'bold');
  doc.text('Dr. Riski, M.Pd', rightColX + 25, signatureY + 42, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.text('NIK. 12.3456.789', rightColX + 25, signatureY + 49, { align: 'center' });

  const fileName = `${formData.documentType}_${formData.nim}.pdf`;
  doc.save(fileName);
};

// ==========================================
// FUNGSI SPESIFIK: SURAT KETERANGAN AKTIF (FORMAT BARU)
// ==========================================
const generateSuratKeteranganAktif = (doc: jsPDF, formData: FormData, yPos: number, pageWidth: number, marginLeft: number, nomorSurat: string) => {
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('SURAT KETERANGAN AKTIF KULIAH', pageWidth / 2, yPos, { align: 'center' });
  doc.line(pageWidth / 2 - 35, yPos + 1, pageWidth / 2 + 35, yPos + 1);
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(`Nomor : ${nomorSurat}`, pageWidth / 2, yPos + 7, { align: 'center' });

  yPos += 20;
  doc.text('Dekan Fakultas Bahasa, Ilmu Pengetahuan dan Teknologi (FBIT) Universitas Muhammadiyah', marginLeft, yPos);
  doc.text('Palangkaraya dengan ini menerangkan :', marginLeft, yPos + 7);

  yPos += 15;
  const colonX = marginLeft + 35; 
  const valueX = marginLeft + 38;

  const studentData = [
    ['Nama', formData.nama],
    ['NIM', formData.nim],
    ['Program Studi', formData.prodi],
    ['Fakultas', formData.fakultas],
    ['Semester', formData.semester],
  ];

  studentData.forEach(([label, value], index) => {
    doc.text(label as string, marginLeft, yPos + (index * 7));
    doc.text(':', colonX, yPos + (index * 7));
    doc.text((value as string) || '-', valueX, yPos + (index * 7));
  });

yPos += 45;
  const contentWidth = pageWidth - (marginLeft * 2); // Menentukan lebar teks agar tidak keluar kertas
  
  // Gunakan template string agar variabel prodi masuk dengan benar
  const isiSurat = `bahwa yang bersangkutan adalah mahasiswa aktif program studi ${formData.prodi || 'Pendidikan Teknologi Informasi'} Fakultas Bahasa, Ilmu Pengetahuan dan Teknologi (FBIT) Universitas Muhammadiyah Palangkaraya pada Semester Ganjil Tahun Akademik 2024/2025.`;
  
  // Memotong teks otomatis sesuai lebar contentWidth
  const splitText = doc.splitTextToSize(isiSurat, contentWidth);
  
  // Cetak teks dengan alignment 'left' agar spasi antar kata rapi (tidak justify yang berantakan)
  doc.text(splitText, marginLeft, yPos, { align: 'left', lineHeightFactor: 1.5 });

  // 6. Kalimat Penutup
  yPos += 25; // Jarak ditambahkan sedikit agar tidak menempel dengan paragraf di atas
  doc.text('Demikian keterangan ini dibuat sebagai bahan untuk diketahui dan dipergunakan sebagaimana', marginLeft, yPos);
  doc.text('mestinya.', marginLeft, yPos + 6);

};

// ==========================================
// FUNGSI LAINNYA (TETAP SAMA SEPERTI ASLINYA)
// ==========================================
const generateSuratIzinPenelitian = (doc: jsPDF, formData: FormData, yPos: number, pageWidth: number, marginLeft: number, nomorSurat: string) => {
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('SURAT IZIN PENELITIAN', pageWidth / 2, yPos, { align: 'center' });
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Nomor: ${nomorSurat}`, pageWidth / 2, yPos + 7, { align: 'center' });
  yPos += 25;
  doc.text('Yang bertanda tangan di bawah ini, menerangkan bahwa mahasiswa:', marginLeft, yPos);
  yPos += 12;
  doc.text(`Nama: ${formData.nama}`, marginLeft, yPos);
  doc.text(`NIM: ${formData.nim}`, marginLeft, yPos + 7);
};

const generateSuratKeteranganLulus = (doc: jsPDF, formData: FormData, yPos: number, pageWidth: number, marginLeft: number, nomorSurat: string) => {
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('SURAT KETERANGAN LULUS', pageWidth / 2, yPos, { align: 'center' });
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Nomor: ${nomorSurat}`, pageWidth / 2, yPos + 7, { align: 'center' });
  yPos += 25;
  doc.text('Yang bertanda tangan di bawah ini menerangkan bahwa:', marginLeft, yPos);
  yPos += 12;
  doc.text(`Nama: ${formData.nama}`, marginLeft, yPos);
};

const generateSuratPengantarMagang = (doc: jsPDF, formData: FormData, yPos: number, pageWidth: number, marginLeft: number, nomorSurat: string) => {
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('SURAT PENGANTAR MAGANG/PKL', pageWidth / 2, yPos, { align: 'center' });
  yPos += 25;
  doc.text('Dengan hormat, sehubungan dengan program magang mahasiswa:', marginLeft, yPos);
};

const generateSuratRekomendasi = (doc: jsPDF, formData: FormData, yPos: number, pageWidth: number, marginLeft: number, nomorSurat: string) => {
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('SURAT REKOMENDASI', pageWidth / 2, yPos, { align: 'center' });
  yPos += 25;
  doc.text('Memberikan rekomendasi kepada mahasiswa tersebut di atas.', marginLeft, yPos);
};

const generateSuratCuti = (doc: jsPDF, formData: FormData, yPos: number, pageWidth: number, marginLeft: number, nomorSurat: string) => {
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('SURAT PERMOHONAN CUTI AKADEMIK', pageWidth / 2, yPos, { align: 'center' });
  yPos += 25;
  doc.text('Mengajukan permohonan cuti akademik untuk mahasiswa tersebut.', marginLeft, yPos);
};

const generateKRS = (doc: jsPDF, formData: FormData, yPos: number, pageWidth: number, marginLeft: number) => {
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('KARTU RENCANA STUDI (KRS)', pageWidth / 2, yPos, { align: 'center' });
  const fileName = `KRS_${formData.nim}.pdf`;
  doc.save(fileName);
};