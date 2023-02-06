import { Button, Col } from "react-bootstrap";
import { API_URL } from "../../constants";

export const DeleteUser = ({ storedToken, storedUser }) => {
  const handleDeregister = () => {
    const userWarning = confirm(
      `You are going to delete your account. All information will be lost and cannot be recovered. Are you sure?`
    );

    userWarning === false
      ? alert("Great decision. Keep choosing your favorite movies")
      : fetch(`${API_URL}/users/${storedUser.Username}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (response.ok) {
              alert("Account successfully deleted");
              localStorage.clear();
              window.location.reload();
            } else {
              alert("Something went wrong");
            }
          })
          .catch((e) => console.log(e));
  };

  return (
    <Col md={5} className="mt-3 text-center px-4">
      <div>
        <Button
          onClick={() => handleDeregister(storedUser._id)}
          className="main"
          variant="danger"
        >
          Delete Account
        </Button>
      </div>
    </Col>
  );
};
