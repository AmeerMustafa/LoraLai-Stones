// Project Gallery System - Opens projects in new tabs with all images
class ProjectGallery {
  constructor() {
    this.projects = {
      'proj1': {
        name: 'Premium Travertine Installation',
        description: 'Sophisticated office space featuring premium travertine wall panels with integrated LED lighting and modern pendant fixtures. This project showcases our expertise in creating luxurious, professional environments.',
        images: [
          'assets/Proj 1/WhatsApp Image 2025-08-19 at 12.04.58_b3ce2b0e.jpg',
          'assets/Proj 1/WhatsApp Image 2025-07-03 at 08.11.36_91899b97.jpg',
          'assets/Proj 1/WhatsApp Image 2025-07-03 at 08.11.35_15b3adda.jpg'
        ]
      },
      'proj2': {
        name: 'Modern Marble Application',
        description: 'Contemporary design featuring travertine marble walls with dramatic lighting and sleek modern aesthetics. Demonstrates the versatility and beauty of our natural stone in high-end interior applications.',
        images: [
          'assets/Proj 2/main proj.jpg',
          'assets/Proj 2/WhatsApp Image 2025-08-19 at 12.05.00_c712184a.jpg',
          'assets/Proj 2/WhatsApp Image 2025-08-19 at 12.04.59_d372b568.jpg',
          'assets/Proj 2/WhatsApp Image 2025-07-03 at 08.11.35_75639e25.jpg'
        ]
      },
      'proj3': {
        name: 'Elegant Wall Installation',
        description: 'Stunning travertine wall installation showcasing the natural beauty and versatility of our premium stone. Features clean lines and sophisticated design elements.',
        images: [
          'assets/proj 3/wall 1.jpg',
          'assets/proj 3/wall 2.jpg',
          'assets/proj 3/wall 3.jpg'
        ]
      }
    };
  }

  // Open project gallery in new tab
  openProjectGallery(projectId) {
    const project = this.projects[projectId];
    if (!project) {
      console.error('Project not found:', projectId);
      return;
    }

    // Create new window/tab
    const newWindow = window.open('', '_blank');
    
    // Generate HTML for the gallery page
    const galleryHTML = this.generateGalleryHTML(project, projectId);
    
    // Write HTML to new window
    newWindow.document.write(galleryHTML);
    newWindow.document.close();
  }

  // Generate HTML for gallery page
  generateGalleryHTML(project, projectId) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${project.name} - Loralai Stones Gallery</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    :root {
      --font-sans: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, "Helvetica Neue", Arial, "Noto Sans";
      --text: #0a0a0a;
      --muted: #5c5c5c;
      --bg: #f7f7f5;
      --surface: #ffffff;
      --line: rgba(10,10,10,0.08);
      --radius-xl: 24px;
      --shadow-card: 0 6px 18px rgba(0,0,0,0.06);
      --maxw: 1200px;
      --pad: 20px;
    }
    
    * { box-sizing: border-box; }
    
    body {
      margin: 0;
      padding: 0;
      background: linear-gradient(120deg, #ffffff, #f1f1ed) fixed;
      color: var(--text);
      font-family: var(--font-sans);
      -webkit-font-smoothing: antialiased;
      line-height: 1.6;
    }
    
    .container {
      max-width: var(--maxw);
      margin: auto;
      padding: 0 var(--pad);
    }
    
    .header {
      padding: 40px 0;
      border-bottom: 1px solid var(--line);
      background: rgba(255,255,255,0.8);
      backdrop-filter: blur(8px);
      position: sticky;
      top: 0;
      z-index: 10;
    }
    
    .brand {
      font-weight: 700;
      letter-spacing: 0.06em;
      margin-bottom: 8px;
    }
    
    .project-title {
      font-size: clamp(24px, 3vw, 36px);
      margin: 0 0 12px;
      line-height: 1.2;
    }
    
    .project-description {
      color: var(--muted);
      max-width: 60ch;
      margin: 0;
    }
    
    .gallery {
      padding: 60px 0;
    }
    
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 28px;
      margin-top: 40px;
    }
    
