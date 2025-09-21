#!/bin/bash

# Script de Importação do Tema Flexs OTT
# Extrai tema, remove grids proprietários e aplica Grid Master

set -e

echo "🎬 Iniciando importação do tema Flexs OTT..."

# Diretórios
THEME_ZIP="public/theme/upload.zip"
THEME_SRC="theme_src"
PUBLIC_DIR="public"
STYLES_DIR="styles"

# Verificar se o ZIP existe
if [ ! -f "$THEME_ZIP" ]; then
    echo "❌ Erro: Arquivo $THEME_ZIP não encontrado!"
    exit 1
fi

# Limpar diretório anterior se existir
if [ -d "$THEME_SRC" ]; then
    echo "🧹 Removendo tema anterior..."
    rm -rf "$THEME_SRC"
fi

# Extrair tema
echo "📦 Extraindo tema Flexs OTT..."
mkdir -p "$THEME_SRC"
cd "$THEME_SRC"
unzip -q "../$THEME_ZIP"
cd ..

# Encontrar diretório principal do tema
MAIN_THEME_DIR=$(find "$THEME_SRC" -name "*.html" -type f | head -1 | xargs dirname)
if [ -z "$MAIN_THEME_DIR" ]; then
    echo "❌ Erro: Não foi possível encontrar arquivos HTML no tema!"
    exit 1
fi

echo "📁 Tema encontrado em: $MAIN_THEME_DIR"

# Copiar assets do tema
echo "📋 Copiando assets do tema..."

# Copiar imagens
if [ -d "$MAIN_THEME_DIR/images" ]; then
    cp -r "$MAIN_THEME_DIR/images"/* "$PUBLIC_DIR/images/" 2>/dev/null || true
fi

if [ -d "$MAIN_THEME_DIR/img" ]; then
    cp -r "$MAIN_THEME_DIR/img"/* "$PUBLIC_DIR/images/" 2>/dev/null || true
fi

if [ -d "$MAIN_THEME_DIR/assets/images" ]; then
    cp -r "$MAIN_THEME_DIR/assets/images"/* "$PUBLIC_DIR/images/" 2>/dev/null || true
fi

# Copiar vídeos
if [ -d "$MAIN_THEME_DIR/videos" ]; then
    mkdir -p "$PUBLIC_DIR/videos"
    cp -r "$MAIN_THEME_DIR/videos"/* "$PUBLIC_DIR/videos/" 2>/dev/null || true
fi

# Processar CSS do tema
echo "🎨 Processando CSS do tema..."

# Encontrar arquivos CSS principais
CSS_FILES=$(find "$MAIN_THEME_DIR" -name "*.css" -type f | grep -E "(style|main|theme|flexs)" | head -5)

if [ -n "$CSS_FILES" ]; then
    # Criar CSS do tema processado
    echo "/* Tema Flexs OTT - Processado para Apocalypse Academy */" > "$STYLES_DIR/flexs-ott-theme.css"
    echo "" >> "$STYLES_DIR/flexs-ott-theme.css"
    
    for css_file in $CSS_FILES; do
        echo "📄 Processando: $(basename $css_file)"
        
        # Remover grids proprietários e aplicar filtros
        cat "$css_file" | \
        # Remover Bootstrap grid
        sed '/\.container/d' | \
        sed '/\.row/d' | \
        sed '/\.col-/d' | \
        # Remover grid.css proprietário
        sed '/grid\.css/d' | \
        sed '/\.grid-/d' | \
        # Remover imports desnecessários
        sed '/bootstrap/d' | \
        sed '/font-awesome/d' | \
        # Aplicar prefixo para evitar conflitos
        sed 's/\.card/.ott-card/g' | \
        sed 's/\.btn/.ott-btn/g' | \
        sed 's/\.nav/.ott-nav/g' | \
        # Adicionar ao arquivo final
        >> "$STYLES_DIR/flexs-ott-theme.css"
        
        echo "" >> "$STYLES_DIR/flexs-ott-theme.css"
    done
fi

# Criar Grid Master CSS
echo "🎯 Criando Grid Master CSS..."
cat > "$STYLES_DIR/grid-master.css" << 'EOF'
/* Grid Master - Layout Global Unificado */

