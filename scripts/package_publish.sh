#!/bin/bash

# Script de Publicação e Transcode - Apocalypse Academy
# Uso: ./package_publish.sh input.mp4 curso_id aula_id [distribution_type]
# Exemplo: ./package_publish.sh aula01.mp4 escatologia m1l1 platform_private

set -e

# Configurações
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
COURSES_DIR="$PROJECT_ROOT/courses"
VOD_DIR="$PROJECT_ROOT/vod"
METADATA_DIR="$VOD_DIR/metadata"
TEMP_DIR="/tmp/apocalypse_transcode"

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função de log
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" >&2
    exit 1
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Verificar dependências
check_dependencies() {
    log "Verificando dependências..."
    
    command -v ffmpeg >/dev/null 2>&1 || error "FFmpeg não encontrado. Instale com: apt-get install ffmpeg"
    command -v ffprobe >/dev/null 2>&1 || error "FFprobe não encontrado. Instale com: apt-get install ffmpeg"
    command -v node >/dev/null 2>&1 || error "Node.js não encontrado"
    command -v jq >/dev/null 2>&1 || error "jq não encontrado. Instale com: apt-get install jq"
    
    success "Todas as dependências estão instaladas"
}

# Validar parâmetros
validate_params() {
    if [ $# -lt 3 ]; then
        error "Uso: $0 <input_video> <curso_id> <aula_id> [distribution_type]"
    fi
    
    INPUT_VIDEO="$1"
    CURSO_ID="$2"
    AULA_ID="$3"
    DISTRIBUTION_TYPE="${4:-platform_private}"
    
    if [ ! -f "$INPUT_VIDEO" ]; then
        error "Arquivo de vídeo não encontrado: $INPUT_VIDEO"
    fi
    
    # Validar tipos de distribuição
    case "$DISTRIBUTION_TYPE" in
        youtube_public|youtube_unlisted|platform_private)
            ;;
        *)
            error "Tipo de distribuição inválido: $DISTRIBUTION_TYPE. Use: youtube_public, youtube_unlisted, platform_private"
            ;;
    esac
    
    log "Parâmetros validados:"
    log "  Vídeo: $INPUT_VIDEO"
    log "  Curso: $CURSO_ID"
    log "  Aula: $AULA_ID"
    log "  Distribuição: $DISTRIBUTION_TYPE"
}

# Criar estrutura de diretórios
create_directories() {
    log "Criando estrutura de diretórios..."
    
    CURSO_DIR="$COURSES_DIR/$CURSO_ID"
    RAW_DIR="$CURSO_DIR/raw"
    FINAL_DIR="$CURSO_DIR/final"
    VOD_CURSO_DIR="$VOD_DIR/$CURSO_ID"
    METADATA_CURSO_DIR="$METADATA_DIR/$CURSO_ID"
    
    mkdir -p "$RAW_DIR" "$FINAL_DIR" "$VOD_CURSO_DIR" "$METADATA_CURSO_DIR" "$TEMP_DIR"
    
    # Estrutura para HLS e DASH
    mkdir -p "$VOD_CURSO_DIR/hls/$AULA_ID" "$VOD_CURSO_DIR/dash/$AULA_ID"
    
    success "Estrutura de diretórios criada"
}

# Analisar vídeo de entrada
analyze_input() {
    log "Analisando vídeo de entrada..."
    
    # Obter informações do vídeo
    VIDEO_INFO=$(ffprobe -v quiet -print_format json -show_format -show_streams "$INPUT_VIDEO")
    
    # Extrair informações relevantes
    DURATION=$(echo "$VIDEO_INFO" | jq -r '.format.duration // empty')
    WIDTH=$(echo "$VIDEO_INFO" | jq -r '.streams[] | select(.codec_type=="video") | .width // empty')
    HEIGHT=$(echo "$VIDEO_INFO" | jq -r '.streams[] | select(.codec_type=="video") | .height // empty')
    BITRATE=$(echo "$VIDEO_INFO" | jq -r '.format.bit_rate // empty')
    
    log "Informações do vídeo:"
    log "  Duração: ${DURATION}s"
    log "  Resolução: ${WIDTH}x${HEIGHT}"
    log "  Bitrate: ${BITRATE} bps"
    
    # Determinar perfis de transcodificação baseado na resolução de entrada
    determine_profiles
}

