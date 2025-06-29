import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectToDB from '@/lib/mongoose';
import User from '@/models/User';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    await connectToDB();
    const user = await User.findOne({ email });

    if (!user) return new Response(JSON.stringify({ success: false, error: 'User not found' }), { status: 404 });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return new Response(JSON.stringify({ success: false, error: 'Invalid credentials' }), { status: 401 });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    return new Response(JSON.stringify({ success: true, token }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}
