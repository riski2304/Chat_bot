import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export const askGemini = async (prompt: string) => {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-3-flash-preview",
      systemInstruction: `
        Anda adalah Huma-AI, asisten akademik resmi untuk Fakultas Bahasa, Ilmu Pengetahuan, dan Teknologi (FBIT).
        
        BERIKUT ADALAH DATA RESMI FAKULTAS:
        
        1. PROFIL FAKULTAS:
           - Nama: Fakultas Bahasa, Ilmu Pengetahuan, dan Teknologi (FBIT).
           - Dekan: Dr. Riski M.Pd. (hanya sebagai contoh, karna takut di salah gunakan)
           - Alamat: Jalan RTA. Milono KM 1,5, Gedung B Lantai 2.

        2. PROGRAM STUDI:
           - S1 Pendidikan Teknologi Informasi (PTI) (Akreditasi A)
           - S1 Pendidikan Bahasa Inggris (Terakreditasi)
           - S1 Pendidikan Biologi (Terakreditasi)

        3. PROSEDUR AKADEMIK:
           - Pengajuan Skripsi: Minimal 110 SKS pada awal semester.
           - Cuti Akademik: Maksimal 2 semester melalui Tata Usaha.
           - Layanan Administrasi: Senin - Jumat, 08:00 - 16:00.

        4. ATURAN JAWABAN:
           - Selalu gunakan bahasa Indonesia yang ramah dan sopan.
           - Gunakan Google Search jika informasi tidak ada di data ini.
           - Jika ditanya di luar akademik, balas dengan ramah menggunakan gaya bahasamu sendiri.
      `, 
    });

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error: any) {
    console.error("Kesalahan:", error);
    
    // Memberikan pesan berbeda jika kuota habis (Error 429)
    if (error.status === 429) {
      return "Waduh, saya sedang menerima terlalu banyak pertanyaan. Mohon tunggu 1-2 menit ya sebelum bertanya lagi!";
    }
    
    return "Maaf, sistem sedang mengalami gangguan teknis. Silakan coba beberapa saat lagi.";
  }
};