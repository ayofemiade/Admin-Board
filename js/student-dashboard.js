document.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelector(".content");
  const navLinks = document.querySelectorAll(".sidebar nav a");
  const modal = document.getElementById("complaint-modal");
  const closeModal = document.querySelector(".close-modal");

  // Initialize complaints if not exist
  if (!localStorage.getItem('studentComplaints')) {
    // Initialize with some sample data
    const sampleComplaints = [
      {
        id: "COMP-202304010001",
        title: "Broken chair in classroom",
        description: "Chair in the back row is broken and unsafe to sit on.",
        room: "A101",
        category: "civilworks",
        date: "2023-04-01",
        status: "submitted",
        updates: [
          {
            date: "2023-04-01",
            message: "Complaint submitted successfully.",
            status: "submitted"
          }
        ]
      },
      {
        id: "COMP-202304030002",
        title: "Noisy air conditioning",
        description: "The AC unit makes loud rattling noises during operation.",
        room: "B102",
        category: "electrical",
        date: "2023-04-03",
        status: "approved",
        updates: [
          {
            date: "2023-04-03",
            message: "Complaint submitted successfully.",
            status: "submitted"
          },
          {
            date: "2023-04-04",
            message: "Complaint approved and forwarded to maintenance team.",
            status: "approved"
          }
        ]
      },
      {
        id: "COMP-202304050003",
        title: "Leaking water fountain",
        description: "Water fountain near the gym is leaking and creating a slip hazard.",
        room: "C105",
        category: "plumbing",
        date: "2023-04-05",
        status: "with_admin",
        updates: [
          {
            date: "2023-04-05",
            message: "Complaint submitted successfully.",
            status: "submitted"
          },
          {
            date: "2023-04-06",
            message: "Complaint approved and forwarded to maintenance team.",
            status: "approved"
          },
          {
            date: "2023-04-07",
            message: "Escalated to administration for budget approval.",
            status: "with_admin"
          }
        ]
      },
      {
        id: "COMP-202304070004",
        title: "Poor Wi-Fi in dorms",
        description: "Wi-Fi signal is very weak in the east wing dormitories.",
        room: "B201",
        category: "electrical",
        date: "2023-04-07",
        status: "resolved",
        updates: [
          {
            date: "2023-04-07",
            message: "Complaint submitted successfully.",
            status: "submitted"
          },
          {
            date: "2023-04-08",
            message: "Complaint approved and forwarded to IT team.",
            status: "approved"
          },
          {
            date: "2023-04-10",
            message: "New Wi-Fi access point installed.",
            status: "resolved"
          }
        ]
      }
    ];
    saveComplaints(sampleComplaints);
  }

  // Navigation handling
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = e.target.closest("a").dataset.page;
      loadPage(page);
    });
  });

  // Modal handling
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // Load the home page by default
  loadPage("home");

  // Helper Functions
  function generateComplaintID() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 9000) + 1000;
    return `COMP-${year}${month}${day}${random}`;
  }

  function getCurrentDate() {
    const date = new Date();
    return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD format
  }

  function saveComplaints(complaints) {
    localStorage.setItem('studentComplaints', JSON.stringify(complaints));
  }

  function loadComplaintsFromStorage() {
    const storedComplaints = localStorage.getItem('studentComplaints');
    return storedComplaints ? JSON.parse(storedComplaints) : [];
  }

  function getStatusText(status) {
    switch (status) {
      case "submitted":
        return "Submitted";
      case "approved":
        return "Approved";
      case "with_admin":
        return "With Admin";
      case "resolved":
        return "Resolved";
      default:
        return "Unknown";
    }
  }

  function renderComplaintTimeline(updates) {
    let html = '<div class="timeline">';
    
    updates.forEach(update => {
      html += `
        <div class="timeline-item">
          <div class="timeline-date">${update.date}</div>
          <div class="timeline-status status-${update.status}">${getStatusText(update.status)}</div>
          <div class="timeline-message">${update.message}</div>
        </div>
      `;
    });
    
    html += '</div>';
    return html;
  }

  function filterComplaints(status) {
    const complaints = loadComplaintsFromStorage();
    return status === 'all' ? complaints : complaints.filter(c => c.status === status);
  }

  function searchComplaints(query) {
    const complaints = loadComplaintsFromStorage();
    if (!query) return complaints;
    
    const searchTerm = query.toLowerCase();
    
    return complaints.filter(c => 
      c.title.toLowerCase().includes(searchTerm) || 
      c.description.toLowerCase().includes(searchTerm) ||
      c.id.toLowerCase().includes(searchTerm)
    );
  }

  // Page Loading Function
  function loadPage(page) {
    // Clear current content
    content.innerHTML = "";

    switch (page) {
      case "home":
        content.innerHTML = `
          <div class="welcome-section">
            <h1>Welcome to Your Student Dashboard</h1>
            <p>Access all your student services in one place.</p>
          </div>
          <div class="feature-grid">
            <div class="feature-card">
              <i class="fas fa-file-alt"></i>
              <h3>Submit Complaints</h3>
              <p>Voice your concerns and help improve our campus.</p>
            </div>
            <div class="feature-card">
              <i class="fas fa-tasks"></i>
              <h3>Track Complaints</h3>
              <p>Stay updated on the status of your submitted complaints.</p>
            </div>
            <div class="feature-card">
              <i class="fas fa-hand-holding-usd"></i>
              <h3>Crowdfunding</h3>
              <p>Support and participate in campus improvement campaigns.</p>
            </div>
            <div class="feature-card">
              <i class="fas fa-bullhorn"></i>
              <h3>Announcements</h3>
              <p>Stay informed with the latest campus news and updates.</p>
            </div>
          </div>
        `;
        break;
      case "submit-complaint":
        content.innerHTML = `
          <h1>Submit a Complaint</h1>
          <form id="complaint-form">
            <label for="title">Complaint Title:</label>
            <input type="text" id="title" name="title" required>

            <label for="description">Complaint Description:</label>
            <textarea id="description" name="description" placeholder="Please describe your issue in detail" required></textarea>

            <label for="roomno">Room Number:</label>
            <select id="roomno" name="roomno" required>
              <option value="">Select your room number</option>
              <option value="A101">A101</option>
              <option value="A102">A102</option>
              <option value="A103">A103</option>
              <option value="A104">A104</option>
              <option value="A105">A105</option>
              <option value="A106">A106</option>
              <option value="B101">B101</option>
              <option value="B102">B102</option>
              <option value="B103">B103</option>
              <option value="B104">B104</option>
              <option value="B105">B105</option>
              <option value="B106">B106</option>
              <option value="B107">B107</option>
              <option value="B108">B108</option>
              <option value="B201">B201</option>
              <option value="B202">B202</option>
              <option value="B203">B203</option>
              <option value="B204">B204</option>
              <option value="B205">B205</option>
              <option value="B206">B206</option>
              <option value="B207">B207</option>
              <option value="B208">B208</option>
              <option value="B301">B301</option>
              <option value="C101">C101</option>
              <option value="C102">C102</option>
              <option value="C103">C103</option>
              <option value="C104">C104</option>
              <option value="C105">C105</option>
              <option value="C106">C106</option>
              <option value="C107">C107</option>
              <option value="C108">C108</option>
              <option value="C201">C201</option>
              <option value="Common">Common Area</option>
            </select>

            <label for="category">Category:</label>
            <select id="category" name="category" required>
              <option value="">Select a category</option>
              <option value="civilworks">CIVIL WORKS</option>
              <option value="electrical">ELECTRICAL</option>
              <option value="plumbing">PLUMBING</option>
              <option value="network">NETWORK</option>
              <option value="furniture">FURNITURE</option>
              <option value="other">OTHER</option>
            </select>

            <label for="file">File Upload (optional):</label>
            <input type="file" id="file" name="file">

            <button type="submit">Submit Complaint</button>
          </form>
        `;
        document
          .getElementById("complaint-form")
          .addEventListener("submit", handleComplaintSubmit);
        break;
      case "track-complaints":
        content.innerHTML = `
          <h1>Track My Complaints</h1>
          <div class="controls">
            <div class="filter-controls">
              <button class="filter-button active" data-filter="all">All</button>
              <button class="filter-button" data-filter="submitted">Submitted</button>
              <button class="filter-button" data-filter="approved">Approved</button>
              <button class="filter-button" data-filter="with_admin">With Admin</button>
              <button class="filter-button" data-filter="resolved">Resolved</button>
            </div>
            <div class="search-control">
              <input type="text" id="search-complaints" placeholder="Search complaints...">
            </div>
          </div>
          <table id="complaints-table">
            <thead>
              <tr>
                <th>Complaint ID</th>
                <th>Title</th>
                <th>Submission Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <!-- Complaints will be dynamically added here -->
            </tbody>
          </table>
          <p id="no-complaints" style="display: none; text-align: center; margin-top: 20px;">No complaints found.</p>
        `;
        loadComplaints();
        
        // Add event listeners for filters and search
        document.querySelectorAll('.filter-button').forEach(btn => {
          btn.addEventListener('click', (e) => {
            // Remove active class from all buttons
            document.querySelectorAll('.filter-button').forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            e.target.classList.add('active');
            // Apply filter
            const filter = e.target.dataset.filter;
            applyFiltersAndSearch(filter, document.getElementById('search-complaints').value);
          });
        });
        
        document.getElementById('search-complaints').addEventListener('input', (e) => {
          const activeFilter = document.querySelector('.filter-button.active').dataset.filter;
          applyFiltersAndSearch(activeFilter, e.target.value);
        });
        break;
      case "crowdfunding":
        content.innerHTML = `
          <h1>Crowdfunding Campaigns</h1>
          <div id="current-campaign">
            <!-- Current campaign will be dynamically added here -->
          </div>
        `;
        loadCrowdfundingCampaign();
        break;
      case "announcements":
        content.innerHTML = `
          <h1>Announcements</h1>
          <div id="announcements-list">
            <!-- Announcements will be dynamically added here -->
          </div>
        `;
        loadAnnouncements();
        break;
      case "notifications":
        content.innerHTML = `
          <h1>Notifications</h1>
          <button class="clear-notifications">Clear All Notifications</button>
          <div id="notifications-list">
            <!-- Notifications will be dynamically added here -->
          </div>
        `;
        loadNotifications();
        document
          .querySelector(".clear-notifications")
          .addEventListener("click", clearNotifications);
        break;
    }
  }

  // Handle form submission
  function handleComplaintSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const room = form.roomno.value;
    const category = form.category.value;
    
    const newComplaint = {
      id: generateComplaintID(),
      title,
      description,
      room,
      category,
      date: getCurrentDate(),
      status: 'submitted',
      updates: [{
        date: getCurrentDate(),
        message: 'Complaint submitted successfully.',
        status: 'submitted'
      }]
    };
    
    // Get existing complaints
    const complaints = loadComplaintsFromStorage();
    
    // Add the new complaint
    complaints.push(newComplaint);
    
    // Save back to storage
    saveComplaints(complaints);
    
    // Show success message
    alert('Complaint submitted successfully! Your complaint ID is: ' + newComplaint.id);
    
    // Add a notification
    addNotification(`Your complaint #${newComplaint.id} has been submitted.`);
    
    // Reset form
    form.reset();
  }

  // Load and display complaints
  function loadComplaints(filterStatus = 'all', searchQuery = '') {
    let complaints;
    
    if (searchQuery) {
      complaints = searchComplaints(searchQuery);
      if (filterStatus !== 'all') {
        complaints = complaints.filter(c => c.status === filterStatus);
      }
    } else {
      complaints = filterStatus === 'all' ? loadComplaintsFromStorage() : filterComplaints(filterStatus);
    }

    const tbody = document.querySelector("#complaints-table tbody");
    const noComplaints = document.getElementById("no-complaints");
    
    tbody.innerHTML = '';
    
    if (complaints.length === 0) {
      noComplaints.style.display = 'block';
      return;
    }
    
    noComplaints.style.display = 'none';
    
    // Sort complaints by date (newest first)
    complaints.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    complaints.forEach((complaint) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${complaint.id}</td>
        <td>${complaint.title}</td>
        <td>${complaint.date}</td>
        <td><span class="status-badge status-${complaint.status}">${getStatusText(complaint.status)}</span></td>
        <td>
          <button class="action-button" onclick="viewComplaintDetails('${complaint.id}')">View Details</button>
          ${complaint.status === "submitted" ? 
            `<button class="action-button delete" onclick="withdrawComplaint('${complaint.id}')">Withdraw</button>` : 
            ''}
        </td>
      `;
      tbody.appendChild(row);
    });
  }

  // Apply filters and search to complaints table
  function applyFiltersAndSearch(filterStatus, searchQuery) {
    loadComplaints(filterStatus, searchQuery);
  }

  // View complaint details
  window.viewComplaintDetails = function(complaintID) {
    const complaints = loadComplaintsFromStorage();
    const complaint = complaints.find(c => c.id === complaintID);
    
    if (!complaint) {
      alert('Complaint not found!');
      return;
    }
    
    modal.style.display = "block";
    const modalContent = modal.querySelector(".modal-content");
    
    modalContent.innerHTML = `
      <span class="close-modal">&times;</span>
      <h2>Complaint Details</h2>
      <div class="complaint-details">
        <div class="detail-row">
          <div class="detail-label">Complaint ID:</div>
          <div class="detail-value">${complaint.id}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Title:</div>
          <div class="detail-value">${complaint.title}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Description:</div>
          <div class="detail-value">${complaint.description}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Room:</div>
          <div class="detail-value">${complaint.room}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Category:</div>
          <div class="detail-value">${complaint.category.toUpperCase()}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Submission Date:</div>
          <div class="detail-value">${complaint.date}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Current Status:</div>
          <div class="detail-value status-${complaint.status}">${getStatusText(complaint.status)}</div>
        </div>
      </div>
      <h3>Complaint Timeline</h3>
      ${renderComplaintTimeline(complaint.updates)}
    `;
    
    // Re-attach the close button event
    modal.querySelector(".close-modal").addEventListener("click", () => {
      modal.style.display = "none";
    });
  };

  // Withdraw complaint
  window.withdrawComplaint = function(complaintID) {
    if (!confirm('Are you sure you want to withdraw this complaint?')) {
      return;
    }
    
    const complaints = loadComplaintsFromStorage();
    const updatedComplaints = complaints.filter(c => c.id !== complaintID);
    
    saveComplaints(updatedComplaints);
    addNotification(`Your complaint #${complaintID} has been withdrawn.`);
    
    // Reload the complaints table
    const activeFilter = document.querySelector('.filter-button.active').dataset.filter;
    const searchQuery = document.getElementById('search-complaints').value;
    applyFiltersAndSearch(activeFilter, searchQuery);
  };

  // Notifications functions
  function addNotification(message) {
    let notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    
    notifications.push({
      id: Date.now(),
      message,
      date: getCurrentDate(),
      read: false
    });
    
    localStorage.setItem('notifications', JSON.stringify(notifications));
    
    // Update notification counter
    updateNotificationCounter();
  }

  function loadNotifications() {
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const notificationsList = document.getElementById('notifications-list');
    
    if (notifications.length === 0) {
      notificationsList.innerHTML = '<p class="no-data">No notifications.</p>';
      return;
    }
    
    // Sort notifications by date (newest first)
    notifications.sort((a, b) => b.id - a.id);
    
    notificationsList.innerHTML = '';
    
    notifications.forEach(notification => {
      const notificationItem = document.createElement('div');
      notificationItem.className = `notification-item ${notification.read ? 'read' : 'unread'}`;
      notificationItem.innerHTML = `
        <div class="notification-content">
          <p>${notification.message}</p>
          <span class="notification-date">${notification.date}</span>
        </div>
        <button class="mark-read" data-id="${notification.id}">${notification.read ? 'Mark Unread' : 'Mark Read'}</button>
      `;
      notificationsList.appendChild(notificationItem);
    });
    
    // Mark all as read
    const allNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    allNotifications.forEach(notification => {
      notification.read = true;
    });
    localStorage.setItem('notifications', JSON.stringify(allNotifications));
    
    // Update the notification counter
    updateNotificationCounter();
    
    // Add event listeners to mark read/unread buttons
    document.querySelectorAll('.mark-read').forEach(button => {
      button.addEventListener('click', function() {
        const notificationId = parseInt(this.dataset.id);
        toggleNotificationReadStatus(notificationId);
      });
    });
  }

  function toggleNotificationReadStatus(notificationId) {
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const notification = notifications.find(n => n.id === notificationId);
    
    if (notification) {
      notification.read = !notification.read;
      localStorage.setItem('notifications', JSON.stringify(notifications));
      loadNotifications();
    }
  }

  function clearNotifications() {
    if (!confirm('Are you sure you want to clear all notifications?')) {
      return;
    }
    
    localStorage.setItem('notifications', JSON.stringify([]));
    loadNotifications();
    updateNotificationCounter();
  }

  function updateNotificationCounter() {
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const unreadCount = notifications.filter(n => !n.read).length;
    
    const counter = document.querySelector('.notification-counter');
    
    if (counter) {
      counter.textContent = unreadCount;
      counter.style.display = unreadCount > 0 ? 'flex' : 'none';
    }
  }

  // Crowdfunding functions
  function loadCrowdfundingCampaign() {
    // Check if there's a campaign in local storage
    let campaign = JSON.parse(localStorage.getItem('currentCampaign') || 'null');
    
    // If no campaign exists, create a sample one
    if (!campaign) {
      campaign = {
        title: "New Computer Lab Equipment",
        description: "Help us upgrade our computer lab with the latest technology to enhance learning experiences.",
        goal: 5000,
        current: 2750,
        daysLeft: 15,
        backers: 78,
        updates: [
          {
            date: "2023-03-28",
            message: "Campaign launched! We're excited to upgrade our computer lab."
          },
          {
            date: "2023-04-01",
            message: "We've reached 50% of our goal! Thank you to all who have contributed so far."
          }
        ]
      };
      localStorage.setItem('currentCampaign', JSON.stringify(campaign));
    }
    
    const percentageFunded = Math.min(100, Math.round((campaign.current / campaign.goal) * 100));
    
    document.getElementById('current-campaign').innerHTML = `
      <div class="campaign-card">
        <h2>${campaign.title}</h2>
        <p class="campaign-description">${campaign.description}</p>
        
        <div class="campaign-progress">
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${percentageFunded}%"></div>
          </div>
          <div class="progress-stats">
            <div class="stat">
              <span class="stat-value">$${campaign.current.toLocaleString()}</span>
              <span class="stat-label">of $${campaign.goal.toLocaleString()} goal</span>
            </div>
            <div class="stat">
              <span class="stat-value">${percentageFunded}%</span>
              <span class="stat-label">funded</span>
            </div>
            <div class="stat">
              <span class="stat-value">${campaign.backers}</span>
              <span class="stat-label">backers</span>
            </div>
            <div class="stat">
              <span class="stat-value">${campaign.daysLeft}</span>
              <span class="stat-label">days left</span>
            </div>
          </div>
        </div>
        
        <form id="contribute-form">
          <h3>Support This Campaign</h3>
          <div class="form-row">
            <input type="number" id="contribution-amount" min="1" value="10" placeholder="Contribution amount ($)">
            <button type="submit">Contribute</button>
          </div>
        </form>
        
        <div class="campaign-updates">
          <h3>Campaign Updates</h3>
          ${campaign.updates.map(update => `
            <div class="update-item">
              <div class="update-date">${update.date}</div>
              <div class="update-message">${update.message}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    
    // Add event listener for contribution
    document.getElementById('contribute-form').addEventListener('submit', function(e) {
      e.preventDefault();
      const amount = parseInt(document.getElementById('contribution-amount').value);
      
      if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid contribution amount.');
        return;
      }
      
      // Update campaign data
      campaign.current += amount;
      campaign.backers += 1;
      
      // Add an update if it's a significant contribution
      if (amount >= 100) {
        campaign.updates.push({
          date: getCurrentDate(),
          message: `A generous contribution of $${amount} has been received!`
        });
      }
      
      // Save updated campaign
      localStorage.setItem('currentCampaign', JSON.stringify(campaign));
      
      // Add notification
      addNotification(`Thank you for your $${amount} contribution to "${campaign.title}"!`);
      
      // Reload the campaign
      loadCrowdfundingCampaign();
    });
  }

  // Announcements functions
  function loadAnnouncements() {
    // Check if there are announcements in local storage
    let announcements = JSON.parse(localStorage.getItem('announcements') || 'null');
    
    // If no announcements exist, create sample ones
    if (!announcements) {
      announcements = [
        {
          id: 1,
          title: "Campus Maintenance Schedule",
          body: "The annual campus maintenance will be conducted from April 15-20. Some facilities may be temporarily unavailable during this period.",
          date: "2023-04-05",
          important: true
        },
        {
          id: 2,
          title: "New Campus Wi-Fi System",
          body: "We're pleased to announce that the new campus-wide Wi-Fi system has been installed. The new network name is 'Campus-Connect' and the password remains the same.",
          date: "2023-04-03",
          important: false
        },
        {
          id: 3,
          title: "Student Council Elections",
          body: "Student Council elections will be held next month. Nominations are now open. Please submit your nominations by April 25.",
          date: "2023-04-01",
          important: true
        }
      ];
      localStorage.setItem('announcements', JSON.stringify(announcements));
    }
    
    // Sort announcements by date (newest first)
    announcements.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    document.getElementById('announcements-list').innerHTML = announcements.map(announcement => `
      <div class="announcement-card ${announcement.important ? 'important' : ''}">
        ${announcement.important ? '<div class="important-badge">Important</div>' : ''}
        <h2>${announcement.title}</h2>
        <div class="announcement-date">${announcement.date}</div>
        <p>${announcement.body}</p>
      </div>
    `).join('');
  }

  // Initialize notification counter
  updateNotificationCounter();
});