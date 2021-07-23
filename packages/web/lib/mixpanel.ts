import mixpanel from "mixpanel-browser";

mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL!);
mixpanel.track("test", { adsf: "asdf" });
