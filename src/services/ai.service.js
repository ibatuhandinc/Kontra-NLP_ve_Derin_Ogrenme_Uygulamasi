const systemPrompt = `Sen "Kontra" firmasının akıllı müşteri destek ve analiz asistanısın. 

Temel Görevlerin:
1. Müşterilere hızlı, nazik, profesyonel ve çözüm odaklı yanıtlar vermek.
2. Müşteri mesajının arka planındaki kök nedeni (memnuniyet, şikayet, talep, vb.) analiz etmek.
3. Sorunun veya talebin şirket içindeki hangi departmanı ilgilendirdiğini tespit etmek.
4. Her yanıtında, backend sistemimizin okuyabilmesi için standartlaştırılmış bir JSON raporu üretmek.

---

## Müşteriyle İletişim ve Dil Kuralları (ÇOK ÖNEMLİ):
- İletişim dilin daima saygılı, empatik ve profesyonel olmalıdır.
- Yanıtlarında daima KUSURSUZ, AKICI ve DİLBİLGİSİ KURALLARINA UYGUN bir Türkçe kullan.
- Asla anlamsız, devrik, uydurma kelimeler veya bozuk çeviri kokan cümleler kullanma.
- Yanıtların kısa, net ve anlaşılır olmalıdır. Destan yazmaktan kaçın.
- Agresif, suçlayıcı veya savunmacı bir dil kullanma. Müşteri öfkeli ise yatıştırıcı ve çözüm odaklı yaklaş.
- Sorunu çözmek için eksik bilgi varsa (Sipariş numarası, kargo takip numarası vb.) kibarca talep et.
- Marka itibarını zedeleyecek kesin vaatlerde bulunma (örn: "Paranız 5 dakika içinde yatacak" yerine "İade süreciniz başlatılacaktır" de).

---

## Sistem Analiz Kriterleri:
Mesajı analiz ederken aşağıdaki sınıflandırmalara sıkı sıkıya bağlı kal:

1. Kategori: Şikayet, Bilgi Talebi, Sipariş Durumu, İade/Değişim, Teknik Sorun, Öneri, Teşekkür, Diğer.
2. Departman: Kargo/Lojistik, Ürün Kalitesi, Satış, Teknik Destek, Müşteri Temsilcisi, İade Departmanı, Finans/Ödeme, Genel.
3. Duygu Durumu: Çok Memnun, Memnun, Nötr, Rahatsız, Kızgın.
4. Öncelik: Düşük, Orta, Yüksek, Kritik (Örn: Hakaret veya yasal tehdit içeren durumlar Kritiktir).

---

## ZORUNLU YANIT FORMATI:
Yanıtını MUTLAKA aşağıdaki gibi iki net bölüme ayırarak ver. Önce müşteriye gidecek mesajı yaz, ardından sistem analizi için JSON formatını ekle. Etiketleri harfiyen kullan:

[MUSTERI_MESAJI_BASLANGIC]
(Buraya müşteriye verilecek profesyonel ve doğal dildeki yanıtı yaz)
[MUSTERI_MESAJI_BITIS]

[SISTEM_JSON_BASLANGIC]
{
 "kategori": "",
 "departman": "",
 "duygu": "",
 "oncelik": "",
 "konu_ozeti": "Müşteri sorununun veya talebinin 1-2 cümlelik kısa özeti",
 "aksiyon_onerisi": "Departman personeli için kısa bir sonraki adım önerisi"
}
[SISTEM_JSON_BITIS]`;

async function generateResponse(customerMessage) {
    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "Kontra Telegram Bot",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
            },
            body: JSON.stringify({
                model: "openrouter/free",
                messages: [
                    {
                        role: "system",
                        content: systemPrompt
                    },
                    {
                        role: "user",
                        content: customerMessage
                    }
                ],
                stream: false,
                temperature: 0.3,
                top_p: 0.9
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, text: ${errorText}`);
        }

        const data = await response.json();
        const responseText = data.choices?.[0]?.message?.content || "";

        let replyText = "";
        let analysis = null;

        // Extract reply using tags
        const msgStartTag = "[MUSTERI_MESAJI_BASLANGIC]";
        const msgEndTag = "[MUSTERI_MESAJI_BITIS]";
        const msgStartIndex = responseText.indexOf(msgStartTag);
        const msgEndIndex = responseText.indexOf(msgEndTag);

        if (msgStartIndex !== -1 && msgEndIndex !== -1 && msgEndIndex > msgStartIndex) {
            replyText = responseText.substring(msgStartIndex + msgStartTag.length, msgEndIndex).trim();
        } else {
            // Fallback
            replyText = responseText;
        }

        // Extract JSON using tags
        const jsonStartTag = "[SISTEM_JSON_BASLANGIC]";
        const jsonEndTag = "[SISTEM_JSON_BITIS]";
        const jsonStartIndex = responseText.indexOf(jsonStartTag);
        const jsonEndIndex = responseText.indexOf(jsonEndTag);

        if (jsonStartIndex !== -1 && jsonEndIndex !== -1 && jsonEndIndex > jsonStartIndex) {
            const jsonStr = responseText.substring(jsonStartIndex + jsonStartTag.length, jsonEndIndex).trim();
            try {
                analysis = JSON.parse(jsonStr);
                if (replyText === responseText) {
                    replyText = responseText.substring(0, jsonStartIndex).trim();
                }
            } catch (e) {
                console.error("Failed to parse JSON from AI response:", e.message);
            }
        } else {
            // Try old brace logic as fallback just in case AI didn't use tags properly
            const firstBrace = responseText.indexOf('{');
            const lastBrace = responseText.lastIndexOf('}');
            if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
                const jsonStr = responseText.substring(firstBrace, lastBrace + 1);
                try {
                    analysis = JSON.parse(jsonStr);
                    if (replyText === responseText) {
                        replyText = responseText.substring(0, firstBrace).trim() + '\n' + responseText.substring(lastBrace + 1).trim();
                    }
                } catch (e) {
                    console.error("Failed to parse fallback JSON from AI response:", e.message);
                }
            }
        }

        return {
            replyText: replyText.trim() || "Üzgünüm, şu anda mesajınıza yanıt veremiyorum.",
            analysis: analysis
        };
    } catch (error) {
        console.error("AI Generation Error:", error.message || error);
        return {
            replyText: "Üzgünüm, şu anda bağlantı sorunları sebebiyle mesajınıza yanıt veremiyorum. Lütfen daha sonra tekrar deneyiniz.",
            analysis: null
        };
    }
}

module.exports = { generateResponse };
