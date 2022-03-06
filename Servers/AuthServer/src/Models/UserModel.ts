import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const validateEmail = (email: string) => {
  const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};
const validatePassword = (password: string) => {
  const regrex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;

  return regrex.test(password);
};
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
    validate: [validateEmail, 'Please fill a valid Email Address'],
    required: [true, 'Email Required'],
  },
  password: {
    type: String,
    trim: true,
    // required:[true, "Password Required"],
    min: [8, 'Mininum Eight Characters Required'],
    max: [15, 'Maximum 15 Characters'],
    validate: [validatePassword, 'Invalid Password'],
  },
  refreshTokens: {
    type: Array,
  },
});
UserSchema.pre('save', function () {
  try {
    const hash = bcrypt.hashSync(this.password, 10);
    this.password = hash;
  } catch (error) {
    console.log(error);
  }
});
UserSchema.methods.validatePassword = function (pass: string) {
  return bcrypt.compareSync(pass, this.password);
};

export default mongoose.model('users', UserSchema);
