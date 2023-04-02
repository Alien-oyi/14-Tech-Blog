const deleteButtons = document.querySelectorAll(".del-btn");
  console.log(deleteButtons);
for (let i = 0; i < deleteButtons.length; i++) {
  
  deleteButtons[i].addEventListener("click", async (event) => {
    event.preventDefault();
    const postId = event.target.getAttribute("data-blogId");    
    const response = await fetch(`/post/${postId}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
       console.log(response);
        if (response.ok) {
          document.location.replace("/Dashboard");
        } else {
          alert("Failed To Delete.");
        }
      });
  }
