export function showAlert(message, type = "success") {
  const container = document.getElementById("alert-container");

  const alertEl = document.createElement("div");
  alertEl.className = `alert ${type}`;
  alertEl.textContent = message;

  container.appendChild(alertEl);

  // Auto remove after animation
  setTimeout(() => {
    alertEl.remove();
  }, 3000);
}
