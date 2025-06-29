import bcrypt from 'bcryptjs';
import connectToDB from '@/lib/mongoose';
import User from '../../../models/User';

export async function POST(req) {
  try {
    const { fullName, email, password } = await req.json();

    await connectToDB();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ success: false, error: 'Email already exists' }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ fullName, email, password: hashedPassword });

    return new Response(JSON.stringify({ success: true, user: newUser._id }), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}
