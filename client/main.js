const form = document.getElementById("form");

const messageBoard = document.getElementById("message-board");

const defaultURL = "http://localhost:1111";

const newestRadio = document.getElementById("newest");
newestRadio.click();

// oldestRadio.addEventListener("click", (e) => {
//   console.log(e);
// });
// newestRadio.addEventListener("click", (e) => {
//   console.log(e);
// });

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const messageData = Object.fromEntries(formData);
  console.log(messageData);

  if (messageData.name === "" || messageData.message === "") {
    return;
  }

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

async function fetchMessages(order) {
  const messages = await fetch(`${defaultURL}/messages?sort=${order}`);
  let result = await messages.json();
  return result;
}

async function displayMessages(order = "newest") {
  // console.log(order);
  let messages = await fetchMessages(order);
  messageBoard.innerHTML = "";
  messages.forEach((message) => {
    let borderDiv = document.createElement("div");
    borderDiv.setAttribute("class", "message-field");
    let h2Name = document.createElement("h2");
    let pDate = document.createElement("p");
    let pMessage = document.createElement("p");
    let deletePost = document.createElement("p");
    deletePost.setAttribute("class", "remove-post");

    h2Name.textContent = message.name;
    pDate.textContent = message.date;
    pMessage.textContent = `${message.name} said "${message.message}"`;
    deletePost.textContent = "Delete Post";

    borderDiv.appendChild(h2Name);
    borderDiv.appendChild(pDate);
    borderDiv.appendChild(pMessage);

    messageBoard.appendChild(borderDiv);
    messageBoard.appendChild(deletePost);

    form.reset();

    deletePost.addEventListener("click", (e) => {
      e.preventDefault();
      handleDelete(message.id);
    });
  });
}

async function handleDelete(id) {
  const result = await fetch(`${defaultURL}/messages/${id}`, {
    method: "DELETE",
  });
  if (result.ok) {
    displayMessages();
  }
}
