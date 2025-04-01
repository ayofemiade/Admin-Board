document.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelector(".content");
  const navLinks = document.querySelectorAll(".sidebar nav a");

  // Navigation handling
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = e.target.closest("a").dataset.page;
      loadPage(page);
    });
  });

  // Load the home page by default
  loadPage("home");

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
                    <h1>Submit a Complaintt</h1>
                    <form id="complaint-form">
                        <label for="title">Complaint Title:</label>
                        <input type="text" id="title" name="title" placeholder="e.g Spoilt Locker" required>

                        <label for="description">Complaint Description:</label>
                        <textarea id="description" name="description" placeholder="Provide a detailed description of what needs to be fixed" required></textarea>
                        
                        <label for="urgencylevel">Urgency Level</label>
                        <select id="urgencylevel" name="urgencylevel" required>
                        <option value="">Select your the urgency level</option>
                        <option value="low">Low</option>
                        <option moderate="">Moderate</option>
                        <option critical="">Critical</option>   
                        </select>                     

                        <label for="roomno">Room Number:</label>
                        <select id="roomno" name="roomno" required>
                            <option value="">Select your room number</option>
                            <option value="a101">A101</option>
                            <option value="">A102</option>
                            <option value="">A103</option>
                            <option value="">A104</option>
                            <option value="">A105</option>
                            <option value="">A106</option>
                            <option value="">B101</option>
                            <option value="">B102</option>
                            <option value="">B103</option>
                            <option value="">B104</option>
                            <option value="">B105</option>
                            <option value="">B106</option>
                            <option value="">B107</option>
                            <option value="">B108</option>
                            <option value="">B201</option>
                            <option value="">B202</option>
                            <option value="">B203</option>
                            <option value="">B204</option>
                            <option value="">B205</option>
                            <option value="">B206</option>
                            <option value="">B207</option>
                            <option value="">B208</option>
                            <option value="">B301</option>
                            <option value="">C101</option>
                            <option value="">C102</option>
                            <option value="">C103</option>
                            <option value="">C104</option>
                            <option value="">C105</option>
                            <option value="">C106</option>
                            <option value="">C107</option>
                            <option value="">C108</option>
                            <option value="">C201</option>
                            </select>

                        <label for="category">Category:</label>
                        <select id="category" name="category" required>
                            <option value="">Select a category</option>
                            <option value="civilworks">CIVIL WORKS e.g Capentry, Nets, Doors etc</option>
                            <option value="electrical">ELECTRICAL e.g Bulbs, Fan, Sockets etc</option>
                            <option value="plumbing">PLUMBING e.g Pipes, Water Leakages</option>
                            <option value="csis">CSIS e.g WIFI</option>
                            <option value="mss">MSS e.g Theft, Assult, other security issues</option>
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
                `;
        loadComplaints();
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

  function handleComplaintSubmit(e) {
    e.preventDefault();
    // Here you would typically send the form data to a server 
    // const dateoftoday = new Date();
    // const curDate = dateoftoday.toDateString(); 
    alert("Complaint submitted successfully!");
    e.target.reset();
  }

  function loadComplaints() {
    // This would typically fetch data from a server
    const complaints = [
      {
        id: 1,
        title: "Broken chair in classroom",
        date: "2023-01-15",
        status: "submitted",
      },
      {
        id: 2,
        title: "Noisy air conditioning",
        date: "2023-03-02",
        status: "submitted",
      },
      {
        id: 3,
        title: "Outdated textbooks",
        date: "2023-05-05",
        status: "with_admin",
      },
      {
        id: 4,
        title: "Poor Wi-Fi in dorms",
        date: "2023-05-07",
        status: "resolved",
      },
    ];

    const tbody = document.querySelector("#complaints-table tbody");
    complaints.forEach((complaint) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${complaint.id}</td>
                <td>${complaint.title}</td>
                <td>${complaint.date}</td>
                <td><span class="status-badge status-${
                  complaint.status
                }">${getStatusText(complaint.status)}</span></td>
                <td>
                    <button onclick="viewComplaintDetails(${
                      complaint.id
                    })">View Details</button>
                    ${
                      complaint.status === "submitted"
                        ? `<button onclick="withdrawComplaint(${complaint.id})">Withdraw</button>`
                        : ""
                    }
                </td>
            `;
      tbody.appendChild(row);
    });
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

  function loadCrowdfundingCampaign() {
    // This would typically fetch data from a server
    const campaign = {
      title: "New Library Books",
      goal: 5000,
      current: 3500,
      endDate: "2023-06-30",
    };

    const campaignDiv = document.getElementById("current-campaign");
    campaignDiv.innerHTML = `
            <div class="card">
                <h2>${campaign.title}</h2>
                <p>Goal: $${campaign.goal}</p>
                <p>Current: $${campaign.current}</p>
                <p>End Date: ${campaign.endDate}</p>
                <progress value="${campaign.current}" max="${campaign.goal}"></progress>
            </div>
        `;
  }

  function loadAnnouncements() {
    // This would typically fetch data from a server
    const announcements = [
      {
        title: "Exam Schedule Released",
        date: "2023-05-10",
        content:
          "The final exam schedule has been released. Please check your student portal for details.",
      },
      {
        title: "Campus Closure",
        date: "2023-05-15",
        content: "The campus will be closed on May 20th for maintenance.",
      },
    ];

    const announcementsDiv = document.getElementById("announcements-list");
    if (announcements.length === 0) {
      announcementsDiv.innerHTML = "<p>No announcements at this time.</p>";
    } else {
      announcements.forEach((announcement) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
                    <h2>${announcement.title}</h2>
                    <p><small>${announcement.date}</small></p>
                    <p>${announcement.content}</p>
                `;
        announcementsDiv.appendChild(card);
      });
    }
  }

  function loadNotifications() {
    // This would typically fetch data from a server
    const notifications = [
      {
        id: 1,
        message: "Your complaint #1 has been updated.",
        date: "2023-05-12",
      },
      { id: 2, message: "New announcement posted.", date: "2023-05-13" },
    ];

    const notificationsDiv = document.getElementById("notifications-list");
    notifications.forEach((notification) => {
      const notificationElement = document.createElement("div");
      notificationElement.className = "notification";
      notificationElement.innerHTML = `
                <p>${notification.message}</p>
                <small>${notification.date}</small>
            `;
      notificationsDiv.appendChild(notificationElement);
    });
  }

  function clearNotifications() {
    // This would typically send a request to a server to clear notifications
    document.getElementById("notifications-list").innerHTML = "";
    alert("All notifications cleared!");
  }

  // These functions would be implemented to handle the respective actions
  window.viewComplaintDetails = (id) => {
    alert(`Viewing details for complaint #${id}`);
  };

  window.withdrawComplaint = (id) => {
    alert(`Withdrawing complaint #${id}`);
  };
});



// Mobile menu functionality
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.querySelector('.sidebar');

menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});

// Close menu when clicking on a link
document.querySelectorAll('.sidebar nav a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      sidebar.classList.remove('open');
    }
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (window.innerWidth <= 768 && 
      !sidebar.contains(e.target) && 
      e.target !== menuToggle && 
      !menuToggle.contains(e.target)) {
    sidebar.classList.remove('open');
  }
});