// Wait for the A-Frame scene to load
document.addEventListener("DOMContentLoaded", () => {
    // Hide loading screen when everything is loaded
    window.addEventListener("load", () => {
      const loadingScreen = document.getElementById("loadingScreen")
      setTimeout(() => {
        loadingScreen.style.opacity = "0"
        setTimeout(() => {
          loadingScreen.style.display = "none"
        }, 500)
      }, 1000)
    })
  
    // Import AFRAME if not already included (check if AFRAME is defined)
    if (typeof AFRAME === "undefined") {
      console.error("AFRAME is not defined. Please include the AFRAME library in your HTML file.")
      return // Stop execution if AFRAME is not found
    }
  
    // Register custom component for project links
    AFRAME.registerComponent("project-link", {
      schema: {
        url: { type: "string", default: "" },
      },
  
      init: function () {
        const data = this.data
        const el = this.el
  
        el.addEventListener("click", () => {
          window.open(data.url, "_blank")
        })
  
        // Change cursor on hover
        el.addEventListener("mouseenter", () => {
          const cursor = document.querySelector("[cursor]")
          if (cursor) {
            cursor.setAttribute("material", "color", "#5DADEC")
            cursor.setAttribute("scale", "1.2 1.2 1.2")
          }
        })
  
        el.addEventListener("mouseleave", () => {
          const cursor = document.querySelector("[cursor]")
          if (cursor) {
            cursor.setAttribute("material", "color", "white")
            cursor.setAttribute("scale", "1 1 1")
          }
        })
      },
    })
  
    // Navigation buttons functionality
    const navButtons = document.querySelectorAll(".nav-btn")
    const camera = document.getElementById("rig")
  
    // Define positions for each section
    const positions = {
      home: { x: 0, y: 1.6, z: 0 },
      about: { x: -6, y: 1.6, z: -3 },
      projects: { x: 0, y: 0, z: -12 },
      contact: { x: 6, y: 1.6, z: -3 },
    }
  
    navButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const target = this.getAttribute("data-target")
        const position = positions[target]
  
        // Animate camera movement
        animateCameraMove(position)
      })
    })
  
    function animateCameraMove(targetPosition) {
      // Get current position
      const currentPosition = camera.getAttribute("position")
  
      // Calculate animation duration based on distance
      const distance = calculateDistance(currentPosition, targetPosition)
      const duration = Math.min(Math.max(distance * 100, 1000), 3000) // Between 1-3 seconds
  
      // Create animation
      camera.setAttribute("animation", {
        property: "position",
        to: `${targetPosition.x} ${targetPosition.y} ${targetPosition.z}`,
        dur: duration,
        easing: "easeInOutQuad",
      })
    }
  
    function calculateDistance(pos1, pos2) {
      return Math.sqrt(Math.pow(pos2.x - pos1.x, 2) + Math.pow(pos2.y - pos1.y, 2) + Math.pow(pos2.z - pos1.z, 2))
    }
  
    // Add subtle floating animation to projects
    const projects = document.querySelectorAll(".project")
    projects.forEach((project, index) => {
      const initialY = project.getAttribute("position").y
      const delay = index * 500 // Stagger the animations
  
      project.setAttribute("animation", {
        property: "position",
        dir: "alternate",
        dur: 2000,
        easing: "easeInOutSine",
        loop: true,
        from: `${project.getAttribute("position").x} ${initialY} ${project.getAttribute("position").z}`,
        to: `${project.getAttribute("position").x} ${initialY + 0.1} ${project.getAttribute("position").z}`,
        delay: delay,
      })
    })
  })
  
  