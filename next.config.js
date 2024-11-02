// /** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig


const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**'
        }
      ]
    }
  }
  
  module.exports = nextConfig
  