# Determinar perfis de transcodificação
determine_profiles() {
    log "Determinando perfis de transcodificação..."
    
    # Perfis baseados na resolução de entrada
    PROFILES=()
    
    # Sempre incluir 240p e 360p para compatibilidade
    PROFILES+=("240p:426:240:400k")
    PROFILES+=("360p:640:360:800k")
    
    # Adicionar perfis baseados na resolução de entrada
    if [ "$HEIGHT" -ge 480 ]; then
        PROFILES+=("480p:854:480:1200k")
    fi
    
    if [ "$HEIGHT" -ge 720 ]; then
        PROFILES+=("720p:1280:720:2500k")
    fi
    
    if [ "$HEIGHT" -ge 1080 ]; then
        PROFILES+=("1080p:1920:1080:4000k")
    fi
    
    if [ "$HEIGHT" -ge 1440 ]; then
        PROFILES+=("1440p:2560:1440:8000k")
    fi
    
    if [ "$HEIGHT" -ge 2160 ]; then
        PROFILES+=("2160p:3840:2160:15000k")
    fi
    
    log "Perfis selecionados: ${#PROFILES[@]} qualidades"
    for profile in "${PROFILES[@]}"; do
        quality=$(echo "$profile" | cut -d: -f1)
        log "  - $quality"
    done
}

# Transcodificar para múltiplas qualidades
transcode_video() {
    log "Iniciando transcodificação..."
    
    # Copiar vídeo original para final
    cp "$INPUT_VIDEO" "$FINAL_DIR/${AULA_ID}_original.mp4"
    
    # Transcodificar para cada perfil
    for profile in "${PROFILES[@]}"; do
        IFS=':' read -r quality width height bitrate <<< "$profile"
        
        log "Transcodificando para $quality..."
        
        OUTPUT_FILE="$TEMP_DIR/${AULA_ID}_${quality}.mp4"
        
        ffmpeg -i "$INPUT_VIDEO" \
            -c:v libx264 \
            -preset medium \
            -crf 23 \
            -maxrate "$bitrate" \
            -bufsize "$((${bitrate%k} * 2))k" \
            -vf "scale=${width}:${height}:force_original_aspect_ratio=decrease,pad=${width}:${height}:(ow-iw)/2:(oh-ih)/2" \
            -c:a aac \
            -b:a 128k \
            -ac 2 \
            -ar 44100 \
            -movflags +faststart \
            -y "$OUTPUT_FILE" \
            2>/dev/null || error "Falha na transcodificação para $quality"
        
        success "Transcodificação $quality concluída"
    done
}

# Gerar HLS
generate_hls() {
    log "Gerando streams HLS..."
    
    HLS_DIR="$VOD_CURSO_DIR/hls/$AULA_ID"
    
    # Criar playlist master
    MASTER_PLAYLIST="$HLS_DIR/master.m3u8"
    echo "#EXTM3U" > "$MASTER_PLAYLIST"
    echo "#EXT-X-VERSION:6" >> "$MASTER_PLAYLIST"
    
    # Gerar segmentos para cada qualidade
    for profile in "${PROFILES[@]}"; do
        IFS=':' read -r quality width height bitrate <<< "$profile"
        
        log "Gerando HLS para $quality..."
        
        QUALITY_DIR="$HLS_DIR/$quality"
        mkdir -p "$QUALITY_DIR"
        
        INPUT_FILE="$TEMP_DIR/${AULA_ID}_${quality}.mp4"
        PLAYLIST_FILE="$QUALITY_DIR/index.m3u8"
        
        # Gerar segmentos HLS
        ffmpeg -i "$INPUT_FILE" \
            -c copy \
            -hls_time 6 \
            -hls_playlist_type vod \
            -hls_segment_filename "$QUALITY_DIR/segment_%03d.ts" \
            -y "$PLAYLIST_FILE" \
            2>/dev/null || error "Falha na geração HLS para $quality"
        
        # Adicionar ao playlist master
        BANDWIDTH=$((${bitrate%k} * 1000))
        echo "#EXT-X-STREAM-INF:BANDWIDTH=$BANDWIDTH,RESOLUTION=${width}x${height}" >> "$MASTER_PLAYLIST"
        echo "$quality/index.m3u8" >> "$MASTER_PLAYLIST"
        
        success "HLS $quality gerado"
    done
    
    success "Playlist HLS master criado: $MASTER_PLAYLIST"
}

