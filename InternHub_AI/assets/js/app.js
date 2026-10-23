/* InternHub AI - Global Application Logic & Page Routing */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Modals
  if (window.Modal) window.Modal.init();

  // Mobile Sidebar Toggle
  const mobileToggle = document.getElementById('mobileSidebarToggle');
  const sidebar = document.querySelector('.sidebar');
  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
    });
  }

  // Active Link Highlight based on window location
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-item').forEach(link => {
    if (link.getAttribute('href') && currentPath.includes(link.getAttribute('href'))) {
      link.classList.add('active');
    }
  });

  // Keyboard Shortcut for Search (Ctrl + K / Cmd + K)
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      const searchInput = document.querySelector('.search-input');
      if (searchInput) searchInput.focus();
    }
  });

  // Notifications Popover Toggle
  const notifBtn = document.getElementById('notificationsBtn');
  const notifPopover = document.getElementById('notificationsPopover');
  if (notifBtn && notifPopover) {
    notifBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      notifPopover.classList.toggle('hidden');
    });
    document.addEventListener('click', (e) => {
      if (!notifPopover.contains(e.target) && e.target !== notifBtn) {
        notifPopover.classList.add('hidden');
      }
    });
  }

  // Profile Dropdown Toggle
  const profileBtn = document.getElementById('profileDropdownBtn');
  const profileMenu = document.getElementById('profileDropdownMenu');
  if (profileBtn && profileMenu) {
    profileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      profileMenu.classList.toggle('hidden');
    });
    document.addEventListener('click', (e) => {
      if (!profileMenu.contains(e.target) && e.target !== profileBtn) {
        profileMenu.classList.add('hidden');
      }
    });
  }
});
