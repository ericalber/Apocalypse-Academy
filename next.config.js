/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Configurações para resolver "cannot decode raw data" no Safari
  compress: false, // Desabilitar compressão automática do Next.js
  
  async headers() {
    return [
      {
        // Aplicar para todas as rotas HTML
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate'
          },
          {
            key: 'Content-Type',
            value: 'text/html; charset=utf-8'
          }
        ],
      },
      {
        // CSS files
        source: '/(.*)\.css',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/css; charset=utf-8'
          },
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate'
          }
        ],
      },
      {
        // JavaScript files
        source: '/(.*)\.js',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/javascript; charset=utf-8'
          },
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate'
          }
        ],
      },
      {
        // Static assets (manter cache)
        source: '/(.*)\\.(png|jpg|jpeg|gif|webp|svg|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ],
      }
    ]
  },

  // Configurações de imagem
  images: {
    unoptimized: true,
    domains: ['localhost']
  },

  // Configuração de webpack para evitar problemas de encoding
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    return config;
  },

  // Configurações experimentais para melhor compatibilidade
  experimental: {
    forceSwcTransforms: true,
  }
};

module.exports = nextConfig;
