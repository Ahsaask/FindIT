/** @type {import('next').NextConfig} */
const nextConfig = {
  // Suppress hydration warnings
  reactStrictMode: true,
  // This helps with hydration errors from browser extensions
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  }
};

export default nextConfig;
