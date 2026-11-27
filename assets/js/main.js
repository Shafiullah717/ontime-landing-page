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

  // Web3Forms Request Access form submission
  const requestForm = document.getElementById("request-access-form");
  const requestResult = document.getElementById("request-form-result");
  const submitBtn = document.getElementById("request-access-submit");

  if (requestForm && requestResult && submitBtn) {
    requestForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const originalLabel = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending request...";
      requestResult.textContent = "";
      requestResult.className = "min-h-[1.25rem] text-center text-[14px] font-medium text-ink-muted";

      try {
        const formData = new FormData(requestForm);
        const payload = JSON.stringify(Object.fromEntries(formData));

        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: payload,
        });

        const data = await response.json();
        if (response.ok && data.success) {
          requestResult.textContent = "Request received! Our team will reach out shortly.";
          requestResult.className = "min-h-[1.25rem] text-center text-[14px] font-medium text-emerald-700";
          requestForm.reset();
        } else {
          requestResult.textContent = data.message || "Unable to send request. Please try again.";
          requestResult.className = "min-h-[1.25rem] text-center text-[14px] font-medium text-red-600";
        }
      } catch {
        requestResult.textContent = "Network error. Please try again or email info@wam-corp.com.";
        requestResult.className = "min-h-[1.25rem] text-center text-[14px] font-medium text-red-600";
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalLabel;
      }
    });
  }
})();