# Gerar DASH
generate_dash() {
    log "Gerando streams DASH..."
    
    DASH_DIR="$VOD_CURSO_DIR/dash/$AULA_ID"
    mkdir -p "$DASH_DIR"
    
    # Preparar arquivos para DASH
    DASH_INPUTS=""
    for profile in "${PROFILES[@]}"; do
        quality=$(echo "$profile" | cut -d: -f1)
        INPUT_FILE="$TEMP_DIR/${AULA_ID}_${quality}.mp4"
        DASH_INPUTS="$DASH_INPUTS -i $INPUT_FILE"
    done
    
    # Gerar manifest DASH
    log "Criando manifest DASH..."
    
    # Comando ffmpeg para DASH (simplificado)
    MANIFEST_FILE="$DASH_DIR/manifest.mpd"
    
    # Criar manifest básico (em produção, usar ferramentas especializadas como MP4Box)
    cat > "$MANIFEST_FILE" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<MPD xmlns="urn:mpeg:dash:schema:mpd:2011" type="static" mediaPresentationDuration="PT${DURATION}S">
  <Period>
    <AdaptationSet mimeType="video/mp4">
EOF

    for profile in "${PROFILES[@]}"; do
        IFS=':' read -r quality width height bitrate <<< "$profile"
        BANDWIDTH=$((${bitrate%k} * 1000))
        
        cat >> "$MANIFEST_FILE" << EOF
      <Representation id="$quality" bandwidth="$BANDWIDTH" width="$width" height="$height">
        <BaseURL>../${quality}/</BaseURL>
        <SegmentBase indexRange="0-1000"/>
      </Representation>
EOF
    done
    
    cat >> "$MANIFEST_FILE" << EOF
    </AdaptationSet>
  </Period>
</MPD>
EOF
    
    success "Manifest DASH criado: $MANIFEST_FILE"
}

# Gerar thumbnails e poster
generate_thumbnails() {
    log "Gerando thumbnails e poster..."
    
    POSTER_FILE="$METADATA_CURSO_DIR/${AULA_ID}.jpg"
    THUMBNAILS_DIR="$METADATA_CURSO_DIR/${AULA_ID}_thumbnails"
    mkdir -p "$THUMBNAILS_DIR"
    
    # Gerar poster (frame aos 10% do vídeo)
    POSTER_TIME=$(echo "$DURATION * 0.1" | bc)
    ffmpeg -i "$INPUT_VIDEO" \
        -ss "$POSTER_TIME" \
        -vframes 1 \
        -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2" \
        -y "$POSTER_FILE" \
        2>/dev/null || warning "Falha ao gerar poster"
    
    # Gerar thumbnails a cada 10 segundos
    ffmpeg -i "$INPUT_VIDEO" \
        -vf "fps=1/10,scale=320:180:force_original_aspect_ratio=decrease,pad=320:180:(ow-iw)/2:(oh-ih)/2" \
        -y "$THUMBNAILS_DIR/thumb_%03d.jpg" \
        2>/dev/null || warning "Falha ao gerar thumbnails"
    
    success "Thumbnails e poster gerados"
}

# Gerar legendas automáticas (placeholder)
generate_captions() {
    log "Gerando legendas automáticas..."
    
    CAPTIONS_FILE="$METADATA_CURSO_DIR/${AULA_ID}.pt.vtt"
    
    # Placeholder para legendas (em produção, usar serviços de IA)
    cat > "$CAPTIONS_FILE" << EOF
WEBVTT

00:00:00.000 --> 00:00:10.000
Bem-vindos à Apocalypse Academy

00:00:10.000 --> 00:00:20.000
Nesta aula, vamos explorar os sinais dos tempos

NOTE
Legendas geradas automaticamente
EOF
    
    success "Legendas placeholder criadas: $CAPTIONS_FILE"
}

# Gerar capítulos
generate_chapters() {
    log "Gerando capítulos..."
    
    CHAPTERS_FILE="$METADATA_CURSO_DIR/${AULA_ID}.chapters.vtt"
    
    # Dividir vídeo em capítulos de 5 minutos
    CHAPTER_DURATION=300 # 5 minutos
    TOTAL_CHAPTERS=$(echo "$DURATION / $CHAPTER_DURATION" | bc)
    
    cat > "$CHAPTERS_FILE" << EOF
WEBVTT

NOTE
Capítulos gerados automaticamente

EOF
    
    for ((i=0; i<TOTAL_CHAPTERS; i++)); do
        START_TIME=$((i * CHAPTER_DURATION))
        END_TIME=$(((i + 1) * CHAPTER_DURATION))
        
        if [ $END_TIME -gt ${DURATION%.*} ]; then
            END_TIME=${DURATION%.*}
        fi
        
        START_VTT=$(printf "%02d:%02d:%02d.000" $((START_TIME/3600)) $(((START_TIME%3600)/60)) $((START_TIME%60)))
        END_VTT=$(printf "%02d:%02d:%02d.000" $((END_TIME/3600)) $(((END_TIME%3600)/60)) $((END_TIME%60)))
        
        cat >> "$CHAPTERS_FILE" << EOF
$START_VTT --> $END_VTT
Capítulo $((i+1))

EOF
    done
    
    success "Capítulos gerados: $CHAPTERS_FILE"
}

