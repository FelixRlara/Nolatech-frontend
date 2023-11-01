/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: '/',
            destination: '/auth/login', // Matched parameters can be used in the destination
            permanent: true,
          },
        ]
    },

}

module.exports = nextConfig;
