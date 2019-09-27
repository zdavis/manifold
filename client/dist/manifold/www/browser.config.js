if (!window.process) window.process = {};
if (!window.process.env) window.process.env = {};
process.env.NODE_ENV = "production";
process.env.DOMAIN = "manifold.lvh"
process.env.CLIENT_BROWSER_API_URL = ""
process.env.CLIENT_BROWSER_API_CABLE_URL = ""
process.env.SSL_ENABLED = "0"
