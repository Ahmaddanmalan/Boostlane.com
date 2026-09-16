function showMessage(serviceName) {
  const message = document.getElementById("message");

  message.textContent =
    "You selected " +
    serviceName +
    ". Contact us to learn more.";
}