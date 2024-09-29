import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema(
  {
    email: 'string',
    password: 'string',
  }
);

const Admin = mongoose.model('Admin', AdminSchema);

export default Admin;
