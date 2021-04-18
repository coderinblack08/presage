"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
exports.supabase = supabase_js_1.createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
//# sourceMappingURL=supabase.js.map