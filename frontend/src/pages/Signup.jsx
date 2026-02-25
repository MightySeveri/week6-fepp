import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [membershipStatus, setMembershipStatus] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          name,
          phone_number: phoneNumber,
          gender,
          date_of_birth: dateOfBirth,
          membership_status: membershipStatus,
        }),
      });
      const user = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(user.error || "Signup failed");
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));
      setIsAuthenticated?.(true);
      navigate("/");
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create">
      <h2>Sign Up</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Name:</label>
        <input type="text" required value={name} onChange={(e) => setName(e.target.value)} />
        <label>Email address:</label>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password:</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Phone Number:</label>
        <input
          type="text"
          required
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <label>Gender:</label>
        <input type="text" required value={gender} onChange={(e) => setGender(e.target.value)} />
        <label>Date of Birth:</label>
        <input
          type="date"
          required
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
        <label>Membership Status:</label>
        <input
          type="text"
          required
          value={membershipStatus}
          onChange={(e) => setMembershipStatus(e.target.value)}
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Signing up..." : "Sign up"}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Signup;
