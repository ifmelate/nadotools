import type { ConversionConfig, FormatInfo } from "./types";

// ─── Format definitions ────────────────────────────────────────────────────────

const formats: Record<string, FormatInfo> = {
  mp4: { format: "mp4", type: "video", mime: "video/mp4", extension: ".mp4" },
  mp3: { format: "mp3", type: "audio", mime: "audio/mpeg", extension: ".mp3" },
  webm: { format: "webm", type: "video", mime: "video/webm", extension: ".webm" },
  gif: { format: "gif", type: "image", mime: "image/gif", extension: ".gif" },
  mkv: { format: "mkv", type: "video", mime: "video/x-matroska", extension: ".mkv" },
  mov: { format: "mov", type: "video", mime: "video/quicktime", extension: ".mov" },
  wav: { format: "wav", type: "audio", mime: "audio/wav", extension: ".wav" },
  flac: { format: "flac", type: "audio", mime: "audio/flac", extension: ".flac" },
  ogg: { format: "ogg", type: "audio", mime: "audio/ogg", extension: ".ogg" },
  m4a: { format: "m4a", type: "audio", mime: "audio/mp4", extension: ".m4a" },
  heic: { format: "heic", type: "image", mime: "image/heic", extension: ".heic" },
  jpg: { format: "jpg", type: "image", mime: "image/jpeg", extension: ".jpg" },
  webp: { format: "webp", type: "image", mime: "image/webp", extension: ".webp" },
  png: { format: "png", type: "image", mime: "image/png", extension: ".png" },
  svg: { format: "svg", type: "image", mime: "image/svg+xml", extension: ".svg" },
  pdf: { format: "pdf", type: "document", mime: "application/pdf", extension: ".pdf" },
  word: { format: "word", type: "document", mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", extension: ".docx" },
  markdown: { format: "markdown", type: "document", mime: "text/markdown", extension: ".md" },
  html: { format: "html", type: "document", mime: "text/html", extension: ".html" },
};

// ─── Conversion registry ───────────────────────────────────────────────────────

export const conversions: Record<string, ConversionConfig> = {
  // ── Video conversions ──────────────────────────────────────────────────────

  "mp4-to-mp3": {
    slug: "mp4-to-mp3",
    from: formats.mp4,
    to: formats.mp3,
    engine: "ffmpeg",
    seo: {
      en: {
        title: "Convert MP4 to MP3 — Free, Online | NadoTools",
        description: "Extract audio from MP4 videos and convert to MP3 for free. No upload needed, files stay in your browser.",
        h1: "Convert MP4 to MP3",
        howItWorks: ["Drop your MP4 file", "Browser extracts the audio to MP3", "Download your MP3 file"],
        faq: [
          { q: "Will I lose audio quality converting MP4 to MP3?", a: "The audio track is re-encoded to MP3 at 192 kbps by default, which preserves excellent quality for most uses." },
          { q: "Is there a file size limit?", a: "Since everything runs in your browser, the limit depends on your device's memory. Most files up to 2 GB work fine." },
        ],
      },
      es: {
        title: "Convertir MP4 a MP3 gratis y en linea | NadoTools",
        description: "Extrae el audio de videos MP4 y conviertelo a MP3 gratis. Sin subir archivos, todo se procesa en tu navegador.",
        h1: "Convertir MP4 a MP3",
        howItWorks: ["Arrastra tu archivo MP4", "El navegador extrae el audio a MP3", "Descarga tu archivo MP3"],
        faq: [
          { q: "Se pierde calidad de audio al convertir MP4 a MP3?", a: "El audio se recodifica a MP3 a 192 kbps por defecto, lo que mantiene una calidad excelente para la mayoria de usos." },
          { q: "Hay limite de tamano de archivo?", a: "Como todo se ejecuta en tu navegador, el limite depende de la memoria de tu dispositivo. La mayoria de archivos de hasta 2 GB funcionan bien." },
        ],
      },
      de: {
        title: "MP4 in MP3 umwandeln — kostenlos, online | NadoTools",
        description: "Audio aus MP4-Videos extrahieren und kostenlos in MP3 umwandeln. Kein Upload noetig, Dateien bleiben im Browser.",
        h1: "MP4 in MP3 umwandeln",
        howItWorks: ["MP4-Datei hierher ziehen", "Der Browser extrahiert das Audio als MP3", "MP3-Datei herunterladen"],
        faq: [
          { q: "Geht beim Umwandeln von MP4 in MP3 Audioqualitaet verloren?", a: "Die Audiospur wird standardmaessig mit 192 kbps als MP3 neu kodiert, was fuer die meisten Zwecke hervorragende Qualitaet bietet." },
          { q: "Gibt es ein Dateigroessenlimit?", a: "Da alles im Browser laeuft, haengt das Limit vom Arbeitsspeicher Ihres Geraets ab. Die meisten Dateien bis 2 GB funktionieren problemlos." },
        ],
      },
      fr: {
        title: "Convertir MP4 en MP3 — gratuit, en ligne | NadoTools",
        description: "Extrayez l'audio de vos videos MP4 et convertissez-le en MP3 gratuitement. Aucun envoi de fichier, tout reste dans votre navigateur.",
        h1: "Convertir MP4 en MP3",
        howItWorks: ["Deposez votre fichier MP4", "Le navigateur extrait l'audio en MP3", "Telechargez votre fichier MP3"],
        faq: [
          { q: "La qualite audio est-elle reduite lors de la conversion MP4 en MP3 ?", a: "La piste audio est reencodee en MP3 a 192 kbps par defaut, ce qui offre une excellente qualite pour la plupart des usages." },
          { q: "Y a-t-il une limite de taille de fichier ?", a: "Comme tout se passe dans votre navigateur, la limite depend de la memoire de votre appareil. La plupart des fichiers jusqu'a 2 Go fonctionnent correctement." },
        ],
      },
      pt: {
        title: "Converter MP4 para MP3 — gratis, online | NadoTools",
        description: "Extraia o audio de videos MP4 e converta para MP3 gratuitamente. Sem upload, os arquivos permanecem no seu navegador.",
        h1: "Converter MP4 para MP3",
        howItWorks: ["Solte seu arquivo MP4", "O navegador extrai o audio para MP3", "Baixe seu arquivo MP3"],
        faq: [
          { q: "A qualidade do audio e reduzida ao converter MP4 para MP3?", a: "A faixa de audio e recodificada em MP3 a 192 kbps por padrao, o que mantem qualidade excelente para a maioria dos usos." },
          { q: "Existe limite de tamanho de arquivo?", a: "Como tudo e processado no navegador, o limite depende da memoria do seu dispositivo. A maioria dos arquivos ate 2 GB funciona bem." },
        ],
      },
      zh: {
        title: "MP4 转 MP3 — 免费在线转换 | NadoTools",
        description: "从 MP4 视频中提取音频并免费转换为 MP3。无需上传，文件始终保留在浏览器中。",
        h1: "MP4 转换为 MP3",
        howItWorks: ["拖入你的 MP4 文件", "浏览器自动提取音频为 MP3", "下载 MP3 文件"],
        faq: [
          { q: "MP4 转 MP3 会损失音质吗？", a: "音频轨道默认以 192 kbps 重新编码为 MP3，对大多数场景来说音质非常好。" },
          { q: "文件大小有限制吗？", a: "由于完全在浏览器中运行，限制取决于设备内存。大多数 2 GB 以内的文件都能正常处理。" },
        ],
      },
      ja: {
        title: "MP4 を MP3 に変換 — 無料・オンライン | NadoTools",
        description: "MP4 動画から音声を抽出し、無料で MP3 に変換。アップロード不要、ファイルはブラウザ内で処理されます。",
        h1: "MP4 を MP3 に変換",
        howItWorks: ["MP4 ファイルをドロップ", "ブラウザが音声を MP3 に抽出", "MP3 ファイルをダウンロード"],
        faq: [
          { q: "MP4 から MP3 に変換すると音質は劣化しますか？", a: "音声トラックはデフォルトで 192 kbps の MP3 に再エンコードされ、ほとんどの用途で優れた音質を維持します。" },
          { q: "ファイルサイズの制限はありますか？", a: "すべてブラウザ内で処理されるため、制限はデバイスのメモリに依存します。2 GB 程度までのファイルは問題なく処理できます。" },
        ],
      },
      ru: {
        title: "Конвертировать MP4 в MP3 — бесплатно, онлайн | NadoTools",
        description: "Извлеките аудио из видео MP4 и конвертируйте в MP3 бесплатно. Без загрузки на сервер — файлы остаются в браузере.",
        h1: "Конвертировать MP4 в MP3",
        howItWorks: ["Перетащите файл MP4", "Браузер извлекает аудио в MP3", "Скачайте файл MP3"],
        faq: [
          { q: "Теряется ли качество звука при конвертации MP4 в MP3?", a: "Аудиодорожка перекодируется в MP3 с битрейтом 192 кбит/с по умолчанию, что обеспечивает отличное качество для большинства задач." },
          { q: "Есть ли ограничение на размер файла?", a: "Поскольку всё выполняется в браузере, ограничение зависит от оперативной памяти устройства. Большинство файлов до 2 ГБ обрабатываются без проблем." },
        ],
      },
    },
  },

  "mp4-to-webm": {
    slug: "mp4-to-webm",
    from: formats.mp4,
    to: formats.webm,
    engine: "ffmpeg",
    seo: {
      en: {
        title: "Convert MP4 to WebM — Free, Online | NadoTools",
        description: "Convert MP4 videos to WebM format for free. No upload, files stay in your browser.",
        h1: "Convert MP4 to WebM",
        howItWorks: ["Drop your MP4 file", "Browser converts to WebM", "Download the result"],
        faq: [
          { q: "Why convert MP4 to WebM?", a: "WebM is an open format optimized for the web. It offers good compression and is natively supported by all modern browsers." },
        ],
      },
      es: {
        title: "Convertir MP4 a WebM gratis y en linea | NadoTools",
        description: "Convierte videos MP4 a formato WebM gratis. Sin subir archivos, todo se procesa en tu navegador.",
        h1: "Convertir MP4 a WebM",
        howItWorks: ["Arrastra tu archivo MP4", "El navegador lo convierte a WebM", "Descarga el resultado"],
        faq: [
          { q: "Por que convertir MP4 a WebM?", a: "WebM es un formato abierto optimizado para la web. Ofrece buena compresion y es compatible con todos los navegadores modernos." },
        ],
      },
      de: {
        title: "MP4 in WebM umwandeln — kostenlos, online | NadoTools",
        description: "MP4-Videos kostenlos in das WebM-Format umwandeln. Kein Upload noetig, Dateien bleiben im Browser.",
        h1: "MP4 in WebM umwandeln",
        howItWorks: ["MP4-Datei hierher ziehen", "Der Browser wandelt in WebM um", "Ergebnis herunterladen"],
        faq: [
          { q: "Warum MP4 in WebM umwandeln?", a: "WebM ist ein offenes Format, das fuer das Web optimiert ist. Es bietet gute Kompression und wird von allen modernen Browsern nativ unterstuetzt." },
        ],
      },
      fr: {
        title: "Convertir MP4 en WebM — gratuit, en ligne | NadoTools",
        description: "Convertissez vos videos MP4 en format WebM gratuitement. Aucun envoi de fichier, tout reste dans votre navigateur.",
        h1: "Convertir MP4 en WebM",
        howItWorks: ["Deposez votre fichier MP4", "Le navigateur convertit en WebM", "Telechargez le resultat"],
        faq: [
          { q: "Pourquoi convertir MP4 en WebM ?", a: "WebM est un format ouvert optimise pour le web. Il offre une bonne compression et est pris en charge nativement par tous les navigateurs modernes." },
        ],
      },
      pt: {
        title: "Converter MP4 para WebM — gratis, online | NadoTools",
        description: "Converta videos MP4 para o formato WebM gratuitamente. Sem upload, os arquivos permanecem no seu navegador.",
        h1: "Converter MP4 para WebM",
        howItWorks: ["Solte seu arquivo MP4", "O navegador converte para WebM", "Baixe o resultado"],
        faq: [
          { q: "Por que converter MP4 para WebM?", a: "WebM e um formato aberto otimizado para a web. Oferece boa compressao e e compativel nativamente com todos os navegadores modernos." },
        ],
      },
      zh: {
        title: "MP4 转 WebM — 免费在线转换 | NadoTools",
        description: "免费将 MP4 视频转换为 WebM 格式。无需上传，文件始终保留在浏览器中。",
        h1: "MP4 转换为 WebM",
        howItWorks: ["拖入你的 MP4 文件", "浏览器自动转换为 WebM", "下载转换结果"],
        faq: [
          { q: "为什么要将 MP4 转换为 WebM？", a: "WebM 是一种为网络优化的开放格式，压缩效率高，所有现代浏览器均原生支持。" },
        ],
      },
      ja: {
        title: "MP4 を WebM に変換 — 無料・オンライン | NadoTools",
        description: "MP4 動画を無料で WebM 形式に変換。アップロード不要、ファイルはブラウザ内で処理されます。",
        h1: "MP4 を WebM に変換",
        howItWorks: ["MP4 ファイルをドロップ", "ブラウザが WebM に変換", "変換結果をダウンロード"],
        faq: [
          { q: "なぜ MP4 を WebM に変換するのですか？", a: "WebM はウェブ向けに最適化されたオープンフォーマットで、圧縮率が高く、すべてのモダンブラウザでネイティブにサポートされています。" },
        ],
      },
      ru: {
        title: "Конвертировать MP4 в WebM — бесплатно, онлайн | NadoTools",
        description: "Конвертируйте видео MP4 в формат WebM бесплатно. Без загрузки на сервер — файлы остаются в браузере.",
        h1: "Конвертировать MP4 в WebM",
        howItWorks: ["Перетащите файл MP4", "Браузер конвертирует в WebM", "Скачайте результат"],
        faq: [
          { q: "Зачем конвертировать MP4 в WebM?", a: "WebM — открытый формат, оптимизированный для веба. Он обеспечивает хорошее сжатие и поддерживается всеми современными браузерами." },
        ],
      },
    },
  },

  "mp4-to-gif": {
    slug: "mp4-to-gif",
    from: formats.mp4,
    to: formats.gif,
    engine: "ffmpeg",
    seo: {
      en: {
        title: "Convert MP4 to GIF — Free, Online | NadoTools",
        description: "Turn MP4 videos into animated GIFs for free. No upload, files stay in your browser.",
        h1: "Convert MP4 to GIF",
        howItWorks: ["Drop your MP4 file", "Browser creates an animated GIF", "Download the GIF"],
        faq: [
          { q: "Can I control the GIF quality?", a: "The converter produces an optimized GIF with a balanced palette. For most short clips, the result looks great." },
        ],
      },
      es: {
        title: "Convertir MP4 a GIF gratis y en linea | NadoTools",
        description: "Convierte videos MP4 en GIFs animados gratis. Sin subir archivos, todo se procesa en tu navegador.",
        h1: "Convertir MP4 a GIF",
        howItWorks: ["Arrastra tu archivo MP4", "El navegador crea un GIF animado", "Descarga el GIF"],
        faq: [
          { q: "Puedo controlar la calidad del GIF?", a: "El convertidor genera un GIF optimizado con una paleta equilibrada. Para la mayoria de clips cortos, el resultado es excelente." },
        ],
      },
      de: {
        title: "MP4 in GIF umwandeln — kostenlos, online | NadoTools",
        description: "MP4-Videos kostenlos in animierte GIFs umwandeln. Kein Upload, Dateien bleiben im Browser.",
        h1: "MP4 in GIF umwandeln",
        howItWorks: ["MP4-Datei hierher ziehen", "Der Browser erstellt ein animiertes GIF", "GIF herunterladen"],
        faq: [
          { q: "Kann ich die GIF-Qualitaet steuern?", a: "Der Konverter erzeugt ein optimiertes GIF mit ausgewogener Farbpalette. Fuer die meisten kurzen Clips ist das Ergebnis sehr gut." },
        ],
      },
      fr: {
        title: "Convertir MP4 en GIF — gratuit, en ligne | NadoTools",
        description: "Transformez vos videos MP4 en GIF animes gratuitement. Aucun envoi de fichier, tout reste dans votre navigateur.",
        h1: "Convertir MP4 en GIF",
        howItWorks: ["Deposez votre fichier MP4", "Le navigateur cree un GIF anime", "Telechargez le GIF"],
        faq: [
          { q: "Puis-je controler la qualite du GIF ?", a: "Le convertisseur produit un GIF optimise avec une palette equilibree. Pour la plupart des clips courts, le rendu est excellent." },
        ],
      },
      pt: {
        title: "Converter MP4 para GIF — gratis, online | NadoTools",
        description: "Transforme videos MP4 em GIFs animados gratuitamente. Sem upload, os arquivos permanecem no seu navegador.",
        h1: "Converter MP4 para GIF",
        howItWorks: ["Solte seu arquivo MP4", "O navegador cria um GIF animado", "Baixe o GIF"],
        faq: [
          { q: "Posso controlar a qualidade do GIF?", a: "O conversor gera um GIF otimizado com uma paleta equilibrada. Para a maioria dos clips curtos, o resultado fica otimo." },
        ],
      },
      zh: {
        title: "MP4 转 GIF — 免费在线转换 | NadoTools",
        description: "免费将 MP4 视频转换为动态 GIF。无需上传，文件始终保留在浏览器中。",
        h1: "MP4 转换为 GIF",
        howItWorks: ["拖入你的 MP4 文件", "浏览器自动生成动态 GIF", "下载 GIF 文件"],
        faq: [
          { q: "可以控制 GIF 的质量吗？", a: "转换器会生成优化过的 GIF，使用平衡的调色板。对于大多数短视频片段，效果非常好。" },
        ],
      },
      ja: {
        title: "MP4 を GIF に変換 — 無料・オンライン | NadoTools",
        description: "MP4 動画を無料でアニメーション GIF に変換。アップロード不要、ファイルはブラウザ内で処理されます。",
        h1: "MP4 を GIF に変換",
        howItWorks: ["MP4 ファイルをドロップ", "ブラウザがアニメーション GIF を作成", "GIF をダウンロード"],
        faq: [
          { q: "GIF の品質を調整できますか？", a: "コンバーターはバランスの取れたパレットで最適化された GIF を生成します。短いクリップであれば、ほとんどの場合きれいに仕上がります。" },
        ],
      },
      ru: {
        title: "Конвертировать MP4 в GIF — бесплатно, онлайн | NadoTools",
        description: "Превратите видео MP4 в анимированные GIF бесплатно. Без загрузки на сервер — файлы остаются в браузере.",
        h1: "Конвертировать MP4 в GIF",
        howItWorks: ["Перетащите файл MP4", "Браузер создает анимированный GIF", "Скачайте GIF"],
        faq: [
          { q: "Можно ли регулировать качество GIF?", a: "Конвертер создает оптимизированный GIF со сбалансированной палитрой. Для большинства коротких клипов результат выглядит отлично." },
        ],
      },
    },
  },

  "mkv-to-mp4": {
    slug: "mkv-to-mp4",
    from: formats.mkv,
    to: formats.mp4,
    engine: "ffmpeg",
    seo: {
      en: {
        title: "Convert MKV to MP4 — Free, Online | NadoTools",
        description: "Convert MKV videos to MP4 for free. No upload, files stay in your browser.",
        h1: "Convert MKV to MP4",
        howItWorks: ["Drop your MKV file", "Browser converts to MP4", "Download the result"],
        faq: [
          { q: "Will the video quality change?", a: "The video is re-muxed or re-encoded with minimal quality loss. For most files, you won't notice any difference." },
        ],
      },
      es: {
        title: "Convertir MKV a MP4 gratis y en linea | NadoTools",
        description: "Convierte videos MKV a MP4 gratis. Sin subir archivos, todo se procesa en tu navegador.",
        h1: "Convertir MKV a MP4",
        howItWorks: ["Arrastra tu archivo MKV", "El navegador lo convierte a MP4", "Descarga el resultado"],
        faq: [
          { q: "Cambiara la calidad del video?", a: "El video se remultiplexa o recodifica con una perdida de calidad minima. En la mayoria de archivos, no notaras diferencia." },
        ],
      },
      de: {
        title: "MKV in MP4 umwandeln — kostenlos, online | NadoTools",
        description: "MKV-Videos kostenlos in MP4 umwandeln. Kein Upload noetig, Dateien bleiben im Browser.",
        h1: "MKV in MP4 umwandeln",
        howItWorks: ["MKV-Datei hierher ziehen", "Der Browser wandelt in MP4 um", "Ergebnis herunterladen"],
        faq: [
          { q: "Aendert sich die Videoqualitaet?", a: "Das Video wird mit minimalem Qualitaetsverlust neu gemultiplext oder kodiert. Bei den meisten Dateien ist kein Unterschied erkennbar." },
        ],
      },
      fr: {
        title: "Convertir MKV en MP4 — gratuit, en ligne | NadoTools",
        description: "Convertissez vos videos MKV en MP4 gratuitement. Aucun envoi de fichier, tout reste dans votre navigateur.",
        h1: "Convertir MKV en MP4",
        howItWorks: ["Deposez votre fichier MKV", "Le navigateur convertit en MP4", "Telechargez le resultat"],
        faq: [
          { q: "La qualite video sera-t-elle modifiee ?", a: "La video est remultiplexee ou reencodee avec une perte de qualite minimale. Pour la plupart des fichiers, aucune difference n'est perceptible." },
        ],
      },
      pt: {
        title: "Converter MKV para MP4 — gratis, online | NadoTools",
        description: "Converta videos MKV para MP4 gratuitamente. Sem upload, os arquivos permanecem no seu navegador.",
        h1: "Converter MKV para MP4",
        howItWorks: ["Solte seu arquivo MKV", "O navegador converte para MP4", "Baixe o resultado"],
        faq: [
          { q: "A qualidade do video vai mudar?", a: "O video e remuxado ou recodificado com perda minima de qualidade. Na maioria dos arquivos, voce nao notara diferenca." },
        ],
      },
      zh: {
        title: "MKV 转 MP4 — 免费在线转换 | NadoTools",
        description: "免费将 MKV 视频转换为 MP4。无需上传，文件始终保留在浏览器中。",
        h1: "MKV 转换为 MP4",
        howItWorks: ["拖入你的 MKV 文件", "浏览器自动转换为 MP4", "下载转换结果"],
        faq: [
          { q: "视频质量会改变吗？", a: "视频会被重新封装或重新编码，质量损失极小。对于大多数文件，你不会察觉到任何差异。" },
        ],
      },
      ja: {
        title: "MKV を MP4 に変換 — 無料・オンライン | NadoTools",
        description: "MKV 動画を無料で MP4 に変換。アップロード不要、ファイルはブラウザ内で処理されます。",
        h1: "MKV を MP4 に変換",
        howItWorks: ["MKV ファイルをドロップ", "ブラウザが MP4 に変換", "変換結果をダウンロード"],
        faq: [
          { q: "動画の画質は変わりますか？", a: "動画は最小限の画質劣化でリマックスまたは再エンコードされます。ほとんどのファイルでは違いに気づかないでしょう。" },
        ],
      },
      ru: {
        title: "Конвертировать MKV в MP4 — бесплатно, онлайн | NadoTools",
        description: "Конвертируйте видео MKV в MP4 бесплатно. Без загрузки на сервер — файлы остаются в браузере.",
        h1: "Конвертировать MKV в MP4",
        howItWorks: ["Перетащите файл MKV", "Браузер конвертирует в MP4", "Скачайте результат"],
        faq: [
          { q: "Изменится ли качество видео?", a: "Видео перемультиплексируется или перекодируется с минимальной потерей качества. Для большинства файлов разница незаметна." },
        ],
      },
    },
  },

  "mov-to-mp4": {
    slug: "mov-to-mp4",
    from: formats.mov,
    to: formats.mp4,
    engine: "ffmpeg",
    seo: {
      en: {
        title: "Convert MOV to MP4 — Free, Online | NadoTools",
        description: "Convert Apple MOV videos to MP4 for free. No upload, files stay in your browser.",
        h1: "Convert MOV to MP4",
        howItWorks: ["Drop your MOV file", "Browser converts to MP4", "Download the result"],
        faq: [
          { q: "Why convert MOV to MP4?", a: "MOV is an Apple format with limited compatibility. MP4 plays on virtually every device and platform." },
        ],
      },
      es: {
        title: "Convertir MOV a MP4 gratis y en linea | NadoTools",
        description: "Convierte videos MOV de Apple a MP4 gratis. Sin subir archivos, todo se procesa en tu navegador.",
        h1: "Convertir MOV a MP4",
        howItWorks: ["Arrastra tu archivo MOV", "El navegador lo convierte a MP4", "Descarga el resultado"],
        faq: [
          { q: "Por que convertir MOV a MP4?", a: "MOV es un formato de Apple con compatibilidad limitada. MP4 se reproduce en practicamente cualquier dispositivo y plataforma." },
        ],
      },
      de: {
        title: "MOV in MP4 umwandeln — kostenlos, online | NadoTools",
        description: "Apple MOV-Videos kostenlos in MP4 umwandeln. Kein Upload, Dateien bleiben im Browser.",
        h1: "MOV in MP4 umwandeln",
        howItWorks: ["MOV-Datei hierher ziehen", "Der Browser wandelt in MP4 um", "Ergebnis herunterladen"],
        faq: [
          { q: "Warum MOV in MP4 umwandeln?", a: "MOV ist ein Apple-Format mit eingeschraenkter Kompatibilitaet. MP4 laesst sich auf praktisch jedem Geraet und jeder Plattform abspielen." },
        ],
      },
      fr: {
        title: "Convertir MOV en MP4 — gratuit, en ligne | NadoTools",
        description: "Convertissez vos videos Apple MOV en MP4 gratuitement. Aucun envoi de fichier, tout reste dans votre navigateur.",
        h1: "Convertir MOV en MP4",
        howItWorks: ["Deposez votre fichier MOV", "Le navigateur convertit en MP4", "Telechargez le resultat"],
        faq: [
          { q: "Pourquoi convertir MOV en MP4 ?", a: "MOV est un format Apple a compatibilite limitee. MP4 se lit sur quasiment tous les appareils et plateformes." },
        ],
      },
      pt: {
        title: "Converter MOV para MP4 — gratis, online | NadoTools",
        description: "Converta videos MOV da Apple para MP4 gratuitamente. Sem upload, os arquivos permanecem no seu navegador.",
        h1: "Converter MOV para MP4",
        howItWorks: ["Solte seu arquivo MOV", "O navegador converte para MP4", "Baixe o resultado"],
        faq: [
          { q: "Por que converter MOV para MP4?", a: "MOV e um formato da Apple com compatibilidade limitada. MP4 funciona em praticamente qualquer dispositivo e plataforma." },
        ],
      },
      zh: {
        title: "MOV 转 MP4 — 免费在线转换 | NadoTools",
        description: "免费将苹果 MOV 视频转换为 MP4。无需上传，文件始终保留在浏览器中。",
        h1: "MOV 转换为 MP4",
        howItWorks: ["拖入你的 MOV 文件", "浏览器自动转换为 MP4", "下载转换结果"],
        faq: [
          { q: "为什么要将 MOV 转换为 MP4？", a: "MOV 是苹果格式，兼容性有限。MP4 几乎可以在所有设备和平台上播放。" },
        ],
      },
      ja: {
        title: "MOV を MP4 に変換 — 無料・オンライン | NadoTools",
        description: "Apple の MOV 動画を無料で MP4 に変換。アップロード不要、ファイルはブラウザ内で処理されます。",
        h1: "MOV を MP4 に変換",
        howItWorks: ["MOV ファイルをドロップ", "ブラウザが MP4 に変換", "変換結果をダウンロード"],
        faq: [
          { q: "なぜ MOV を MP4 に変換するのですか？", a: "MOV は Apple 独自の形式で互換性が限られています。MP4 はほぼすべてのデバイスとプラットフォームで再生できます。" },
        ],
      },
      ru: {
        title: "Конвертировать MOV в MP4 — бесплатно, онлайн | NadoTools",
        description: "Конвертируйте видео Apple MOV в MP4 бесплатно. Без загрузки на сервер — файлы остаются в браузере.",
        h1: "Конвертировать MOV в MP4",
        howItWorks: ["Перетащите файл MOV", "Браузер конвертирует в MP4", "Скачайте результат"],
        faq: [
          { q: "Зачем конвертировать MOV в MP4?", a: "MOV — формат Apple с ограниченной совместимостью. MP4 воспроизводится практически на любом устройстве и платформе." },
        ],
      },
    },
  },

  // ── Audio conversions ──────────────────────────────────────────────────────

  "wav-to-mp3": {
    slug: "wav-to-mp3",
    from: formats.wav,
    to: formats.mp3,
    engine: "ffmpeg",
    seo: {
      en: {
        title: "Convert WAV to MP3 — Free, Online | NadoTools",
        description: "Convert WAV audio files to MP3 for free. No upload, files stay in your browser.",
        h1: "Convert WAV to MP3",
        howItWorks: ["Drop your WAV file", "Browser converts to MP3", "Download the result"],
        faq: [
          { q: "How much smaller will my MP3 be?", a: "MP3 at 192 kbps is typically about 10x smaller than the original WAV, with very little perceptible quality loss." },
        ],
      },
      es: {
        title: "Convertir WAV a MP3 gratis y en linea | NadoTools",
        description: "Convierte archivos de audio WAV a MP3 gratis. Sin subir archivos, todo se procesa en tu navegador.",
        h1: "Convertir WAV a MP3",
        howItWorks: ["Arrastra tu archivo WAV", "El navegador lo convierte a MP3", "Descarga el resultado"],
        faq: [
          { q: "Cuanto mas pequeno sera mi MP3?", a: "Un MP3 a 192 kbps suele ser unas 10 veces mas pequeno que el WAV original, con muy poca perdida de calidad perceptible." },
        ],
      },
      de: {
        title: "WAV in MP3 umwandeln — kostenlos, online | NadoTools",
        description: "WAV-Audiodateien kostenlos in MP3 umwandeln. Kein Upload noetig, Dateien bleiben im Browser.",
        h1: "WAV in MP3 umwandeln",
        howItWorks: ["WAV-Datei hierher ziehen", "Der Browser wandelt in MP3 um", "Ergebnis herunterladen"],
        faq: [
          { q: "Wie viel kleiner wird meine MP3-Datei?", a: "MP3 mit 192 kbps ist typischerweise etwa 10-mal kleiner als die urspruengliche WAV-Datei, bei kaum wahrnehmbarem Qualitaetsverlust." },
        ],
      },
      fr: {
        title: "Convertir WAV en MP3 — gratuit, en ligne | NadoTools",
        description: "Convertissez vos fichiers audio WAV en MP3 gratuitement. Aucun envoi de fichier, tout reste dans votre navigateur.",
        h1: "Convertir WAV en MP3",
        howItWorks: ["Deposez votre fichier WAV", "Le navigateur convertit en MP3", "Telechargez le resultat"],
        faq: [
          { q: "Quelle reduction de taille puis-je attendre ?", a: "Un MP3 a 192 kbps est generalement environ 10 fois plus petit que le WAV original, avec une perte de qualite a peine perceptible." },
        ],
      },
      pt: {
        title: "Converter WAV para MP3 — gratis, online | NadoTools",
        description: "Converta arquivos de audio WAV para MP3 gratuitamente. Sem upload, os arquivos permanecem no seu navegador.",
        h1: "Converter WAV para MP3",
        howItWorks: ["Solte seu arquivo WAV", "O navegador converte para MP3", "Baixe o resultado"],
        faq: [
          { q: "Quanto menor ficara meu MP3?", a: "Um MP3 a 192 kbps costuma ser cerca de 10 vezes menor que o WAV original, com perda de qualidade quase imperceptivel." },
        ],
      },
      zh: {
        title: "WAV 转 MP3 — 免费在线转换 | NadoTools",
        description: "免费将 WAV 音频文件转换为 MP3。无需上传，文件始终保留在浏览器中。",
        h1: "WAV 转换为 MP3",
        howItWorks: ["拖入你的 WAV 文件", "浏览器自动转换为 MP3", "下载转换结果"],
        faq: [
          { q: "MP3 文件会小多少？", a: "192 kbps 的 MP3 通常比原始 WAV 小约 10 倍，音质损失几乎不可察觉。" },
        ],
      },
      ja: {
        title: "WAV を MP3 に変換 — 無料・オンライン | NadoTools",
        description: "WAV 音声ファイルを無料で MP3 に変換。アップロード不要、ファイルはブラウザ内で処理されます。",
        h1: "WAV を MP3 に変換",
        howItWorks: ["WAV ファイルをドロップ", "ブラウザが MP3 に変換", "変換結果をダウンロード"],
        faq: [
          { q: "MP3 ファイルはどれくらい小さくなりますか？", a: "192 kbps の MP3 は通常、元の WAV の約 10 分の 1 のサイズで、知覚できる音質の劣化はほとんどありません。" },
        ],
      },
      ru: {
        title: "Конвертировать WAV в MP3 — бесплатно, онлайн | NadoTools",
        description: "Конвертируйте аудиофайлы WAV в MP3 бесплатно. Без загрузки на сервер — файлы остаются в браузере.",
        h1: "Конвертировать WAV в MP3",
        howItWorks: ["Перетащите файл WAV", "Браузер конвертирует в MP3", "Скачайте результат"],
        faq: [
          { q: "Насколько меньше будет файл MP3?", a: "MP3 с битрейтом 192 кбит/с обычно примерно в 10 раз меньше исходного WAV, при этом потеря качества практически незаметна." },
        ],
      },
    },
  },

  "flac-to-mp3": {
    slug: "flac-to-mp3",
    from: formats.flac,
    to: formats.mp3,
    engine: "ffmpeg",
    seo: {
      en: {
        title: "Convert FLAC to MP3 — Free, Online | NadoTools",
        description: "Convert FLAC audio files to MP3 for free. No upload, files stay in your browser.",
        h1: "Convert FLAC to MP3",
        howItWorks: ["Drop your FLAC file", "Browser converts to MP3", "Download the result"],
        faq: [],
      },
      es: {
        title: "Convertir FLAC a MP3 gratis y en linea | NadoTools",
        description: "Convierte archivos de audio FLAC a MP3 gratis. Sin subir archivos, todo se procesa en tu navegador.",
        h1: "Convertir FLAC a MP3",
        howItWorks: ["Arrastra tu archivo FLAC", "El navegador lo convierte a MP3", "Descarga el resultado"],
        faq: [],
      },
      de: {
        title: "FLAC in MP3 umwandeln — kostenlos, online | NadoTools",
        description: "FLAC-Audiodateien kostenlos in MP3 umwandeln. Kein Upload noetig, Dateien bleiben im Browser.",
        h1: "FLAC in MP3 umwandeln",
        howItWorks: ["FLAC-Datei hierher ziehen", "Der Browser wandelt in MP3 um", "Ergebnis herunterladen"],
        faq: [],
      },
      fr: {
        title: "Convertir FLAC en MP3 — gratuit, en ligne | NadoTools",
        description: "Convertissez vos fichiers audio FLAC en MP3 gratuitement. Aucun envoi de fichier, tout reste dans votre navigateur.",
        h1: "Convertir FLAC en MP3",
        howItWorks: ["Deposez votre fichier FLAC", "Le navigateur convertit en MP3", "Telechargez le resultat"],
        faq: [],
      },
      pt: {
        title: "Converter FLAC para MP3 — gratis, online | NadoTools",
        description: "Converta arquivos de audio FLAC para MP3 gratuitamente. Sem upload, os arquivos permanecem no seu navegador.",
        h1: "Converter FLAC para MP3",
        howItWorks: ["Solte seu arquivo FLAC", "O navegador converte para MP3", "Baixe o resultado"],
        faq: [],
      },
      zh: {
        title: "FLAC 转 MP3 — 免费在线转换 | NadoTools",
        description: "免费将 FLAC 音频文件转换为 MP3。无需上传，文件始终保留在浏览器中。",
        h1: "FLAC 转换为 MP3",
        howItWorks: ["拖入你的 FLAC 文件", "浏览器自动转换为 MP3", "下载转换结果"],
        faq: [],
      },
      ja: {
        title: "FLAC を MP3 に変換 — 無料・オンライン | NadoTools",
        description: "FLAC 音声ファイルを無料で MP3 に変換。アップロード不要、ファイルはブラウザ内で処理されます。",
        h1: "FLAC を MP3 に変換",
        howItWorks: ["FLAC ファイルをドロップ", "ブラウザが MP3 に変換", "変換結果をダウンロード"],
        faq: [],
      },
      ru: {
        title: "Конвертировать FLAC в MP3 — бесплатно, онлайн | NadoTools",
        description: "Конвертируйте аудиофайлы FLAC в MP3 бесплатно. Без загрузки на сервер — файлы остаются в браузере.",
        h1: "Конвертировать FLAC в MP3",
        howItWorks: ["Перетащите файл FLAC", "Браузер конвертирует в MP3", "Скачайте результат"],
        faq: [],
      },
    },
  },

  "ogg-to-mp3": {
    slug: "ogg-to-mp3",
    from: formats.ogg,
    to: formats.mp3,
    engine: "ffmpeg",
    seo: {
      en: {
        title: "Convert OGG to MP3 — Free, Online | NadoTools",
        description: "Convert OGG audio files to MP3 for free. No upload, files stay in your browser.",
        h1: "Convert OGG to MP3",
        howItWorks: ["Drop your OGG file", "Browser converts to MP3", "Download the result"],
        faq: [],
      },
      es: {
        title: "Convertir OGG a MP3 gratis y en linea | NadoTools",
        description: "Convierte archivos de audio OGG a MP3 gratis. Sin subir archivos, todo se procesa en tu navegador.",
        h1: "Convertir OGG a MP3",
        howItWorks: ["Arrastra tu archivo OGG", "El navegador lo convierte a MP3", "Descarga el resultado"],
        faq: [],
      },
      de: {
        title: "OGG in MP3 umwandeln — kostenlos, online | NadoTools",
        description: "OGG-Audiodateien kostenlos in MP3 umwandeln. Kein Upload noetig, Dateien bleiben im Browser.",
        h1: "OGG in MP3 umwandeln",
        howItWorks: ["OGG-Datei hierher ziehen", "Der Browser wandelt in MP3 um", "Ergebnis herunterladen"],
        faq: [],
      },
      fr: {
        title: "Convertir OGG en MP3 — gratuit, en ligne | NadoTools",
        description: "Convertissez vos fichiers audio OGG en MP3 gratuitement. Aucun envoi de fichier, tout reste dans votre navigateur.",
        h1: "Convertir OGG en MP3",
        howItWorks: ["Deposez votre fichier OGG", "Le navigateur convertit en MP3", "Telechargez le resultat"],
        faq: [],
      },
      pt: {
        title: "Converter OGG para MP3 — gratis, online | NadoTools",
        description: "Converta arquivos de audio OGG para MP3 gratuitamente. Sem upload, os arquivos permanecem no seu navegador.",
        h1: "Converter OGG para MP3",
        howItWorks: ["Solte seu arquivo OGG", "O navegador converte para MP3", "Baixe o resultado"],
        faq: [],
      },
      zh: {
        title: "OGG 转 MP3 — 免费在线转换 | NadoTools",
        description: "免费将 OGG 音频文件转换为 MP3。无需上传，文件始终保留在浏览器中。",
        h1: "OGG 转换为 MP3",
        howItWorks: ["拖入你的 OGG 文件", "浏览器自动转换为 MP3", "下载转换结果"],
        faq: [],
      },
      ja: {
        title: "OGG を MP3 に変換 — 無料・オンライン | NadoTools",
        description: "OGG 音声ファイルを無料で MP3 に変換。アップロード不要、ファイルはブラウザ内で処理されます。",
        h1: "OGG を MP3 に変換",
        howItWorks: ["OGG ファイルをドロップ", "ブラウザが MP3 に変換", "変換結果をダウンロード"],
        faq: [],
      },
      ru: {
        title: "Конвертировать OGG в MP3 — бесплатно, онлайн | NadoTools",
        description: "Конвертируйте аудиофайлы OGG в MP3 бесплатно. Без загрузки на сервер — файлы остаются в браузере.",
        h1: "Конвертировать OGG в MP3",
        howItWorks: ["Перетащите файл OGG", "Браузер конвертирует в MP3", "Скачайте результат"],
        faq: [],
      },
    },
  },

  "m4a-to-mp3": {
    slug: "m4a-to-mp3",
    from: formats.m4a,
    to: formats.mp3,
    engine: "ffmpeg",
    seo: {
      en: {
        title: "Convert M4A to MP3 — Free, Online | NadoTools",
        description: "Convert M4A audio files to MP3 for free. No upload, files stay in your browser.",
        h1: "Convert M4A to MP3",
        howItWorks: ["Drop your M4A file", "Browser converts to MP3", "Download the result"],
        faq: [],
      },
      es: {
        title: "Convertir M4A a MP3 gratis y en linea | NadoTools",
        description: "Convierte archivos de audio M4A a MP3 gratis. Sin subir archivos, todo se procesa en tu navegador.",
        h1: "Convertir M4A a MP3",
        howItWorks: ["Arrastra tu archivo M4A", "El navegador lo convierte a MP3", "Descarga el resultado"],
        faq: [],
      },
      de: {
        title: "M4A in MP3 umwandeln — kostenlos, online | NadoTools",
        description: "M4A-Audiodateien kostenlos in MP3 umwandeln. Kein Upload noetig, Dateien bleiben im Browser.",
        h1: "M4A in MP3 umwandeln",
        howItWorks: ["M4A-Datei hierher ziehen", "Der Browser wandelt in MP3 um", "Ergebnis herunterladen"],
        faq: [],
      },
      fr: {
        title: "Convertir M4A en MP3 — gratuit, en ligne | NadoTools",
        description: "Convertissez vos fichiers audio M4A en MP3 gratuitement. Aucun envoi de fichier, tout reste dans votre navigateur.",
        h1: "Convertir M4A en MP3",
        howItWorks: ["Deposez votre fichier M4A", "Le navigateur convertit en MP3", "Telechargez le resultat"],
        faq: [],
      },
      pt: {
        title: "Converter M4A para MP3 — gratis, online | NadoTools",
        description: "Converta arquivos de audio M4A para MP3 gratuitamente. Sem upload, os arquivos permanecem no seu navegador.",
        h1: "Converter M4A para MP3",
        howItWorks: ["Solte seu arquivo M4A", "O navegador converte para MP3", "Baixe o resultado"],
        faq: [],
      },
      zh: {
        title: "M4A 转 MP3 — 免费在线转换 | NadoTools",
        description: "免费将 M4A 音频文件转换为 MP3。无需上传，文件始终保留在浏览器中。",
        h1: "M4A 转换为 MP3",
        howItWorks: ["拖入你的 M4A 文件", "浏览器自动转换为 MP3", "下载转换结果"],
        faq: [],
      },
      ja: {
        title: "M4A を MP3 に変換 — 無料・オンライン | NadoTools",
        description: "M4A 音声ファイルを無料で MP3 に変換。アップロード不要、ファイルはブラウザ内で処理されます。",
        h1: "M4A を MP3 に変換",
        howItWorks: ["M4A ファイルをドロップ", "ブラウザが MP3 に変換", "変換結果をダウンロード"],
        faq: [],
      },
      ru: {
        title: "Конвертировать M4A в MP3 — бесплатно, онлайн | NadoTools",
        description: "Конвертируйте аудиофайлы M4A в MP3 бесплатно. Без загрузки на сервер — файлы остаются в браузере.",
        h1: "Конвертировать M4A в MP3",
        howItWorks: ["Перетащите файл M4A", "Браузер конвертирует в MP3", "Скачайте результат"],
        faq: [],
      },
    },
  },

  "mp3-to-wav": {
    slug: "mp3-to-wav",
    from: formats.mp3,
    to: formats.wav,
    engine: "ffmpeg",
    seo: {
      en: {
        title: "Convert MP3 to WAV — Free, Online | NadoTools",
        description: "Convert MP3 audio files to WAV for free. No upload, files stay in your browser.",
        h1: "Convert MP3 to WAV",
        howItWorks: ["Drop your MP3 file", "Browser converts to WAV", "Download the result"],
        faq: [
          { q: "Why convert MP3 to WAV?", a: "WAV is an uncompressed format needed for audio editing, music production, and professional workflows that require lossless audio." },
        ],
      },
      es: {
        title: "Convertir MP3 a WAV gratis y en linea | NadoTools",
        description: "Convierte archivos de audio MP3 a WAV gratis. Sin subir archivos, todo se procesa en tu navegador.",
        h1: "Convertir MP3 a WAV",
        howItWorks: ["Arrastra tu archivo MP3", "El navegador lo convierte a WAV", "Descarga el resultado"],
        faq: [
          { q: "Por que convertir MP3 a WAV?", a: "WAV es un formato sin compresion necesario para la edicion de audio, produccion musical y flujos de trabajo profesionales que requieren audio sin perdidas." },
        ],
      },
      de: {
        title: "MP3 in WAV umwandeln — kostenlos, online | NadoTools",
        description: "MP3-Audiodateien kostenlos in WAV umwandeln. Kein Upload noetig, Dateien bleiben im Browser.",
        h1: "MP3 in WAV umwandeln",
        howItWorks: ["MP3-Datei hierher ziehen", "Der Browser wandelt in WAV um", "Ergebnis herunterladen"],
        faq: [
          { q: "Warum MP3 in WAV umwandeln?", a: "WAV ist ein unkomprimiertes Format, das fuer Audiobearbeitung, Musikproduktion und professionelle Arbeitsablaeufe benoetigt wird." },
        ],
      },
      fr: {
        title: "Convertir MP3 en WAV — gratuit, en ligne | NadoTools",
        description: "Convertissez vos fichiers audio MP3 en WAV gratuitement. Aucun envoi de fichier, tout reste dans votre navigateur.",
        h1: "Convertir MP3 en WAV",
        howItWorks: ["Deposez votre fichier MP3", "Le navigateur convertit en WAV", "Telechargez le resultat"],
        faq: [
          { q: "Pourquoi convertir MP3 en WAV ?", a: "WAV est un format non compresse necessaire pour l'edition audio, la production musicale et les flux de travail professionnels exigeant un audio sans perte." },
        ],
      },
      pt: {
        title: "Converter MP3 para WAV — gratis, online | NadoTools",
        description: "Converta arquivos de audio MP3 para WAV gratuitamente. Sem upload, os arquivos permanecem no seu navegador.",
        h1: "Converter MP3 para WAV",
        howItWorks: ["Solte seu arquivo MP3", "O navegador converte para WAV", "Baixe o resultado"],
        faq: [
          { q: "Por que converter MP3 para WAV?", a: "WAV e um formato sem compressao necessario para edicao de audio, producao musical e fluxos de trabalho profissionais que exigem audio sem perdas." },
        ],
      },
      zh: {
        title: "MP3 转 WAV — 免费在线转换 | NadoTools",
        description: "免费将 MP3 音频文件转换为 WAV。无需上传，文件始终保留在浏览器中。",
        h1: "MP3 转换为 WAV",
        howItWorks: ["拖入你的 MP3 文件", "浏览器自动转换为 WAV", "下载转换结果"],
        faq: [
          { q: "为什么要将 MP3 转换为 WAV？", a: "WAV 是无压缩格式，音频编辑、音乐制作和专业工作流程中需要无损音频时必须使用。" },
        ],
      },
      ja: {
        title: "MP3 を WAV に変換 — 無料・オンライン | NadoTools",
        description: "MP3 音声ファイルを無料で WAV に変換。アップロード不要、ファイルはブラウザ内で処理されます。",
        h1: "MP3 を WAV に変換",
        howItWorks: ["MP3 ファイルをドロップ", "ブラウザが WAV に変換", "変換結果をダウンロード"],
        faq: [
          { q: "なぜ MP3 を WAV に変換するのですか？", a: "WAV は非圧縮形式で、音声編集、音楽制作、ロスレスオーディオを必要とするプロのワークフローに不可欠です。" },
        ],
      },
      ru: {
        title: "Конвертировать MP3 в WAV — бесплатно, онлайн | NadoTools",
        description: "Конвертируйте аудиофайлы MP3 в WAV бесплатно. Без загрузки на сервер — файлы остаются в браузере.",
        h1: "Конвертировать MP3 в WAV",
        howItWorks: ["Перетащите файл MP3", "Браузер конвертирует в WAV", "Скачайте результат"],
        faq: [
          { q: "Зачем конвертировать MP3 в WAV?", a: "WAV — несжатый формат, необходимый для редактирования аудио, музыкального производства и профессиональных задач, требующих звук без потерь." },
        ],
      },
    },
  },

  // ── Image conversions ──────────────────────────────────────────────────────

  "heic-to-jpg": {
    slug: "heic-to-jpg",
    from: formats.heic,
    to: formats.jpg,
    engine: "canvas",
    seo: {
      en: {
        title: "Convert HEIC to JPG — Free, Online | NadoTools",
        description: "Convert iPhone HEIC photos to JPG for free. No upload, files stay in your browser.",
        h1: "Convert HEIC to JPG",
        howItWorks: ["Drop your HEIC file", "Browser converts to JPG", "Download the result"],
        faq: [
          { q: "Why are my iPhone photos in HEIC format?", a: "Apple uses HEIC by default because it produces smaller files than JPG at the same quality. However, HEIC isn't widely supported outside Apple devices." },
          { q: "Will the image quality be affected?", a: "The conversion preserves the original quality. JPG is saved at high quality (95%) by default." },
        ],
      },
      es: {
        title: "Convertir HEIC a JPG gratis y en linea | NadoTools",
        description: "Convierte fotos HEIC del iPhone a JPG gratis. Sin subir archivos, todo se procesa en tu navegador.",
        h1: "Convertir HEIC a JPG",
        howItWorks: ["Arrastra tu archivo HEIC", "El navegador lo convierte a JPG", "Descarga el resultado"],
        faq: [
          { q: "Por que mis fotos del iPhone estan en formato HEIC?", a: "Apple usa HEIC por defecto porque genera archivos mas pequenos que JPG con la misma calidad. Sin embargo, HEIC no es ampliamente compatible fuera de dispositivos Apple." },
          { q: "Se vera afectada la calidad de la imagen?", a: "La conversion conserva la calidad original. El JPG se guarda con alta calidad (95%) por defecto." },
        ],
      },
      de: {
        title: "HEIC in JPG umwandeln — kostenlos, online | NadoTools",
        description: "iPhone-HEIC-Fotos kostenlos in JPG umwandeln. Kein Upload, Dateien bleiben im Browser.",
        h1: "HEIC in JPG umwandeln",
        howItWorks: ["HEIC-Datei hierher ziehen", "Der Browser wandelt in JPG um", "Ergebnis herunterladen"],
        faq: [
          { q: "Warum sind meine iPhone-Fotos im HEIC-Format?", a: "Apple verwendet HEIC standardmaessig, da es bei gleicher Qualitaet kleinere Dateien erzeugt als JPG. HEIC wird jedoch ausserhalb von Apple-Geraeten kaum unterstuetzt." },
          { q: "Wird die Bildqualitaet beeinflusst?", a: "Die Konvertierung bewahrt die Originalqualitaet. JPG wird standardmaessig in hoher Qualitaet (95 %) gespeichert." },
        ],
      },
      fr: {
        title: "Convertir HEIC en JPG — gratuit, en ligne | NadoTools",
        description: "Convertissez vos photos iPhone HEIC en JPG gratuitement. Aucun envoi de fichier, tout reste dans votre navigateur.",
        h1: "Convertir HEIC en JPG",
        howItWorks: ["Deposez votre fichier HEIC", "Le navigateur convertit en JPG", "Telechargez le resultat"],
        faq: [
          { q: "Pourquoi mes photos iPhone sont-elles en HEIC ?", a: "Apple utilise HEIC par defaut car il produit des fichiers plus petits que JPG a qualite egale. Cependant, HEIC n'est pas largement pris en charge en dehors des appareils Apple." },
          { q: "La qualite de l'image sera-t-elle affectee ?", a: "La conversion preserve la qualite originale. Le JPG est enregistre en haute qualite (95 %) par defaut." },
        ],
      },
      pt: {
        title: "Converter HEIC para JPG — gratis, online | NadoTools",
        description: "Converta fotos HEIC do iPhone para JPG gratuitamente. Sem upload, os arquivos permanecem no seu navegador.",
        h1: "Converter HEIC para JPG",
        howItWorks: ["Solte seu arquivo HEIC", "O navegador converte para JPG", "Baixe o resultado"],
        faq: [
          { q: "Por que minhas fotos do iPhone estao em formato HEIC?", a: "A Apple usa HEIC por padrao porque gera arquivos menores que JPG com a mesma qualidade. Porem, HEIC nao e amplamente compativel fora dos dispositivos Apple." },
          { q: "A qualidade da imagem sera afetada?", a: "A conversao preserva a qualidade original. O JPG e salvo em alta qualidade (95%) por padrao." },
        ],
      },
      zh: {
        title: "HEIC 转 JPG — 免费在线转换 | NadoTools",
        description: "免费将 iPhone HEIC 照片转换为 JPG。无需上传，文件始终保留在浏览器中。",
        h1: "HEIC 转换为 JPG",
        howItWorks: ["拖入你的 HEIC 文件", "浏览器自动转换为 JPG", "下载转换结果"],
        faq: [
          { q: "为什么我的 iPhone 照片是 HEIC 格式？", a: "Apple 默认使用 HEIC 是因为它在相同画质下文件更小。但 HEIC 在非 Apple 设备上的兼容性较差。" },
          { q: "图片质量会受影响吗？", a: "转换会保留原始画质。JPG 默认以高质量（95%）保存。" },
        ],
      },
      ja: {
        title: "HEIC を JPG に変換 — 無料・オンライン | NadoTools",
        description: "iPhone の HEIC 写真を無料で JPG に変換。アップロード不要、ファイルはブラウザ内で処理されます。",
        h1: "HEIC を JPG に変換",
        howItWorks: ["HEIC ファイルをドロップ", "ブラウザが JPG に変換", "変換結果をダウンロード"],
        faq: [
          { q: "なぜ iPhone の写真は HEIC 形式なのですか？", a: "Apple は同じ画質でファイルサイズが小さくなるため、デフォルトで HEIC を使用しています。ただし、HEIC は Apple デバイス以外ではあまりサポートされていません。" },
          { q: "画質は影響を受けますか？", a: "変換では元の画質が保持されます。JPG はデフォルトで高品質（95%）で保存されます。" },
        ],
      },
      ru: {
        title: "Конвертировать HEIC в JPG — бесплатно, онлайн | NadoTools",
        description: "Конвертируйте фотографии iPhone HEIC в JPG бесплатно. Без загрузки на сервер — файлы остаются в браузере.",
        h1: "Конвертировать HEIC в JPG",
        howItWorks: ["Перетащите файл HEIC", "Браузер конвертирует в JPG", "Скачайте результат"],
        faq: [
          { q: "Почему мои фото с iPhone в формате HEIC?", a: "Apple использует HEIC по умолчанию, так как он создает файлы меньшего размера при том же качестве. Однако HEIC плохо поддерживается за пределами устройств Apple." },
          { q: "Пострадает ли качество изображения?", a: "Конвертация сохраняет исходное качество. JPG сохраняется в высоком качестве (95%) по умолчанию." },
        ],
      },
    },
  },

  "webp-to-png": {
    slug: "webp-to-png",
    from: formats.webp,
    to: formats.png,
    engine: "canvas",
    seo: {
      en: {
        title: "Convert WebP to PNG — Free, Online | NadoTools",
        description: "Convert WebP images to PNG for free. No upload, files stay in your browser.",
        h1: "Convert WebP to PNG",
        howItWorks: ["Drop your WebP file", "Browser converts to PNG", "Download the result"],
        faq: [
          { q: "Why convert WebP to PNG?", a: "PNG is universally supported and preserves transparency. Some older apps and platforms don't support WebP." },
        ],
      },
      es: {
        title: "Convertir WebP a PNG gratis y en linea | NadoTools",
        description: "Convierte imagenes WebP a PNG gratis. Sin subir archivos, todo se procesa en tu navegador.",
        h1: "Convertir WebP a PNG",
        howItWorks: ["Arrastra tu archivo WebP", "El navegador lo convierte a PNG", "Descarga el resultado"],
        faq: [
          { q: "Por que convertir WebP a PNG?", a: "PNG es universalmente compatible y conserva la transparencia. Algunas aplicaciones y plataformas antiguas no soportan WebP." },
        ],
      },
      de: {
        title: "WebP in PNG umwandeln — kostenlos, online | NadoTools",
        description: "WebP-Bilder kostenlos in PNG umwandeln. Kein Upload, Dateien bleiben im Browser.",
        h1: "WebP in PNG umwandeln",
        howItWorks: ["WebP-Datei hierher ziehen", "Der Browser wandelt in PNG um", "Ergebnis herunterladen"],
        faq: [
          { q: "Warum WebP in PNG umwandeln?", a: "PNG wird universell unterstuetzt und bewahrt Transparenz. Einige aeltere Anwendungen und Plattformen unterstuetzen kein WebP." },
        ],
      },
      fr: {
        title: "Convertir WebP en PNG — gratuit, en ligne | NadoTools",
        description: "Convertissez vos images WebP en PNG gratuitement. Aucun envoi de fichier, tout reste dans votre navigateur.",
        h1: "Convertir WebP en PNG",
        howItWorks: ["Deposez votre fichier WebP", "Le navigateur convertit en PNG", "Telechargez le resultat"],
        faq: [
          { q: "Pourquoi convertir WebP en PNG ?", a: "PNG est universellement pris en charge et preserve la transparence. Certaines applications et plateformes plus anciennes ne prennent pas en charge WebP." },
        ],
      },
      pt: {
        title: "Converter WebP para PNG — gratis, online | NadoTools",
        description: "Converta imagens WebP para PNG gratuitamente. Sem upload, os arquivos permanecem no seu navegador.",
        h1: "Converter WebP para PNG",
        howItWorks: ["Solte seu arquivo WebP", "O navegador converte para PNG", "Baixe o resultado"],
        faq: [
          { q: "Por que converter WebP para PNG?", a: "PNG e universalmente compativel e preserva transparencia. Alguns aplicativos e plataformas mais antigos nao suportam WebP." },
        ],
      },
      zh: {
        title: "WebP 转 PNG — 免费在线转换 | NadoTools",
        description: "免费将 WebP 图片转换为 PNG。无需上传，文件始终保留在浏览器中。",
        h1: "WebP 转换为 PNG",
        howItWorks: ["拖入你的 WebP 文件", "浏览器自动转换为 PNG", "下载转换结果"],
        faq: [
          { q: "为什么要将 WebP 转换为 PNG？", a: "PNG 具有通用兼容性并保留透明度。一些较旧的应用和平台不支持 WebP。" },
        ],
      },
      ja: {
        title: "WebP を PNG に変換 — 無料・オンライン | NadoTools",
        description: "WebP 画像を無料で PNG に変換。アップロード不要、ファイルはブラウザ内で処理されます。",
        h1: "WebP を PNG に変換",
        howItWorks: ["WebP ファイルをドロップ", "ブラウザが PNG に変換", "変換結果をダウンロード"],
        faq: [
          { q: "なぜ WebP を PNG に変換するのですか？", a: "PNG はあらゆる環境でサポートされ、透過も保持されます。一部の古いアプリやプラットフォームは WebP に対応していません。" },
        ],
      },
      ru: {
        title: "Конвертировать WebP в PNG — бесплатно, онлайн | NadoTools",
        description: "Конвертируйте изображения WebP в PNG бесплатно. Без загрузки на сервер — файлы остаются в браузере.",
        h1: "Конвертировать WebP в PNG",
        howItWorks: ["Перетащите файл WebP", "Браузер конвертирует в PNG", "Скачайте результат"],
        faq: [
          { q: "Зачем конвертировать WebP в PNG?", a: "PNG поддерживается повсеместно и сохраняет прозрачность. Некоторые старые приложения и платформы не поддерживают WebP." },
        ],
      },
    },
  },

  "png-to-jpg": {
    slug: "png-to-jpg",
    from: formats.png,
    to: formats.jpg,
    engine: "canvas",
    seo: {
      en: {
        title: "Convert PNG to JPG — Free, Online | NadoTools",
        description: "Convert PNG images to JPG for free. No upload, files stay in your browser.",
        h1: "Convert PNG to JPG",
        howItWorks: ["Drop your PNG file", "Browser converts to JPG", "Download the result"],
        faq: [
          { q: "Will the file size be smaller?", a: "Yes, JPG typically produces significantly smaller files than PNG, especially for photographs. The trade-off is that JPG doesn't support transparency." },
        ],
      },
      es: {
        title: "Convertir PNG a JPG gratis y en linea | NadoTools",
        description: "Convierte imagenes PNG a JPG gratis. Sin subir archivos, todo se procesa en tu navegador.",
        h1: "Convertir PNG a JPG",
        howItWorks: ["Arrastra tu archivo PNG", "El navegador lo convierte a JPG", "Descarga el resultado"],
        faq: [
          { q: "El archivo sera mas pequeno?", a: "Si, JPG suele generar archivos significativamente mas pequenos que PNG, especialmente para fotografias. A cambio, JPG no soporta transparencia." },
        ],
      },
      de: {
        title: "PNG in JPG umwandeln — kostenlos, online | NadoTools",
        description: "PNG-Bilder kostenlos in JPG umwandeln. Kein Upload, Dateien bleiben im Browser.",
        h1: "PNG in JPG umwandeln",
        howItWorks: ["PNG-Datei hierher ziehen", "Der Browser wandelt in JPG um", "Ergebnis herunterladen"],
        faq: [
          { q: "Wird die Datei kleiner?", a: "Ja, JPG erzeugt in der Regel deutlich kleinere Dateien als PNG, besonders bei Fotos. Der Nachteil ist, dass JPG keine Transparenz unterstuetzt." },
        ],
      },
      fr: {
        title: "Convertir PNG en JPG — gratuit, en ligne | NadoTools",
        description: "Convertissez vos images PNG en JPG gratuitement. Aucun envoi de fichier, tout reste dans votre navigateur.",
        h1: "Convertir PNG en JPG",
        howItWorks: ["Deposez votre fichier PNG", "Le navigateur convertit en JPG", "Telechargez le resultat"],
        faq: [
          { q: "Le fichier sera-t-il plus petit ?", a: "Oui, JPG produit generalement des fichiers nettement plus petits que PNG, surtout pour les photographies. En contrepartie, JPG ne prend pas en charge la transparence." },
        ],
      },
      pt: {
        title: "Converter PNG para JPG — gratis, online | NadoTools",
        description: "Converta imagens PNG para JPG gratuitamente. Sem upload, os arquivos permanecem no seu navegador.",
        h1: "Converter PNG para JPG",
        howItWorks: ["Solte seu arquivo PNG", "O navegador converte para JPG", "Baixe o resultado"],
        faq: [
          { q: "O arquivo ficara menor?", a: "Sim, JPG geralmente produz arquivos significativamente menores que PNG, especialmente para fotografias. Em contrapartida, JPG nao suporta transparencia." },
        ],
      },
      zh: {
        title: "PNG 转 JPG — 免费在线转换 | NadoTools",
        description: "免费将 PNG 图片转换为 JPG。无需上传，文件始终保留在浏览器中。",
        h1: "PNG 转换为 JPG",
        howItWorks: ["拖入你的 PNG 文件", "浏览器自动转换为 JPG", "下载转换结果"],
        faq: [
          { q: "文件会变小吗？", a: "是的，JPG 通常比 PNG 文件小很多，特别是照片类图片。缺点是 JPG 不支持透明度。" },
        ],
      },
      ja: {
        title: "PNG を JPG に変換 — 無料・オンライン | NadoTools",
        description: "PNG 画像を無料で JPG に変換。アップロード不要、ファイルはブラウザ内で処理されます。",
        h1: "PNG を JPG に変換",
        howItWorks: ["PNG ファイルをドロップ", "ブラウザが JPG に変換", "変換結果をダウンロード"],
        faq: [
          { q: "ファイルサイズは小さくなりますか？", a: "はい、JPG は特に写真の場合、PNG よりも大幅に小さいファイルを生成します。ただし、JPG は透過をサポートしていません。" },
        ],
      },
      ru: {
        title: "Конвертировать PNG в JPG — бесплатно, онлайн | NadoTools",
        description: "Конвертируйте изображения PNG в JPG бесплатно. Без загрузки на сервер — файлы остаются в браузере.",
        h1: "Конвертировать PNG в JPG",
        howItWorks: ["Перетащите файл PNG", "Браузер конвертирует в JPG", "Скачайте результат"],
        faq: [
          { q: "Файл станет меньше?", a: "Да, JPG обычно создает значительно меньшие файлы, чем PNG, особенно для фотографий. Компромисс в том, что JPG не поддерживает прозрачность." },
        ],
      },
    },
  },

  "jpg-to-webp": {
    slug: "jpg-to-webp",
    from: formats.jpg,
    to: formats.webp,
    engine: "canvas",
    seo: {
      en: {
        title: "Convert JPG to WebP — Free, Online | NadoTools",
        description: "Convert JPG images to WebP for free. Smaller files, same quality. No upload, files stay in your browser.",
        h1: "Convert JPG to WebP",
        howItWorks: ["Drop your JPG file", "Browser converts to WebP", "Download the result"],
        faq: [
          { q: "How much smaller will WebP be?", a: "WebP typically achieves 25-35% smaller file sizes compared to JPG at equivalent visual quality, making it ideal for web use." },
        ],
      },
      es: {
        title: "Convertir JPG a WebP gratis y en linea | NadoTools",
        description: "Convierte imagenes JPG a WebP gratis. Archivos mas pequenos, misma calidad. Sin subir archivos, todo en tu navegador.",
        h1: "Convertir JPG a WebP",
        howItWorks: ["Arrastra tu archivo JPG", "El navegador lo convierte a WebP", "Descarga el resultado"],
        faq: [
          { q: "Cuanto mas pequeno sera el WebP?", a: "WebP suele lograr archivos un 25-35% mas pequenos que JPG con calidad visual equivalente, ideal para uso web." },
        ],
      },
      de: {
        title: "JPG in WebP umwandeln — kostenlos, online | NadoTools",
        description: "JPG-Bilder kostenlos in WebP umwandeln. Kleinere Dateien bei gleicher Qualitaet. Kein Upload, alles im Browser.",
        h1: "JPG in WebP umwandeln",
        howItWorks: ["JPG-Datei hierher ziehen", "Der Browser wandelt in WebP um", "Ergebnis herunterladen"],
        faq: [
          { q: "Wie viel kleiner wird die WebP-Datei?", a: "WebP erreicht typischerweise 25-35 % kleinere Dateien als JPG bei vergleichbarer Bildqualitaet — ideal fuer den Einsatz im Web." },
        ],
      },
      fr: {
        title: "Convertir JPG en WebP — gratuit, en ligne | NadoTools",
        description: "Convertissez vos images JPG en WebP gratuitement. Fichiers plus legers, meme qualite. Tout reste dans votre navigateur.",
        h1: "Convertir JPG en WebP",
        howItWorks: ["Deposez votre fichier JPG", "Le navigateur convertit en WebP", "Telechargez le resultat"],
        faq: [
          { q: "Quelle sera la reduction de taille ?", a: "WebP produit generalement des fichiers 25 a 35 % plus petits que JPG a qualite visuelle equivalente, ideal pour le web." },
        ],
      },
      pt: {
        title: "Converter JPG para WebP — gratis, online | NadoTools",
        description: "Converta imagens JPG para WebP gratuitamente. Arquivos menores, mesma qualidade. Sem upload, tudo no navegador.",
        h1: "Converter JPG para WebP",
        howItWorks: ["Solte seu arquivo JPG", "O navegador converte para WebP", "Baixe o resultado"],
        faq: [
          { q: "Quanto menor sera o WebP?", a: "WebP normalmente alcanca arquivos 25-35% menores que JPG com qualidade visual equivalente, ideal para uso na web." },
        ],
      },
      zh: {
        title: "JPG 转 WebP — 免费在线转换 | NadoTools",
        description: "免费将 JPG 图片转换为 WebP。更小的文件，相同的画质。无需上传，文件保留在浏览器中。",
        h1: "JPG 转换为 WebP",
        howItWorks: ["拖入你的 JPG 文件", "浏览器自动转换为 WebP", "下载转换结果"],
        faq: [
          { q: "WebP 文件会小多少？", a: "在同等视觉质量下，WebP 通常比 JPG 小 25-35%，非常适合网页使用。" },
        ],
      },
      ja: {
        title: "JPG を WebP に変換 — 無料・オンライン | NadoTools",
        description: "JPG 画像を無料で WebP に変換。小さいファイル、同じ品質。アップロード不要、ブラウザ内で処理。",
        h1: "JPG を WebP に変換",
        howItWorks: ["JPG ファイルをドロップ", "ブラウザが WebP に変換", "変換結果をダウンロード"],
        faq: [
          { q: "WebP はどれくらい小さくなりますか？", a: "WebP は同等の画質で JPG より通常 25〜35% 小さいファイルサイズを実現し、ウェブ用途に最適です。" },
        ],
      },
      ru: {
        title: "Конвертировать JPG в WebP — бесплатно, онлайн | NadoTools",
        description: "Конвертируйте изображения JPG в WebP бесплатно. Меньше файл, то же качество. Без загрузки на сервер.",
        h1: "Конвертировать JPG в WebP",
        howItWorks: ["Перетащите файл JPG", "Браузер конвертирует в WebP", "Скачайте результат"],
        faq: [
          { q: "Насколько меньше будет файл WebP?", a: "WebP обычно на 25-35% меньше JPG при сопоставимом визуальном качестве, что идеально для использования в вебе." },
        ],
      },
    },
  },

  "svg-to-png": {
    slug: "svg-to-png",
    from: formats.svg,
    to: formats.png,
    engine: "canvas",
    seo: {
      en: {
        title: "Convert SVG to PNG — Free, Online | NadoTools",
        description: "Convert SVG vector graphics to PNG for free. No upload, files stay in your browser.",
        h1: "Convert SVG to PNG",
        howItWorks: ["Drop your SVG file", "Browser renders to PNG", "Download the result"],
        faq: [
          { q: "What resolution will the PNG be?", a: "The PNG is rendered at the SVG's natural dimensions. You can scale it before download if needed." },
        ],
      },
      es: {
        title: "Convertir SVG a PNG gratis y en linea | NadoTools",
        description: "Convierte graficos vectoriales SVG a PNG gratis. Sin subir archivos, todo se procesa en tu navegador.",
        h1: "Convertir SVG a PNG",
        howItWorks: ["Arrastra tu archivo SVG", "El navegador lo renderiza a PNG", "Descarga el resultado"],
        faq: [
          { q: "Que resolucion tendra el PNG?", a: "El PNG se genera con las dimensiones naturales del SVG. Puedes escalarlo antes de descargarlo si lo necesitas." },
        ],
      },
      de: {
        title: "SVG in PNG umwandeln — kostenlos, online | NadoTools",
        description: "SVG-Vektorgrafiken kostenlos in PNG umwandeln. Kein Upload, Dateien bleiben im Browser.",
        h1: "SVG in PNG umwandeln",
        howItWorks: ["SVG-Datei hierher ziehen", "Der Browser rendert als PNG", "Ergebnis herunterladen"],
        faq: [
          { q: "In welcher Aufloesung wird das PNG erstellt?", a: "Das PNG wird in den natuerlichen Abmessungen des SVG gerendert. Bei Bedarf koennen Sie es vor dem Download skalieren." },
        ],
      },
      fr: {
        title: "Convertir SVG en PNG — gratuit, en ligne | NadoTools",
        description: "Convertissez vos graphiques vectoriels SVG en PNG gratuitement. Aucun envoi de fichier, tout reste dans votre navigateur.",
        h1: "Convertir SVG en PNG",
        howItWorks: ["Deposez votre fichier SVG", "Le navigateur effectue le rendu en PNG", "Telechargez le resultat"],
        faq: [
          { q: "Quelle sera la resolution du PNG ?", a: "Le PNG est genere aux dimensions naturelles du SVG. Vous pouvez le redimensionner avant le telechargement si necessaire." },
        ],
      },
      pt: {
        title: "Converter SVG para PNG — gratis, online | NadoTools",
        description: "Converta graficos vetoriais SVG para PNG gratuitamente. Sem upload, os arquivos permanecem no seu navegador.",
        h1: "Converter SVG para PNG",
        howItWorks: ["Solte seu arquivo SVG", "O navegador renderiza em PNG", "Baixe o resultado"],
        faq: [
          { q: "Qual sera a resolucao do PNG?", a: "O PNG e renderizado nas dimensoes naturais do SVG. Voce pode redimensiona-lo antes de baixar, se necessario." },
        ],
      },
      zh: {
        title: "SVG 转 PNG — 免费在线转换 | NadoTools",
        description: "免费将 SVG 矢量图形转换为 PNG。无需上传，文件始终保留在浏览器中。",
        h1: "SVG 转换为 PNG",
        howItWorks: ["拖入你的 SVG 文件", "浏览器自动渲染为 PNG", "下载转换结果"],
        faq: [
          { q: "PNG 的分辨率是多少？", a: "PNG 按照 SVG 的原始尺寸渲染。如有需要，可以在下载前进行缩放。" },
        ],
      },
      ja: {
        title: "SVG を PNG に変換 — 無料・オンライン | NadoTools",
        description: "SVG ベクターグラフィックスを無料で PNG に変換。アップロード不要、ファイルはブラウザ内で処理されます。",
        h1: "SVG を PNG に変換",
        howItWorks: ["SVG ファイルをドロップ", "ブラウザが PNG にレンダリング", "変換結果をダウンロード"],
        faq: [
          { q: "PNG の解像度はどうなりますか？", a: "PNG は SVG の元のサイズでレンダリングされます。必要に応じてダウンロード前にスケールを変更できます。" },
        ],
      },
      ru: {
        title: "Конвертировать SVG в PNG — бесплатно, онлайн | NadoTools",
        description: "Конвертируйте векторную графику SVG в PNG бесплатно. Без загрузки на сервер — файлы остаются в браузере.",
        h1: "Конвертировать SVG в PNG",
        howItWorks: ["Перетащите файл SVG", "Браузер рендерит в PNG", "Скачайте результат"],
        faq: [
          { q: "Какое будет разрешение у PNG?", a: "PNG рендерится в исходных размерах SVG. При необходимости вы можете масштабировать его перед скачиванием." },
        ],
      },
    },
  },

  // ── Document conversions ───────────────────────────────────────────────────

  "pdf-to-word": {
    slug: "pdf-to-word",
    from: formats.pdf,
    to: formats.word,
    engine: "pdf",
    seo: {
      en: {
        title: "Convert PDF to Word — Free, Online | NadoTools",
        description: "Convert PDF documents to editable Word files for free. No upload, files stay in your browser.",
        h1: "Convert PDF to Word",
        howItWorks: ["Drop your PDF file", "Browser converts to Word format", "Download the DOCX file"],
        faq: [
          { q: "Will the formatting be preserved?", a: "The converter does its best to maintain layout, fonts, and formatting. Complex layouts may require minor adjustments." },
          { q: "Can I convert scanned PDFs?", a: "This tool works best with text-based PDFs. Scanned image-based PDFs may not convert accurately without OCR." },
        ],
      },
      es: {
        title: "Convertir PDF a Word gratis y en linea | NadoTools",
        description: "Convierte documentos PDF a archivos Word editables gratis. Sin subir archivos, todo se procesa en tu navegador.",
        h1: "Convertir PDF a Word",
        howItWorks: ["Arrastra tu archivo PDF", "El navegador lo convierte a formato Word", "Descarga el archivo DOCX"],
        faq: [
          { q: "Se conservara el formato?", a: "El convertidor hace lo posible por mantener el diseno, fuentes y formato. Los disenos complejos pueden requerir ajustes menores." },
          { q: "Puedo convertir PDFs escaneados?", a: "Esta herramienta funciona mejor con PDFs basados en texto. Los PDFs escaneados pueden no convertirse con precision sin OCR." },
        ],
      },
      de: {
        title: "PDF in Word umwandeln — kostenlos, online | NadoTools",
        description: "PDF-Dokumente kostenlos in bearbeitbare Word-Dateien umwandeln. Kein Upload, Dateien bleiben im Browser.",
        h1: "PDF in Word umwandeln",
        howItWorks: ["PDF-Datei hierher ziehen", "Der Browser wandelt ins Word-Format um", "DOCX-Datei herunterladen"],
        faq: [
          { q: "Bleibt die Formatierung erhalten?", a: "Der Konverter bemuecht sich, Layout, Schriftarten und Formatierung beizubehalten. Komplexe Layouts erfordern moeglicherweise kleinere Anpassungen." },
          { q: "Kann ich gescannte PDFs konvertieren?", a: "Dieses Tool funktioniert am besten mit textbasierten PDFs. Gescannte, bildbasierte PDFs lassen sich ohne OCR moeglicherweise nicht korrekt konvertieren." },
        ],
      },
      fr: {
        title: "Convertir PDF en Word — gratuit, en ligne | NadoTools",
        description: "Convertissez vos documents PDF en fichiers Word modifiables gratuitement. Aucun envoi de fichier, tout reste dans votre navigateur.",
        h1: "Convertir PDF en Word",
        howItWorks: ["Deposez votre fichier PDF", "Le navigateur convertit au format Word", "Telechargez le fichier DOCX"],
        faq: [
          { q: "La mise en forme sera-t-elle conservee ?", a: "Le convertisseur fait de son mieux pour conserver la mise en page, les polices et le formatage. Les mises en page complexes peuvent necessiter de legers ajustements." },
          { q: "Puis-je convertir des PDF scannes ?", a: "Cet outil fonctionne mieux avec les PDF bases sur du texte. Les PDF scannes (images) peuvent ne pas etre convertis correctement sans OCR." },
        ],
      },
      pt: {
        title: "Converter PDF para Word — gratis, online | NadoTools",
        description: "Converta documentos PDF para arquivos Word editaveis gratuitamente. Sem upload, os arquivos permanecem no seu navegador.",
        h1: "Converter PDF para Word",
        howItWorks: ["Solte seu arquivo PDF", "O navegador converte para formato Word", "Baixe o arquivo DOCX"],
        faq: [
          { q: "A formatacao sera preservada?", a: "O conversor faz o melhor possivel para manter layout, fontes e formatacao. Layouts complexos podem exigir pequenos ajustes." },
          { q: "Posso converter PDFs digitalizados?", a: "Esta ferramenta funciona melhor com PDFs baseados em texto. PDFs digitalizados (imagens) podem nao ser convertidos com precisao sem OCR." },
        ],
      },
      zh: {
        title: "PDF 转 Word — 免费在线转换 | NadoTools",
        description: "免费将 PDF 文档转换为可编辑的 Word 文件。无需上传，文件始终保留在浏览器中。",
        h1: "PDF 转换为 Word",
        howItWorks: ["拖入你的 PDF 文件", "浏览器转换为 Word 格式", "下载 DOCX 文件"],
        faq: [
          { q: "格式会保留吗？", a: "转换器会尽力保持排版、字体和格式。复杂排版可能需要微调。" },
          { q: "可以转换扫描版 PDF 吗？", a: "此工具对文字型 PDF 效果最佳。扫描的图片型 PDF 在没有 OCR 的情况下可能无法准确转换。" },
        ],
      },
      ja: {
        title: "PDF を Word に変換 — 無料・オンライン | NadoTools",
        description: "PDF ドキュメントを無料で編集可能な Word ファイルに変換。アップロード不要、ファイルはブラウザ内で処理されます。",
        h1: "PDF を Word に変換",
        howItWorks: ["PDF ファイルをドロップ", "ブラウザが Word 形式に変換", "DOCX ファイルをダウンロード"],
        faq: [
          { q: "書式は保持されますか？", a: "コンバーターはレイアウト、フォント、書式をできる限り維持します。複雑なレイアウトは若干の調整が必要な場合があります。" },
          { q: "スキャンした PDF も変換できますか？", a: "このツールはテキストベースの PDF に最適です。画像ベースのスキャン PDF は OCR なしでは正確に変換できない場合があります。" },
        ],
      },
      ru: {
        title: "Конвертировать PDF в Word — бесплатно, онлайн | NadoTools",
        description: "Конвертируйте PDF-документы в редактируемые файлы Word бесплатно. Без загрузки на сервер — файлы остаются в браузере.",
        h1: "Конвертировать PDF в Word",
        howItWorks: ["Перетащите файл PDF", "Браузер конвертирует в формат Word", "Скачайте файл DOCX"],
        faq: [
          { q: "Сохранится ли форматирование?", a: "Конвертер старается сохранить макет, шрифты и форматирование. Сложные макеты могут потребовать незначительных правок." },
          { q: "Можно ли конвертировать отсканированные PDF?", a: "Этот инструмент лучше всего работает с текстовыми PDF. Отсканированные PDF-изображения могут конвертироваться неточно без OCR." },
        ],
      },
    },
  },

  "word-to-pdf": {
    slug: "word-to-pdf",
    from: formats.word,
    to: formats.pdf,
    engine: "pdf",
    seo: {
      en: {
        title: "Convert Word to PDF — Free, Online | NadoTools",
        description: "Convert Word documents to PDF for free. No upload, files stay in your browser.",
        h1: "Convert Word to PDF",
        howItWorks: ["Drop your Word file", "Browser converts to PDF", "Download the result"],
        faq: [
          { q: "Will my formatting be preserved?", a: "Yes, the converter maintains your document's layout, fonts, and images when creating the PDF." },
        ],
      },
      es: {
        title: "Convertir Word a PDF gratis y en linea | NadoTools",
        description: "Convierte documentos Word a PDF gratis. Sin subir archivos, todo se procesa en tu navegador.",
        h1: "Convertir Word a PDF",
        howItWorks: ["Arrastra tu archivo Word", "El navegador lo convierte a PDF", "Descarga el resultado"],
        faq: [
          { q: "Se conservara mi formato?", a: "Si, el convertidor mantiene el diseno, fuentes e imagenes de tu documento al crear el PDF." },
        ],
      },
      de: {
        title: "Word in PDF umwandeln — kostenlos, online | NadoTools",
        description: "Word-Dokumente kostenlos in PDF umwandeln. Kein Upload, Dateien bleiben im Browser.",
        h1: "Word in PDF umwandeln",
        howItWorks: ["Word-Datei hierher ziehen", "Der Browser wandelt in PDF um", "Ergebnis herunterladen"],
        faq: [
          { q: "Bleibt meine Formatierung erhalten?", a: "Ja, der Konverter uebernimmt das Layout, die Schriften und Bilder Ihres Dokuments bei der Erstellung des PDF." },
        ],
      },
      fr: {
        title: "Convertir Word en PDF — gratuit, en ligne | NadoTools",
        description: "Convertissez vos documents Word en PDF gratuitement. Aucun envoi de fichier, tout reste dans votre navigateur.",
        h1: "Convertir Word en PDF",
        howItWorks: ["Deposez votre fichier Word", "Le navigateur convertit en PDF", "Telechargez le resultat"],
        faq: [
          { q: "Ma mise en forme sera-t-elle conservee ?", a: "Oui, le convertisseur preserve la mise en page, les polices et les images de votre document lors de la creation du PDF." },
        ],
      },
      pt: {
        title: "Converter Word para PDF — gratis, online | NadoTools",
        description: "Converta documentos Word para PDF gratuitamente. Sem upload, os arquivos permanecem no seu navegador.",
        h1: "Converter Word para PDF",
        howItWorks: ["Solte seu arquivo Word", "O navegador converte para PDF", "Baixe o resultado"],
        faq: [
          { q: "Minha formatacao sera preservada?", a: "Sim, o conversor mantem o layout, fontes e imagens do seu documento ao criar o PDF." },
        ],
      },
      zh: {
        title: "Word 转 PDF — 免费在线转换 | NadoTools",
        description: "免费将 Word 文档转换为 PDF。无需上传，文件始终保留在浏览器中。",
        h1: "Word 转换为 PDF",
        howItWorks: ["拖入你的 Word 文件", "浏览器自动转换为 PDF", "下载转换结果"],
        faq: [
          { q: "格式会保留吗？", a: "是的，转换器在生成 PDF 时会保持文档的排版、字体和图片。" },
        ],
      },
      ja: {
        title: "Word を PDF に変換 — 無料・オンライン | NadoTools",
        description: "Word ドキュメントを無料で PDF に変換。アップロード不要、ファイルはブラウザ内で処理されます。",
        h1: "Word を PDF に変換",
        howItWorks: ["Word ファイルをドロップ", "ブラウザが PDF に変換", "変換結果をダウンロード"],
        faq: [
          { q: "書式は保持されますか？", a: "はい、コンバーターは PDF 作成時にドキュメントのレイアウト、フォント、画像を維持します。" },
        ],
      },
      ru: {
        title: "Конвертировать Word в PDF — бесплатно, онлайн | NadoTools",
        description: "Конвертируйте документы Word в PDF бесплатно. Без загрузки на сервер — файлы остаются в браузере.",
        h1: "Конвертировать Word в PDF",
        howItWorks: ["Перетащите файл Word", "Браузер конвертирует в PDF", "Скачайте результат"],
        faq: [
          { q: "Сохранится ли форматирование?", a: "Да, конвертер сохраняет макет, шрифты и изображения вашего документа при создании PDF." },
        ],
      },
    },
  },

  "markdown-to-html": {
    slug: "markdown-to-html",
    from: formats.markdown,
    to: formats.html,
    engine: "pandoc",
    seo: {
      en: {
        title: "Convert Markdown to HTML — Free, Online | NadoTools",
        description: "Convert Markdown files to HTML for free. No upload, files stay in your browser.",
        h1: "Convert Markdown to HTML",
        howItWorks: ["Drop your Markdown file", "Browser converts to HTML", "Download the result"],
        faq: [],
      },
      es: {
        title: "Convertir Markdown a HTML gratis y en linea | NadoTools",
        description: "Convierte archivos Markdown a HTML gratis. Sin subir archivos, todo se procesa en tu navegador.",
        h1: "Convertir Markdown a HTML",
        howItWorks: ["Arrastra tu archivo Markdown", "El navegador lo convierte a HTML", "Descarga el resultado"],
        faq: [],
      },
      de: {
        title: "Markdown in HTML umwandeln — kostenlos, online | NadoTools",
        description: "Markdown-Dateien kostenlos in HTML umwandeln. Kein Upload, Dateien bleiben im Browser.",
        h1: "Markdown in HTML umwandeln",
        howItWorks: ["Markdown-Datei hierher ziehen", "Der Browser wandelt in HTML um", "Ergebnis herunterladen"],
        faq: [],
      },
      fr: {
        title: "Convertir Markdown en HTML — gratuit, en ligne | NadoTools",
        description: "Convertissez vos fichiers Markdown en HTML gratuitement. Aucun envoi de fichier, tout reste dans votre navigateur.",
        h1: "Convertir Markdown en HTML",
        howItWorks: ["Deposez votre fichier Markdown", "Le navigateur convertit en HTML", "Telechargez le resultat"],
        faq: [],
      },
      pt: {
        title: "Converter Markdown para HTML — gratis, online | NadoTools",
        description: "Converta arquivos Markdown para HTML gratuitamente. Sem upload, os arquivos permanecem no seu navegador.",
        h1: "Converter Markdown para HTML",
        howItWorks: ["Solte seu arquivo Markdown", "O navegador converte para HTML", "Baixe o resultado"],
        faq: [],
      },
      zh: {
        title: "Markdown 转 HTML — 免费在线转换 | NadoTools",
        description: "免费将 Markdown 文件转换为 HTML。无需上传，文件始终保留在浏览器中。",
        h1: "Markdown 转换为 HTML",
        howItWorks: ["拖入你的 Markdown 文件", "浏览器自动转换为 HTML", "下载转换结果"],
        faq: [],
      },
      ja: {
        title: "Markdown を HTML に変換 — 無料・オンライン | NadoTools",
        description: "Markdown ファイルを無料で HTML に変換。アップロード不要、ファイルはブラウザ内で処理されます。",
        h1: "Markdown を HTML に変換",
        howItWorks: ["Markdown ファイルをドロップ", "ブラウザが HTML に変換", "変換結果をダウンロード"],
        faq: [],
      },
      ru: {
        title: "Конвертировать Markdown в HTML — бесплатно, онлайн | NadoTools",
        description: "Конвертируйте файлы Markdown в HTML бесплатно. Без загрузки на сервер — файлы остаются в браузере.",
        h1: "Конвертировать Markdown в HTML",
        howItWorks: ["Перетащите файл Markdown", "Браузер конвертирует в HTML", "Скачайте результат"],
        faq: [],
      },
    },
  },
};

// ─── Lookup helpers ────────────────────────────────────────────────────────────

export function getConversion(slug: string): ConversionConfig | undefined {
  return conversions[slug];
}

export function getAllConversionSlugs(): string[] {
  return Object.keys(conversions);
}

export function getConversionsByType(
  type: "video" | "audio" | "image" | "document",
): ConversionConfig[] {
  return Object.values(conversions).filter(
    (c) => c.from.type === type || c.to.type === type,
  );
}
