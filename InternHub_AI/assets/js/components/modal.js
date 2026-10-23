/* InternHub AI - Modal Component Utility */

const Modal = {
  init() {
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-modal-target]')) {
        const modalId = e.target.getAttribute('data-modal-target');
        this.open(modalId);
      }
      if (e.target.matches('[data-modal-close]') || e.target.classList.contains('modal-overlay')) {
        this.closeAll();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAll();
      }
    });
  },

  open(modalId) {
    const modalEl = document.getElementById(modalId);
    if (modalEl) {
      modalEl.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  },

  closeAll() {
    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.classList.remove('active');
    });
    document.body.style.overflow = '';
  }
};

if (typeof window !== 'undefined') {
  window.Modal = Modal;
}
