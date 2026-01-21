import React, { useState } from 'react';
import { FormData } from '@/types/chat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DocumentFormProps {
  documentType: string;
  documentTitle: string;
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
}

const DocumentForm: React.FC<DocumentFormProps> = ({ documentType, documentTitle, onSubmit, onCancel }) => {
  // Menambahkan state untuk pencarian NIM
  const [nimSearch, setNimSearch] = useState('');
  const [showNimList, setShowNimList] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    nim: '',
    nama: '',
    documentType: documentType,
    prodi: '',
    fakultas: '',
    semester: '',
    tahunAkademik: '2024/2025',
    keperluan: ''
  });

  // Daftar NIM yang Anda buat
  const nims = [
    "23.24.027009", 
    "23.24.027006", 
    "23.24.027007", 
    "23.24.027518", 
    "23.24.037513", 
    "23.24.028253", 
    "23.24.027523",
    "23.24.027525",
    "23.24.027519",
    "23.24.027949",
    "23.24.027954",
    "23.24.027948",
    "23.24.027956",
    
  ];

  // Filter NIM berdasarkan apa yang diketik
  const filteredNims = nims.filter(nim => nim.includes(nimSearch));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.nim && formData.nama) {
      onSubmit(formData);
    }
  };

  const needsSemester = ['surat-keterangan-aktif', 'surat-pengantar-magang', 'surat-cuti', 'krs'].includes(documentType);
  const needsKeperluan = ['surat-izin-penelitian', 'surat-cuti'].includes(documentType);

  return (
    <div className="bg-card rounded-2xl p-5 shadow-lg border border-border animate-fade-in max-w-md mx-auto">
      <div className="text-center mb-4">
        <h3 className="font-bold text-lg text-foreground">{documentTitle}</h3>
        <p className="text-sm text-muted-foreground">Lengkapi data di bawah ini</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="nama" className="text-foreground">NAMA *</Label>
          <Select onValueChange={(value) => setFormData({ ...formData, nama: value })}>
            <SelectTrigger className="bg-secondary border-border">
              <SelectValue placeholder="Pilih NAMA" />
            </SelectTrigger>
            <SelectContent>
              {/* Ganti value="NAMA" dengan nama sebenar mahasiswa */}
              <SelectItem value="Riski">Riski</SelectItem>
              <SelectItem value="Jumaidi Ahirin">Jumaidi Ahirin</SelectItem>
              <SelectItem value="JONATHAN">JONATHAN</SelectItem>
              <SelectItem value="Mario Jonatan Irfando Bere">Mario Jonatan Irfando Bere</SelectItem>
              <SelectItem value="Arya Nugraha">Arya Nugraha</SelectItem>
              <SelectItem value="Muhammad Ilham">Muhammad Ilham </SelectItem>
              <SelectItem value="Triani Agustin">Triani Agustin </SelectItem>
              <SelectItem value="Maulida Rahmawati">Maulida Rahmawati</SelectItem>
              <SelectItem value="Maya">Maya</SelectItem>
              <SelectItem value="Alya Wulandari">Alya Wulandari </SelectItem>
              <SelectItem value="Nurul Nailah Bait">Nurul Nailah Bait </SelectItem>
              <SelectItem value="Ahmad Al' Amin">Ahmad Al' Amin </SelectItem>
              <SelectItem value="Taupik">Taupik </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* BAGIAN NIM YANG DIUBAH MENJADI SEARCH */}
        <div className="space-y-2 relative">
          <Label htmlFor="nim" className="text-foreground">NIM *</Label>
          <Input
            id="nim"
            placeholder="Ketik NIM Anda..."
            value={nimSearch}
            onChange={(e) => {
              setNimSearch(e.target.value);
              setShowNimList(true);
            }}
            onFocus={() => setShowNimList(true)}
            className="bg-secondary border-border"
            autoComplete="off"
          />
          
          {/* List Dropdown Pencarian */}
          {showNimList && nimSearch && (
            <div className="absolute z-10 w-full bg-card border border-border rounded-md shadow-xl max-h-40 overflow-y-auto mt-1">
              {filteredNims.length > 0 ? (
                filteredNims.map((nim) => (
                  <div
                    key={nim}
                    className="p-2 hover:bg-primary hover:text-white cursor-pointer text-sm"
                    onClick={() => {
                      setFormData({ ...formData, nim: nim });
                      setNimSearch(nim);
                      setShowNimList(false);
                    }}
                  >
                    {nim}
                  </div>
                ))
              ) : (
                <div className="p-2 text-sm text-muted-foreground italic">NIM tidak ditemukan</div>
              )}
            </div>
          )}
          {/* Ganti value="NIM" dengan nombor NIM sebenar */}
        </div>

        <div className="space-y-2">
          <Label htmlFor="fakultas" className="text-foreground">Fakultas</Label>
          <Select onValueChange={(value) => setFormData({ ...formData, fakultas: value })}>
            <SelectTrigger className="bg-secondary border-border">
              <SelectValue placeholder="Pilih Fakultas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Fakultas Bahasa Ilmu Pengetahuan dan Teknologi">Fakultas Bahasa Ilmu Pengetahuan dan Teknologi</SelectItem>
              {/* <SelectItem value="Fakultas Teknik">Fakultas Teknik</SelectItem>
              <SelectItem value="Fakultas MIPA">Fakultas MIPA</SelectItem>
              <SelectItem value="Fakultas Ekonomi">Fakultas Ekonomi</SelectItem> */}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="prodi" className="text-foreground">Program Studi</Label>
          <Select onValueChange={(value) => setFormData({ ...formData, prodi: value })}>
            <SelectTrigger className="bg-secondary border-border">
              <SelectValue placeholder="Pilih Program Studi" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pendidikan Teknologi Informasi">Pendidikan Teknologi Informasi</SelectItem>
              <SelectItem value="Pendidikan Bahasa Inggris">Pendidikan Bahasa Inggris</SelectItem>
              <SelectItem value="Pendidikan Biologi">Pendidikan Biologi</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {needsSemester && (
          <div className="space-y-2">
            <Label htmlFor="semester" className="text-foreground">Semester</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, semester: value })}>
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue placeholder="Pilih Semester" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                  <SelectItem key={sem} value={`${sem}`}>
                    Semester {sem}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {needsKeperluan && (
          <div className="space-y-2">
            <Label htmlFor="keperluan" className="text-foreground">Keperluan</Label>
            <Input
              id="keperluan"
              placeholder="Jelaskan keperluan Anda"
              value={formData.keperluan}
              onChange={(e) => setFormData({ ...formData, keperluan: e.target.value })}
              className="bg-secondary border-border"
            />
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          >
            Batal
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            Generate PDF
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DocumentForm;