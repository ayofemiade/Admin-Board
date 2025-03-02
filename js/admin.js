document.addEventListener('DOMContentLoaded', () => {
    const username = document.getElementById('username');
    const addButtons = document.querySelectorAll('.add-btn');
    const editButtons = document.querySelectorAll('.edit-btn');
    const deleteButtons = document.querySelectorAll('.delete-btn');
    const modalOverlay = document.getElementById('modal-overlay');
    const closeModalBtn = document.querySelector('.close-modal');
    const cancelModalBtn = document.querySelector('.cancel-btn');
    const adminForm = document.getElementById('admin-form');
    const logoutBtn = document.querySelector('.logout');
    const changePasswordBtn = document.querySelector('.change-password');
    const viewLogsBtn = document.querySelector('.view-logs-btn');

    // Mock username (replace with actual authentication)
    username.textContent = 'Admin User';

    // Modal functionality
    function openModal(title, formType) {
        modalOverlay.classList.remove('hidden');
        document.querySelector('.modal-header h4').textContent = title;
        
        // Reset form
        adminForm.reset();
        adminForm.dataset.formType = formType;

        // Customize form based on type
        const inputField = adminForm.querySelector('input');
        switch(formType) {
            case 'add':
                inputField.placeholder = 'Enter name';
                break;
            case 'change-password':
                adminForm.innerHTML = `
                    <input type="password" placeholder="Current Password" required>
                    <input type="password" placeholder="New Password" required>
                    <input type="password" placeholder="Confirm New Password" required>
                    <div class="form-actions">
                        <button type="submit" class="submit-btn">Change Password</button>
                        <button type="button" class="cancel-btn">Cancel</button>
                    </div>
                `;
                break;
            case 'logs':
                adminForm.innerHTML = `
                    <div class="logs-container">
                        <div class="log-entry">
                            <strong>Jan 31, 2025 10:45 AM</strong>
                            <p>User login: Admin User</p>
                        </div>
                        <div class="log-entry">
                            <strong>Jan 31, 2025 09:30 AM</strong>
                            <p>Category "Civil Works" updated</p>
                        </div>
                        <div class="log-entry">
                            <strong>Jan 30, 2025 14:20 PM</strong>
                            <p>User "Peter Hall" added</p>
                        </div>
                    </div>
                `;
                break;
        }
    }

    function closeModal() {
        modalOverlay.classList.add('hidden');
        adminForm.reset();
    }

    // Event Listeners
    addButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const section = e.target.dataset.section;
            openModal(`Add New ${section.charAt(0).toUpperCase() + section.slice(1)}`, 'add');
            adminForm.dataset.section = section;
        });
    });

    editButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const itemName = e.target.closest('.user-item, .category-item').querySelector('span').textContent;
            openModal('Edit Item', 'add');
            adminForm.querySelector('input').value = itemName;
            adminForm.dataset.action = 'edit';
        });
    });

    deleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const item = e.target.closest('.user-item, .category-item');
            if(confirm('Are you sure you want to delete this item?')) {
                item.remove();
            }
        });
    });

    // Change Password Handler
    changePasswordBtn.addEventListener('click', () => {
        openModal('Change Password', 'change-password');
    });

    // View Logs Handler
    viewLogsBtn.addEventListener('click', () => {
        openModal('System Logs', 'logs');
    });

    closeModalBtn.addEventListener('click', closeModal);

    adminForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formType = e.target.dataset.formType;

        switch(formType) {
            case 'add':
                handleAddItem(e);
                break;
            case 'change-password':
                handlePasswordChange(e);
                break;
        }
    });

    function handleAddItem(e) {
        const action = e.target.dataset.action;
        const section = e.target.dataset.section;
        const inputValue = e.target.querySelector('input').value;

        if (action === 'add') {
            const container = document.querySelector(`.${section}-subtext`);
            const newItem = document.createElement('div');
            newItem.classList.add(`${section.slice(0, -1)}-item`);
            newItem.innerHTML = `
                <span>${inputValue}</span>
                <div class="user-actions">
                    <button class="edit-btn"><i class="fas fa-pen"></i> Edit</button>
                    <button class="delete-btn"><i class="fas fa-trash"></i> Delete</button>
                </div>
            `;
            container.appendChild(newItem);
        } else if (action === 'edit') {
            const currentItem = document.querySelector('.user-item:focus, .category-item:focus');
            if (currentItem) {
                currentItem.querySelector('span').textContent = inputValue;
            }
        }

        closeModal();
    }

    function handlePasswordChange(e) {
        const inputs = Array.from(e.target.querySelectorAll('input'));
        const [currentPass, newPass, confirmPass] = inputs.map(input => input.value);

        // Basic validation
        if (newPass !== confirmPass) {
            alert('New passwords do not match!');
            return;
        }

        if (newPass.length < 8) {
            alert('Password must be at least 8 characters long!');
            return;
        }

        // In a real application, this would involve server-side validation
        alert('Password changed successfully!');
        closeModal();
    }

    logoutBtn.addEventListener('click', () => {
        if(confirm('Are you sure you want to log out?')) {
            // Implement actual logout functionality
            alert('Logging out...');
            // Redirect to login page or clear session
            window.location.href = 'login.html';
        }
    });
});