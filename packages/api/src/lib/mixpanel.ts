import Mixpanel from "mixpanel";

export const mixpanel = Mixpanel.init(process.env.MIXPANEL_API_KEY!);
