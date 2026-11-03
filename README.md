<div align="center">

<img src="icon-512.png" alt="Fixral CFD Simulator logosu" width="112" />

# Fixral CFD Simulator · Aero Lab

**Tarayıcıda hava ve su akış simülasyonu.** Ücretsiz, kurulumsuz, online rüzgâr ve su tüneli. STL, OBJ, 3MF veya STEP modelini yükle; sürükleme ve taşıma katsayısını, kuvveti, basınç dağılımını, akım çizgilerini ve serbest yüzeyli suyu WebGPU ile anında gör.

**Free in-browser airflow and water simulation (CFD).** An online wind and water tunnel for STL, OBJ, 3MF and STEP models: drag and lift coefficients, forces, pressure distribution, streamlines and free-surface water, GPU-accelerated with WebGPU. No install, no account, your files never leave your device.

### [▶ Canlı uygulamayı aç / Open the live app](https://fixral3d.github.io/fixral-cfd-simulator/)

![Ücretsiz](https://img.shields.io/badge/fiyat-%C3%BCcretsiz-ffb020)
![Kurulum yok](https://img.shields.io/badge/kurulum-yok-5ab8ff)
![WebGPU](https://img.shields.io/badge/WebGPU-h%C4%B1zland%C4%B1r%C4%B1lm%C4%B1%C5%9F-4fd08a)
![Hava ve su](https://img.shields.io/badge/ak%C4%B1%C5%9Fkan-hava%20%2B%20su-a3aab4)
![Gizlilik](https://img.shields.io/badge/dosyan-y%C3%BCklenmez-ff8c42)
![Diller](https://img.shields.io/badge/dil-TR%20%C2%B7%20EN%20%C2%B7%20DE-ffb020)
![Sürüm](https://img.shields.io/badge/s%C3%BCr%C3%BCm-v0.3.0-5ab8ff)
![Testler](https://img.shields.io/badge/testler-55%2F55-4fd08a)

<img src="og-image.jpg" alt="Fixral CFD Simulator: araç etrafında hız renkli akım çizgileri ve kanalda serbest yüzeyli su" width="760" />

</div>

---

## Neden Fixral CFD?

- **Kurulum yok, hesap yok:** Bağlantıyı aç ve kullan. CFD yazılımı lisansı, sunucu ya da bulut kredisi gerekmez.
- **Dosyan senin:** Model hiçbir sunucuya yüklenmez. Vokselleştirme, çözücü ve görselleştirme tamamen tarayıcında çalışır.
- **Gerçek fizik, ekran kartı hızında:** WebGPU üzerinde 3B Kafes Boltzmann (D3Q19, LES) ile saniyede 1 milyardan fazla hücre güncellemesi; serbest yüzeyli su için 340 bine kadar partikül (MLS-MPM).
- **Hava ve su:** Rüzgâr tüneli, tamamen batık su, açık kanal ve dışarıdan gelen su akıntısı tek uygulamada.
- **Rehberli ve çok dilli:** Asistan Vorti programı adım adım anlatır; arayüz Türkçe, İngilizce ve Almanca.
- **Anlaşılır sonuç:** Cd, Cl, Newton ve kgf cinsinden kuvvet, sürükleme gücü, Reynolds ve Froude sayısı; PNG, CSV ve JSON dışa aktarma.

<img src="screenshots/streamlines.jpg" alt="Binek araç modeli etrafında girişten çıkışa hız renkli akım çizgileri" width="100%" />

## Nasıl çalışır?

| Adım | Ne yapar? |
|---|---|
| **1 · Model** | STL, OBJ, 3MF, STEP/STP veya IGES dosyasını sürükle ya da hazır örneklerden birini seç (araç, Ahmed gövdesi, NACA 2412 kanat, silindir, küre, 44 mm küp). Birimi (mm/cm/m/inç) seç, modeli döndür, hücum ve sapma açısını ayarla. |
| **2 · Ortam** | Akışkanı seç (hava / su), hızı istediğin birimle gir (m/s, km/h, mph, knot, ft/s), akış yönünü belirle (±X, ±Y, ±Z). Suda ortamı seç: kanal / kutu, dış kaynaklı akıntı veya tamamen batık. Su yüksekliği, akıntı genişliği, viskozite ve kalite ayarlanır. |
| **3 · Simülasyon** | Başlat'a bas. Model hücrelere dönüştürülür, çözücü ekran kartında çalışır, akış canlı çizilir. Görünüm seçiciyle akım çizgileri, yüzey basıncı, yüzey hızı, boya, kesit veya su yüzeyi arasında geçiş yap. |
| **4 · Sonuçlar** | Sürükleme ve taşıma katsayısı, kuvvetler, sürükleme gücü, yakınsama grafiği, en yüksek hız, basınç aralığı, kavitasyon riski (su). PNG, CSV ve JSON olarak indir. |

<img src="screenshots/results.jpg" alt="Sonuçlar paneli: Cd, Cl, sürükleme kuvveti, güç ve yakınsama grafiği, model yüzeyinde basınç katsayısı" width="100%" />

## Vorti — akış asistanın

Uygulamayı ilk açtığında **Vorti** karşılar: nokta matrisli yüzü olan, göz kırpan ve konuşurken ağzı oynayan küçük bir rehber. 11 adımlık sihirbazla programı baştan sona anlatır: model yükleme, yönlendirme, akışkan seçimi, hız ve Reynolds sayısı, çözüm ağı, simülasyonu başlatma, görünümler, görünüm paneli ve sonuçlar. Her adımda ilgili kontrolü vurgular, gerektiğinde "Örnek aracı yükle" veya "Şimdi başlat" gibi tek tıkla eylemler sunar. Kapatsan da sahnenin sağ üstündeki avatara tıklayarak istediğin an geri çağırabilirsin.

<img src="screenshots/vorti-assistant.jpg" alt="Vorti akış asistanı: nokta matrisli avatar ve akışkan seçimini anlatan sihirbaz adımı" width="100%" />

## Dil desteği / Language / Sprache

Arayüz **Türkçe, English ve Deutsch** olarak kullanılabilir. Dil tarayıcından otomatik seçilir; üst çubuktaki **TR · EN · DE** düğmeleriyle değiştirilir ve hatırlanır. Sayılar seçilen dile göre biçimlenir. Doğrudan bağlantılar:

- Türkçe: https://fixral3d.github.io/fixral-cfd-simulator/?lang=tr
- English: https://fixral3d.github.io/fixral-cfd-simulator/?lang=en
- Deutsch: https://fixral3d.github.io/fixral-cfd-simulator/?lang=de

## Görünümler

| Görünüm | Ne gösterir? |
|---|---|
| **Akım çizgileri** | Girişten çıkışa hız alanı boyunca çizgiler; hız renkli, üzerinde akış yönünü gösteren darbe ilerler. |
| **Yüzey basıncı** | Model yüzeyinde basınç katsayısı (Cp) ve paskal cinsinden basınç. |
| **Yüzey hızı** | Duvar yakınındaki akış hızı; ayrılma ve durma bölgelerini gösterir. |
| **Basınç + akım çizgileri** | İkisi birlikte. |
| **Sıvı akış (boya) / duman** | Su tünellerindeki boya enjeksiyonu yöntemi: akışla taşınan çok renkli boya şeritleri; havada duman. |
| **Partikül izleri** | Hız alanında taşınan binlerce izleyici. |
| **Kesit düzlemi** | XY, XZ veya YZ kesitinde hız, ters akış, Cp ya da girdap şiddeti haritası. |
| **Su yüzeyi / Hız renkli su / Su partikülleri** | Serbest yüzeyli su modlarında pürüzsüz su yüzeyi (kırılma, yansıma, köpük), hız haritası veya ham partiküller. |

<img src="screenshots/pressure-streamlines.jpg" alt="Basınç ve akım çizgileri birlikte: model yüzeyinde Cp renkleri ve çevresinde akım çizgileri" width="100%" />

<img src="screenshots/slice.jpg" alt="Araç modelinin orta düzleminde hız büyüklüğü kesiti ve iz bölgesi" width="100%" />

## Su simülasyonu

| Ortam | Yöntem | Kullanım |
|---|---|---|
| **Kanal / kutu** | Serbest yüzeyli partikül çözücü (MLS-MPM), taban ve iki yan duvar, girişte sabit debi | Akarsu içindeki köprü ayağı, kanal yapıları, kısmen batık gövdeler. Su yüksekliği model yüksekliğinin %5–150'si. |
| **Dış kaynaklı akıntı** | Serbest yüzeyli partikül çözücü, yalnız taban, ayarlanabilir akıntı genişliği | Dışarıdan gelen suyun modele çarpması, yanlara saçılması ve sıçraması. |
| **Tamamen batık** | Kafes Boltzmann (LBM) | Sınırsız su içindeki model için nicel sürükleme ve taşıma (ROV, sualtı aracı, pervane muhafazası); kavitasyon sayısı. |

Viskozite 0,5–10.000 mPa·s arasında ayarlanır (su 1, yağ ~100, bal ~10.000). Sonuçlarda Froude sayısı ve akış rejimi (nehir / sel) gösterilir.

<img src="screenshots/water-channel.jpg" alt="Kanalda serbest yüzeyli su: küp engelin önünde kabaran dalga ve şeffaf su içinden görünen model" width="100%" />

<img src="screenshots/water-dye.jpg" alt="Su tünelinde silindir arkasında renkli boya ile görünen Kármán girdap caddesi" width="100%" />

<img src="screenshots/water-stream.jpg" alt="Dış kaynaklı su akıntısının modele çarpıp yanlara saçılması" width="100%" />

## Diğer özellikler

- **İncele (prob, `I`):** İmlecin altındaki model yüzeyi ya da kesit noktasında hız, uₓ/U∞, Cp ve basınç değerini okur.
- **Görünüm paneli (`V`):** Performans modu (Otomatik / Kalite / Eko), arka plan, ışık, gölge, model rengi. Model, tünel kutusu, giriş okları, ızgara, eksen göstergesi, lejant, ölçüm şeridi, rozet ve araç çubuğu tek tek gösterilip gizlenir; ayarlar hatırlanır.
- **Performans odaklı:** Simülasyon durduğunda sahne hiç çizilmez (0 FPS), FPS düşerse çözünürlük otomatik ayarlanır. WebGPU yoksa aynı fizik işlemcide (CPU) daha yavaş çalışır.
- **Canlı ölçüm şeridi:** Adım, FPS, MLUPS, Cd, Re ve Cd geçmişi üst barda sürekli görünür.
- **Kısayollar:** `Boşluk` başlat/duraklat · `R` sıfırla · `P` paneli gizle · `1–4` adımlar · `S` kesit · `I` incele · `V` görünüm.

<img src="screenshots/display-panel.jpg" alt="Görünüm paneli: performans modu, arka plan, ışık, gölge, model rengi ve göster/gizle seçenekleri" width="100%" />

<img src="screenshots/probe.jpg" alt="İncele aracı: model yüzeyindeki noktada hız, Cp ve basınç değerleri" width="100%" />

## Doğruluk ve doğrulama

Fixral CFD bir **ön tasarım** aracıdır: eğilimleri, ayrılma bölgelerini ve tasarım karşılaştırmalarını hızlıca gösterir. Her sürüm otomatik test paketinden geçer (son sürüm: **55/55**).

| Test | Sonuç | Referans |
|---|---|---|
| WebGPU ↔ CPU çözücü tutarlılığı (hava) | Cd farkı %0,01 | Aynı olmalı |
| WebGPU ↔ CPU çözücü tutarlılığı (su) | Dalga cephesi farkı %0,1, kütle birebir | Aynı olmalı |
| Küre, Re = 1000 | Cd 0,528 | ≈ 0,48 |
| 44 mm küp, 35 m/s (blokaj düzeltmeli) | Cd 1,11 | ≈ 1,05 |
| Akış yönü değişmezliği (±X, ±Z, +Y) | Cd sapması %0,05 | Eşit olmalı |
| Birim değişmezliği (108 km/h ↔ 30 m/s) | Fark %0,05 | Eşit olmalı |
| Hidrostatik tank: iç basınç / ρgh | 1,05 | 1,00 |
| Baraj yıkılması cephe hızı / √(gH) | 1,33 | 1,48–1,69 (Martin & Moyce) |
| Açık kanal: giriş = çıkış debisi | ortalama hız / U = 1,002 | 1,00 |

> **Bilinen sınırlama:** Milyonlar mertebesinde Reynolds sayısında (ör. gerçek hızdaki otomobil), duvar modeli olmadığı için mutlak Cd değerleri yüksek çıkabilir. Göreli karşılaştırmalar (A/B tasarım) güvenilirdir. Duvar modeli yol haritasındadır. Sertifikasyon veya nihai mühendislik kararları için ayrıntılı RANS/LES analiziyle doğrulayın.

## Teknik altyapı

| Bileşen | Teknoloji |
|---|---|
| Hava ve batık su | 3B Kafes Boltzmann, D3Q19, regularized BGK + Smagorinsky LES, yarı-yol geri sekme, hareketli zemin, emici sünger katmanları, gösterge momentum değişimi ile kuvvet |
| Serbest yüzeyli su | MLS-MPM (zayıf sıkıştırılabilir Tait denklemi, viskoz gerilme), sabit noktalı atomik P2G, ekran-uzayı sıvı render'ı |
| Hesaplama | WebGPU compute (WGSL), WebGPU yoksa Web Worker'da CPU |
| Görselleştirme | three.js (WebGL 2): akım çizgileri, hacimsel boya, kesitler, gölgeli stüdyo sahnesi |
| CAD içe aktarma | three.js yükleyicileri (STL, OBJ, 3MF), OpenCascade / occt-import-js (STEP, IGES; yalnızca gerektiğinde yüklenir) |

## Tarayıcı desteği

| Tarayıcı | Durum |
|---|---|
| Chrome / Edge (Windows, macOS, ChromeOS, Android 12+) | Tam destek (WebGPU) |
| Safari 26+ (macOS, iOS, iPadOS) | Tam destek (WebGPU) |
| Firefox 141+ (Windows), 145+ (macOS) | Tam destek (WebGPU) |
| WebGPU olmayan tarayıcılar | CPU modunda çalışır (daha yavaş, "Hızlı" ağ) |

En iyi deneyim için ekran kartı olan bir bilgisayar önerilir.

## Sık sorulan sorular

**Ücretsiz mi?** Evet. Kurulum, kayıt ya da kredi kartı gerekmez.

**Modelim bir yere yükleniyor mu?** Hayır. Dosya tarayıcında açılır ve tüm hesaplama cihazında yapılır.

**Hangi dosya formatlarını destekliyor?** STL (ikili ve ASCII), OBJ, 3MF, STEP/STP ve IGES.

**Sürükleme katsayısını (Cd) nasıl hesaplıyor?** Kafes Boltzmann çözücüsü, duvara çarpan akışkanın momentum değişiminden kuvveti her adımda hesaplar; değer, akış oturduktan sonraki zaman penceresinin ortalamasıdır ve seçilen referans alanla (ön izdüşüm / planform) boyutsuzlaştırılır.

**Su simülasyonu gerçek mi?** Kanal ve akıntı modlarında su, yerçekimi, viskozite ve serbest yüzeyle partikül tabanlı olarak çözülür; dalgalanma, kabarma ve sıçrama fiziksel olarak oluşur. Tamamen batık mod nicel kuvvetler için LBM kullanır.

**Telefonda çalışır mı?** WebGPU destekleyen güncel mobil tarayıcılarda çalışır; büyük ağlar ve yüksek su kalitesi için masaüstü önerilir.

## English summary

Fixral CFD Simulator is a free, browser-based computational fluid dynamics tool. Drop in an STL, OBJ, 3MF or STEP model and run an online wind tunnel or water tunnel:
- **Air flow:** drag and lift coefficients, forces, drag power, streamlines, surface pressure and velocity, smoke and slice views.
- **Submerged water:** quantitative forces and cavitation number.
- **Free-surface water:** open-channel and external-stream simulations with adjustable depth, width and viscosity.
- **Controls:** speed units (m/s, km/h, mph, knot, ft/s), six flow directions, an inspect probe, adaptive quality and a customisable display.
- **Guided and multilingual:** Vorti, a dot-matrix flow assistant, walks you through the app step by step. The interface is available in English, German and Turkish ([open in English](https://fixral3d.github.io/fixral-cfd-simulator/?lang=en)).

Solvers run on your GPU through WebGPU: a Lattice Boltzmann D3Q19 solver with LES for air and submerged water, and MLS-MPM for free-surface water. They fall back to the CPU when WebGPU is unavailable, and nothing is uploaded.

## Deutsche Kurzfassung

Fixral CFD Simulator ist ein kostenloses Strömungssimulationswerkzeug (CFD) im Browser: ein Online-Wind- und Wasserkanal für STL-, OBJ-, 3MF- und STEP-Modelle mit Widerstands- und Auftriebsbeiwerten, Kräften, Druckverteilung, Stromlinien und Wasser mit freier Oberfläche, beschleunigt durch WebGPU. Keine Installation, kein Konto, Ihre Dateien verlassen nie Ihr Gerät. Der Assistent Vorti führt Schritt für Schritt durch die Anwendung. [Auf Deutsch öffnen](https://fixral3d.github.io/fixral-cfd-simulator/?lang=de)

## Diğer Fixral araçları

- [**Fixral 3D Splitter / Slicer**](https://fixral3d.github.io/fixral-3d-splitter/): Büyük 3D modelleri yazıcına sığdır, pim ve dübellerle birleştir.
- [**Fixral CNC Router Studio**](https://fixral3d.github.io/cnc-controller/): Tarayıcıda CNC CAM ve GRBL kontrol.
- [**fixral.com**](https://fixral.com)

---

<sub>Anahtar kelimeler: CFD simülasyonu, online CFD, ücretsiz CFD programı, tarayıcıda CFD, sanal rüzgâr tüneli, online rüzgâr tüneli, su tüneli, hava akışı simülasyonu, su akışı simülasyonu, aerodinamik analiz, sürükleme katsayısı hesaplama, Cd hesaplama, basınç dağılımı, akım çizgileri, serbest yüzeyli su, açık kanal akışı, STL akış analizi, STEP akış analizi, 3D baskı aerodinamik, drone aerodinamiği, araç aerodinamiği · free CFD software, online CFD simulator, browser CFD, virtual wind tunnel, airflow simulation, water flow simulation, drag coefficient calculator, aerodynamics simulator, free surface water simulation, Lattice Boltzmann, WebGPU CFD.</sub>

<sub>© Fixral · Erdem Erciyas. Bu depo yalnızca canlı sitenin derlenmiş dosyalarını içerir; kaynak kodu kapalıdır. Sonuçlar ön tasarım amaçlıdır.</sub>
