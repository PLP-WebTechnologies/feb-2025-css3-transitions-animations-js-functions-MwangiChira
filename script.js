document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const themeSwitch = document.getElementById('theme-switch');
    const animatedElement = document.getElementById('animated-element');
    const animationButtons = document.querySelectorAll('[data-animation]');
    const colorOptions = document.querySelectorAll('.color-option');
    const preferencesList = document.getElementById('preferences-list');
    const resetBtn = document.getElementById('reset-btn');
    
    // User preference object
    let userPreferences = {
        theme: 'light',
        primaryColor: '#3498db',
        animation: 'none'
    };
    
    // Load preferences from localStorage
    function loadPreferences() {
        const savedPreferences = localStorage.getItem('userPreferences');
        if (savedPreferences) {
            userPreferences = JSON.parse(savedPreferences);
            
            // Apply saved preferences
            if (userPreferences.theme === 'dark') {
                document.body.classList.add('dark-theme');
                themeSwitch.checked = true;
            }
            
            // Apply saved color
            document.documentElement.style.setProperty('--primary-color', userPreferences.primaryColor);
            
            // Apply saved animation
            applyAnimation(userPreferences.animation);
        }
        
        // Update preferences display
        updatePreferencesList();
    }
    
    // Save preferences to localStorage
    function savePreferences() {
        localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
        updatePreferencesList();
    }
    
    // Apply animation to element
    function applyAnimation(animationType) {
        // Remove all animation classes first
        animatedElement.classList.remove('bounce', 'spin', 'pulse');
        
        if (animationType !== 'none') {
            animatedElement.classList.add(animationType);
        }
        
        userPreferences.animation = animationType;
        savePreferences();
    }
    
    // Update the preferences list display
    function updatePreferencesList() {
        preferencesList.innerHTML = `
            <li><strong>Theme:</strong> ${userPreferences.theme}</li>
            <li><strong>Primary Color:</strong> <span style="display:inline-block; width:15px; height:15px; background-color:${userPreferences.primaryColor}; border-radius:50%;"></span> ${userPreferences.primaryColor}</li>
            <li><strong>Animation:</strong> ${userPreferences.animation}</li>
        `;
    }
    
    // Theme toggle event
    themeSwitch.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('dark-theme');
            userPreferences.theme = 'dark';
        } else {
            document.body.classList.remove('dark-theme');
            userPreferences.theme = 'light';
        }
        savePreferences();
    });
    
    // Animation button events
    animationButtons.forEach(button => {
        button.addEventListener('click', function() {
            const animation = this.getAttribute('data-animation');
            applyAnimation(animation);
        });
    });
    
    // Color option events
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            const color = this.getAttribute('data-color');
            document.documentElement.style.setProperty('--primary-color', color);
            userPreferences.primaryColor = color;
            savePreferences();
        });
    });
    
    // Reset button event
    resetBtn.addEventListener('click', function() {
        // Default preferences
        userPreferences = {
            theme: 'light',
            primaryColor: '#3498db',
            animation: 'none'
        };
        
        // Apply defaults
        document.body.classList.remove('dark-theme');
        themeSwitch.checked = false;
        document.documentElement.style.setProperty('--primary-color', '#3498db');
        applyAnimation('none');
        
        // Trigger a small animation to show the reset happened
        this.classList.add('pulse');
        setTimeout(() => {
            this.classList.remove('pulse');
        }, 1500);
        
        // Save to localStorage
        localStorage.removeItem('userPreferences');
        savePreferences();
    });
    
    // Load preferences on startup
    loadPreferences();
});