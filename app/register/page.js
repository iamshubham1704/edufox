'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // ✅ Import this
import './register.css';
import Navbar from '../components/Navbar/Navbar';

export default function Register() {
  const router = useRouter(); // ✅ Hook for navigation

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    age: '',
    gender: '',
    school: '',
    grade: '',
    subjects: '',
    goals: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (result.success) {
        alert('Registered!');
        router.push('/dashboard');
      } else {
        alert('Registration failed.');
      }
    } catch (err) {
      console.error(err);
      alert('Server error!');
    }
  };


  return (
    <div>
      <Navbar />
      <div className="register-container">
        <h2 className="register-title">Student Registration</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <input name="fullName" placeholder="Full Name" required onChange={handleChange} />
          <input name="email" type="email" placeholder="Email" required onChange={handleChange} />
          <input name="password" type="password" placeholder="Password" required onChange={handleChange} />
          <input name="phone" type="tel" placeholder="Phone Number" required onChange={handleChange} />
          <input name="age" type="number" placeholder="Age" required onChange={handleChange} />

          <select name="gender" required onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input name="school" placeholder="School/College Name" required onChange={handleChange} />
          <input name="grade" placeholder="Grade/Class (e.g., 10th, 12th, B.Tech)" required onChange={handleChange} />
          <input name="subjects" placeholder="Preferred Subjects (e.g., Math, Science)" onChange={handleChange} />
          <textarea name="goals" placeholder="What are your learning goals?" rows="3" onChange={handleChange}></textarea>

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}
