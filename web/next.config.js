const withImages = require("next-images");
module.exports = withImages({
  future: {
    webpack5: true,
  },
  images: {
    domains: ["gnixlumnyguqyjfowhaz.supabase.co", "images.prismic.io"],
  },
});
