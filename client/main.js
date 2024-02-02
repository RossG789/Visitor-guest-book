const form = document.getElementById("form");

const messageBoard = document.getElementById("message-board");

const defaultURL = "http://localhost:1111";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const messageData = Object.fromEntries(formData);

  const response = await fetch(`${defaultURL}/messages`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(messageData),
  });
  if (response.ok) {
    displayMessages();
  } else {
    console.log("Message not added", response.status);
  }
});

async function fetchMessages() {
  const messages = await fetch(`${defaultURL}/messages`);
  let result = await messages.json();
  return result;
}

async function displayMessages() {
  let messages = await fetchMessages();
  messageBoard.innerHTML = "";
  messages.forEach((message) => {
    let h2Name = document.createElement("h2");
    let pDate = document.createElement("p");
    let pMessage = document.createElement("p");
    let deletePost = document.createElement("p");

    h2Name.textContent = message.name;
    pDate.textContent = message.date;
    pMessage.textContent = message.message;
    deletePost.textContent = "X";

    messageBoard.appendChild(h2Name);
    messageBoard.appendChild(pDate);
    messageBoard.appendChild(pMessage);
    messageBoard.appendChild(deletePost);

    deletePost.addEventListener("click", (e) => {
      e.preventDefault();
      handleDelete(message.id);
    });
  });
}

displayMessages();

async function handleDelete(id) {
  const result = await fetch(`${defaultURL}/messages/${id}`, {
    method: "DELETE",
  });
  if (result.ok) {
    displayMessages();
  }
}
