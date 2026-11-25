(() => {
  const header = document.getElementById("masthead");
  const drawer = document.getElementById("mobile-drawer");
  const openBtn = document.getElementById("mobile-toggle");
  const closeBtn = document.getElementById("mobile-close");

  // Toggle sticky background on transparent landing header
  if (header && header.classList.contains("site-header-transparent")) {
    const updateHeader = () => {
      header.classList.toggle("is-stuck", window.scrollY > 10);
    };
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
  }

  if (!drawer || !openBtn) return;

  const openDrawer = () => {
    if (!drawer.open) {
      drawer.showModal();
      openBtn.setAttribute("aria-expanded", "true");
    }
  };

  const closeDrawer = () => {
    if (drawer.open) {
      drawer.close();
    }
  };

  openBtn.addEventListener("click", openDrawer);
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);

  // Sync aria-expanded whenever dialog closes (including Escape key)
  drawer.addEventListener("close", () => {
    openBtn.setAttribute("aria-expanded", "false");
  });

  // Dismiss when clicking the dimmed backdrop area outside the dialog panel
  drawer.addEventListener("click", (event) => {
    if (event.target === drawer) {
      closeDrawer();
    }
  });

  drawer.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeDrawer);
  });
})();
