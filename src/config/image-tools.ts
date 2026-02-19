import type { ToolConfig } from "./types";

// ─── Image tools registry ──────────────────────────────────────────────────────

export const imageTools: Record<string, ToolConfig> = {
  "remove-bg": {
    id: "remove-bg",
    category: "image",
    icon: "Eraser",
    engine: "canvas",
    acceptedTypes: ["image/png", "image/jpeg", "image/webp"],
    maxFileSize: 50 * 1024 * 1024, // 50 MB
    seo: {
      en: {
        title: "Remove Image Background — Free, Online | NadoTools",
        description: "Remove backgrounds from images for free. No upload, files stay in your browser.",
        h1: "Remove Image Background",
        howItWorks: ["Drop your image", "The background is detected and removed locally", "Download the transparent PNG"],
        faq: [
          { q: "What types of images work best?", a: "Photos with a clear subject and distinct background work best. Complex scenes with similar colors may need manual touch-up." },
          { q: "Is there a file size limit?", a: "Files up to 50 MB are supported. Since processing runs locally, larger images take longer on slower devices." },
        ],
      },
      es: {
        title: "Eliminar fondo de imagen gratis y en linea | NadoTools",
        description: "Elimina fondos de imagenes gratis. Sin subir archivos, todo se procesa en tu navegador.",
        h1: "Eliminar fondo de imagen",
        howItWorks: ["Arrastra tu imagen", "El fondo se detecta y elimina localmente", "Descarga el PNG transparente"],
        faq: [
          { q: "Que tipo de imagenes funcionan mejor?", a: "Las fotos con un sujeto claro y fondo diferenciado funcionan mejor. Escenas complejas con colores similares pueden necesitar retoques manuales." },
          { q: "Hay limite de tamano de archivo?", a: "Se admiten archivos de hasta 50 MB. Como el procesamiento es local, las imagenes grandes tardan mas en dispositivos lentos." },
        ],
      },
      de: {
        title: "Bildhintergrund entfernen — kostenlos, online | NadoTools",
        description: "Bildhintergruende kostenlos entfernen. Kein Upload, Dateien bleiben im Browser.",
        h1: "Bildhintergrund entfernen",
        howItWorks: ["Bild hierher ziehen", "Der Hintergrund wird lokal erkannt und entfernt", "Transparentes PNG herunterladen"],
        faq: [
          { q: "Welche Bilder funktionieren am besten?", a: "Fotos mit einem klaren Motiv und deutlich abgegrenztem Hintergrund funktionieren am besten. Komplexe Szenen mit aehnlichen Farben erfordern moeglicherweise manuelle Nachbearbeitung." },
          { q: "Gibt es ein Dateigroessenlimit?", a: "Dateien bis 50 MB werden unterstuetzt. Da die Verarbeitung lokal erfolgt, dauert es bei groesseren Bildern auf langsameren Geraeten laenger." },
        ],
      },
      fr: {
        title: "Supprimer l'arriere-plan d'une image — gratuit, en ligne | NadoTools",
        description: "Supprimez les arriere-plans de vos images gratuitement. Aucun envoi de fichier, tout reste dans votre navigateur.",
        h1: "Supprimer l'arriere-plan d'une image",
        howItWorks: ["Deposez votre image", "L'arriere-plan est detecte et supprime localement", "Telechargez le PNG transparent"],
        faq: [
          { q: "Quels types d'images fonctionnent le mieux ?", a: "Les photos avec un sujet net et un arriere-plan distinct donnent les meilleurs resultats. Les scenes complexes aux couleurs similaires peuvent necessiter des retouches manuelles." },
          { q: "Y a-t-il une limite de taille de fichier ?", a: "Les fichiers jusqu'a 50 Mo sont pris en charge. Le traitement etant local, les grandes images prennent plus de temps sur les appareils lents." },
        ],
      },
      pt: {
        title: "Remover fundo de imagem — gratis, online | NadoTools",
        description: "Remova fundos de imagens gratuitamente. Sem upload, os arquivos permanecem no seu navegador.",
        h1: "Remover fundo de imagem",
        howItWorks: ["Solte sua imagem", "O fundo e detectado e removido localmente", "Baixe o PNG transparente"],
        faq: [
          { q: "Que tipo de imagens funciona melhor?", a: "Fotos com um sujeito claro e fundo distinto funcionam melhor. Cenas complexas com cores semelhantes podem precisar de retoques manuais." },
          { q: "Existe limite de tamanho de arquivo?", a: "Arquivos de ate 50 MB sao suportados. Como o processamento e local, imagens maiores demoram mais em dispositivos lentos." },
        ],
      },
      zh: {
        title: "移除图片背景 — 免费在线工具 | NadoTools",
        description: "免费移除图片背景。无需上传，文件始终保留在浏览器中。",
        h1: "移除图片背景",
        howItWorks: ["拖入你的图片", "浏览器自动检测并移除背景", "下载透明 PNG"],
        faq: [
          { q: "哪些类型的图片效果最好？", a: "主体清晰、背景分明的照片效果最佳。颜色相近的复杂场景可能需要手动调整。" },
          { q: "文件大小有限制吗？", a: "支持最大 50 MB 的文件。由于在本地处理，较大的图片在性能较低的设备上需要更长时间。" },
        ],
      },
      ja: {
        title: "画像の背景を削除 — 無料・オンライン | NadoTools",
        description: "画像の背景を無料で削除。アップロード不要、ファイルはブラウザ内で処理されます。",
        h1: "画像の背景を削除",
        howItWorks: ["画像をドロップ", "背景がローカルで検出・削除されます", "透過 PNG をダウンロード"],
        faq: [
          { q: "どのような画像が最適ですか？", a: "被写体がはっきりしていて背景と区別しやすい写真が最適です。色が似た複雑なシーンは手動での調整が必要な場合があります。" },
          { q: "ファイルサイズの制限はありますか？", a: "50 MB までのファイルに対応しています。処理はローカルで実行されるため、大きな画像は低速なデバイスでは時間がかかります。" },
        ],
      },
      ru: {
        title: "Удалить фон изображения — бесплатно, онлайн | NadoTools",
        description: "Удалите фон с изображений бесплатно. Без загрузки на сервер — файлы остаются в браузере.",
        h1: "Удалить фон изображения",
        howItWorks: ["Перетащите изображение", "Фон определяется и удаляется локально", "Скачайте прозрачный PNG"],
        faq: [
          { q: "Какие изображения подходят лучше всего?", a: "Фотографии с четким объектом и контрастным фоном дают лучшие результаты. Сложные сцены с похожими цветами могут потребовать ручной доработки." },
          { q: "Есть ли ограничение на размер файла?", a: "Поддерживаются файлы до 50 МБ. Поскольку обработка выполняется локально, большие изображения обрабатываются дольше на медленных устройствах." },
        ],
      },
    },
  },

  resize: {
    id: "resize",
    category: "image",
    icon: "Maximize",
    engine: "canvas",
    acceptedTypes: ["image/png", "image/jpeg", "image/webp", "image/gif"],
    seo: {
      en: {
        title: "Resize Image — Free, Online | NadoTools",
        description: "Resize images to any dimension for free. No upload, files stay in your browser.",
        h1: "Resize Image",
        howItWorks: ["Drop your image", "Set the desired dimensions", "Download the resized image"],
        faq: [
          { q: "Can I maintain the aspect ratio?", a: "Yes, aspect ratio is locked by default. You can unlock it to set custom width and height independently." },
        ],
      },
      es: {
        title: "Redimensionar imagen gratis y en linea | NadoTools",
        description: "Redimensiona imagenes a cualquier tamano gratis. Sin subir archivos, todo se procesa en tu navegador.",
        h1: "Redimensionar imagen",
        howItWorks: ["Arrastra tu imagen", "Establece las dimensiones deseadas", "Descarga la imagen redimensionada"],
        faq: [
          { q: "Puedo mantener la relacion de aspecto?", a: "Si, la relacion de aspecto esta bloqueada por defecto. Puedes desbloquearla para establecer ancho y alto de forma independiente." },
        ],
      },
      de: {
        title: "Bild skalieren — kostenlos, online | NadoTools",
        description: "Bilder kostenlos auf beliebige Masse skalieren. Kein Upload, Dateien bleiben im Browser.",
        h1: "Bild skalieren",
        howItWorks: ["Bild hierher ziehen", "Gewuenschte Abmessungen festlegen", "Skaliertes Bild herunterladen"],
        faq: [
          { q: "Kann ich das Seitenverhaeltnis beibehalten?", a: "Ja, das Seitenverhaeltnis ist standardmaessig gesperrt. Sie koennen es entsperren, um Breite und Hoehe unabhaengig festzulegen." },
        ],
      },
      fr: {
        title: "Redimensionner une image — gratuit, en ligne | NadoTools",
        description: "Redimensionnez vos images aux dimensions souhaitees gratuitement. Aucun envoi de fichier, tout reste dans votre navigateur.",
        h1: "Redimensionner une image",
        howItWorks: ["Deposez votre image", "Definissez les dimensions souhaitees", "Telechargez l'image redimensionnee"],
        faq: [
          { q: "Puis-je conserver le rapport d'aspect ?", a: "Oui, le rapport d'aspect est verrouille par defaut. Vous pouvez le deverrouiller pour definir largeur et hauteur independamment." },
        ],
      },
      pt: {
        title: "Redimensionar imagem — gratis, online | NadoTools",
        description: "Redimensione imagens para qualquer dimensao gratuitamente. Sem upload, os arquivos permanecem no seu navegador.",
        h1: "Redimensionar imagem",
        howItWorks: ["Solte sua imagem", "Defina as dimensoes desejadas", "Baixe a imagem redimensionada"],
        faq: [
          { q: "Posso manter a proporcao?", a: "Sim, a proporcao e travada por padrao. Voce pode destrava-la para definir largura e altura independentemente." },
        ],
      },
      zh: {
        title: "调整图片大小 — 免费在线工具 | NadoTools",
        description: "免费将图片调整为任意尺寸。无需上传，文件始终保留在浏览器中。",
        h1: "调整图片大小",
        howItWorks: ["拖入你的图片", "设置所需尺寸", "下载调整后的图片"],
        faq: [
          { q: "可以保持宽高比吗？", a: "可以，默认锁定宽高比。你也可以解锁，分别设置宽度和高度。" },
        ],
      },
      ja: {
        title: "画像をリサイズ — 無料・オンライン | NadoTools",
        description: "画像を任意のサイズに無料でリサイズ。アップロード不要、ファイルはブラウザ内で処理されます。",
        h1: "画像をリサイズ",
        howItWorks: ["画像をドロップ", "希望のサイズを設定", "リサイズされた画像をダウンロード"],
        faq: [
          { q: "アスペクト比を維持できますか？", a: "はい、デフォルトでアスペクト比はロックされています。ロックを解除すれば幅と高さを個別に設定できます。" },
        ],
      },
      ru: {
        title: "Изменить размер изображения — бесплатно, онлайн | NadoTools",
        description: "Измените размер изображений до любых размеров бесплатно. Без загрузки на сервер — файлы остаются в браузере.",
        h1: "Изменить размер изображения",
        howItWorks: ["Перетащите изображение", "Задайте нужные размеры", "Скачайте изображение с новым размером"],
        faq: [
          { q: "Можно ли сохранить пропорции?", a: "Да, соотношение сторон заблокировано по умолчанию. Вы можете разблокировать его, чтобы задать ширину и высоту независимо." },
        ],
      },
    },
  },

  compress: {
    id: "compress",
    category: "image",
    icon: "FileDown",
    engine: "canvas",
    acceptedTypes: ["image/png", "image/jpeg", "image/webp"],
    seo: {
      en: {
        title: "Compress Image — Free, Online | NadoTools",
        description: "Reduce image file size without visible quality loss for free. No upload, files stay in your browser.",
        h1: "Compress Image",
        howItWorks: ["Drop your image", "Adjust the quality slider", "Download the compressed image"],
        faq: [
          { q: "How much smaller will the image be?", a: "Results vary by image type. Photos can often be compressed 60-80% with minimal visible quality loss. PNGs with few colors see the biggest reductions." },
        ],
      },
      es: {
        title: "Comprimir imagen gratis y en linea | NadoTools",
        description: "Reduce el tamano de imagenes sin perdida de calidad visible gratis. Sin subir archivos, todo en tu navegador.",
        h1: "Comprimir imagen",
        howItWorks: ["Arrastra tu imagen", "Ajusta el control de calidad", "Descarga la imagen comprimida"],
        faq: [
          { q: "Cuanto se reducira el tamano de la imagen?", a: "Los resultados varian segun el tipo de imagen. Las fotos suelen comprimirse un 60-80% con perdida de calidad minima. Los PNG con pocos colores se reducen mas." },
        ],
      },
      de: {
        title: "Bild komprimieren — kostenlos, online | NadoTools",
        description: "Bilddateigroesse ohne sichtbaren Qualitaetsverlust kostenlos reduzieren. Kein Upload, Dateien bleiben im Browser.",
        h1: "Bild komprimieren",
        howItWorks: ["Bild hierher ziehen", "Qualitaetsregler anpassen", "Komprimiertes Bild herunterladen"],
        faq: [
          { q: "Wie viel kleiner wird das Bild?", a: "Die Ergebnisse variieren je nach Bildtyp. Fotos lassen sich oft um 60-80 % komprimieren, ohne sichtbaren Qualitaetsverlust. PNGs mit wenigen Farben profitieren am meisten." },
        ],
      },
      fr: {
        title: "Compresser une image — gratuit, en ligne | NadoTools",
        description: "Reduisez la taille de vos images sans perte de qualite visible gratuitement. Aucun envoi de fichier, tout reste dans votre navigateur.",
        h1: "Compresser une image",
        howItWorks: ["Deposez votre image", "Ajustez le curseur de qualite", "Telechargez l'image compressee"],
        faq: [
          { q: "De combien la taille de l'image sera-t-elle reduite ?", a: "Les resultats varient selon le type d'image. Les photos peuvent souvent etre compressees de 60 a 80 % avec une perte de qualite minimale. Les PNG avec peu de couleurs beneficient des plus grandes reductions." },
        ],
      },
      pt: {
        title: "Comprimir imagem — gratis, online | NadoTools",
        description: "Reduza o tamanho de imagens sem perda de qualidade visivel gratuitamente. Sem upload, tudo no navegador.",
        h1: "Comprimir imagem",
        howItWorks: ["Solte sua imagem", "Ajuste o controle de qualidade", "Baixe a imagem comprimida"],
        faq: [
          { q: "Quanto a imagem ficara menor?", a: "Os resultados variam por tipo de imagem. Fotos podem ser comprimidas em 60-80% com perda de qualidade minima. PNGs com poucas cores tem as maiores reducoes." },
        ],
      },
      zh: {
        title: "压缩图片 — 免费在线工具 | NadoTools",
        description: "免费减小图片文件大小，无明显画质损失。无需上传，文件始终保留在浏览器中。",
        h1: "压缩图片",
        howItWorks: ["拖入你的图片", "调整质量滑块", "下载压缩后的图片"],
        faq: [
          { q: "图片会小多少？", a: "结果因图片类型而异。照片通常可压缩 60-80%，几乎看不出画质损失。颜色较少的 PNG 压缩效果最明显。" },
        ],
      },
      ja: {
        title: "画像を圧縮 — 無料・オンライン | NadoTools",
        description: "画像のファイルサイズを無料で削減。見た目の品質劣化なし。アップロード不要、ブラウザ内で処理。",
        h1: "画像を圧縮",
        howItWorks: ["画像をドロップ", "品質スライダーを調整", "圧縮された画像をダウンロード"],
        faq: [
          { q: "画像はどれくらい小さくなりますか？", a: "結果は画像の種類によって異なります。写真は多くの場合、見た目の劣化をほとんど感じずに 60〜80% 圧縮できます。色数の少ない PNG は最も効果的です。" },
        ],
      },
      ru: {
        title: "Сжать изображение — бесплатно, онлайн | NadoTools",
        description: "Уменьшите размер изображений без видимой потери качества бесплатно. Без загрузки на сервер — файлы остаются в браузере.",
        h1: "Сжать изображение",
        howItWorks: ["Перетащите изображение", "Настройте ползунок качества", "Скачайте сжатое изображение"],
        faq: [
          { q: "Насколько уменьшится изображение?", a: "Результаты зависят от типа изображения. Фотографии часто можно сжать на 60-80% с минимальной видимой потерей качества. PNG с небольшим количеством цветов сжимаются лучше всего." },
        ],
      },
    },
  },

  "strip-metadata": {
    id: "strip-metadata",
    category: "image",
    icon: "ShieldOff",
    engine: "canvas",
    acceptedTypes: ["image/png", "image/jpeg", "image/webp", "image/tiff"],
    seo: {
      en: {
        title: "Strip Image Metadata — Free, Online | NadoTools",
        description: "Remove EXIF and metadata from images for free. Protect your privacy before sharing photos online. No upload, files stay in your browser.",
        h1: "Strip Image Metadata",
        howItWorks: ["Drop your image", "Browser removes all metadata", "Download the clean image"],
        faq: [
          { q: "What metadata is removed?", a: "All EXIF data is stripped, including GPS location, camera model, date taken, and software information. The image pixels remain untouched." },
        ],
      },
      es: {
        title: "Eliminar metadatos de imagen gratis y en linea | NadoTools",
        description: "Elimina datos EXIF y metadatos de imagenes gratis. Protege tu privacidad antes de compartir fotos. Sin subir archivos, todo en tu navegador.",
        h1: "Eliminar metadatos de imagen",
        howItWorks: ["Arrastra tu imagen", "El navegador elimina todos los metadatos", "Descarga la imagen limpia"],
        faq: [
          { q: "Que metadatos se eliminan?", a: "Se eliminan todos los datos EXIF, incluyendo ubicacion GPS, modelo de camara, fecha de captura e informacion del software. Los pixeles de la imagen no se modifican." },
        ],
      },
      de: {
        title: "Bild-Metadaten entfernen — kostenlos, online | NadoTools",
        description: "EXIF-Daten und Metadaten aus Bildern kostenlos entfernen. Schuetzen Sie Ihre Privatsphaere, bevor Sie Fotos online teilen. Kein Upload, alles im Browser.",
        h1: "Bild-Metadaten entfernen",
        howItWorks: ["Bild hierher ziehen", "Der Browser entfernt alle Metadaten", "Bereinigtes Bild herunterladen"],
        faq: [
          { q: "Welche Metadaten werden entfernt?", a: "Alle EXIF-Daten werden entfernt, einschliesslich GPS-Standort, Kameramodell, Aufnahmedatum und Software-Informationen. Die Bildpixel bleiben unveraendert." },
        ],
      },
      fr: {
        title: "Supprimer les metadonnees d'une image — gratuit, en ligne | NadoTools",
        description: "Supprimez les donnees EXIF et metadonnees de vos images gratuitement. Protegez votre vie privee avant de partager des photos. Tout reste dans votre navigateur.",
        h1: "Supprimer les metadonnees d'une image",
        howItWorks: ["Deposez votre image", "Le navigateur supprime toutes les metadonnees", "Telechargez l'image nettoyee"],
        faq: [
          { q: "Quelles metadonnees sont supprimees ?", a: "Toutes les donnees EXIF sont supprimees, y compris la localisation GPS, le modele d'appareil photo, la date de prise de vue et les informations logicielles. Les pixels de l'image restent intacts." },
        ],
      },
      pt: {
        title: "Remover metadados de imagem — gratis, online | NadoTools",
        description: "Remova dados EXIF e metadados de imagens gratuitamente. Proteja sua privacidade antes de compartilhar fotos. Sem upload, tudo no navegador.",
        h1: "Remover metadados de imagem",
        howItWorks: ["Solte sua imagem", "O navegador remove todos os metadados", "Baixe a imagem limpa"],
        faq: [
          { q: "Quais metadados sao removidos?", a: "Todos os dados EXIF sao removidos, incluindo localizacao GPS, modelo da camera, data da captura e informacoes de software. Os pixels da imagem permanecem intactos." },
        ],
      },
      zh: {
        title: "删除图片元数据 — 免费在线工具 | NadoTools",
        description: "免费移除图片中的 EXIF 和元数据。在分享照片前保护隐私。无需上传，文件保留在浏览器中。",
        h1: "删除图片元数据",
        howItWorks: ["拖入你的图片", "浏览器移除所有元数据", "下载干净的图片"],
        faq: [
          { q: "会删除哪些元数据？", a: "所有 EXIF 数据都会被清除，包括 GPS 位置、相机型号、拍摄日期和软件信息。图片像素内容不受影响。" },
        ],
      },
      ja: {
        title: "画像のメタデータを削除 — 無料・オンライン | NadoTools",
        description: "画像から EXIF やメタデータを無料で削除。写真を共有する前にプライバシーを保護。アップロード不要、ブラウザ内で処理。",
        h1: "画像のメタデータを削除",
        howItWorks: ["画像をドロップ", "ブラウザがすべてのメタデータを削除", "クリーンな画像をダウンロード"],
        faq: [
          { q: "どのメタデータが削除されますか？", a: "GPS 位置情報、カメラモデル、撮影日時、ソフトウェア情報など、すべての EXIF データが削除されます。画像のピクセルには影響しません。" },
        ],
      },
      ru: {
        title: "Удалить метаданные изображения — бесплатно, онлайн | NadoTools",
        description: "Удалите EXIF и метаданные из изображений бесплатно. Защитите конфиденциальность перед публикацией фотографий. Без загрузки на сервер — файлы остаются в браузере.",
        h1: "Удалить метаданные изображения",
        howItWorks: ["Перетащите изображение", "Браузер удаляет все метаданные", "Скачайте очищенное изображение"],
        faq: [
          { q: "Какие метаданные удаляются?", a: "Удаляются все данные EXIF, включая GPS-координаты, модель камеры, дату съемки и информацию о программном обеспечении. Пиксели изображения остаются нетронутыми." },
        ],
      },
    },
  },
};

// ─── Lookup helpers ────────────────────────────────────────────────────────────

export function getImageTool(id: string): ToolConfig | undefined {
  return imageTools[id];
}

export function getAllImageToolIds(): string[] {
  return Object.keys(imageTools);
}