    .image-card {
      background: var(--surface);
      border: 1px solid var(--line);
      border-radius: var(--radius-xl);
      box-shadow: var(--shadow-card);
      overflow: hidden;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    
    .image-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 32px rgba(0,0,0,0.12);
    }
    
    .image-card img {
      width: 100%;
      height: 250px;
      object-fit: cover;
      display: block;
      cursor: pointer;
    }
    
    .image-info {
      padding: 18px;
    }
    
    .image-title {
      font-weight: 600;
      margin: 0 0 8px;
      font-size: 16px;
    }
    
    .image-number {
      color: var(--muted);
      font-size: 14px;
      margin: 0;
    }
    
    .back-link {
      display: inline-flex;
      align-items: center;
      color: var(--text);
      text-decoration: none;
      padding: 12px 20px;
      border: 1px solid var(--line);
      border-radius: 999px;
      background: var(--surface);
      transition: all 0.2s ease;
      margin-bottom: 20px;
    }
    
    .back-link:hover {
      background: var(--text);
      color: white;
    }
    
    .lightbox {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.9);
      z-index: 1000;
      cursor: pointer;
    }
    
    .lightbox img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      max-width: 90%;
      max-height: 90%;
      object-fit: contain;
    }
    
    .close-lightbox {
      position: absolute;
      top: 20px;
      right: 30px;
      color: white;
      font-size: 40px;
      cursor: pointer;
      z-index: 1001;
    }
    
    @media (max-width: 768px) {
      .gallery-grid {
        grid-template-columns: 1fr;
      }
      
      .image-card img {
        height: 200px;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="container">
      <a href="#" onclick="window.close(); return false;" class="back-link">← Back to Main Site</a>
      <div class="brand">LORALAI STONES</div>
      <h1 class="project-title">${project.name}</h1>
      <p class="project-description">${project.description}</p>
    </div>
  </div>
  
  <div class="gallery">
    <div class="container">
      <div class="gallery-grid">
        ${project.images.map((image, index) => `
          <div class="image-card">
            <img src="${image}" alt="${project.name} - Image ${index + 1}" onclick="openLightbox('${image}')">
            <div class="image-info">
              <h3 class="image-title">${project.name}</h3>
              <p class="image-number">Image ${index + 1} of ${project.images.length}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </div>
  
  <div id="lightbox" class="lightbox" onclick="closeLightbox()">
    <span class="close-lightbox" onclick="closeLightbox()">&times;</span>
    <img id="lightbox-img" src="" alt="">
  </div>
  
  <script>
    function openLightbox(imageSrc) {
      document.getElementById('lightbox').style.display = 'block';
      document.getElementById('lightbox-img').src = imageSrc;
      document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
      document.getElementById('lightbox').style.display = 'none';
      document.body.style.overflow = 'auto';
    }
    
    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeLightbox();
      }
    });
  </script>
</body>
</html>`;
  }
}

// Initialize project gallery system
document.addEventListener('DOMContentLoaded', function() {
  window.projectGallery = new ProjectGallery();
  
  // Add click handlers to project cards for new tab functionality
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    const projectId = card.dataset.projectId;
    if (projectId) {
      card.addEventListener('click', function(e) {
        // Check if clicked element is not a direct image link
        if (!e.target.closest('a[target="_blank"]')) {
          e.preventDefault();
          window.projectGallery.openProjectGallery(projectId);
        }
      });
      
      // Add cursor pointer style
      card.style.cursor = 'pointer';
    }
  });
});

// Global functions for accessing projects (including hidden Project 3)
window.openProject1 = function() {
  window.projectGallery.openProjectGallery('proj1');
};

window.openProject2 = function() {
  window.projectGallery.openProjectGallery('proj2');
};

window.openProject3 = function() {
  window.projectGallery.openProjectGallery('proj3');
};

// Convenience function to open any project by ID
window.openProject = function(projectId) {
  window.projectGallery.openProjectGallery(projectId);
};

// List all available projects
window.listProjects = function() {
  console.log('Available projects:');
  console.log('- proj1: Premium Travertine Installation');
  console.log('- proj2: Modern Marble Application');
  console.log('- proj3: Elegant Wall Installation (hidden from main page)');
  console.log('\nUse openProject("projectId") or openProject1(), openProject2(), openProject3() to view galleries.');
};
