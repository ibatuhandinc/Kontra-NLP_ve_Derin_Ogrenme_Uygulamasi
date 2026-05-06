# Kontra 🚀
**Deep Learning & NLP Project**

Bu proje, **Osmaniye Korkut Ata Üniversitesi Bilgisayar Mühendisliği Lisans Programı** bünyesindeki *Derin Öğrenme ve Doğal Dil İşleme* dersi kapsamında geliştirilmektedir.

Kontra, Telegram üzerinden müşteri desteği sağlayan firmalar için uçtan uca (end-to-end) geliştirilmiş bir yapay zeka destek asistanı ve veri analitiği platformudur. Sistem, müşteri mesajlarını yanıtlar, veritabanında arşivler, özel olarak eğitilmiş (fine-tuned) bir derin öğrenme modeli ile bu verileri analiz eder ve sonuçları yönetici paneline (dashboard) aktararak departman bazlı içgörüler sunar.

## 🌟 Temel Özellikler

- **Anında Yanıt Sistemi:** Telegram API üzerinden gelen müşteri taleplerine entegre dil modeli aracılığıyla hızlı ve profesyonel yanıtlar verilir.
- **Güvenli Veri Depolama:** Müşteri yazışmaları, ileride analiz edilmek üzere ilişkisel veritabanında (MySQL) güvenle saklanır.
- **Fine-Tuning ile Özelleştirilmiş NLP Modeli:** Sisteme entegre edilen ve projeye özel eğitilmiş (fine-tuned) yapay zeka modeli; geçmiş ve güncel mesajları tarayarak şikayet/talep kategorizasyonu, departman tespiti ve duygu analizi yapar.
- **Yönetici Arayüzü (Dashboard):** Eğitilmiş modelin ürettiği analitik çıktılar, geliştirilen web arayüzü sayesinde şirket yöneticilerine görselleştirilmiş raporlar halinde sunulur.

## 🏗️ Sistem Mimarisi ve İş Akışı

Proje dört ana katmandan oluşmaktadır:

1. **İletişim Katmanı (Telegram Bot & API):** Müşteri mesajı gelir, API üzerinden modele iletilir ve müşteriye anında dönüş yapılır.
2. **Depolama Katmanı (Database):** Gelen ham müşteri mesajları ve konuşma geçmişi MySQL veritabanına kaydedilir.
3. **Analiz Katmanı (Fine-Tuned Model):** Özel eğitilmiş derin öğrenme modeli, veritabanındaki metinleri işleyerek (kargo sorunu, personel şikayeti, ürün iadesi vb.) anlamlandırır ve yapılandırılmış veriye dönüştürür.
4. **Sunum Katmanı (Web Arayüzü):** Modelin ürettiği veriler arayüze (UI) bağlanır. Hangi departmanda sıkıntı olduğu, müşteri memnuniyet oranları gibi veriler grafiksel olarak raporlanır.

## 🛠️ Kullanılan Teknolojiler

- **Backend:** Node.js, REST API mimarisi
- **Veritabanı:** MySQL
- **Yapay Zeka / NLP:** Fine-Tuned LLM (Özel Eğitilmiş Dil Modeli)
- **Frontend / UI:** Web Arayüzü Geliştirme Teknolojileri
- **Bot Entegrasyonu:** Telegram Bot API (`@KontraDestekBot`)

## 🚀 Kurulum ve Çalıştırma

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

1. **Depoyu klonlayın ve projeyi başlatın:**
   ```bash
   git clone <depo_url>
   cd kontra
   npm install
   npm start

## 👥 Geliştiriciler
* **Batuhan Dinç**
* **Mehmet Mikail Öztaş**