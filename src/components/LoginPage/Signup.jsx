import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './login.css';

export function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roles, setRoles] = useState([]);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/auth/signup', {
        username,
        email,
        password,
        role: roles
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className='wrapper'>
        <div className="signup">
          <div>
            <header>
              <button className='loginBtn'><Link to='/login'>Login</Link></button>
              
            </header>
            <h2>Signup</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <div>
            <input type="checkbox" value="admin" onChange={(e) => setRoles([...roles, e.target.value])} /> Admin
            <input type="checkbox" value="mod" onChange={(e) => setRoles([...roles, e.target.value])} /> Moderator
            </div>

            <button type="submit">Sign Up</button>
          </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
