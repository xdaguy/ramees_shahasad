(function(){
  var cfg = window.SiteConfig || {};
  var phone = ((cfg.whatsapp && cfg.whatsapp.phone) || "").replace(/\D+/g,"");
  var text = (cfg.whatsapp && cfg.whatsapp.message) || "";
  var waUrl = phone ? "https://wa.me/" + phone + (text ? "?text=" + encodeURIComponent(text) : "") : "";
  function assign(){
    var n = document.getElementById("name"); if (n && cfg.name) n.textContent = cfg.name;
    var w = document.getElementById("whatsapp-link"); if (w && waUrl) w.href = waUrl;
    var e = document.getElementById("email-link"); if (e && cfg.email) e.href = "mailto:" + cfg.email;
  }
  function go(){
    var enabled = !(cfg.redirect && cfg.redirect.enabled === false);
    if (!enabled) return;
    var target = (cfg.redirect && cfg.redirect.target) || "whatsapp";
    var delay = Number((cfg.redirect && cfg.redirect.delayMs) != null ? cfg.redirect.delayMs : 300);
    if (target === "whatsapp" && waUrl) setTimeout(function(){ window.location.href = waUrl; }, delay);
    if (target === "email" && cfg.email) setTimeout(function(){ window.location.href = "mailto:" + cfg.email; }, delay);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function(){ assign(); go(); });
  } else {
    assign(); go();
  }
})();
