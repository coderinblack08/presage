const withImages = require("next-images");
module.exports = withImages({
  future: {
    webpack5: true,
  },
  images: {
    domains: [
      process.env.NEXT_PUBLIC_SUPABASE_URL.replace("https://", ""),
      "images.prismic.io",
    ],
  },
});
