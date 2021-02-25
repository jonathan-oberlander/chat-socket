const socket = io();
const chatForm = document.getElementById("chat-form");

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = e.target.elements.msg.value;
  socket.emit("chatMessage", msg);
});

socket.on("message", (msg) => {
  console.log(msg);
  displayMessage(msg);
});

const displayMessage = (msg) => {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `
    <p class="meta">Mary <span>9:15pm</span></p>
    <p class="text">
      ${msg}
    </p>
  `;
  document.querySelector(".chat-messages").appendChild(div);
};
