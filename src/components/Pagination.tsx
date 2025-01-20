// Yeni bir helper fonksiyon oluşturalım
export const getPageNumbers = (currentPage: number, totalPages: number) => {
  const delta = 1; // Aktif sayfanın her iki yanında kaç sayfa gösterileceği
  const range = [];
  const rangeWithDots = [];

  // Her zaman ilk sayfayı ekle
  range.push(1);

  if (totalPages <= 1) return range;

  // Sayfa aralığını hesapla
  for (let i = currentPage - delta; i <= currentPage + delta; i++) {
    if (i > 1 && i < totalPages) {
      range.push(i);
    }
  }

  // Son sayfayı ekle
  if (totalPages > 1) {
    range.push(totalPages);
  }

  // Dots ekleme
  let l;
  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
}; 