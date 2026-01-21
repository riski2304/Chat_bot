export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'menu' | 'form' | 'document';
  options?: DocumentOption[];
  formData?: FormData;
}

export interface DocumentOption {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface FormData {
  nim: string;
  nama: string;
  documentType: string;
  fakultas?: string;
  prodi?: string;
  semester?: string;
  tahunAkademik?: string;
  keperluan?: string;
}

export const documentTypes: DocumentOption[] = [
  {
    id: 'surat-keterangan-aktif',
    title: 'Surat Keterangan Aktif Kuliah',
    description: 'Bukti bahwa mahasiswa masih aktif terdaftar',
    icon: '📋'
  },
  {
    id: 'surat-izin-penelitian',
    title: 'Surat Izin Penelitian',
    description: 'Untuk keperluan penelitian/skripsi',
    icon: '🔬'
  },
  {
    id: 'surat-keterangan-lulus',
    title: 'Surat Keterangan Lulus',
    description: 'Bukti kelulusan sementara',
    icon: '🎓'
  },
  {
    id: 'surat-pengantar-magang',
    title: 'Surat Pengantar Magang/PKL',
    description: 'Untuk keperluan magang atau PKL',
    icon: '💼'
  },
  {
    id: 'surat-rekomendasi',
    title: 'Surat Rekomendasi',
    description: 'Surat rekomendasi dari kampus',
    icon: '⭐'
  },
  {
    id: 'surat-cuti',
    title: 'Surat Permohonan Cuti',
    description: 'Permohonan cuti akademik',
    icon: '📅'
  },
  {
    id: 'krs',
    title: 'Kartu Rencana Studi (KRS)',
    description: 'Formulir pengisian mata kuliah semester',
    icon: '📚'
  }
];