# Atualizar catálogo
update_catalog() {
    log "Atualizando catálogo..."
    
    CATALOG_FILE="$PROJECT_ROOT/api/catalog.json"
    
    if [ ! -f "$CATALOG_FILE" ]; then
        error "Arquivo de catálogo não encontrado: $CATALOG_FILE"
    fi
    
    # Backup do catálogo
    cp "$CATALOG_FILE" "${CATALOG_FILE}.backup.$(date +%s)"
    
    # Atualizar informações da aula (usando jq)
    TEMP_CATALOG=$(mktemp)
    
    jq --arg curso_id "$CURSO_ID" \
       --arg aula_id "$AULA_ID" \
       --arg duration "$DURATION" \
       --arg poster "/vod/metadata/$CURSO_ID/$AULA_ID.jpg" \
       --arg hls "/vod/hls/$CURSO_ID/$AULA_ID/master.m3u8" \
       --arg dash "/vod/dash/$CURSO_ID/$AULA_ID/manifest.mpd" \
       --arg captions "/vod/metadata/$CURSO_ID/$AULA_ID.pt.vtt" \
       --arg chapters "/vod/metadata/$CURSO_ID/$AULA_ID.chapters.vtt" \
       '
       .courses[] |= 
       if .id == $curso_id then
         .modules[].lessons[] |= 
         if .id == $aula_id then
           .durationSec = ($duration | tonumber) |
           .poster = $poster |
           .platform.hls = $hls |
           .platform.dash = $dash |
           .captions[0].url = $captions |
           .chapters = $chapters |
           .updatedAt = now | strftime("%Y-%m-%dT%H:%M:%SZ")
         else . end
       else . end |
       .metadata.lastUpdated = now | strftime("%Y-%m-%dT%H:%M:%SZ")
       ' "$CATALOG_FILE" > "$TEMP_CATALOG"
    
    mv "$TEMP_CATALOG" "$CATALOG_FILE"
    
    success "Catálogo atualizado"
}

# Publicar no YouTube (se aplicável)
publish_youtube() {
    if [[ "$DISTRIBUTION_TYPE" == youtube_* ]]; then
        log "Publicando no YouTube..."
        
        # Usar o vídeo de melhor qualidade disponível
        BEST_QUALITY_FILE="$FINAL_DIR/${AULA_ID}_original.mp4"
        
        # Chamar script Node.js para upload no YouTube
        node "$SCRIPT_DIR/youtube_upload.js" \
            "$BEST_QUALITY_FILE" \
            "$CURSO_ID" \
            "$AULA_ID" \
            "$DISTRIBUTION_TYPE" || warning "Falha no upload para YouTube"
        
        success "Publicação no YouTube iniciada"
    else
        log "Pulando publicação no YouTube (distribuição: $DISTRIBUTION_TYPE)"
    fi
}

# Limpeza de arquivos temporários
cleanup() {
    log "Limpando arquivos temporários..."
    rm -rf "$TEMP_DIR"
    success "Limpeza concluída"
}

# Gerar relatório
generate_report() {
    log "Gerando relatório de publicação..."
    
    REPORT_FILE="$CURSO_DIR/${AULA_ID}_publish_report.json"
    
    cat > "$REPORT_FILE" << EOF
{
  "curso_id": "$CURSO_ID",
  "aula_id": "$AULA_ID",
  "distribution_type": "$DISTRIBUTION_TYPE",
  "input_video": "$INPUT_VIDEO",
  "duration": $DURATION,
  "resolution": "${WIDTH}x${HEIGHT}",
  "profiles_generated": [
$(printf '    "%s"' "${PROFILES[@]}" | sed 's/:.*//' | paste -sd, -)
  ],
  "files_generated": {
    "hls_master": "/vod/hls/$CURSO_ID/$AULA_ID/master.m3u8",
    "dash_manifest": "/vod/dash/$CURSO_ID/$AULA_ID/manifest.mpd",
    "poster": "/vod/metadata/$CURSO_ID/$AULA_ID.jpg",
    "captions": "/vod/metadata/$CURSO_ID/$AULA_ID.pt.vtt",
    "chapters": "/vod/metadata/$CURSO_ID/$AULA_ID.chapters.vtt"
  },
  "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "status": "completed"
}
EOF
    
    success "Relatório gerado: $REPORT_FILE"
}

# Função principal
main() {
    log "=== APOCALYPSE ACADEMY - SCRIPT DE PUBLICAÇÃO ==="
    log "Iniciando processamento de vídeo..."
    
    check_dependencies
    validate_params "$@"
    create_directories
    analyze_input
    transcode_video
    generate_hls
    generate_dash
    generate_thumbnails
    generate_captions
    generate_chapters
    update_catalog
    publish_youtube
    generate_report
    cleanup
    
    success "=== PUBLICAÇÃO CONCLUÍDA COM SUCESSO ==="
    success "Aula $AULA_ID do curso $CURSO_ID processada e publicada"
    success "Distribuição: $DISTRIBUTION_TYPE"
    success "Arquivos disponíveis em: $VOD_CURSO_DIR"
}

# Executar função principal
main "$@"

