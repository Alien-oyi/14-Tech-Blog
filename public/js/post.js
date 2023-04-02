const postFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#new-blog-title").value.trim();
  const content = document.querySelector("#new-description").value.trim();

  if (title && content) {
    const response = await fetch("/post", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/Dashboard");
    } else {
      alert("Failed to post new blog.");
    }
  } else  {
    console.log(Error)
  }
};


document
  .querySelector("#button-addon2")
  .addEventListener("click", postFormHandler);


