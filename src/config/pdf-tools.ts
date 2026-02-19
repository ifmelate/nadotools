import type { ToolConfig } from "./types";

// ─── PDF tools registry ────────────────────────────────────────────────────────

export const pdfTools: Record<string, ToolConfig> = {
  merge: {
    id: "merge",
    category: "pdf",
    icon: "Combine",
    engine: "pdf-lib",
    acceptedTypes: ["application/pdf"],
    seo: {
      en: {
        title: "Merge PDF Files — Free, Online | NadoTools",
        description: "Combine multiple PDF files into one document for free. No upload, files stay in your browser.",
        h1: "Merge PDF Files",
        howItWorks: ["Drop your PDF files", "Drag to reorder pages", "Download the merged PDF"],
        faq: [
          { q: "Is there a limit on how many PDFs I can merge?", a: "There's no hard limit. Since everything runs in your browser, you can merge as many as your device's memory allows." },
          { q: "Will the page order be preserved?", a: "Yes, pages are merged in the order you arrange them. You can drag to reorder before merging." },
        ],
      },
      es: {
        title: "Unir archivos PDF gratis y en linea | NadoTools",
        description: "Combina varios archivos PDF en un solo documento gratis. Sin subir archivos, todo se procesa en tu navegador.",
        h1: "Unir archivos PDF",
        howItWorks: ["Arrastra tus archivos PDF", "Reordena las paginas arrastrando", "Descarga el PDF unido"],
        faq: [
          { q: "Hay limite en la cantidad de PDFs que puedo unir?", a: "No hay un limite estricto. Como todo se ejecuta en tu navegador, puedes unir tantos como permita la memoria de tu dispositivo." },
          { q: "Se conservara el orden de las paginas?", a: "Si, las paginas se unen en el orden que establezcas. Puedes arrastrar para reordenar antes de unir." },
        ],
      },
      de: {
        title: "PDF-Dateien zusammenfuegen — kostenlos, online | NadoTools",
        description: "Mehrere PDF-Dateien kostenlos zu einem Dokument zusammenfuegen. Kein Upload, Dateien bleiben im Browser.",
        h1: "PDF-Dateien zusammenfuegen",
        howItWorks: ["PDF-Dateien hierher ziehen", "Seiten per Drag & Drop sortieren", "Zusammengefuegtes PDF herunterladen"],
        faq: [
          { q: "Gibt es ein Limit fuer die Anzahl der PDFs?", a: "Es gibt kein festes Limit. Da alles im Browser laeuft, koennen Sie so viele zusammenfuegen, wie der Arbeitsspeicher Ihres Geraets erlaubt." },
          { q: "Bleibt die Seitenreihenfolge erhalten?", a: "Ja, die Seiten werden in der von Ihnen festgelegten Reihenfolge zusammengefuegt. Sie koennen vor dem Zusammenfuegen die Reihenfolge per Drag & Drop aendern." },
        ],
      },
      fr: {
        title: "Fusionner des fichiers PDF — gratuit, en ligne | NadoTools",
        description: "Combinez plusieurs fichiers PDF en un seul document gratuitement. Aucun envoi de fichier, tout reste dans votre navigateur.",
        h1: "Fusionner des fichiers PDF",
        howItWorks: ["Deposez vos fichiers PDF", "Reorganisez les pages par glisser-deposer", "Telechargez le PDF fusionne"],
        faq: [
          { q: "Y a-t-il une limite au nombre de PDF a fusionner ?", a: "Il n'y a pas de limite stricte. Comme tout s'execute dans votre navigateur, vous pouvez en fusionner autant que la memoire de votre appareil le permet." },
          { q: "L'ordre des pages sera-t-il conserve ?", a: "Oui, les pages sont fusionnees dans l'ordre que vous definissez. Vous pouvez reorganiser avant de fusionner." },
        ],
      },
      pt: {
        title: "Juntar arquivos PDF — gratis, online | NadoTools",
        description: "Combine varios arquivos PDF em um unico documento gratuitamente. Sem upload, os arquivos permanecem no seu navegador.",
        h1: "Juntar arquivos PDF",
        howItWorks: ["Solte seus arquivos PDF", "Arraste para reordenar as paginas", "Baixe o PDF combinado"],
        faq: [
          { q: "Existe limite de quantos PDFs posso juntar?", a: "Nao ha limite rigido. Como tudo e processado no navegador, voce pode juntar quantos a memoria do seu dispositivo permitir." },
          { q: "A ordem das paginas sera preservada?", a: "Sim, as paginas sao combinadas na ordem que voce definir. Voce pode arrastar para reordenar antes de juntar." },
        ],
      },
      zh: {
        title: "合并 PDF 文件 — 免费在线工具 | NadoTools",
        description: "免费将多个 PDF 文件合并为一个文档。无需上传，文件始终保留在浏览器中。",
        h1: "合并 PDF 文件",
        howItWorks: ["拖入你的 PDF 文件", "拖拽调整页面顺序", "下载合并后的 PDF"],
        faq: [
          { q: "合并的 PDF 数量有限制吗？", a: "没有硬性限制。由于完全在浏览器中运行，你可以合并设备内存允许的任意数量。" },
          { q: "页面顺序会保留吗？", a: "是的，页面按照你排列的顺序合并。合并前你可以拖拽调整顺序。" },
        ],
      },
      ja: {
        title: "PDF ファイルを結合 — 無料・オンライン | NadoTools",
        description: "複数の PDF ファイルを無料で 1 つのドキュメントに結合。アップロード不要、ファイルはブラウザ内で処理されます。",
        h1: "PDF ファイルを結合",
        howItWorks: ["PDF ファイルをドロップ", "ドラッグしてページを並び替え", "結合された PDF をダウンロード"],
        faq: [
          { q: "結合できる PDF の数に制限はありますか？", a: "厳密な制限はありません。すべてブラウザ内で処理されるため、デバイスのメモリが許す限り結合できます。" },
          { q: "ページの順序は保持されますか？", a: "はい、指定した順序でページが結合されます。結合前にドラッグして並び替えることができます。" },
        ],
      },
      ru: {
        title: "Объединить PDF-файлы — бесплатно, онлайн | NadoTools",
        description: "Объедините несколько PDF-файлов в один документ бесплатно. Без загрузки на сервер — файлы остаются в браузере.",
        h1: "Объединить PDF-файлы",
        howItWorks: ["Перетащите файлы PDF", "Перетаскивайте для изменения порядка страниц", "Скачайте объединенный PDF"],
        faq: [
          { q: "Есть ли ограничение на количество PDF?", a: "Жесткого ограничения нет. Поскольку всё выполняется в браузере, вы можете объединить столько файлов, сколько позволяет память устройства." },
          { q: "Сохранится ли порядок страниц?", a: "Да, страницы объединяются в заданном вами порядке. Перед объединением вы можете изменить порядок перетаскиванием." },
        ],
      },
    },
  },

  split: {
    id: "split",
    category: "pdf",
    icon: "Scissors",
    engine: "pdf-lib",
    acceptedTypes: ["application/pdf"],
    seo: {
      en: {
        title: "Split PDF — Free, Online | NadoTools",
        description: "Split a PDF into separate pages or sections for free. No upload, files stay in your browser.",
        h1: "Split PDF",
        howItWorks: ["Drop your PDF file", "Select pages or ranges to extract", "Download the split files"],
        faq: [
          { q: "Can I extract specific pages?", a: "Yes, you can select individual pages or page ranges to extract into separate PDFs." },
        ],
      },
      es: {
        title: "Dividir PDF gratis y en linea | NadoTools",
        description: "Divide un PDF en paginas o secciones separadas gratis. Sin subir archivos, todo se procesa en tu navegador.",
        h1: "Dividir PDF",
        howItWorks: ["Arrastra tu archivo PDF", "Selecciona las paginas o rangos a extraer", "Descarga los archivos divididos"],
        faq: [
          { q: "Puedo extraer paginas especificas?", a: "Si, puedes seleccionar paginas individuales o rangos de paginas para extraerlos en PDFs separados." },
        ],
      },
      de: {
        title: "PDF aufteilen — kostenlos, online | NadoTools",
        description: "Ein PDF kostenlos in einzelne Seiten oder Abschnitte aufteilen. Kein Upload, Dateien bleiben im Browser.",
        h1: "PDF aufteilen",
        howItWorks: ["PDF-Datei hierher ziehen", "Seiten oder Seitenbereiche auswaehlen", "Aufgeteilte Dateien herunterladen"],
        faq: [
          { q: "Kann ich bestimmte Seiten extrahieren?", a: "Ja, Sie koennen einzelne Seiten oder Seitenbereiche auswaehlen und als separate PDFs extrahieren." },
        ],
      },
      fr: {
        title: "Diviser un PDF — gratuit, en ligne | NadoTools",
        description: "Divisez un PDF en pages ou sections distinctes gratuitement. Aucun envoi de fichier, tout reste dans votre navigateur.",
        h1: "Diviser un PDF",
        howItWorks: ["Deposez votre fichier PDF", "Selectionnez les pages ou plages a extraire", "Telechargez les fichiers divises"],
        faq: [
          { q: "Puis-je extraire des pages specifiques ?", a: "Oui, vous pouvez selectionner des pages individuelles ou des plages de pages a extraire en PDF separes." },
        ],
      },
      pt: {
        title: "Dividir PDF — gratis, online | NadoTools",
        description: "Divida um PDF em paginas ou secoes separadas gratuitamente. Sem upload, os arquivos permanecem no seu navegador.",
        h1: "Dividir PDF",
        howItWorks: ["Solte seu arquivo PDF", "Selecione as paginas ou intervalos para extrair", "Baixe os arquivos divididos"],
        faq: [
          { q: "Posso extrair paginas especificas?", a: "Sim, voce pode selecionar paginas individuais ou intervalos de paginas para extrair em PDFs separados." },
        ],
      },
      zh: {
        title: "拆分 PDF — 免费在线工具 | NadoTools",
        description: "免费将 PDF 拆分为单独的页面或部分。无需上传，文件始终保留在浏览器中。",
        h1: "拆分 PDF",
        howItWorks: ["拖入你的 PDF 文件", "选择要提取的页面或范围", "下载拆分后的文件"],
        faq: [
          { q: "可以提取特定页面吗？", a: "可以，你可以选择单个页面或页面范围，提取为单独的 PDF 文件。" },
        ],
      },
      ja: {
        title: "PDF を分割 — 無料・オンライン | NadoTools",
        description: "PDF を無料でページごとやセクションごとに分割。アップロード不要、ファイルはブラウザ内で処理されます。",
        h1: "PDF を分割",
        howItWorks: ["PDF ファイルをドロップ", "抽出するページまたは範囲を選択", "分割されたファイルをダウンロード"],
        faq: [
          { q: "特定のページを抽出できますか？", a: "はい、個々のページまたはページ範囲を選択して、個別の PDF として抽出できます。" },
        ],
      },
      ru: {
        title: "Разделить PDF — бесплатно, онлайн | NadoTools",
        description: "Разделите PDF на отдельные страницы или разделы бесплатно. Без загрузки на сервер — файлы остаются в браузере.",
        h1: "Разделить PDF",
        howItWorks: ["Перетащите файл PDF", "Выберите страницы или диапазоны для извлечения", "Скачайте разделенные файлы"],
        faq: [
          { q: "Можно ли извлечь определенные страницы?", a: "Да, вы можете выбрать отдельные страницы или диапазоны и извлечь их в отдельные PDF-файлы." },
        ],
      },
    },
  },

  compress: {
    id: "compress",
    category: "pdf",
    icon: "FileDown",
    engine: "pdf-lib",
    acceptedTypes: ["application/pdf"],
    seo: {
      en: {
        title: "Compress PDF — Free, Online | NadoTools",
        description: "Reduce PDF file size for free. No upload, files stay in your browser.",
        h1: "Compress PDF",
        howItWorks: ["Drop your PDF file", "Browser compresses the PDF", "Download the smaller file"],
        faq: [
          { q: "How much will the file size be reduced?", a: "Compression results vary depending on the PDF content. Files with large images typically see the biggest reductions, often 50-80% smaller." },
        ],
      },
      es: {
        title: "Comprimir PDF gratis y en linea | NadoTools",
        description: "Reduce el tamano de archivos PDF gratis. Sin subir archivos, todo se procesa en tu navegador.",
        h1: "Comprimir PDF",
        howItWorks: ["Arrastra tu archivo PDF", "El navegador comprime el PDF", "Descarga el archivo mas pequeno"],
        faq: [
          { q: "Cuanto se reducira el tamano del archivo?", a: "Los resultados varian segun el contenido del PDF. Los archivos con imagenes grandes suelen tener las mayores reducciones, a menudo un 50-80% mas pequenos." },
        ],
      },
      de: {
        title: "PDF komprimieren — kostenlos, online | NadoTools",
        description: "PDF-Dateigroesse kostenlos reduzieren. Kein Upload, Dateien bleiben im Browser.",
        h1: "PDF komprimieren",
        howItWorks: ["PDF-Datei hierher ziehen", "Der Browser komprimiert das PDF", "Kleinere Datei herunterladen"],
        faq: [
          { q: "Wie stark wird die Datei verkleinert?", a: "Die Komprimierung haengt vom PDF-Inhalt ab. Dateien mit grossen Bildern profitieren am meisten — oft 50-80 % kleiner." },
        ],
      },
      fr: {
        title: "Compresser un PDF — gratuit, en ligne | NadoTools",
        description: "Reduisez la taille de vos fichiers PDF gratuitement. Aucun envoi de fichier, tout reste dans votre navigateur.",
        h1: "Compresser un PDF",
        howItWorks: ["Deposez votre fichier PDF", "Le navigateur compresse le PDF", "Telechargez le fichier reduit"],
        faq: [
          { q: "De combien la taille sera-t-elle reduite ?", a: "Les resultats varient selon le contenu du PDF. Les fichiers contenant de grandes images voient generalement les plus fortes reductions, souvent 50 a 80 % plus petits." },
        ],
      },
      pt: {
        title: "Comprimir PDF — gratis, online | NadoTools",
        description: "Reduza o tamanho de arquivos PDF gratuitamente. Sem upload, os arquivos permanecem no seu navegador.",
        h1: "Comprimir PDF",
        howItWorks: ["Solte seu arquivo PDF", "O navegador comprime o PDF", "Baixe o arquivo menor"],
        faq: [
          { q: "Quanto o tamanho do arquivo sera reduzido?", a: "Os resultados variam conforme o conteudo do PDF. Arquivos com imagens grandes costumam ter as maiores reducoes, frequentemente 50-80% menores." },
        ],
      },
      zh: {
        title: "压缩 PDF — 免费在线工具 | NadoTools",
        description: "免费减小 PDF 文件大小。无需上传，文件始终保留在浏览器中。",
        h1: "压缩 PDF",
        howItWorks: ["拖入你的 PDF 文件", "浏览器自动压缩 PDF", "下载压缩后的文件"],
        faq: [
          { q: "文件大小能减小多少？", a: "压缩效果取决于 PDF 内容。包含大量图片的文件通常压缩效果最明显，往往可缩小 50-80%。" },
        ],
      },
      ja: {
        title: "PDF を圧縮 — 無料・オンライン | NadoTools",
        description: "PDF のファイルサイズを無料で削減。アップロード不要、ファイルはブラウザ内で処理されます。",
        h1: "PDF を圧縮",
        howItWorks: ["PDF ファイルをドロップ", "ブラウザが PDF を圧縮", "小さくなったファイルをダウンロード"],
        faq: [
          { q: "ファイルサイズはどれくらい小さくなりますか？", a: "圧縮結果は PDF の内容によって異なります。大きな画像を含むファイルは最も効果が高く、50〜80% 小さくなることが多いです。" },
        ],
      },
      ru: {
        title: "Сжать PDF — бесплатно, онлайн | NadoTools",
        description: "Уменьшите размер PDF-файла бесплатно. Без загрузки на сервер — файлы остаются в браузере.",
        h1: "Сжать PDF",
        howItWorks: ["Перетащите файл PDF", "Браузер сжимает PDF", "Скачайте уменьшенный файл"],
        faq: [
          { q: "Насколько уменьшится размер файла?", a: "Результаты зависят от содержимого PDF. Файлы с большими изображениями обычно сжимаются лучше всего — часто на 50-80%." },
        ],
      },
    },
  },

  "to-image": {
    id: "to-image",
    category: "pdf",
    icon: "Image",
    engine: "pdf-lib",
    acceptedTypes: ["application/pdf"],
    seo: {
      en: {
        title: "PDF to Image — Free, Online | NadoTools",
        description: "Convert PDF pages to images (PNG/JPG) for free. No upload, files stay in your browser.",
        h1: "PDF to Image",
        howItWorks: ["Drop your PDF file", "Each page is rendered as an image", "Download all images"],
        faq: [
          { q: "What image formats are supported?", a: "Pages can be exported as PNG for lossless quality or JPG for smaller file sizes." },
        ],
      },
      es: {
        title: "PDF a imagen gratis y en linea | NadoTools",
        description: "Convierte paginas de PDF a imagenes (PNG/JPG) gratis. Sin subir archivos, todo se procesa en tu navegador.",
        h1: "PDF a imagen",
        howItWorks: ["Arrastra tu archivo PDF", "Cada pagina se renderiza como imagen", "Descarga todas las imagenes"],
        faq: [
          { q: "Que formatos de imagen se soportan?", a: "Las paginas se pueden exportar como PNG para calidad sin perdida o JPG para archivos mas pequenos." },
        ],
      },
      de: {
        title: "PDF in Bild umwandeln — kostenlos, online | NadoTools",
        description: "PDF-Seiten kostenlos in Bilder (PNG/JPG) umwandeln. Kein Upload, Dateien bleiben im Browser.",
        h1: "PDF in Bild umwandeln",
        howItWorks: ["PDF-Datei hierher ziehen", "Jede Seite wird als Bild gerendert", "Alle Bilder herunterladen"],
        faq: [
          { q: "Welche Bildformate werden unterstuetzt?", a: "Seiten koennen als PNG fuer verlustfreie Qualitaet oder als JPG fuer kleinere Dateien exportiert werden." },
        ],
      },
      fr: {
        title: "PDF en image — gratuit, en ligne | NadoTools",
        description: "Convertissez les pages de vos PDF en images (PNG/JPG) gratuitement. Aucun envoi de fichier, tout reste dans votre navigateur.",
        h1: "PDF en image",
        howItWorks: ["Deposez votre fichier PDF", "Chaque page est rendue sous forme d'image", "Telechargez toutes les images"],
        faq: [
          { q: "Quels formats d'image sont pris en charge ?", a: "Les pages peuvent etre exportees en PNG pour une qualite sans perte ou en JPG pour des fichiers plus legers." },
        ],
      },
      pt: {
        title: "PDF para imagem — gratis, online | NadoTools",
        description: "Converta paginas de PDF para imagens (PNG/JPG) gratuitamente. Sem upload, os arquivos permanecem no seu navegador.",
        h1: "PDF para imagem",
        howItWorks: ["Solte seu arquivo PDF", "Cada pagina e renderizada como imagem", "Baixe todas as imagens"],
        faq: [
          { q: "Quais formatos de imagem sao suportados?", a: "As paginas podem ser exportadas como PNG para qualidade sem perdas ou JPG para arquivos menores." },
        ],
      },
      zh: {
        title: "PDF 转图片 — 免费在线工具 | NadoTools",
        description: "免费将 PDF 页面转换为图片（PNG/JPG）。无需上传，文件始终保留在浏览器中。",
        h1: "PDF 转图片",
        howItWorks: ["拖入你的 PDF 文件", "每页被渲染为图片", "下载所有图片"],
        faq: [
          { q: "支持哪些图片格式？", a: "页面可以导出为 PNG（无损画质）或 JPG（更小的文件体积）。" },
        ],
      },
      ja: {
        title: "PDF を画像に変換 — 無料・オンライン | NadoTools",
        description: "PDF のページを無料で画像（PNG/JPG）に変換。アップロード不要、ファイルはブラウザ内で処理されます。",
        h1: "PDF を画像に変換",
        howItWorks: ["PDF ファイルをドロップ", "各ページが画像としてレンダリング", "すべての画像をダウンロード"],
        faq: [
          { q: "どの画像フォーマットに対応していますか？", a: "ロスレス品質の PNG またはファイルサイズが小さい JPG としてエクスポートできます。" },
        ],
      },
      ru: {
        title: "PDF в изображение — бесплатно, онлайн | NadoTools",
        description: "Конвертируйте страницы PDF в изображения (PNG/JPG) бесплатно. Без загрузки на сервер — файлы остаются в браузере.",
        h1: "PDF в изображение",
        howItWorks: ["Перетащите файл PDF", "Каждая страница рендерится как изображение", "Скачайте все изображения"],
        faq: [
          { q: "Какие форматы изображений поддерживаются?", a: "Страницы можно экспортировать в PNG для качества без потерь или в JPG для меньшего размера файлов." },
        ],
      },
    },
  },

  "extract-text": {
    id: "extract-text",
    category: "pdf",
    icon: "FileText",
    engine: "pdf-lib",
    acceptedTypes: ["application/pdf"],
    seo: {
      en: {
        title: "Extract Text from PDF — Free, Online | NadoTools",
        description: "Extract all text content from PDF documents for free. No upload, files stay in your browser.",
        h1: "Extract Text from PDF",
        howItWorks: ["Drop your PDF file", "Browser extracts all text", "Copy or download the text"],
        faq: [
          { q: "Does this work with scanned PDFs?", a: "This tool extracts embedded text. For scanned documents (images), OCR would be needed, which is not yet supported." },
        ],
      },
      es: {
        title: "Extraer texto de PDF gratis y en linea | NadoTools",
        description: "Extrae todo el contenido de texto de documentos PDF gratis. Sin subir archivos, todo se procesa en tu navegador.",
        h1: "Extraer texto de PDF",
        howItWorks: ["Arrastra tu archivo PDF", "El navegador extrae todo el texto", "Copia o descarga el texto"],
        faq: [
          { q: "Funciona con PDFs escaneados?", a: "Esta herramienta extrae texto incrustado. Para documentos escaneados (imagenes) se necesitaria OCR, que aun no esta disponible." },
        ],
      },
      de: {
        title: "Text aus PDF extrahieren — kostenlos, online | NadoTools",
        description: "Gesamten Textinhalt aus PDF-Dokumenten kostenlos extrahieren. Kein Upload, Dateien bleiben im Browser.",
        h1: "Text aus PDF extrahieren",
        howItWorks: ["PDF-Datei hierher ziehen", "Der Browser extrahiert den gesamten Text", "Text kopieren oder herunterladen"],
        faq: [
          { q: "Funktioniert das mit gescannten PDFs?", a: "Dieses Tool extrahiert eingebetteten Text. Fuer gescannte Dokumente (Bilder) waere OCR erforderlich, was noch nicht unterstuetzt wird." },
        ],
      },
      fr: {
        title: "Extraire le texte d'un PDF — gratuit, en ligne | NadoTools",
        description: "Extrayez tout le contenu textuel de vos documents PDF gratuitement. Aucun envoi de fichier, tout reste dans votre navigateur.",
        h1: "Extraire le texte d'un PDF",
        howItWorks: ["Deposez votre fichier PDF", "Le navigateur extrait tout le texte", "Copiez ou telechargez le texte"],
        faq: [
          { q: "Cela fonctionne-t-il avec les PDF scannes ?", a: "Cet outil extrait le texte integre. Pour les documents scannes (images), l'OCR serait necessaire, ce qui n'est pas encore pris en charge." },
        ],
      },
      pt: {
        title: "Extrair texto de PDF — gratis, online | NadoTools",
        description: "Extraia todo o conteudo de texto de documentos PDF gratuitamente. Sem upload, os arquivos permanecem no seu navegador.",
        h1: "Extrair texto de PDF",
        howItWorks: ["Solte seu arquivo PDF", "O navegador extrai todo o texto", "Copie ou baixe o texto"],
        faq: [
          { q: "Funciona com PDFs digitalizados?", a: "Esta ferramenta extrai texto incorporado. Para documentos digitalizados (imagens), seria necessario OCR, que ainda nao e suportado." },
        ],
      },
      zh: {
        title: "从 PDF 提取文本 — 免费在线工具 | NadoTools",
        description: "免费从 PDF 文档中提取全部文本内容。无需上传，文件始终保留在浏览器中。",
        h1: "从 PDF 提取文本",
        howItWorks: ["拖入你的 PDF 文件", "浏览器提取所有文本", "复制或下载文本"],
        faq: [
          { q: "适用于扫描版 PDF 吗？", a: "此工具提取嵌入的文本。对于扫描文档（图片），需要 OCR 功能，目前暂不支持。" },
        ],
      },
      ja: {
        title: "PDF からテキストを抽出 — 無料・オンライン | NadoTools",
        description: "PDF ドキュメントからすべてのテキストを無料で抽出。アップロード不要、ファイルはブラウザ内で処理されます。",
        h1: "PDF からテキストを抽出",
        howItWorks: ["PDF ファイルをドロップ", "ブラウザがすべてのテキストを抽出", "テキストをコピーまたはダウンロード"],
        faq: [
          { q: "スキャンした PDF でも使えますか？", a: "このツールは埋め込みテキストを抽出します。スキャンされた画像ドキュメントには OCR が必要ですが、現在はまだ対応していません。" },
        ],
      },
      ru: {
        title: "Извлечь текст из PDF — бесплатно, онлайн | NadoTools",
        description: "Извлеките весь текстовый контент из PDF-документов бесплатно. Без загрузки на сервер — файлы остаются в браузере.",
        h1: "Извлечь текст из PDF",
        howItWorks: ["Перетащите файл PDF", "Браузер извлекает весь текст", "Скопируйте или скачайте текст"],
        faq: [
          { q: "Работает ли с отсканированными PDF?", a: "Этот инструмент извлекает встроенный текст. Для отсканированных документов (изображений) потребуется OCR, который пока не поддерживается." },
        ],
      },
    },
  },
};

// ─── Lookup helpers ────────────────────────────────────────────────────────────

export function getPdfTool(id: string): ToolConfig | undefined {
  return pdfTools[id];
}

export function getAllPdfToolIds(): string[] {
  return Object.keys(pdfTools);
}
