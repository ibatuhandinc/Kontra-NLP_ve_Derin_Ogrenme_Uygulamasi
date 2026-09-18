# 🤖 Kontra

### AI-Powered Customer Support & NLP Analytics Platform

**Kontra**, Telegram tabanlı müşteri iletişimlerini yapay zekâ ve doğal dil işleme teknolojileriyle analiz eden **müşteri destek ve operasyonel analiz platformudur.**

Platform; Telegram üzerinden gelen müşteri mesajlarını toplar, konuşma geçmişini merkezi bir veritabanında saklar ve NLP tabanlı modeller kullanarak mesajları **kategori, ilgili departman ve duygu durumu** gibi çeşitli boyutlarda analiz eder.

Elde edilen yapılandırılmış veriler, web tabanlı yönetim panelinde görselleştirilerek işletmelerin müşteri destek süreçlerini ve müşteri geri bildirimlerini **veri odaklı bir şekilde takip etmesine** yardımcı olur.

---

## ✨ Features

### 💬 AI-Assisted Customer Support

Telegram üzerinden gelen müşteri mesajlarının alınması, işlenmesi ve yapay zekâ destekli yanıt mekanizmasıyla müşteri iletişim sürecinin otomatikleştirilmesi.

### 🧠 NLP-Based Message Analysis

Müşteri mesajlarının doğal dil işleme ve derin öğrenme modelleriyle analiz edilerek anlamlı ve yapılandırılmış verilere dönüştürülmesi.

Sistem kapsamında:

* Message Classification
* Complaint / Request Detection
* Department Classification
* Sentiment Analysis
* Customer Feedback Analysis

gibi analizler gerçekleştirilebilir.

### 🗄️ Conversation Management

Müşteri ve sistem arasındaki konuşmaların **MySQL** veritabanında merkezi olarak saklanması.

Saklanan konuşma verileri daha sonra NLP pipeline tarafından analiz edilerek raporlama ve operasyonel analiz süreçlerinde kullanılabilir.

### 📊 Analytics Dashboard

NLP modelinden elde edilen sonuçların web tabanlı yönetim paneline aktarılması ve görselleştirilmesi.

Dashboard üzerinden:

* Departman bazlı talep dağılımları
* Şikâyet kategorileri
* Duygu analizi sonuçları
* Mesaj yoğunlukları
* Müşteri geri bildirimleri

gibi metrikler takip edilebilir.

---

## 🏗️ System Architecture

Kontra, müşteri iletişiminden analitik çıktıya kadar uzanan çok katmanlı bir mimari kullanır.

```text
                         ┌─────────────────┐
                         │     Customer    │
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │  Telegram Bot   │
                         │      API        │
                         └────────┬────────┘
                                  │
                                  ▼
                    ┌──────────────────────────┐
                    │      Node.js Backend     │
                    │        REST API          │
                    └───────────┬──────────────┘
                                │
                  ┌─────────────┴─────────────┐
                  │                           │
                  ▼                           ▼
        ┌─────────────────┐        ┌────────────────────┐
        │      MySQL      │        │   NLP / DL Model   │
        │    Database     │        │     Fine-Tuned     │
        └────────┬────────┘        └─────────┬──────────┘
                 │                           │
                 │                           ▼
                 │                  ┌─────────────────┐
                 │                  │    Analytics    │
                 │                  │     Engine      │
                 │                  └────────┬────────┘
                 │                           │
                 └──────────────┬────────────┘
                                ▼
                     ┌──────────────────────┐
                     │    Admin Dashboard   │
                     │   Reports & Metrics  │
                     └──────────────────────┘
```

---

## 🔄 Data Flow

Kontra içerisindeki temel veri akışı aşağıdaki şekilde ilerler:

```text
Customer Message
       │
       ▼
Telegram Bot API
       │
       ▼
Node.js REST API
       │
       ├──────────────► MySQL
       │                  │
       │                  └── Conversation History
       │
       ▼
NLP / Deep Learning Model
       │
       ├──► Category
       ├──► Department
       └──► Sentiment
       │
       ▼
Structured Analytics Data
       │
       ▼
Admin Dashboard
```

---

## 🧠 NLP Pipeline

Müşteri mesajlarının analiz süreci temel olarak aşağıdaki adımlardan oluşmaktadır:

```text
Raw Customer Message
        │
        ▼
Text Preprocessing
        │
        ▼
Tokenization
        │
        ▼
Fine-Tuned NLP Model
        │
        ▼
Text Classification
        │
        ├── Category
        ├── Department
        └── Sentiment
        │
        ▼
Structured Output
        │
        ▼
Analytics Dashboard
```

