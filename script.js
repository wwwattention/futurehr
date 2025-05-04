// Плавная прокрутка для навигации
document.addEventListener('DOMContentLoaded', () => {
  // Добавляем навигационное меню
  createNavigation();
  
  // Анимация появления элементов при прокрутке
  setupScrollAnimation();
  
  // Обработчик для кнопки CTA
  setupCTAButton();
});

// Создание навигационного меню
function createNavigation() {
  const sections = [
    { id: 'pain', name: 'Вызовы' },
    { id: 'ecosystem', name: 'Экосистема' },
    { id: 'process', name: 'Процесс' },
    { id: 'skills', name: 'Навыки' },
    { id: 'agents', name: 'ИИ-агенты' },
    { id: 'architecture', name: 'Архитектура' },
    { id: 'kpi', name: 'KPI' },
    { id: 'roadmap', name: 'Дорожная карта' },
    { id: 'cta', name: 'Контакты' }
  ];
  
  const nav = document.createElement('nav');
  nav.className = 'bg-white shadow-md sticky top-0 z-10';
  
  const navContainer = document.createElement('div');
  navContainer.className = 'max-w-5xl mx-auto px-6 py-3 flex justify-between items-center';
  
  const logo = document.createElement('a');
  logo.href = '#';
  logo.className = 'font-bold text-[#0e1e46]';
  logo.textContent = 'HR Future';
  
  const menuButton = document.createElement('button');
  menuButton.className = 'md:hidden text-[#0e1e46]';
  menuButton.innerHTML = '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>';
  
  const menuList = document.createElement('ul');
  menuList.className = 'hidden md:flex space-x-6 text-sm';
  
  sections.forEach(section => {
    const menuItem = document.createElement('li');
    const link = document.createElement('a');
    link.href = `#${section.id}`;
    link.className = 'hover:text-[#2563eb] transition';
    link.textContent = section.name;
    menuItem.appendChild(link);
    menuList.appendChild(menuItem);
  });
  
  navContainer.appendChild(logo);
  navContainer.appendChild(menuList);
  navContainer.appendChild(menuButton);
  nav.appendChild(navContainer);
  
  // Добавляем навигацию после header
  const header = document.querySelector('header');
  header.parentNode.insertBefore(nav, header.nextSibling);
  
  // Мобильное меню
  const mobileMenu = document.createElement('div');
  mobileMenu.className = 'md:hidden hidden bg-white shadow-md absolute w-full z-20';
  mobileMenu.style.top = '56px'; // Высота навигации
  
  const mobileMenuList = document.createElement('ul');
  mobileMenuList.className = 'py-2';
  
  sections.forEach(section => {
    const mobileMenuItem = document.createElement('li');
    const mobileLink = document.createElement('a');
    mobileLink.href = `#${section.id}`;
    mobileLink.className = 'block px-6 py-2 hover:bg-slate-100 transition';
    mobileLink.textContent = section.name;
    mobileMenuItem.appendChild(mobileLink);
    mobileMenuList.appendChild(mobileMenuItem);
  });
  
  mobileMenu.appendChild(mobileMenuList);
  nav.appendChild(mobileMenu);
  
  // Обработчик для мобильного меню
  menuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
  
  // Закрытие мобильного меню при клике на пункт
  mobileMenuList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
  
  // Закрытие мобильного меню при клике вне меню
  document.addEventListener('click', (event) => {
    if (!nav.contains(event.target)) {
      mobileMenu.classList.add('hidden');
    }
  });
}

// Настройка анимации при прокрутке
function setupScrollAnimation() {
  const elements = document.querySelectorAll('section > div > article, section > ol > li');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  elements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    observer.observe(element);
  });
  
  // Добавляем стили для анимации
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .animate-fade-in {
      animation: fadeIn 0.6s ease forwards;
    }
  `;
  document.head.appendChild(style);
}

// Настройка кнопки CTA
function setupCTAButton() {
  const ctaButton = document.querySelector('#cta a');
  
  ctaButton.addEventListener('click', (event) => {
    event.preventDefault();
    
    // Создаем модальное окно для формы
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'bg-white rounded-xl p-6 max-w-md w-full mx-4';
    
    const modalHeader = document.createElement('div');
    modalHeader.className = 'flex justify-between items-center mb-4';
    
    const modalTitle = document.createElement('h3');
    modalTitle.className = 'text-xl font-semibold text-[#0e1e46]';
    modalTitle.textContent = 'Запросить демонстрацию';
    
    const closeButton = document.createElement('button');
    closeButton.className = 'text-slate-500 hover:text-slate-700';
    closeButton.innerHTML = '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>';
    
    const form = document.createElement('form');
    form.className = 'space-y-4';
    
    const nameField = createFormField('text', 'name', 'Ваше имя', true);
    const companyField = createFormField('text', 'company', 'Компания', true);
    const emailField = createFormField('email', 'email', 'Email', true);
    const phoneField = createFormField('tel', 'phone', 'Телефон', false);
    const messageField = createTextareaField('message', 'Сообщение', false);
    
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.className = 'w-full bg-[#2563eb] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#1d4ed8] transition';
    submitButton.textContent = 'Отправить запрос';
    
    form.appendChild(nameField);
    form.appendChild(companyField);
    form.appendChild(emailField);
    form.appendChild(phoneField);
    form.appendChild(messageField);
    form.appendChild(submitButton);
    
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButton);
    
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(form);
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Предотвращаем прокрутку страницы при открытом модальном окне
    document.body.style.overflow = 'hidden';
    
    // Закрытие модального окна
    closeButton.addEventListener('click', () => {
      document.body.removeChild(modal);
      document.body.style.overflow = '';
    });
    
    // Закрытие при клике вне модального окна
    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        document.body.removeChild(modal);
        document.body.style.overflow = '';
      }
    });
    
    // Обработка отправки формы
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      
      // Здесь будет логика отправки формы
      // В данном примере просто показываем сообщение об успехе
      
      modalContent.innerHTML = `
        <div class="text-center py-8">
          <svg class="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <h3 class="text-xl font-semibold text-[#0e1e46] mb-2">Запрос отправлен!</h3>
          <p class="text-slate-600 mb-6">Мы свяжемся с вами в ближайшее время.</p>
          <button class="bg-[#2563eb] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#1d4ed8] transition close-modal">Закрыть</button>
        </div>
      `;
      
      modalContent.querySelector('.close-modal').addEventListener('click', () => {
        document.body.removeChild(modal);
        document.body.style.overflow = '';
      });
    });
  });
}

// Вспомогательная функция для создания полей формы
function createFormField(type, name, placeholder, required) {
  const field = document.createElement('div');
  
  const input = document.createElement('input');
  input.type = type;
  input.name = name;
  input.id = name;
  input.placeholder = placeholder;
  input.required = required;
  input.className = 'w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent';
  
  field.appendChild(input);
  return field;
}

// Вспомогательная функция для создания текстового поля
function createTextareaField(name, placeholder, required) {
  const field = document.createElement('div');
  
  const textarea = document.createElement('textarea');
  textarea.name = name;
  textarea.id = name;
  textarea.placeholder = placeholder;
  textarea.required = required;
  textarea.rows = 4;
  textarea.className = 'w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent';
  
  field.appendChild(textarea);
  return field;
}