.grid-master {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Responsividade do Grid Master */
@media (max-width: 768px) {
  .grid-master {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    padding: 0 0.5rem;
  }
}

@media (max-width: 480px) {
  .grid-master {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
}

/* Cards normalizados para Grid Master */
.grid-master .card,
.grid-master .ott-card,
.grid-master .course-card,
.grid-master .documentary-card,
.grid-master .magazine-card {
  width: 100%;
  height: auto;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  background: rgba(20, 20, 20, 0.9);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.grid-master .card:hover,
.grid-master .ott-card:hover,
.grid-master .course-card:hover,
.grid-master .documentary-card:hover,
.grid-master .magazine-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(225, 29, 46, 0.3);
}

/* Imagens dos cards normalizadas */
.grid-master .card img,
.grid-master .ott-card img,
.grid-master .course-card img,
.grid-master .documentary-card img,
.grid-master .magazine-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  object-position: center;
}

/* Conteúdo dos cards */
.grid-master .card-content,
.grid-master .ott-card-content {
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* Títulos dos cards */
.grid-master .card-title,
.grid-master .ott-card-title {
  font-family: 'Bebas Neue', 'Arial', sans-serif !important;
  font-size: 1.3rem !important;
  font-weight: 400 !important;
  color: #FFFFFF !important;
  margin-bottom: 0.75rem !important;
  line-height: 1.2 !important;
  text-transform: uppercase !important;
  letter-spacing: 1px !important;
}

/* Descrições dos cards */
.grid-master .card-description,
.grid-master .ott-card-description {
  font-family: 'Inter', 'Arial', sans-serif !important;
  font-size: 0.95rem !important;
  line-height: 1.4 !important;
  color: rgba(255, 255, 255, 0.8) !important;
  margin-bottom: 1rem !important;
}

/* Botões dos cards */
.grid-master .card-button,
.grid-master .ott-card-button,
.grid-master .btn,
.grid-master .ott-btn {
  font-family: 'Bebas Neue', 'Arial', sans-serif !important;
  font-size: 0.9rem !important;
  font-weight: 400 !important;
  text-transform: uppercase !important;
  letter-spacing: 1px !important;
  padding: 10px 20px !important;
  background: linear-gradient(135deg, #E11D2E 0%, #C41E3A 100%) !important;
  color: #FFFFFF !important;
  border: none !important;
  border-radius: 4px !important;
  cursor: pointer !important;
  transition: all 0.3s ease !important;
  text-decoration: none !important;
  display: inline-block !important;
  text-align: center !important;
}

.grid-master .card-button:hover,
.grid-master .ott-card-button:hover,
.grid-master .btn:hover,
.grid-master .ott-btn:hover {
  background: linear-gradient(135deg, #C41E3A 0%, #A01E3A 100%) !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 4px 12px rgba(225, 29, 46, 0.4) !important;
}

/* Container principal */
.grid-master-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

/* Seções com Grid Master */
.section-grid-master {
  margin-bottom: 4rem;
}

.section-grid-master h2 {
  font-family: 'Bebas Neue', 'Arial', sans-serif;
  font-size: 2.5rem;
  color: #FFFFFF;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 2rem;
  text-align: center;
}

.section-grid-master .section-subtitle {
  font-family: 'Inter', 'Arial', sans-serif;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}
EOF

# Aplicar fontes globais
echo "🔤 Aplicando fontes Bebas Neue + Inter..."
cat > "$STYLES_DIR/ott-fonts.css" << 'EOF'
/* Fontes OTT - Bebas Neue + Inter */

/* Importar Inter do Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

/* Aplicação global das fontes */
* {
  font-family: 'Inter', 'Arial', sans-serif;
}

/* Títulos principais - Bebas Neue */
h1, h2, h3,
.title, .heading, .hero-title,
.ott-title, .section-title,
.card-title, .ott-card-title {
  font-family: 'Bebas Neue', 'Arial', sans-serif !important;
  text-transform: uppercase !important;
  letter-spacing: 1px !important;
}

/* Texto corpo - Inter */
p, span, div, a,
.description, .text, .content,
.ott-description, .card-description {
  font-family: 'Inter', 'Arial', sans-serif !important;
}

/* Botões - Bebas Neue */
button, .btn, .ott-btn,
.button, .cta, .action {
  font-family: 'Bebas Neue', 'Arial', sans-serif !important;
  text-transform: uppercase !important;
  letter-spacing: 1px !important;
}

/* Navegação - Bebas Neue */
nav, .nav, .ott-nav,
.menu, .navigation {
  font-family: 'Bebas Neue', 'Arial', sans-serif !important;
  text-transform: uppercase !important;
}

/* Sobrescrever fontes do tema */
.flexs-font, .theme-font,
.roboto, .opensans, .lato {
  font-family: 'Inter', 'Arial', sans-serif !important;
}

.flexs-title, .theme-title,
.bold-font, .heading-font {
  font-family: 'Bebas Neue', 'Arial', sans-serif !important;
}
EOF

# Processar arquivos HTML do tema
echo "📝 Processando arquivos HTML do tema..."
HTML_FILES=$(find "$MAIN_THEME_DIR" -name "*.html" -type f | head -3)

if [ -n "$HTML_FILES" ]; then
    mkdir -p "theme_components"
    
    for html_file in $HTML_FILES; do
        filename=$(basename "$html_file" .html)
        echo "📄 Processando: $filename.html"
        
        # Extrair componentes úteis e criar templates
        cat "$html_file" | \
        # Remover scripts desnecessários
        sed '/<script.*bootstrap/d' | \
        sed '/<script.*jquery/d' | \
        # Aplicar classes Grid Master
        sed 's/class="container"/class="grid-master-container"/g' | \
        sed 's/class="row"/class="grid-master"/g' | \
        sed 's/class="col-/class="grid-master-item col-/g' | \
        # Aplicar prefixos OTT
        sed 's/class="card"/class="ott-card"/g' | \
        sed 's/class="btn"/class="ott-btn"/g' | \
        > "theme_components/${filename}_processed.html"
    done
fi

# Criar arquivo de configuração do tema
echo "⚙️ Criando configuração do tema..."
cat > "$STYLES_DIR/ott-config.css" << 'EOF'
/* Configuração do Tema OTT */

:root {
  /* Cores Apocalypse Academy */
  --primary-color: #E11D2E;
  --primary-dark: #C41E3A;
  --background-color: #0A0A0A;
  --surface-color: #141414;
  --text-color: #FFFFFF;
  --text-secondary: rgba(255, 255, 255, 0.8);
  --text-muted: rgba(255, 255, 255, 0.6);
  
  /* Fontes */
  --font-title: 'Bebas Neue', 'Arial', sans-serif;
  --font-body: 'Inter', 'Arial', sans-serif;
  
  /* Grid Master */
  --grid-gap: 1.5rem;
  --grid-min-width: 280px;
  --grid-max-width: 1400px;
  
  /* Transições */
  --transition-fast: 0.2s ease;
  --transition-normal: 0.3s ease;
  --transition-slow: 0.5s ease;
}

/* Aplicar configurações globais */
body {
  background-color: var(--background-color);
  color: var(--text-color);
  font-family: var(--font-body);
  line-height: 1.6;
  margin: 0;
  padding: 0;
}

/* Sobrescrever estilos do tema original */
.flexs-theme,
.ott-platform,
.streaming-theme {
  background-color: var(--background-color) !important;
  color: var(--text-color) !important;
}

/* Aplicar cores Apocalypse Academy */
.primary-color,
.accent-color,
.highlight-color {
  color: var(--primary-color) !important;
}

.primary-bg,
.accent-bg,
.highlight-bg {
  background-color: var(--primary-color) !important;
}
EOF

# Limpar arquivos temporários
echo "🧹 Limpando arquivos temporários..."
# Manter theme_src para debug, mas limpar depois se necessário
# rm -rf "$THEME_SRC"

echo "✅ Importação do tema Flexs OTT concluída com sucesso!"
echo ""
echo "📋 Arquivos criados:"
echo "  - $STYLES_DIR/flexs-ott-theme.css"
echo "  - $STYLES_DIR/grid-master.css"
echo "  - $STYLES_DIR/ott-fonts.css"
echo "  - $STYLES_DIR/ott-config.css"
echo "  - theme_components/ (templates processados)"
echo ""
echo "🎯 Próximos passos:"
echo "  1. Importar os CSS no _app.js"
echo "  2. Aplicar classes .grid-master nos componentes"
echo "  3. Testar layout responsivo"
echo ""
echo "🎬 Tema OTT integrado com Grid Master e fontes Apocalypse Academy!"