Bu pipeline sayesinde serbest biçimde yazılmış müşteri mesajları, işletmenin analiz edebileceği **yapılandırılmış verilere** dönüştürülür.

---

## 📝 Example

Sisteme gelen örnek bir müşteri mesajı:

```text
"Geçen hafta verdiğim sipariş hâlâ elime ulaşmadı.
Kargo hakkında bilgi almak istiyorum."
```

NLP modeli tarafından analiz edilen mesaj:

```json
{
  "category": "Shipping Problem",
  "department": "Logistics",
  "sentiment": "Negative"
}
```

Bu çıktı daha sonra dashboard üzerinde toplu istatistiklerin oluşturulmasında kullanılabilir.

---

## 🛠️ Tech Stack

| Layer           | Technologies                        |
| --------------- | ----------------------------------- |
| Backend         | Node.js                             |
| API             | REST API                            |
| Database        | MySQL                               |
| AI / NLP        | Deep Learning, Fine-Tuned NLP Model |
| Messaging       | Telegram Bot API                    |
| Frontend        | Web Technologies                    |
| Data Processing | Natural Language Processing         |
| Version Control | Git / GitHub                        |

---

## 📁 Project Structure

```text
kontra/
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   └── ...
│
├── frontend/
│   ├── components/
│   ├── pages/
│   └── ...
│
├── model/
│   └── ...
│
├── database/
│   └── ...
│
├── package.json
├── .env.example
└── README.md
```

> Projenin mevcut klasör yapısına göre bu bölüm güncellenebilir.

---

## 🚀 Installation

### Prerequisites

Projeyi çalıştırmak için aşağıdaki araçların sisteminizde kurulu olması gerekir:

* Node.js
* MySQL
* Git
* Telegram Bot API erişimi

### 1. Clone the Repository

```bash
git clone <repository-url>
cd kontra
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

`.env.example` dosyasını `.env` olarak kopyalayarak gerekli yapılandırmaları gerçekleştirin.

```env
PORT=3000

TELEGRAM_BOT_TOKEN=your_bot_token

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=kontra
```

> API anahtarları, bot tokenları ve veritabanı şifreleri gibi hassas bilgiler `.env` içerisinde tutulmalı ve GitHub'a yüklenmemelidir.

### 4. Configure the Database

MySQL üzerinde gerekli veritabanını oluşturun ve proje içerisinde bulunan SQL tablolarını çalıştırın.

### 5. Start the Application

```bash
npm start
```

---

## 🤖 Telegram Integration

Kontra, müşteri iletişim kanalı olarak **Telegram Bot API** kullanır.

Temel iletişim akışı:

```text
Customer
   │
   ▼
Telegram
   │
   ▼
Telegram Bot API
   │
   ▼
Kontra Backend
   │
   ▼
NLP / AI Processing
   │
   ▼
Response
   │
   ▼
Customer
```

Bu yapı sayesinde müşteri mesajları uygulamaya gerçek zamanlı olarak aktarılabilir ve sistem tarafından işlenebilir.

---

## 📊 Analytics

NLP modeli tarafından oluşturulan yapılandırılmış veriler kullanılarak müşteri iletişimleri farklı boyutlarda analiz edilebilir.

Örnek analiz alanları:

* 📦 Kargo ve teslimat problemleri
* 👥 Personel / müşteri hizmetleri şikâyetleri
* 🔄 İade ve değişim talepleri
* 🛍️ Ürün problemleri
* 😊 Müşteri duygu dağılımları
* 🏢 Departman bazlı talep yoğunlukları

Bu analizler, müşteri destek ekiplerinin karşılaştığı sorunların daha sistematik şekilde incelenmesini sağlar.

---

## 🔐 Security

Kontra içerisinde hassas yapılandırma bilgilerinin korunması için environment variable kullanımı önerilmektedir.

Özellikle aşağıdaki bilgiler kaynak kodunda tutulmamalıdır:

```text
Telegram Bot Token
Database Credentials
API Keys
Secret Keys
```

`.env` dosyası `.gitignore` içerisinde tutulmalıdır.

---

## 📌 Project Scope

Kontra'nın temel amacı, müşteri iletişimlerini yalnızca mesajlaşma düzeyinde bırakmayarak **yapay zekâ destekli analiz ve raporlama süreçlerine dönüştürmektir.**

Platformun temel yaklaşımı:

```text
Customer Communication
          ↓
      Data Storage
          ↓
       NLP / AI
          ↓
   Structured Insights
          ↓
      Visualization
          ↓
   Business Analytics
```

---

## 👨‍💻 Developer

**Batuhan Dinç**

Computer Engineering

---

## 📄 License

This project is intended for educational and portfolio purposes.
